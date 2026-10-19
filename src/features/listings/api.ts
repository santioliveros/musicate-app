import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type {
  ContactType,
  ListingContact,
  ListingInterest,
  ListingInterestWithProfile,
  ListingType,
  ListingWithAuthor,
} from '@/types/database'

export type ListingFilters = {
  type: ListingType | 'all'
  instrumentId: number | null
  genreId: number | null
  zone: string
}

export type CreateListingInput = {
  type: ListingType
  title: string
  description: string
  instrumentId: number | null
  genreId: number | null
  zone: string
  bandName: string
  contactType: ContactType
  contactValue: string
}

export type SendInterestInput = {
  listingId: string
  profileId: string
  message: string
  contactType: ContactType | null
  contactValue: string
}

const LISTING_SELECT = `
  *,
  author:profiles!listings_author_id_fkey(id, username, display_name, avatar_path, city)
`

export async function fetchListings(filters: ListingFilters): Promise<ListingWithAuthor[]> {
  let query = supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('status', 'open')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(50)

  if (filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }
  if (filters.instrumentId) {
    query = query.eq('instrument_id', filters.instrumentId)
  }
  if (filters.genreId) {
    query = query.eq('genre_id', filters.genreId)
  }
  if (filters.zone.trim()) {
    query = query.ilike('zone', `%${filters.zone.trim()}%`)
  }

  const { data, error } = await query
  if (error) throw error

  return (data ?? []) as unknown as ListingWithAuthor[]
}

export function useListings(filters: ListingFilters) {
  return useQuery({
    queryKey: ['listings', filters.type, filters.instrumentId, filters.genreId, filters.zone],
    queryFn: () => fetchListings(filters),
    staleTime: 30_000,
  })
}

export async function fetchListing(id: string): Promise<ListingWithAuthor | null> {
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return (data as unknown as ListingWithAuthor | null) ?? null
}

export function useListing(id?: string) {
  return useQuery({
    queryKey: ['listing', id],
    enabled: Boolean(id),
    queryFn: () => fetchListing(id as string),
  })
}

export async function fetchMyListings(userId: string): Promise<ListingWithAuthor[]> {
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('author_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as ListingWithAuthor[]
}

export function useMyListings(userId?: string) {
  return useQuery({
    queryKey: ['my-listings', userId],
    enabled: Boolean(userId),
    queryFn: () => fetchMyListings(userId as string),
  })
}

export async function createListing(input: CreateListingInput) {
  const { data, error } = await supabase.rpc('create_listing', {
    p_type: input.type,
    p_title: input.title,
    p_description: input.description,
    p_instrument_id: input.instrumentId,
    p_genre_id: input.genreId,
    p_zone: input.zone,
    p_band_name: input.bandName,
    p_contact_type: input.contactType,
    p_contact_value: input.contactValue,
  })

  if (error) throw error
  return data as string
}

export async function closeListing(id: string) {
  const { error } = await supabase.rpc('close_listing', { p_listing_id: id })
  if (error) throw error
}

export async function sendInterest(input: SendInterestInput) {
  const contactValue = input.contactValue.trim()

  const { error } = await supabase.from('listing_interests').insert({
    listing_id: input.listingId,
    profile_id: input.profileId,
    message: input.message.trim() || null,
    contact_type: contactValue ? input.contactType : null,
    contact_value: contactValue || null,
  })

  if (error) throw error
}

export function useMyInterest(listingId?: string, profileId?: string) {
  return useQuery({
    queryKey: ['my-interest', listingId, profileId],
    enabled: Boolean(listingId && profileId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_interests')
        .select('listing_id, profile_id, message, contact_type, contact_value, created_at')
        .eq('listing_id', listingId)
        .eq('profile_id', profileId)
        .maybeSingle()

      if (error) throw error
      return (data as ListingInterest | null) ?? null
    },
  })
}

export function useListingContact(listingId?: string) {
  return useQuery({
    queryKey: ['listing-contact', listingId],
    enabled: Boolean(listingId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_contacts')
        .select('contact_type, contact_value')
        .eq('listing_id', listingId)
        .maybeSingle()

      if (error) throw error
      return (data as ListingContact | null) ?? null
    },
  })
}

export function useListingInterests(listingId?: string, enabled = false) {
  return useQuery({
    queryKey: ['listing-interests', listingId],
    enabled: Boolean(listingId && enabled),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listing_interests')
        .select(`
          listing_id,
          profile_id,
          message,
          contact_type,
          contact_value,
          created_at,
          profile:profiles!listing_interests_profile_id_fkey(
            id,
            username,
            display_name,
            avatar_path,
            city,
            looking_for
          )
        `)
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data ?? []) as unknown as ListingInterestWithProfile[]
    },
  })
}
