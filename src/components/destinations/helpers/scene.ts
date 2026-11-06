import {
  CanvasTexture,
  CircleGeometry,
  Color,
  ExtrudeGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RingGeometry,
  Scene,
  Shape,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three'
import { gsap } from 'src/lib/gsap'
import { outline } from 'src/components/destinations/helpers/outline'

export interface Theme {
  top: string
  side: string
  line: string
  dot: string
  shadow: string
}

export const themes: Record<'light' | 'dark', Theme> = {
  light: { top: '#fffdf9', side: '#e6dcd1', line: '#6f6660', dot: '#a6320c', shadow: 'rgba(120, 74, 44, 0.42)' },
  dark: { top: '#2a211c', side: '#14100e', line: '#a99d92', dot: '#e0794f', shadow: 'rgba(0, 0, 0, 0.75)' }
}

interface Spot {
  id: string
  lat: number
  lng: number
}

const lng0 = 43.37
const lat0 = 42.32
const squash = Math.cos(lat0 * Math.PI / 180)
const depth = 0.07
const tiltBase = -0.3
const fov = 24

const project = (lng: number, lat: number) => new Vector2((lng - lng0) * squash, lat - lat0)

const points = outline.map(([lng, lat]) => project(lng, lat))
const xs = points.map(({ x }) => x)
const ys = points.map(({ y }) => y)
const bounds = { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) }
const size = { w: bounds.maxX - bounds.minX, h: bounds.maxY - bounds.minY }

const shadowTexture = (color: string) => {
  const scale = 220
  const pad = 70
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(size.w * scale + pad * 2)
  canvas.height = Math.ceil(size.h * scale + pad * 2)
  const ctx = canvas.getContext('2d')!
  const shift = canvas.width + 50

  ctx.shadowColor = color
  ctx.shadowBlur = 46
  ctx.shadowOffsetX = shift
  ctx.beginPath()
  points.forEach(({ x, y }, i) => {
    const px = (x - bounds.minX) * scale + pad - shift
    const py = (bounds.maxY - y) * scale + pad
    if (i) ctx.lineTo(px, py)
    else ctx.moveTo(px, py)
  })
  ctx.closePath()
  ctx.fill()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace

  return { texture, width: canvas.width / scale, height: canvas.height / scale }
}

export const createMap = (canvas: HTMLCanvasElement, spots: Array<Spot>, theme: Theme, still: boolean) => {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = SRGBColorSpace

  const scene = new Scene()
  const camera = new PerspectiveCamera(fov, 2, 0.1, 100)
  const map = new Group()
  scene.add(map)

  const shape = new Shape(points)
  const slab = new ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 1 })
  const top = new MeshBasicMaterial({ color: theme.top, transparent: true })
  const side = new MeshBasicMaterial({ color: theme.side, transparent: true })
  map.add(new Mesh(slab, [top, side]))

  const border = new BufferGeometry()
  border.setAttribute('position', new Float32BufferAttribute(points.flatMap(({ x, y }) => [x, y, depth + 0.001]), 3))
  const line = new LineBasicMaterial({ color: theme.line, transparent: true })
  const rim = new LineLoop(border, line)
  rim.renderOrder = 5
  map.add(rim)

  let shadow = shadowTexture(theme.shadow)
  const shade = new MeshBasicMaterial({ map: shadow.texture, transparent: true, depthWrite: false })
  const shadowPlane = new Mesh(new PlaneGeometry(shadow.width, shadow.height), shade)
  shadowPlane.position.set((bounds.minX + bounds.maxX) / 2, (bounds.minY + bounds.maxY) / 2 - 0.07, -0.02)
  shadowPlane.renderOrder = -1
  map.add(shadowPlane)

  const coreGeometry = new CircleGeometry(0.045, 32)
  const haloGeometry = new CircleGeometry(0.085, 32)
  const pulseGeometry = new RingGeometry(0.07, 0.082, 48)
  const hitGeometry = new CircleGeometry(0.2, 12)
  const hitMaterial = new MeshBasicMaterial({ visible: false })

  const dots = spots.map(({ id, lat, lng }, i) => {
    const group = new Group()
    const { x, y } = project(lng, lat)
    group.position.set(x, y, depth + 0.003)

    const halo = new Mesh(haloGeometry, new MeshBasicMaterial({ color: theme.dot, transparent: true, opacity: 0.16, depthWrite: false, depthTest: false }))
    const pulse = new Mesh(pulseGeometry, new MeshBasicMaterial({ color: theme.dot, transparent: true, opacity: 0, depthWrite: false, depthTest: false }))
    const core = new Mesh(coreGeometry, new MeshBasicMaterial({ color: theme.dot, transparent: true, depthWrite: false, depthTest: false }))
    const hit = new Mesh(hitGeometry, hitMaterial)
    hit.userData.id = id
    const layers = [halo, pulse, core]
    layers.forEach((mesh, layer) => {
      mesh.renderOrder = 10 + layer
    })
    halo.position.z = 0.001
    pulse.position.z = 0.002
    core.position.z = 0.003

    group.add(halo, pulse, core, hit)
    map.add(group)

    return { id, group, halo, pulse, core, hit, phase: i * 0.137 }
  })

  const raycaster = new Raycaster()
  const pointer = new Vector2()
  const world = new Vector3()
  const tilt = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 }
  let width = 1
  let height = 1
  let active: string | null = null
  let hovered: string | null = null
  let pulsing = false

  map.rotation.x = tiltBase

  const resize = (w: number, h: number) => {
    width = Math.max(1, w)
    height = Math.max(1, h)
    renderer.setSize(width, height, false)
    camera.aspect = width / height

    const span = 2 * Math.tan(fov * Math.PI / 360)
    const distance = Math.max(size.h * 1.22, size.w * 1.1 / camera.aspect) / span
    camera.position.set(0, -0.05, distance)
    camera.lookAt(0, -0.05, 0)
    camera.updateProjectionMatrix()
  }

  const emphasis = () => dots.forEach(({ id, core, halo }) => {
    const on = id === active
    const near = id === hovered
    const scale = on ? 1.5 : near ? 1.25 : 1

    gsap.to(core.scale, { x: scale, y: scale, duration: still ? 0 : 0.6, ease: 'expo.out', overwrite: 'auto' }).then()
    gsap.to(halo.scale, { x: on ? 2 : near ? 1.5 : 1, y: on ? 2 : near ? 1.5 : 1, duration: still ? 0 : 0.8, ease: 'expo.out', overwrite: 'auto' }).then()
  })

  const setActive = (id: string | null) => {
    active = id
    emphasis()
  }

  const setHovered = (id: string | null) => {
    hovered = id
    emphasis()
  }

  const setTheme = (next: Theme) => {
    top.color = new Color(next.top)
    side.color = new Color(next.side)
    line.color = new Color(next.line)
    dots.forEach(({ halo, pulse, core }) => [halo, pulse, core].forEach(mesh => (mesh.material as MeshBasicMaterial).color.set(next.dot)))
    shadow.texture.dispose()
    shadow = shadowTexture(next.shadow)
    shade.map = shadow.texture
    shade.needsUpdate = true
  }

  const pick = (x: number, y: number) => {
    pointer.set(x / width * 2 - 1, -(y / height) * 2 + 1)
    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(dots.map(({ hit }) => hit), false)[0]

    return (hit?.object.userData.id as string | undefined) ?? null
  }

  const screen = (id: string) => {
    const dot = dots.find(spot => spot.id === id)
    if (!dot) return null

    dot.group.getWorldPosition(world)
    world.project(camera)

    return { x: (world.x + 1) / 2 * width, y: (1 - world.y) / 2 * height }
  }

  const lean = (px: number, py: number) => {
    if (still) return
    tilt.targetYaw = px * 0.07
    tilt.targetPitch = py * 0.05
  }

  const render = (time: number) => {
    tilt.yaw += (tilt.targetYaw - tilt.yaw) * 0.06
    tilt.pitch += (tilt.targetPitch - tilt.pitch) * 0.06
    map.rotation.y = tilt.yaw
    map.rotation.x = tiltBase + tilt.pitch

    if (pulsing) {
      dots.forEach(({ id, pulse, phase }) => {
        const t = (time * (id === active ? 0.75 : 0.42) + phase) % 1
        const grow = 1 + t * (id === active ? 2.6 : 1.7)
        const material = pulse.material as MeshBasicMaterial
        pulse.scale.set(grow, grow, 1)
        material.opacity = (1 - t) * (id === active ? 0.55 : 0.28)
      })
    }

    renderer.render(scene, camera)
  }

  const fades = [top, side, line, shade]
  const cores = dots.map(({ core }) => core.scale)
  const halos = dots.map(({ halo }) => halo.material as MeshBasicMaterial)

  fades.forEach(material => {
    material.opacity = 0
  })
  cores.forEach(scale => scale.set(0, 0, 1))
  halos.forEach(material => {
    material.opacity = 0
  })

  const intro = () => {
    if (still) {
      fades.forEach(material => {
        material.opacity = 1
      })
      cores.forEach(scale => scale.set(1, 1, 1))
      halos.forEach(material => {
        material.opacity = 0.16
      })
      return
    }

    const order = [...dots].sort((a, b) => a.group.position.x - b.group.position.x)

    gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => { pulsing = true } })
      .fromTo(map.position, { y: -0.35 }, { y: 0, duration: 2 }, 0)
      .fromTo(tilt, { pitch: -0.5 }, { pitch: 0, duration: 2.2 }, 0)
      .to(fades, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .to(order.map(({ core }) => core.scale), { x: 1, y: 1, duration: 0.9, stagger: 0.06, ease: 'back.out(2.4)' }, 0.8)
      .to(order.map(({ halo }) => halo.material), { opacity: 0.16, duration: 0.9, stagger: 0.06 }, 0.85).then()
  }

  const dispose = () => {
    gsap.killTweensOf([map.position, tilt, ...fades, ...cores, ...halos, ...dots.map(({ halo }) => halo.scale)])
    scene.traverse(object => {
      if (object instanceof Mesh || object instanceof LineLoop) {
        const materials = [object.material].flat()
        object.geometry.dispose()
        materials.forEach(material => material.dispose())
      }
    })
    shadow.texture.dispose()
    renderer.dispose()
  }

  return { resize, render, pick, screen, lean, setActive, setHovered, setTheme, intro, dispose }
}

export type MapApi = ReturnType<typeof createMap>
