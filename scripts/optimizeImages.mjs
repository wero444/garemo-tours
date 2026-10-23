import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { deviceSizes, imageSizes } from '../image-sizes.mjs'

// Runs after `next build` with static export: writes <name>-w<width>.webp next to every bundled photo
const media = join('out', '_next', 'static', 'media')
const widths = [...imageSizes, ...deviceSizes]
const files = (await readdir(media)).filter(file => /\.(jpe?g|png)$/i.test(file))

let done = 0

for (const file of files) {
  const input = join(media, file)

  await Promise.all(widths.map(width =>
    sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(media, file.replace(/\.(jpe?g|png)$/i, `-w${width}.webp`)))
  ))

  done++
  if (done % 20 === 0 || done === files.length) console.log(`Optimised ${done}/${files.length} images`)
}
