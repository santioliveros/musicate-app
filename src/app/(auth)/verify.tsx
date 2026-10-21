import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { sendOtp, verifyOtp } from '@/features/auth/api'
import { useAuth } from '@/features/auth/auth-context'
import { useSignInDraft } from '@/features/auth/sign-in-draft'
import { hasCompletedOnboarding, saveIdentity } from '@/features/profile/api'
import { supabase } from '@/lib/supabase'
import { colors, fontSize, spacing } from '@/theme'

export default function VerifyScreen() {
  const router = useRouter()
  const { refreshProfile } = useAuth()
  const { draft } = useSignInDraft()
  const { email, from } = useLocalSearchParams<{ email?: string; from?: string }>()
  // Con `from=sign-in` el código llega al final del wizard: hay que guardar
  // la identidad que se cargó antes de entrar.
  const fromWizard = from === 'sign-in'
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(30)

  useEffect(() => {
    if (!email) router.replace('/(auth)/sign-in')
  }, [email, router])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleVerify = async () => {
    if (!email) return
    const token = code.replace(/\s/g, '')

    if (token.length < 6 || token.length > 10) {
      setError('El código tiene entre 6 y 10 dígitos.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      await verifyOtp(email, token)

      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id

      // Check primero: si la cuenta ya estaba dada de alta no pisamos su perfil.
      if (userId && fromWizard && !(await hasCompletedOnboarding(userId))) {
        await saveIdentity(userId, {
          username: draft.username,
          displayName: draft.displayName,
          bio: draft.bio,
          city: draft.city || 'Montevideo',
        })
      }

      await refreshProfile()

      let onboarded = false
      if (userId) {
        const query = () =>
          supabase.from('profiles').select('onboarded_at').eq('id', userId).maybeSingle()
        let { data } = await query()
        if (!data) {
          await new Promise((resolve) => setTimeout(resolve, 800))
          ;({ data } = await query())
        }
        onboarded = Boolean(data?.onboarded_at)
      }

      if (fromWizard && !onboarded) {
        // El sign-in ya juntó la identidad: no tiene sentido pedirla de nuevo.
        router.replace('/(tabs)')
      } else {
        router.replace(onboarded ? '/(tabs)' : '/(auth)/onboarding')
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Código incorrecto o vencido.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email || cooldown > 0) return
    try {
      await sendOtp(email)
      setCooldown(30)
      setError(null)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No pudimos reenviar el código.')
    }
  }

  if (!email) return null

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen contentStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Revisá tu email.</Text>
          <Text style={styles.subtitle}>
            Te mandamos un código a <Text style={styles.email}>{email}</Text>. Si no llega, mirá en spam.
          </Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Código"
            placeholder="12345678"
            keyboardType="number-pad"
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            maxLength={10}
            value={code}
            onChangeText={(value) => setCode(value.replace(/[^0-9]/g, ''))}
            error={error ?? undefined}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={() => void handleVerify()}
          />

          <Button label="Entrar" onPress={() => void handleVerify()} loading={loading} />

          <Button
            label={cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Reenviar código'}
            variant="ghost"
            onPress={() => void handleResend()}
            disabled={cooldown > 0}
          />

          <Button
            label="Usar otro email"
            variant="ghost"
            onPress={() =>
              fromWizard
                ? router.replace('/(auth)/sign-in/identidad')
                : router.replace('/(auth)/sign-in')
            }
          />
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
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.heading,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.heading,
    fontSize: fontSize.md,
    lineHeight: 23,
    opacity: 0.75,
  },
  email: {
    color: colors.text,
    fontWeight: '700',
  },
  form: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
})
