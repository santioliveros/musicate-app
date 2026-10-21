import { Platform } from 'react-native'

import { supabase } from '@/lib/supabase'

export async function registerPushToken(profileId: string) {
  if (Platform.OS === 'web') return null

  const Notifications = await import('expo-notifications')

  const permission = await Notifications.requestPermissionsAsync()
  if (!permission.granted) return null

  const projectId =
    (await import('expo-constants')).default?.expoConfig?.extra?.eas?.projectId ??
    (await import('expo-constants')).default?.easConfig?.projectId

  if (!projectId) {
    console.warn('[push] falta el projectId de EAS; no se puede pedir el token.')
    return null
  }

  const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId })

  const { error } = await supabase.from('push_tokens').upsert(
    {
      profile_id: profileId,
      token,
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
      updated_at: new Date().toISOString(),
      last_error_at: null,
      last_error: null,
    },
    { onConflict: 'profile_id,token' },
  )

  if (error) throw error
  return token
}
