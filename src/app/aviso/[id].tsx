import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { EmptyState } from '@/components/empty-state'
import { LoadingView } from '@/components/loading-view'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { useListing } from '@/features/listings/api'
import { LISTING_TYPE_LABELS } from '@/features/listings/labels'
import { getAvatarUrl } from '@/features/profile/api'
import { useCatalog } from '@/features/profile/catalog'
import { formatLongDate } from '@/lib/format'
import { colors, fontSize, radii, spacing } from '@/theme'

export default function ListingDetailScreen() {
  const router = useRouter()
  const { profile } = useAuth()
  const { id } = useLocalSearchParams<{ id?: string }>()
  const listingQuery = useListing(id)
  const catalog = useCatalog()

  if (!id) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="Aviso no encontrado"
          description="El enlace no tiene un aviso válido."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  if (listingQuery.isPending) {
    return <LoadingView label="Cargando aviso…" />
  }

  if (listingQuery.isError || !listingQuery.data) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="No pudimos abrir el aviso"
          description="Puede haber vencido o ya no estar disponible."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  const listing = listingQuery.data
  const instrument = catalog.data?.instruments.find(
    (item) => item.id === listing.instrument_id,
  )
  const genre = catalog.data?.genres.find((item) => item.id === listing.genre_id)
  const isOwner = profile?.id === listing.author_id

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Aviso</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{LISTING_TYPE_LABELS[listing.type]}</Text>
      </View>

      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.subtitle}>
        {formatLongDate(listing.created_at)}
        {listing.zone ? ` · ${listing.zone}` : ''}
      </Text>

      {instrument || genre || listing.band_name ? (
        <View style={styles.tags}>
          {instrument ? <Tag label={instrument.name} /> : null}
          {genre ? <Tag label={genre.name} /> : null}
          {listing.band_name ? <Tag label={listing.band_name} /> : null}
        </View>
      ) : null}

      <Text style={styles.description}>{listing.description}</Text>

      <View style={styles.authorCard}>
        <Avatar
          uri={getAvatarUrl(listing.author.avatar_path)}
          name={listing.author.display_name}
          size={48}
        />
        <View style={styles.authorCopy}>
          <Text style={styles.authorName}>{listing.author.display_name}</Text>
          <Text style={styles.authorMeta}>
            @{listing.author.username}
            {listing.author.city ? ` · ${listing.author.city}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Publicado" value={formatLongDate(listing.created_at)} />
        <InfoRow label="Vence" value={formatLongDate(listing.expires_at)} />
        {listing.zone ? <InfoRow label="Zona" value={listing.zone} /> : null}
      </View>

      {isOwner ? (
        <View style={styles.ownerNote}>
          <Ionicons name="person-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.ownerText}>Este aviso es tuyo.</Text>
        </View>
      ) : (
        <View style={styles.contactCard}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
          <View style={styles.contactCopy}>
            <Text style={styles.contactTitle}>Contacto privado</Text>
            <Text style={styles.contactText}>
              El contacto se muestra cuando enviás un interés.
            </Text>
          </View>
        </View>
      )}
    </Screen>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
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
  pressed: {
    opacity: 0.7,
  },
  headerTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    marginBottom: spacing.md,
  },
  typeText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  description: {
    color: colors.text,
    fontSize: fontSize.md,
    lineHeight: 25,
    marginTop: spacing.xl,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  authorCopy: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  authorMeta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  infoCard: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  infoValue: {
    flexShrink: 1,
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
    textAlign: 'right',
  },
  ownerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
  },
  ownerText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  contactCard: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  contactCopy: {
    flex: 1,
    gap: 3,
  },
  contactTitle: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  contactText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
  },
})
