import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from 'src/lib/site'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// The SVG favicon on the brand background, for iOS home screens
const AppleIcon = async () => {
  const svg = await readFile(join(process.cwd(), 'src/app/icon.svg'))
  const src = `data:image/svg+xml;base64,${svg.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: siteConfig.colors.secondary }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={132} height={132} alt='' />
      </div>
    ),
    size
  )
}

export default AppleIcon
