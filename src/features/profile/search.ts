import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type { LookingFor } from '@/types/database'

export type ProfileSearchResult = {
  id: string
  username: string
  display_name: string
  bio: string | null
  city: string
  avatar_path: string | null
  looking_for: LookingFor[]
}

export function useProfileSearch(term: string, excludeId?: string) {
  const query = term.trim()
  const safe = query.replace(/[,()]/g, '')

  return useQuery({
    queryKey: ['profile-search', query, excludeId],
    enabled: query.length >= 2,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, bio, city, avatar_path, looking_for')
        .or(`username.ilike.%${safe}%,display_name.ilike.%${safe}%`)
        .neq('id', excludeId ?? '00000000-0000-0000-0000-000000000000')
        .limit(20)

      if (error) throw error
      return (data ?? []) as ProfileSearchResult[]
    },
  })
}
