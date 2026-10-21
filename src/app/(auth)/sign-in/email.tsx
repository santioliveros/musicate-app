import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { sendOtp } from '@/features/auth/api'
import { colors, fontSize, spacing } from '@/theme'

const schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Escribí un email válido.'),
})

type FormValues = z.infer<typeof schema>

/** Entrada para quien ya tiene cuenta: se salta el wizard. */
export default function SignInEmailScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await sendOtp(values.email)
      router.push({ pathname: '/(auth)/verify', params: { email: values.email } })
    } catch (cause) {
      setError('email', {
        type: 'manual',
        message: cause instanceof Error ? cause.message : 'No pudimos enviar el código. Probá de nuevo.',
      })
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
          <Text style={styles.logo}>musicate!</Text>
          <Text style={styles.tagline}>tu música, tu gente.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Entrá a la escena.</Text>
          <Text style={styles.subtitle}>
            Te mandamos un código por email para confirmar tu cuenta. Sin contraseñas.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="vos@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                textContentType="emailAddress"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.email?.message}
                returnKeyType="go"
                onSubmitEditing={() => void handleSubmit(onSubmit)()}
              />
            )}
          />

          <Button
            label="Mandarme el código"
            onPress={() => void handleSubmit(onSubmit)()}
            loading={loading}
          />

          <Button
            label="Soy nuevo, quiero registrarme"
            variant="ghost"
            onPress={() => router.replace('/(auth)/sign-in/identidad')}
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
    color: colors.primaryText,
    fontSize: fontSize.xxl,
    fontWeight: '900',
    letterSpacing: -2,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  form: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
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
    marginBottom: spacing.sm,
  },
  terms: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
    textAlign: 'center',
  },
})
