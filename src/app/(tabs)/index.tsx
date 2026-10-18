import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { colors, fontSize, radii, spacing } from '@/theme'

export default function NovedadesScreen() {
  const router = useRouter()
  const { profile } = useAuth()

  return (
    <Screen>
      <PageHeader
        title="Novedades"
        subtitle={profile ? `Hola, ${profile.display_name}.` : 'Avisos de tu red y gente nueva.'}
      />

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>TU RED</Text>
        <Text style={styles.heroTitle}>Encontrá con quién tocar.</Text>
        <Text style={styles.heroText}>
          Completá tu perfil, seguí a gente de la escena y mirá qué están buscando.
        </Text>
        <View style={styles.actions}>
          <Button label="Buscar gente" onPress={() => router.push('/(tabs)/buscar')} />
          <Button
            label="Ver avisos"
            variant="secondary"
            onPress={() => router.push('/(tabs)/avisos')}
          />
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
    </Screen>
  )
}

const styles = StyleSheet.create({
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
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
})
