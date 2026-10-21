import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { Screen } from '@/components/screen'
import { StepProgress } from '@/components/step-progress'
import { TextField } from '@/components/text-field'
import { sendOtp } from '@/features/auth/api'
import { SEEKING_OPTIONS, useSignInDraft } from '@/features/auth/sign-in-draft'
import { colors, fontSize, radii, spacing } from '@/theme'

const schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Escribí un email válido.'),
})

type FormValues = z.infer<typeof schema>

export default function SignInSeekingScreen() {
  const router = useRouter()
  const { draft, updateDraft } = useSignInDraft()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: draft.email },
    mode: 'onBlur',
  })

  const toggle = (option: (typeof SEEKING_OPTIONS)[number]) => {
    updateDraft({
      seeking: draft.seeking.includes(option)
        ? draft.seeking.filter((value) => value !== option)
        : [...draft.seeking, option],
    })
  }

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await sendOtp(values.email)
      updateDraft({ email: values.email })
      router.push({
        pathname: '/(auth)/verify',
        params: { email: values.email, from: 'sign-in' },
      })
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
      <Screen>
        <View style={styles.header}>
          <StepProgress total={3} current={3} />
          <Text style={styles.title}>Qué buscás</Text>
          <Text style={styles.subtitle}>
            Elegí todo lo que aplique. Es lo que más ayuda a que te encuentren.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>En musicate! quiero…</Text>
            <View style={styles.chips}>
              {SEEKING_OPTIONS.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  selected={draft.seeking.includes(option)}
                  onPress={() => toggle(option)}
                />
              ))}
            </View>
          </View>

          <View style={styles.emailBox}>
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
                  hint="Te mandamos un código para confirmar tu cuenta. Sin contraseñas."
                  returnKeyType="go"
                  onSubmitEditing={() => void handleSubmit(onSubmit)()}
                />
              )}
            />
          </View>

          <Text style={styles.terms}>
            Al continuar aceptás los términos y la política de privacidad. La alpha es para mayores
            de 18.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            label="Mandarme el código"
            onPress={() => void handleSubmit(onSubmit)()}
            loading={loading}
          />
          <Button label="Atrás" variant="ghost" onPress={() => router.back()} />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.heading,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    marginTop: spacing.sm,
  },
  subtitle: {
    color: colors.heading,
    fontSize: fontSize.sm,
    lineHeight: 20,
    opacity: 0.75,
  },
  form: {
    gap: spacing.xl,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emailBox: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  terms: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
})
