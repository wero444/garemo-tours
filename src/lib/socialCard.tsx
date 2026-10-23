import { ImageResponse } from 'next/og'
import { siteConfig } from 'src/lib/site'

const size = { width: 1200, height: 630 }

// Image routes declare their variants through generateImageMetadata so they can be prerendered for the static export
export const socialCardMetadata = (alt: string) => async () => [{ id: 'card.png', alt, size, contentType: 'image/png' }]

export const socialCard = () => new ImageResponse(
  (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: siteConfig.colors.secondary,
        color: siteConfig.colors.primary
      }}
    >
      <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: '0.18em' }}>{siteConfig.name}</div>
      <div style={{ width: 120, height: 2, margin: '36px 0', background: siteConfig.colors.primary }} />
      <div style={{ fontSize: 34, letterSpacing: '0.24em', textTransform: 'uppercase' }}>{siteConfig.tagline}</div>
      <div style={{ marginTop: 18, fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>
        Tbilisi · Georgia
      </div>
    </div>
  ),
  size
)
