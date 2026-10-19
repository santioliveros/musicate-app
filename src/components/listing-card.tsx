import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { getAvatarUrl } from '@/features/profile/api'
import { LISTING_TYPE_LABELS } from '@/features/listings/labels'
import { formatShortDate } from '@/lib/format'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { ListingWithAuthor } from '@/types/database'

type ListingCardProps = {
  listing: ListingWithAuthor
  instrumentName?: string
  genreName?: string
}

export function ListingCard({ listing, instrumentName, genreName }: ListingCardProps) {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/aviso/[id]', params: { id: listing.id } })}
      style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
    >
      <View style={styles.topRow}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{LISTING_TYPE_LABELS[listing.type]}</Text>
        </View>
        <Text style={styles.date}>{formatShortDate(listing.created_at)}</Text>
      </View>

      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {listing.description}
      </Text>

      {instrumentName || genreName ? (
        <View style={styles.tags}>
          {instrumentName ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{instrumentName}</Text>
            </View>
          ) : null}
          {genreName ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{genreName}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Avatar
          uri={getAvatarUrl(listing.author.avatar_path)}
          name={listing.author.display_name}
          size={34}
        />
        <View style={styles.authorCopy}>
          <Text style={styles.authorName}>{listing.author.display_name}</Text>
          <Text style={styles.authorMeta}>
            @{listing.author.username}
            {listing.zone ? ` · ${listing.zone}` : ''}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  typeBadge: {
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  typeText: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  date: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  title: {
    color: colors.heading,
    fontSize: fontSize.lg,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  tag: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  authorCopy: {
    flex: 1,
    gap: 1,
  },
  authorName: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  authorMeta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
})
