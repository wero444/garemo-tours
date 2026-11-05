import { photos } from 'src/components/gallery/helpers/photos'
import { tours } from 'src/components/tours/helpers'
import { absoluteUrl, siteConfig } from 'src/lib/site'

export { generateStaticParams } from 'src/lib/staticRoute'

interface Entry {
  url: string
  changeFrequency: string
  priority: number
  images: Array<string>
}

const entries: Array<Entry> = [
  { url: `${siteConfig.url}/`, changeFrequency: 'weekly', priority: 1, images: tours.map(tour => absoluteUrl(tour.image.src)) },
  { url: absoluteUrl('/gallery/'), changeFrequency: 'weekly', priority: 0.8, images: photos.map(photo => absoluteUrl(photo.src)) }
]

const toXml = ({ url, changeFrequency, priority, images }: Entry) => [
  '<url>',
  `<loc>${url}</loc>`,
  ...images.map(image => `<image:image><image:loc>${image}</image:loc></image:image>`),
  `<changefreq>${changeFrequency}</changefreq>`,
  `<priority>${priority}</priority>`,
  '</url>'
].join('\n')

export const GET = async () => new Response(
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(toXml),
    '</urlset>',
    ''
  ].join('\n'),
  { headers: { 'Content-Type': 'application/xml' } }
)
