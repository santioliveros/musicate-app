import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type { ProfileTaxonomy, SkillLevel } from '@/types/database'

export function useProfileTaxonomy(profileId?: string) {
  return useQuery({
    queryKey: ['profile-taxonomy', profileId],
    enabled: Boolean(profileId),
    queryFn: async (): Promise<ProfileTaxonomy> => {
      const [instruments, genres] = await Promise.all([
        supabase.from('profile_instruments').select('instrument_id, level').eq('profile_id', profileId),
        supabase.from('profile_genres').select('genre_id').eq('profile_id', profileId),
      ])

      if (instruments.error) throw instruments.error
      if (genres.error) throw genres.error

      return {
        instrumentIds: (instruments.data ?? []).map((row) => row.instrument_id),
        genreIds: (genres.data ?? []).map((row) => row.genre_id),
        level: (instruments.data?.[0]?.level ?? 'intermediate') as SkillLevel,
      }
    },
  })
}
