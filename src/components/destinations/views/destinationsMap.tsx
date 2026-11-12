import type { MouseEvent, PointerEvent, RefObject } from 'react'
import { content, type Region } from 'src/components/destinations/helpers'
import type * as Drawing from 'src/components/destinations/helpers/map'
import { anchors, percent, viewBox, type Zone } from 'src/components/destinations/helpers/zones'
import { useLocale } from 'src/lib/useLocale'

interface Props {
  wrapper: RefObject<HTMLDivElement | null>
  route: RefObject<SVGPathElement | null>
  tip: RefObject<SVGCircleElement | null>
  data: typeof Drawing | null
  regions: Array<Region>
  active: string | null
  focus: Zone | null
  label: string | null
  handlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void
    onPointerLeave: () => void
    onClick: (event: MouseEvent<HTMLElement>) => void
  }
}

const zones = Object.keys(anchors) as Array<Zone>
const box = `0 0 ${viewBox.width} ${viewBox.height}`
const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

const Label = ({ at, visible, title, note }: { at: { x: number, y: number }, visible: boolean, title: string, note?: string }) => (
  <span aria-hidden style={percent(at)} className='pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[calc(100%+0.875rem)]'>
    <span
      data-visible={visible}
      className={`flex translate-y-1.5 scale-95 flex-col items-center whitespace-nowrap rounded-full border border-secondary-foreground/15 bg-secondary/85 px-3.5 pt-0.5 pb-1 text-secondary-foreground opacity-0 shadow-[0_0.75rem_1.5rem_-0.75rem_rgb(0_0_0/0.35)] backdrop-blur-md transition-[opacity,translate,scale] duration-500 data-[visible=true]:translate-y-0 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 ${ease}`}
    >
      <span className='font-hand text-lg leading-tight @3xl:text-2xl'>{title}</span>
      {note && <span className='-mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-secondary-foreground/55'>{note}</span>}
    </span>
  </span>
)

export const DestinationsMap = ({ wrapper, route, tip, data, regions, active, focus, label, handlers }: Props) => {
  const { zones: names, soon } = content[useLocale()]
  const open = new Set(regions.map((region) => region.zone))

  return (
    <div
      ref={wrapper}
      onPointerMove={handlers.onPointerMove}
      onPointerLeave={handlers.onPointerLeave}
      onClick={handlers.onClick}
      className='@container relative aspect-[1900/1110] w-full select-none text-secondary-foreground'
    >
      {data && (
        <svg viewBox={box} aria-hidden className='pointer-events-none absolute inset-0 size-full dark:opacity-45'>
          <defs>
            {zones.map((zone) => (
              <clipPath key={zone} id={`destinations-flood-${zone}`}>
                <circle data-flood={zone} r={0} />
              </clipPath>
            ))}
          </defs>
          {zones.map((zone) => <path key={zone} data-wash={zone} d={data.shapes[zone]} fill={data.paints[zone]} fillOpacity={0} />)}
          {zones.map((zone) => <path key={zone} data-fill={zone} d={data.shapes[zone]} fill={data.paints[zone]} clipPath={`url(#destinations-flood-${zone})`} />)}
        </svg>
      )}

      <svg
        viewBox={box}
        aria-hidden
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        className='absolute inset-0 size-full'
      >
        {data && <g dangerouslySetInnerHTML={{ __html: data.art }} />}
      </svg>

      {data && (
        <svg viewBox={box} aria-hidden className='absolute inset-0 size-full will-change-transform'>
          <defs>
            <mask id='destinations-spotlight' maskUnits='userSpaceOnUse' x='0' y='0' width={viewBox.width} height={viewBox.height}>
              <rect width={viewBox.width} height={viewBox.height} fill='white' />
              {zones.map((zone) => <path key={zone} data-hole={zone} d={data.shapes[zone]} fill='black' fillOpacity={0} />)}
            </mask>
          </defs>
          <rect data-veil width={viewBox.width} height={viewBox.height} mask='url(#destinations-spotlight)' opacity={0} className='pointer-events-none fill-secondary' />
          {zones.map((zone) => (
            <path
              key={zone}
              data-edge={zone}
              d={data.shapes[zone]}
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
              vectorEffect='non-scaling-stroke'
              className='pointer-events-none'
            />
          ))}
          {zones.map((zone) => (
            <path
              key={zone}
              data-ring={zone}
              d={data.shapes[zone]}
              fill='none'
              stroke='currentColor'
              strokeWidth={3.5}
              strokeLinecap='round'
              strokeLinejoin='round'
              vectorEffect='non-scaling-stroke'
              className='pointer-events-none'
            />
          ))}
          {zones.map((zone) => (
            <path key={zone} data-hit={zone} d={data.shapes[zone]} fill='transparent' className={open.has(zone) ? 'cursor-pointer' : ''} />
          ))}
        </svg>
      )}

      <svg aria-hidden className='pointer-events-none absolute inset-0 z-20 size-full overflow-visible'>
        <path ref={route} fill='none' stroke='currentColor' strokeWidth='1.25' strokeLinecap='round' opacity='0' />
        <circle ref={tip} r='3.5' fill='currentColor' opacity='0' />
      </svg>

      {data && regions.map(({ id, zone, x, y }) => {
        const state = id === active ? 'active' : zone === focus ? 'lit' : focus ? 'dim' : 'idle'

        return (
          <span
            key={id}
            data-dot={id}
            data-state={state}
            style={percent({ x, y })}
            className='destinations-dot group invisible absolute z-10 grid size-8 -translate-1/2 cursor-pointer place-items-center @3xl:size-10'
          >
            <span className={`absolute size-4 rounded-full border border-current opacity-0 transition-[opacity,scale] duration-700 group-hover:scale-125 group-hover:opacity-60 group-data-[state=active]:scale-125 group-data-[state=active]:opacity-80 group-data-[state=lit]:opacity-40 @3xl:size-6 ${ease}`} />
            <span className='absolute size-4 rounded-full border border-current opacity-0 group-data-[state=active]:animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] @3xl:size-6' />
            <span className={`size-1.5 rounded-full bg-current ring-2 ring-secondary @3xl:ring-[3px] transition-[scale,opacity] duration-500 group-hover:scale-150 group-data-[state=active]:scale-150 group-data-[state=dim]:opacity-35 group-data-[state=lit]:scale-125 @3xl:size-2.5 ${ease}`} />
          </span>
        )
      })}

      {zones.map((zone) => (
        <Label key={zone} at={anchors[zone]} visible={label === `zone:${zone}`} title={names[zone]} note={open.has(zone) ? undefined : soon} />
      ))}
      {regions.map(({ id, name, x, y }) => (
        <Label key={id} at={{ x, y }} visible={label === `dot:${id}`} title={name} />
      ))}
    </div>
  )
}
