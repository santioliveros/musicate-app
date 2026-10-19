import { useRouter } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { sendOtp } from '@/features/auth/api'
import { colors, fontSize, spacing } from '@/theme'

export default function SignInScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    const cleanEmail = email.trim().toLowerCase()
    setError(null)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Escribí un email válido.')
      return
    }

    setLoading(true)
    try {
      await sendOtp(cleanEmail)
      router.push({ pathname: '/(auth)/verify', params: { email: cleanEmail } })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No pudimos enviar el código. Probá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen contentStyle={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.logo}>musikate</Text>
          <Text style={styles.tagline}>tu música, tu gente.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Entrá a la escena.</Text>
          <Text style={styles.subtitle}>
            Te mandamos un código por email para confirmar tu cuenta. Sin contraseñas.
          </Text>

          <TextField
            label="Email"
            placeholder="vos@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            error={error ?? undefined}
            returnKeyType="go"
            onSubmitEditing={() => void handleContinue()}
          />

          <Button
            label="Mandarme el código"
            onPress={() => void handleContinue()}
            loading={loading}
          />

          <Text style={styles.terms}>
            Al continuar aceptás los términos y la política de privacidad. La alpha es para mayores de 18.
          </Text>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
  },
  brand: {
    gap: spacing.xs,
  },
  logo: {
    color: colors.primary,
    fontSize: fontSize.xxl,
    fontWeight: '900',
    letterSpacing: -2,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  form: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    lineHeight: 23,
  },
  terms: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
    textAlign: 'center',
  },
})
