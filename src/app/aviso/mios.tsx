import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { LoadingView } from '@/components/loading-view'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { closeListing, useMyListings } from '@/features/listings/api'
import { LISTING_TYPE_LABELS } from '@/features/listings/labels'
import { formatShortDate } from '@/lib/format'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { Listing } from '@/types/database'

export default function MyListingsScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { profile } = useAuth()
  const listings = useMyListings(profile?.id)

  const closeMutation = useMutation({
    mutationFn: (id: string) => closeListing(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['my-listings'] })
      void queryClient.invalidateQueries({ queryKey: ['listings'] })
      void queryClient.invalidateQueries({ queryKey: ['listing'] })
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos cerrar el aviso',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  const confirmClose = (listing: Listing) => {
    Alert.alert('Cerrar aviso', `¿Cerrar “${listing.title}”?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar aviso',
        style: 'destructive',
        onPress: () => closeMutation.mutate(listing.id),
      },
    ])
  }

  if (!profile) return <LoadingView />

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Mis avisos</Text>
          <Text style={styles.headerSubtitle}>Hasta 3 avisos activos a la vez.</Text>
        </View>
        <Pressable
          onPress={() => router.push('/aviso/nuevo')}
          style={({ pressed }) => [styles.addButton, pressed ? styles.pressed : null]}
        >
          <Ionicons name="add" size={22} color={colors.onPrimary} />
        </Pressable>
      </View>

      {listings.isPending ? (
        <LoadingView label="Cargando tus avisos…" />
      ) : listings.isError ? (
        <EmptyState
          icon="cloud-offline-outline"
          title="No pudimos cargar tus avisos"
          description="Revisá la conexión y que la migración 0004 esté aplicada."
          actionLabel="Reintentar"
          onAction={() => void listings.refetch()}
        />
      ) : listings.data.length === 0 ? (
        <EmptyState
          icon="megaphone-outline"
          title="Todavía no publicaste nada"
          description="Publicá tu primer aviso y empezá a recibir interesados."
          actionLabel="Publicar aviso"
          onAction={() => router.push('/aviso/nuevo')}
        />
      ) : (
        <View style={styles.list}>
          {listings.data.map((listing) => (
            <MyListingCard
              key={listing.id}
              listing={listing}
              closing={closeMutation.isPending}
              onOpen={() => router.push({ pathname: '/aviso/[id]', params: { id: listing.id } })}
              onClose={() => confirmClose(listing)}
            />
          ))}
        </View>
      )}
    </Screen>
  )
}

function MyListingCard({
  listing,
  closing,
  onOpen,
  onClose,
}: {
  listing: Listing
  closing: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const expired = new Date(listing.expires_at).getTime() < Date.now()
  const status = listing.status === 'closed' ? 'Cerrado' : expired ? 'Vencido' : 'Abierto'
  const statusColor =
    status === 'Abierto' ? colors.primary : status === 'Vencido' ? colors.danger : colors.textMuted

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{LISTING_TYPE_LABELS[listing.type]}</Text>
        </View>
        <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
      </View>

      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.meta}>
        Publicado el {formatShortDate(listing.created_at)} · vence el{' '}
        {formatShortDate(listing.expires_at)}
      </Text>

      <View style={styles.actions}>
        <Button label="Ver aviso" variant="secondary" onPress={onOpen} style={styles.action} />
        {status === 'Abierto' ? (
          <Button
            label={closing ? 'Cerrando…' : 'Cerrar'}
            variant="ghost"
            onPress={onClose}
            disabled={closing}
            style={styles.action}
          />
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.75,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBadge: {
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  typeText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  status: {
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  action: {
    flex: 1,
    minHeight: 44,
  },
})
