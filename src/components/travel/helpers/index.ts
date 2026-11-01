import type { Locale } from 'src/lib/i18n'

export const content = {
  en: {
    title: 'How we travel',
    ways: [
      { icon: 'sun', label: 'Places we love', text: 'Valleys, villages and roads we keep coming back to' },
      { icon: 'puri', label: 'People we know', text: 'Hosts, cooks and neighbours who open their doors to us' },
      { icon: 'bottle', label: 'Stories we carry', text: 'What we heard along the way, passed on at the table' }
    ]
  },
  ge: {
    title: 'როგორ ვმოგზაურობთ',
    ways: [
      { icon: 'sun', label: 'ადგილები, რომლებიც გვიყვარს', text: 'ხეობები, სოფლები და გზები, სადაც ისევ და ისევ ვბრუნდებით' },
      { icon: 'puri', label: 'ადამიანები, რომლებსაც ვიცნობთ', text: 'მასპინძლები, მზარეულები და მეზობლები, რომლებიც კარს გვიღებენ' },
      { icon: 'bottle', label: 'ისტორიები, რომლებიც თან მოგვაქვს', text: 'რაც გზაში მოვისმინეთ და სუფრასთან გადავეცით' }
    ]
  }
} as const satisfies Record<Locale, object>
