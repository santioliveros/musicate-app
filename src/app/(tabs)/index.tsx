import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { Screen } from '@/components/screen'
import { AvisosContent } from '@/features/listings/avisos-content'
import { colors, fontSize, radii, spacing } from '@/theme'

type Segment = 'para-ti' | 'novedades'

export default function InicioScreen() {
  const [segment, setSegment] = useState<Segment>('para-ti')

  return (
    <Screen>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/musikate-wordmark.png')}
          style={styles.wordmark}
          contentFit="contain"
          accessibilityLabel="musikate"
        />
      </View>

      <View style={styles.segmented}>
        <SegmentButton
          label="Para ti"
          active={segment === 'para-ti'}
          onPress={() => setSegment('para-ti')}
        />
        <SegmentButton
          label="Novedades"
          active={segment === 'novedades'}
          onPress={() => setSegment('novedades')}
        />
      </View>

      {segment === 'para-ti' ? (
        <ParaTiContent onSeeNovedades={() => setSegment('novedades')} />
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

function ParaTiContent({ onSeeNovedades }: { onSeeNovedades: () => void }) {
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
          <Button label="Ver novedades" variant="secondary" onPress={onSeeNovedades} />
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
  logo: {
    width: 112,
    height: 44,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  wordmark: {
    width: 200,
    height: 44,
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
