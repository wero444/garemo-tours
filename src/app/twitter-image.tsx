import { siteConfig } from 'src/lib/site'
import { socialCard, socialCardMetadata } from 'src/lib/socialCard'

export const generateImageMetadata = socialCardMetadata(siteConfig.title)

export default socialCard
