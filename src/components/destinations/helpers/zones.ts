export type Zone =
  | 'kakheti'
  | 'kvemo-kartli'
  | 'mtskheta-mtianeti'
  | 'shida-kartli'
  | 'samtskhe-javakheti'
  | 'imereti'
  | 'adjara'
  | 'guria'
  | 'racha'
  | 'samegrelo-svaneti'
  | 'abkhazia'

export interface Point {
  x: number
  y: number
}

export const viewBox = { width: 1900, height: 1110 }

// Where a zone's name sits when the zone itself is hovered
export const anchors: Record<Zone, Point> = {
  'abkhazia': { x: 330, y: 300 },
  'samegrelo-svaneti': { x: 700, y: 470 },
  'racha': { x: 920, y: 470 },
  'guria': { x: 615, y: 740 },
  'adjara': { x: 600, y: 860 },
  'imereti': { x: 820, y: 690 },
  'samtskhe-javakheti': { x: 1010, y: 905 },
  'shida-kartli': { x: 1090, y: 690 },
  'mtskheta-mtianeti': { x: 1320, y: 620 },
  'kvemo-kartli': { x: 1220, y: 930 },
  'kakheti': { x: 1580, y: 760 }
}

export const percent = ({ x, y }: Point) => ({ left: `${x / viewBox.width * 100}%`, top: `${y / viewBox.height * 100}%` })
