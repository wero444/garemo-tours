import { siteConfig } from 'src/lib/site'

export { generateStaticParams } from 'src/lib/staticRoute'

export const GET = async () => new Response(
  ['User-Agent: *', 'Allow: /', '', `Host: ${siteConfig.url}`, `Sitemap: ${siteConfig.url}/sitemap.xml`, ''].join('\n'),
  { headers: { 'Content-Type': 'text/plain' } }
)
