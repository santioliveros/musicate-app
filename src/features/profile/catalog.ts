import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'
import type { Catalog } from '@/types/database'

async function fetchCatalog(): Promise<Catalog> {
  const [instruments, genres] = await Promise.all([
    supabase.from('instruments').select('id, slug, name').order('name'),
    supabase.from('genres').select('id, slug, name').order('name'),
  ])

  if (instruments.error) throw instruments.error
  if (genres.error) throw genres.error

  return {
    instruments: instruments.data ?? [],
    genres: genres.data ?? [],
  }
}

export function useCatalog() {
  return useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 1000 * 60 * 60,
  })
}
