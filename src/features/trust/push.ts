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

/**
 * Saca el token de este dispositivo del perfil. Se corre ANTES del signOut
 * porque la tabla push_tokens tiene RLS por auth.uid(): después ya no hay
 * sesión y el delete afectaría 0 filas sin avisar.
 */
export async function unregisterPushToken(profileId: string) {
  if (Platform.OS === 'web') return

  try {
    const Notifications = await import('expo-notifications')

    const projectId =
      (await import('expo-constants')).default?.expoConfig?.extra?.eas?.projectId ??
      (await import('expo-constants')).default?.easConfig?.projectId
    if (!projectId) return

    const { data: pushToken } = await Notifications.getExpoPushTokenAsync({ projectId })
    if (!pushToken) return

    await supabase
      .from('push_tokens')
      .delete()
      .eq('profile_id', profileId)
      .eq('token', pushToken)
  } catch (cause) {
    // Si falla, no bloqueamos el cierre de sesión: el token vence igual.
    console.warn('[push] no se pudo desregistrar el token:', cause)
  }
}
