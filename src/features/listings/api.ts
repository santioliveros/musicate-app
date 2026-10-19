import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type { ListingType, ListingWithAuthor } from '@/types/database'

export type ListingFilters = {
  type: ListingType | 'all'
  instrumentId: number | null
  genreId: number | null
  zone: string
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
