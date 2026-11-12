import { readFileSync, writeFileSync } from 'node:fs'

type Range = [number, number]

const source = 'src/assets/media/svgs/mapGaremo.svg'
const target = 'src/components/destinations/helpers/map.ts'

const zones = ['kakheti', 'kvemo-kartli', 'mtskheta-mtianeti', 'shida-kartli', 'samtskhe-javakheti', 'imereti', 'adjara', 'guria', 'racha', 'samegrelo-svaneti', 'abkhazia']
const order = ['hover-colors', 'regions-hit', 'borders', 'sky', 'icons', 'outline', 'Sea']

const svg = readFileSync(source, 'utf8')
const tags = [...svg.matchAll(/<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g)]

const children = (from: number, to: number): Array<Range> => {
  const found: Array<Range> = []
  let depth = 0
  let start = 0
  for (const tag of tags) {
    if (tag.index < from || tag.index >= to) continue
    const [whole, closing, , , selfClosing] = tag
    if (closing) {
      depth -= 1
      if (depth === 0) found.push([start, tag.index + whole.length])
    } else {
      if (depth === 0) start = tag.index
      if (selfClosing) {
        if (depth === 0) found.push([start, tag.index + whole.length])
      } else depth += 1
    }
  }
  return found
}

const name = ([start]: Range) => svg.slice(start, svg.indexOf('>', start)).match(/vectornator:layerName="([^"]*)"/)?.[1]?.trim() ?? ''
const inner = ([start, end]: Range) => svg.slice(svg.indexOf('>', start) + 1, svg.lastIndexOf('</', end))
const raw = ([start, end]: Range) => svg.slice(start, end)
const within = ([start, end]: Range) => children(svg.indexOf('>', start) + 1, svg.lastIndexOf('</', end))
const attribute = (markup: string, pattern: RegExp) => {
  const value = markup.match(pattern)?.[1]
  if (!value) throw new Error(`Missing ${pattern} in ${markup.slice(0, 80)}`)
  return value
}

const mapOpen = svg.indexOf('vectornator:layerName="map"')
const mapStart = svg.indexOf('>', mapOpen) + 1
const mapEnd = svg.lastIndexOf('</g>')
const kids = children(mapStart, mapEnd)

let layers: Record<string, Range | undefined> = Object.fromEntries(kids.map((kid) => [svg.startsWith('<path', kid[0]) ? 'outline' : name(kid), kid]))
if (!['hover-colors', 'icons', 'Sea', 'sky', 'borders'].every((layer) => layers[layer])) {
  if (kids.length !== order.length) throw new Error(`Expected ${order.length} layers inside "map", found ${kids.length}`)
  layers = Object.fromEntries(order.map((layer, i) => [layer, kids[i]]))
  console.log('Layer names missing, matched layers by order')
}

const layer = (key: string) => {
  const found = layers[key]
  if (!found) throw new Error(`Missing layer "${key}"`)
  return found
}

const numbered = (items: Array<Range>) => {
  const names = items.map(name)
  return names.every((n) => zones[Number(n) - 1]) ? names.map(Number) : items.map((_, i) => 11 - i)
}

const colors = within(layer('hover-colors')).filter(([start]) => svg.startsWith('<path', start))
const groups = within(layer('icons')).filter(([start]) => svg.startsWith('<g', start))
if (colors.length !== 11 || groups.length !== 11) throw new Error(`Expected 11 region shapes and 11 icon groups, found ${colors.length} and ${groups.length}`)

const round = (value: string) => value.replace(/-?\d*\.\d+(?:e-?\d+)?/g, (n) => String(Math.round(Number(n) * 10) / 10))

const unwrap = (markup: string): string => {
  const next = markup.replace(/<g>([^]*?)<\/g>/g, (match, body: string) => (body.includes('<g') ? match : body))
  return next === markup ? markup : unwrap(next)
}

const clean = (markup: string) => unwrap(round(markup)
  .replace(/\s+vectornator:[a-zA-Z]+="[^"]*"/g, '')
  .replace(/\s+opacity="1"/g, '')
  .replace(/\s+stroke="#2e2723"/g, '')
  .replace(/\s+stroke="#695d56"/g, ' stroke-opacity=".55"')
  .replace(/\s+stroke-line(?:cap|join)="round"/g, '')
  .replace(/\s+fill-rule="nonzero"/g, '')
  .replace(/>\s+</g, '><'))
  .trim()

const regions = numbered(colors).map((n, i) => ({ zone: zones[n - 1], markup: raw(colors[i]) }))
const shapes = regions.map(({ zone, markup }) => [zone, round(attribute(markup, / d="([^"]*)"/))])
const paints = regions.map(({ zone, markup }) => [zone, attribute(markup, / fill="(#[0-9a-fA-F]{3,6})"/)])
const icons = numbered(groups).map((n, i) => `<g data-zone="${zones[n - 1]}">${clean(inner(groups[i]))}</g>`).join('')
const outline = layers.outline

const art = [
  `<g data-layer="borders">${clean(inner(layer('borders')))}</g>`,
  `<g data-layer="sky">${clean(inner(layer('sky')))}</g>`,
  `<g data-layer="icons">${icons}</g>`,
  outline ? clean(raw(outline)).replace('<path', '<path data-layer="outline"') : '',
  `<g data-layer="sea">${clean(inner(layer('Sea')))}</g>`
].join('')

if (art.includes('\'')) throw new Error('Unexpected single quote in the map markup')

const record = (entries: Array<Array<string | undefined>>) => entries.map(([key, value]) => `  '${key}': '${value}'`).join(',\n')

const module = `import  { Zone } from 'src/components/destinations/helpers/zones'

export const shapes: Record<Zone, string> = {
${record(shapes)}
}

export const paints: Record<Zone, string> = {
${record(paints)}
}

export const art = '${art}'
`

writeFileSync(target, module)
console.log(`${target}: ${Math.round(module.length / 1024)} KB`)
