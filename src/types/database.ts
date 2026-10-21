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

export type ListingType =
  | 'looking_for_member'
  | 'looking_for_band'
  | 'looking_for_producer'
  | 'offering_production'
  | 'offering_lessons'
  | 'looking_for_lessons'

export type ListingStatus = 'open' | 'closed' | 'expired'

export type Listing = {
  id: string
  author_id: string
  type: ListingType
  title: string
  description: string
  instrument_id: number | null
  genre_id: number | null
  zone: string | null
  band_name: string | null
  status: ListingStatus
  expires_at: string
  created_at: string
  updated_at: string
  closed_at: string | null
}

export type ListingAuthor = Pick<
  Profile,
  'id' | 'username' | 'display_name' | 'avatar_path' | 'city'
>

export type ListingWithAuthor = Listing & {
  author: ListingAuthor
}

export type ContactType = 'whatsapp' | 'instagram' | 'email'

export type ListingContact = {
  contact_type: ContactType
  contact_value: string
}

export type ListingInterest = {
  listing_id: string
  profile_id: string
  message: string | null
  contact_type: ContactType | null
  contact_value: string | null
  created_at: string
}

export type ListingInterestWithProfile = ListingInterest & {
  profile: ListingAuthor & {
    looking_for: LookingFor[]
  }
}

export type NotificationType = 'follow' | 'listing_interest' | 'system'

export type Notification = {
  id: string
  recipient_id: string
  actor_id: string | null
  type: NotificationType
  listing_id: string | null
  read_at: string | null
  created_at: string
}

export type NotificationWithContext = Notification & {
  actor: ListingAuthor | null
  listing: Pick<Listing, 'id' | 'title'> | null
}

export type ReportTarget = 'profile' | 'listing'

export type ReportReason = 'spam' | 'harassment' | 'scam' | 'inappropriate' | 'other'

export type ReportTargetInput = {
  targetType: ReportTarget
  targetId: string
  targetAuthorId: string
  reason: ReportReason
  details: string
}
