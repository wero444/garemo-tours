import type { Locale } from 'src/lib/i18n'

export const content: Record<Locale, { title: string, heading: string, paragraphs: Array<string> }> = {
  en: {
    title: 'About GAREMO',
    heading: 'Environment',
    paragraphs: [
      'Garemo is Georgian for “surroundings” — the atmosphere of a place and the people who share it.',
      'Fourteen years ago, we started working as local guides in Georgia. What started as a friendship grew into years on the road, and two years ago we created Garemo.',
      'For us, travel is not a glossy fairy tale. It is about sharing a country with all its beauty, contrasts and everyday life, and making sure the people traveling with us can simply enjoy being there.'
    ]
  },
  ge: {
    title: 'გარემოს შესახებ',
    heading: 'გარემო',
    paragraphs: [
      '„გარემო“ ადგილის ატმოსფეროა და ადამიანები, ვინც მას ერთმანეთს უზიარებს.',
      'თოთხმეტი წლის წინ საქართველოში ადგილობრივ გიდებად დავიწყეთ მუშაობა. რაც მეგობრობით დაიწყო, წლობით ერთად გავლილ გზად იქცა, ორი წლის წინ კი გარემო შევქმენით.',
      'ჩვენთვის მოგზაურობა პრიალა ზღაპარი არ არის. ეს არის ქვეყნის გაზიარება მთელი მისი სილამაზით, კონტრასტებითა და ყოველდღიურობით, და იმაზე ზრუნვა, რომ ჩვენთან ერთად მოგზაურებს უბრალოდ იქ ყოფნით დატკბობა შეეძლოთ.'
    ]
  }
}
