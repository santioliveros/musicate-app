import type { ListingType } from '@/types/database'

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  looking_for_member: 'Busco integrante',
  looking_for_band: 'Busco banda',
  looking_for_producer: 'Busco productor',
  offering_production: 'Ofrezco producción',
  offering_lessons: 'Ofrezco clases',
  looking_for_lessons: 'Busco clases',
}

export const LISTING_TYPE_OPTIONS: { value: ListingType; label: string }[] = [
  { value: 'looking_for_member', label: 'Busco integrante' },
  { value: 'looking_for_band', label: 'Busco banda' },
  { value: 'looking_for_producer', label: 'Busco productor' },
  { value: 'offering_production', label: 'Ofrezco producción' },
  { value: 'offering_lessons', label: 'Ofrezco clases' },
  { value: 'looking_for_lessons', label: 'Busco clases' },
]
