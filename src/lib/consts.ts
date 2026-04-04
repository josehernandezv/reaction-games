export const DURATION_OPTIONS = [
  { label: '15 segundos', value: 15 },
  { label: '30 segundos', value: 30 },
  { label: '45 segundos', value: 45 },
  { label: '1 minuto', value: 60 },
  { label: '1:15 minutos', value: 75 },
  { label: '1:30 minutos', value: 90 },
  { label: '1:45 minutos', value: 105 },
  { label: '2 minutos', value: 120 },
  { label: '2:15 minutos', value: 135 },
  { label: '2:30 minutos', value: 150 },
  { label: '2:45 minutos', value: 165 },
  { label: '3 minutos', value: 180 },
  { label: '3:15 minutos', value: 195 },
  { label: '3:30 minutos', value: 210 },
  { label: '3:45 minutos', value: 225 },
  { label: '4 minutos', value: 240 },
  { label: '4:15 minutos', value: 255 },
  { label: '4:30 minutos', value: 270 },
  { label: '4:45 minutos', value: 285 },
  { label: '5 minutos', value: 300 },
]

export const INTERVAL_OPTIONS = [
  { label: '1 segundo', value: 1 },
  { label: '2 segundos', value: 2 },
  { label: '3 segundos', value: 3 },
  { label: '4 segundos', value: 4 },
  { label: '5 segundos', value: 5 },
  { label: '6 segundos', value: 6 },
  { label: '7 segundos', value: 7 },
  { label: '8 segundos', value: 8 },
  { label: '9 segundos', value: 9 },
  { label: '10 segundos', value: 10 },
]

export const COLOR_OPTIONS = [
  { label: 'Rojo', value: 'red' },
  { label: 'Verde', value: 'green' },
  { label: 'Azul', value: 'blue' },
  { label: 'Amarillo', value: 'yellow' },
  // { label: 'Morado', value: 'purple' },
  // { label: 'Naranja', value: 'orange' },
  // { label: 'Rosa', value: 'pink' },
  // { label: 'Negro', value: 'black' },
  { label: 'Blanco', value: 'white' },
] as const

export const ATTACK_OPTIONS = [
  'Gyaku-zuki',
  'Kizami-zuki ',
  'Mawashi-geri',
  'Ura-mawashi-geri',
  'Yoko-geri',
  'Ushiro-geri',
  'Ushiro-mawashi-geri',
] as const

export type Color = (typeof COLOR_OPTIONS)[number]['value']
export type ColorName = (typeof COLOR_OPTIONS)[number]['label']
export type Attack = (typeof ATTACK_OPTIONS)[number]
