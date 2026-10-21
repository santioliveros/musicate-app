import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { supabase } from '@/lib/supabase'
import type {
  NotificationWithContext,
  ReportTargetInput,
} from '@/types/database'

const NOTIFICATION_SELECT = `
  id,
  recipient_id,
  actor_id,
  type,
  listing_id,
  read_at,
  created_at,
  actor:profiles!notifications_actor_id_fkey(id, username, display_name, avatar_path, city),
  listing:listings!notifications_listing_id_fkey(id, title)
`

export async function fetchNotifications(profileId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select(NOTIFICATION_SELECT)
    .eq('recipient_id', profileId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as unknown as NotificationWithContext[]
}

export function useNotifications(profileId?: string) {
  return useQuery({
    queryKey: ['notifications', profileId],
    enabled: Boolean(profileId),
    queryFn: () => fetchNotifications(profileId as string),
    staleTime: 15_000,
  })
}

export function useUnreadCount(profileId?: string) {
  const notifications = useNotifications(profileId)
  return (notifications.data ?? []).filter((item) => !item.read_at).length
}

export function useMarkAllRead() {
  const queryClient = useQueryClient()

  return useCallback(
    async (profileId: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('recipient_id', profileId)
        .is('read_at', null)

      if (error) throw error
      await queryClient.invalidateQueries({ queryKey: ['notifications', profileId] })
    },
    [queryClient],
  )
}

export async function blockProfile(blockerId: string, blockedId: string) {
  const { error } = await supabase
    .from('blocks')
    .insert({ blocker_id: blockerId, blocked_id: blockedId })

  if (error) throw error
}

export async function unblockProfile(blockerId: string, blockedId: string) {
  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)

  if (error) throw error
}

export async function isProfileBlocked(blockerId: string, blockedId: string) {
  const { data, error } = await supabase
    .from('blocks')
    .select('blocked_id')
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)
    .maybeSingle()

  if (error) throw error
  return Boolean(data)
}

export async function submitReport(reporterId: string, input: ReportTargetInput) {
  const { error } = await supabase.from('reports').insert({
    reporter_id: reporterId,
    target_type: input.targetType,
    target_id: input.targetId,
    target_author_id: input.targetAuthorId,
    reason: input.reason,
    details: input.details.trim() || null,
  })

  if (error) throw error
}
