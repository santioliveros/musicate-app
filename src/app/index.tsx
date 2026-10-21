import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/button'
import { LoadingView } from '@/components/loading-view'
import { useAuth } from '@/features/auth/auth-context'
import { colors, fontSize, spacing } from '@/theme'

// Pantalla de bienvenida: se muestra mientras se resuelve la sesión y, si no
// hay ninguna, es el punto de entrada para registrarse o iniciar sesión.
export default function WelcomeScreen() {
  const router = useRouter()
  const { loading, session, profile } = useAuth()

  // Mientras el contexto de auth resuelve la sesión solo se ve el logo: si no
  // parpadearía esta pantalla antes de mandar a un usuario ya logueado.
  if (loading) {
    return (
      <View style={styles.splash}>
        <Image
          source={require('@/assets/images/musicate-wordmark.png')}
          style={styles.wordmark}
          contentFit="contain"
          accessibilityLabel="musicate!"
        />
      </View>
    )
  }

  if (session) return <HomeRedirect />

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.hero}>
        <Image
          source={require('@/assets/images/musicate-wordmark.png')}
          style={styles.wordmark}
          contentFit="contain"
          accessibilityLabel="musicate!"
        />
        <View style={styles.taglineRow}>
          <Ionicons name="musical-notes" size={16} color={colors.primaryText} />
          <Text style={styles.tagline}>tu música, tu gente.</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          label="Registrarme"
          onPress={() => router.push('/(auth)/sign-in/identidad')}
        />
        <Button
          label="Iniciar sesión"
          variant="secondary"
          onPress={() => router.push('/(auth)/sign-in/email')}
        />
        <Text style={styles.terms}>
          La alpha es para mayores de 18. Al continuar aceptás los términos y la política de
          privacidad.
        </Text>
      </View>
    </SafeAreaView>
  )
}

function HomeRedirect() {
  const router = useRouter()
  const { profile } = useAuth()

  useEffect(() => {
    if (!profile) return
    router.replace(profile.onboarded_at ? '/(tabs)' : '/(auth)/onboarding')
  }, [profile, router])

  return <LoadingView label="Abriendo musicate!…" />
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxl,
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  wordmark: {
    width: '100%',
    maxWidth: 300,
    aspectRatio: 640 / 115,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  actions: {
    gap: spacing.md,
  },
  terms: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
})
