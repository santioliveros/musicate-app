import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

import { supabase } from '@/lib/supabase'
import type { LookingFor, SkillLevel } from '@/types/database'

export type UpdateProfileInput = {
  username: string
  displayName: string
  bio: string
  city: string
  lookingFor: LookingFor[]
  instrumentIds: number[]
  genreIds: number[]
  level: SkillLevel
  instagramUrl: string
  youtubeUrl: string
  spotifyUrl: string
  websiteUrl: string
}

export function getAvatarUrl(path: string | null | undefined) {
  if (!path) return null
  return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl
}

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const { error } = await supabase
    .from('profiles')
    .update({
      username: input.username.trim().toLowerCase(),
      display_name: input.displayName.trim(),
      bio: input.bio.trim() || null,
      city: input.city.trim() || 'Montevideo',
      looking_for: input.lookingFor,
      instagram_url: input.instagramUrl.trim() || null,
      youtube_url: input.youtubeUrl.trim() || null,
      spotify_url: input.spotifyUrl.trim() || null,
      website_url: input.websiteUrl.trim() || null,
      onboarded_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) throw error

  await replaceTaxonomy(userId, input.instrumentIds, input.genreIds, input.level)
}

async function replaceTaxonomy(
  userId: string,
  instrumentIds: number[],
  genreIds: number[],
  level: SkillLevel,
) {
  const { error: instrumentsDeleteError } = await supabase
    .from('profile_instruments')
    .delete()
    .eq('profile_id', userId)

  if (instrumentsDeleteError) throw instrumentsDeleteError

  const { error: genresDeleteError } = await supabase
    .from('profile_genres')
    .delete()
    .eq('profile_id', userId)

  if (genresDeleteError) throw genresDeleteError

  if (instrumentIds.length > 0) {
    const { error } = await supabase.from('profile_instruments').insert(
      instrumentIds.map((instrumentId) => ({
        profile_id: userId,
        instrument_id: instrumentId,
        level,
      })),
    )
    if (error) throw error
  }

  if (genreIds.length > 0) {
    const { error } = await supabase.from('profile_genres').insert(
      genreIds.map((genreId) => ({
        profile_id: userId,
        genre_id: genreId,
      })),
    )
    if (error) throw error
  }
}

export async function uploadAvatar(userId: string, uri: string) {
  const manipulated = await manipulateAsync(
    uri,
    [{ resize: { width: 512, height: 512 } }],
    { compress: 0.8, format: SaveFormat.JPEG },
  )

  const response = await fetch(manipulated.uri)
  const arrayBuffer = await response.arrayBuffer()
  const path = `${userId}/avatar-${Date.now()}.jpg`

  const { error } = await supabase.storage.from('avatars').upload(path, arrayBuffer, {
    contentType: 'image/jpeg',
    upsert: false,
  })

  if (error) throw error

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ avatar_path: path })
    .eq('id', userId)

  if (profileError) throw profileError
  return path
}
