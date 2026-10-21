// Edge Function: send-push
// Envía notificaciones pendientes a Expo Push y marca el resultado.
// Pensada para ejecutarse con un secreto compartido (header x-webhook-secret).

import { createClient } from 'jsr:@supabase/supabase-js@2'
import { Expo, type ExpoPushMessage } from 'npm:expo-server-sdk@3'

type NotificationRow = {
  id: string
  recipient_id: string
  actor_id: string | null
  type: string
  listing_id: string | null
  created_at: string
}

type ActorRow = {
  display_name: string
}

type ListingRow = {
  title: string
}

const EXPO_ACCESS_TOKEN = Deno.env.get('EXPO_ACCESS_TOKEN')
const WEBHOOK_SECRET = Deno.env.get('PUSH_WEBHOOK_SECRET')

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') as string,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string,
)

const expo = new Expo(EXPO_ACCESS_TOKEN ? { accessToken: EXPO_ACCESS_TOKEN } : {})

function titleFor(type: string) {
  if (type === 'listing_interest') return 'Alguien se interesó en tu aviso'
  if (type === 'follow') return 'Tenés un seguidor nuevo'
  return 'musicate!'
}

function bodyFor(type: string, actorName: string | null, listingTitle: string | null) {
  const actor = actorName ?? 'Alguien'

  if (type === 'listing_interest') {
    return listingTitle ? `${actor} en “${listingTitle}”` : `${actor} se interesó en tu aviso`
  }
  if (type === 'follow') {
    return `${actor} empezó a seguirte`
  }
  return 'Hay una novedad en tu cuenta.'
}

Deno.serve(async (request) => {
  if (WEBHOOK_SECRET && request.headers.get('x-webhook-secret') !== WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'forbidden' }), { status: 403 })
  }

  const { data: pending, error: pendingError } = await supabase
    .from('notifications')
    .select('id, recipient_id, actor_id, type, listing_id, created_at')
    .is('push_attempted_at', null)
    .order('created_at', { ascending: true })
    .limit(50)

  if (pendingError) {
    return new Response(JSON.stringify({ error: pendingError.message }), { status: 500 })
  }

  const notifications = (pending ?? []) as NotificationRow[]

  if (notifications.length === 0) {
    return new Response(JSON.stringify({ sent: 0 }), { status: 200 })
  }

  const recipientIds = [...new Set(notifications.map((item) => item.recipient_id))]
  const actorIds = [
    ...new Set(notifications.map((item) => item.actor_id).filter((id): id is string => Boolean(id))),
  ]
  const listingIds = [
    ...new Set(
      notifications.map((item) => item.listing_id).filter((id): id is string => Boolean(id)),
    ),
  ]

  const { data: tokens } = await supabase
    .from('push_tokens')
    .select('profile_id, token')
    .in('profile_id', recipientIds)
    .is('last_error_at', null)

  const { data: actors } = actorIds.length
    ? await supabase.from('profiles').select('id, display_name').in('id', actorIds)
    : { data: [] as (ActorRow & { id: string })[] }

  const { data: listings } = listingIds.length
    ? await supabase.from('listings').select('id, title').in('id', listingIds)
    : { data: [] as (ListingRow & { id: string })[] }

  const tokensByProfile = new Map<string, string[]>()
  for (const row of tokens ?? []) {
    const list = tokensByProfile.get(row.profile_id) ?? []
    list.push(row.token)
    tokensByProfile.set(row.profile_id, list)
  }

  const actorName = new Map((actors ?? []).map((row) => [row.id, row.display_name]))
  const listingTitle = new Map((listings ?? []).map((row) => [row.id, row.title]))

  const messages: ExpoPushMessage[] = []
  const notificationIds: string[] = []

  for (const notification of notifications) {
    const pushTokens = tokensByProfile.get(notification.recipient_id) ?? []
    if (pushTokens.length === 0) {
      notificationIds.push(notification.id)
      continue
    }

    const validTokens = pushTokens.filter((token) => Expo.isExpoPushToken(token))
    if (validTokens.length === 0) {
      notificationIds.push(notification.id)
      continue
    }

    const data = {
      notificationId: notification.id,
      listingId: notification.listing_id,
      type: notification.type,
    }

    for (const token of validTokens) {
      messages.push({
        to: token,
        sound: 'default',
        title: titleFor(notification.type),
        body: bodyFor(
          notification.type,
          notification.actor_id ? (actorName.get(notification.actor_id) ?? null) : null,
          notification.listing_id ? (listingTitle.get(notification.listing_id) ?? null) : null,
        ),
        data,
      })
    }

    notificationIds.push(notification.id)
  }

  const errors: string[] = []
  let sent = 0

  const chunks = expo.chunkPushNotifications(messages)
  for (const chunk of chunks) {
    try {
      const receipts = await expo.sendPushNotificationsAsync(chunk)
      receipts.forEach((receipt) => {
        if (receipt.status === 'ok') sent += 1
        if (receipt.status === 'error') {
          errors.push(receipt.message ?? 'error desconocido')
        }
      })
    } catch (cause) {
      errors.push(cause instanceof Error ? cause.message : String(cause))
    }
  }

  const now = new Date().toISOString()
  await supabase
    .from('notifications')
    .update({ push_attempted_at: now, push_error: errors.length ? errors[0] : null })
    .in('id', notificationIds)

  return new Response(
    JSON.stringify({
      notifications: notificationIds.length,
      messages: messages.length,
      sent,
      errors,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
})
