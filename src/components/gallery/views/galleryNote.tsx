import { content } from 'src/components/gallery/helpers'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

interface Props {
  prefix: string
  count?: number
}

export const GalleryNote = ({ prefix, count }: Props) => {
  const { tagline, photos } = content[useLocale()]

  return (
    <div className='flex max-w-sm flex-col gap-4 md:items-end md:pb-2 md:text-right'>
      <span aria-hidden className={`${prefix}-rule block h-px w-14 origin-left bg-primary/70 md:origin-right`} />
      <p className='text-balance text-lg font-light leading-snug tracking-tight text-secondary-foreground/80 md:text-xl lg:text-2xl'>
        <Words text={tagline} className={`${prefix}-word`} />
      </p>
      {count !== undefined && (
        <p className={`${prefix}-count inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-primary`}>
          <span aria-hidden className='size-1.5 rounded-full bg-primary' />
          {photos(count)}
        </p>
      )}
    </div>
  )
}
