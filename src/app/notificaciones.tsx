import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { getAvatarUrl } from '@/features/profile/api'
import { useMarkAllRead, useNotifications } from '@/features/trust/api'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { NotificationWithContext } from '@/types/database'

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)

  if (minutes < 1) return 'ahora'
  if (minutes < 60) return `hace ${minutes} min`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours} h`

  const days = Math.floor(hours / 24)
  return days === 1 ? 'ayer' : `hace ${days} días`
}

function notificationText(notification: NotificationWithContext) {
  const actor = notification.actor?.display_name ?? 'Alguien'

  if (notification.type === 'listing_interest') {
    return `${actor} se interesó en tu aviso`
  }
  if (notification.type === 'follow') {
    return `${actor} empezó a seguirte`
  }
  return 'Novedad de musicate!'
}

export default function NotificacionesScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { profile } = useAuth()
  const notifications = useNotifications(profile?.id)
  const markAllRead = useMarkAllRead()
  const [marking, setMarking] = useState(false)

  const mutation = useMutation({
    mutationFn: () => markAllRead(profile?.id as string),
    onSettled: async () => {
      setMarking(false)
      await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos marcar las notificaciones',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  if (!profile) return null

  const unread = (notifications.data ?? []).filter((item) => !item.read_at).length

  return (
    <Screen>
      <PageHeader
        title="Notificaciones"
        subtitle={unread > 0 ? `${unread} sin leer` : 'Estás al día.'}
        right={
          unread > 0 ? (
            <Pressable
              onPress={() => {
                setMarking(true)
                mutation.mutate()
              }}
              disabled={marking}
              style={({ pressed }) => [styles.markButton, pressed ? styles.pressed : null]}
            >
              <Text style={styles.markText}>{marking ? 'Marcando…' : 'Marcar leídas'}</Text>
            </Pressable>
          ) : (
            <View style={styles.headerSpacer} />
          )
        }
      />

      {notifications.isPending ? (
        <ActivityIndicator color={colors.primaryText} style={styles.loading} />
      ) : notifications.isError ? (
        <EmptyState
          icon="cloud-offline-outline"
          title="No pudimos cargar las notificaciones"
          description="Revisá la conexión y que la migración 0006 esté aplicada."
          actionLabel="Reintentar"
          onAction={() => void notifications.refetch()}
        />
      ) : notifications.data.length === 0 ? (
        <EmptyState
          icon="notifications-outline"
          title="No tenés notificaciones"
          description="Cuando alguien se interese en uno de tus avisos o te siga, vas a verlo acá."
          actionLabel="Ver Explorar"
          onAction={() => router.push('/(tabs)')}
        />
      ) : (
        <View style={styles.list}>
          {notifications.data.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              onPress={() => {
                if (notification.listing_id) {
                  router.push({
                    pathname: '/aviso/[id]',
                    params: { id: notification.listing_id },
                  })
                }
              }}
            />
          ))}
        </View>
      )}
    </Screen>
  )
}

function NotificationRow({
  notification,
  onPress,
}: {
  notification: NotificationWithContext
  onPress: () => void
}) {
  const unread = !notification.read_at
  const icon =
    notification.type === 'listing_interest'
      ? 'megaphone-outline'
      : notification.type === 'follow'
        ? 'person-add-outline'
        : 'information-circle-outline'

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        unread ? styles.rowUnread : null,
        pressed ? styles.pressed : null,
      ]}
    >
      {notification.actor ? (
        <Avatar
          uri={getAvatarUrl(notification.actor.avatar_path)}
          name={notification.actor.display_name}
          size={40}
        />
      ) : (
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={20} color={colors.primaryText} />
        </View>
      )}

      <View style={styles.rowBody}>
        <Text style={styles.rowText}>{notificationText(notification)}</Text>
        {notification.listing ? (
          <Text style={styles.rowListing} numberOfLines={1}>
            {notification.listing.title}
          </Text>
        ) : null}
        <Text style={styles.rowTime}>{relativeTime(notification.created_at)}</Text>
      </View>

      {unread ? <View style={styles.dot} /> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  headerSpacer: {
    width: 1,
  },
  markButton: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  markText: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  loading: {
    paddingVertical: spacing.xxl,
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  rowUnread: {
    borderColor: colors.primary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryMuted,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowText: {
    color: colors.heading,
    fontSize: fontSize.sm,
    fontWeight: '600',
    lineHeight: 19,
  },
  rowListing: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  rowTime: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
})
