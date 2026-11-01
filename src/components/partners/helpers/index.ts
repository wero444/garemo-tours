import type { Locale } from 'src/lib/i18n'

// The CTA goes to Contact for now; it will later point to a separate page for agencies
export const content: Record<Locale, { eyebrow: string, title: Array<string>, description: string, regionsLabel: string, regions: Array<string>, cta: string }> = {
  en: {
    eyebrow: 'For travel partners',
    title: ['Your DMC', 'in Georgia'],
    description: 'Tailor-made group journeys across Georgia, from cultural and pilgrimage tours to corporate and special-interest travel.',
    regionsLabel: 'Destinations',
    regions: ['Georgia', 'Armenia', 'Azerbaijan'],
    cta: 'Work with us'
  },
  ge: {
    eyebrow: 'ტურისტული პარტნიორებისთვის',
    title: ['თქვენი DMC', 'საქართველოში'],
    description: 'ინდივიდუალურად დაგეგმილი ჯგუფური მოგზაურობები მთელ საქართველოში — კულტურული და პილიგრიმული ტურებიდან კორპორაციულ და სპეციალური ინტერესის მოგზაურობებამდე.',
    regionsLabel: 'მიმართულებები',
    regions: ['საქართველო', 'სომხეთი', 'აზერბაიჯანი'],
    cta: 'ითანამშრომლეთ ჩვენთან'
  }
}
