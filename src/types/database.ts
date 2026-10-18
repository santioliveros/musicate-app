export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type LookingFor = 'banda' | 'integrantes' | 'productor' | 'clases' | 'shows'

export type Profile = {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_path: string | null
  city: string
  country: string
  looking_for: LookingFor[]
  followers_count: number
  following_count: number
  onboarded_at: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  instagram_url: string | null
  youtube_url: string | null
  spotify_url: string | null
  website_url: string | null
}

export type Instrument = {
  id: number
  slug: string
  name: string
}

export type Genre = {
  id: number
  slug: string
  name: string
}

export type Catalog = {
  instruments: Instrument[]
  genres: Genre[]
}

export type ProfileTaxonomy = {
  instrumentIds: number[]
  genreIds: number[]
  level: SkillLevel
}
