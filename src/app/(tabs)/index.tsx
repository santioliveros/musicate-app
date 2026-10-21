import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { AvisosContent } from '@/features/listings/avisos-content'
import { useUnreadCount } from '@/features/trust/api'
import { colors, fontSize, radii, spacing } from '@/theme'

type Segment = 'para-ti' | 'explorar'

export default function InicioScreen() {
  const router = useRouter()
  const { profile } = useAuth()
  const [segment, setSegment] = useState<Segment>('para-ti')
  const unread = useUnreadCount(profile?.id)

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Image
          source={require('../../../assets/images/musicate-wordmark.png')}
          style={styles.wordmark}
          contentFit="contain"
          accessibilityLabel="musicate!"
        />
        <Pressable
          onPress={() => router.push('/notificaciones')}
          style={({ pressed }) => [styles.bell, pressed ? styles.pressed : null]}
          accessibilityLabel="Notificaciones"
        >
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          {unread > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unread > 9 ? '9+' : unread}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <View style={styles.segmented}>
        <SegmentButton
          label="Para ti"
          active={segment === 'para-ti'}
          onPress={() => setSegment('para-ti')}
        />
        <SegmentButton
          label="Explorar"
          active={segment === 'explorar'}
          onPress={() => setSegment('explorar')}
        />
      </View>

      {segment === 'para-ti' ? (
        <ParaTiContent onSeeExplore={() => setSegment('explorar')} />
      ) : (
        <AvisosContent />
      )}
    </Screen>
  )
}

function SegmentButton({
  label,
  active,
  onPress,
}: {
  label: string
  active: boolean
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.segment,
        active ? styles.segmentActive : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <Text style={[styles.segmentLabel, active ? styles.segmentLabelActive : null]}>
        {label}
      </Text>
    </Pressable>
  )
}

function ParaTiContent({ onSeeExplore }: { onSeeExplore: () => void }) {
  const router = useRouter()

  return (
    <>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>TU RED</Text>
        <Text style={styles.heroTitle}>Encontrá con quién tocar.</Text>
        <Text style={styles.heroText}>
          Completá tu perfil, seguí a gente de la escena y mirá qué están buscando.
        </Text>
        <View style={styles.actions}>
          <Button label="Buscar gente" onPress={() => router.push('/(tabs)/buscar')} />
          <Button label="Explorar" variant="secondary" onPress={onSeeExplore} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Hoy</Text>
      <EmptyState
        icon="sparkles-outline"
        title="Todavía no hay novedades"
        description="Cuando sigas a alguien, sus avisos van a aparecer acá. Mientras tanto, explorá la escena."
        actionLabel="Buscar gente"
        onAction={() => router.push('/(tabs)/buscar')}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  headerSpacer: {
    width: 40,
  },
  wordmark: {
    width: 240,
    height: 49,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.onPrimary,
    fontSize: 10,
    fontWeight: '800',
  },
  segmented: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.xl,
    gap: 4,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  segmentLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  segmentLabelActive: {
    color: colors.onPrimary,
  },
  hero: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: colors.heading,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroText: {
    color: colors.heading,
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.sm,
    opacity: 0.75,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.heading,
    fontSize: fontSize.lg,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
})
