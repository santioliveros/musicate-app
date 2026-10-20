import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@/components/button'
import { DepartmentPicker } from '@/components/department-picker'
import { Screen } from '@/components/screen'
import { StepProgress } from '@/components/step-progress'
import { TextField } from '@/components/text-field'
import { useSignInDraft } from '@/features/auth/sign-in-draft'
import { isDepartment } from '@/features/profile/departments'
import { colors, fontSize, spacing } from '@/theme'

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Mínimo 3 caracteres.')
    .max(20, 'Máximo 20 caracteres.')
    .regex(/^[a-z0-9_]+$/, 'Solo minúsculas, números y guion bajo.'),
  displayName: z.string().trim().min(2, 'Mínimo 2 caracteres.').max(40, 'Máximo 40 caracteres.'),
  bio: z.string().max(160, 'Máximo 160 caracteres.'),
  // El selector garantiza un departamento válido; acá solo se exige que haya uno.
  city: z.string().trim().min(1, 'Elegí un departamento.'),
})

type FormValues = z.infer<typeof schema>

export default function SignInIdentityScreen() {
  const router = useRouter()
  const { draft, updateDraft } = useSignInDraft()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: draft.username,
      displayName: draft.displayName,
      bio: draft.bio,
      city: draft.city,
    },
    mode: 'onBlur',
  })

  const bio = watch('bio')

  const onSubmit = (values: FormValues) => {
    if (!isDepartment(values.city)) return
    updateDraft({
      username: values.username.trim().toLowerCase(),
      displayName: values.displayName.trim(),
      bio: values.bio.trim(),
      city: values.city,
    })
    router.push('/(auth)/sign-in/gustos')
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <View style={styles.header}>
          <StepProgress total={3} current={1} />
          <Text style={styles.title}>Identidad</Text>
          <Text style={styles.subtitle}>
            Así te va a ver la escena. Podés cambiarlo cuando quieras.
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextField
                label="Usuario"
                placeholder="tu_usuario"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect={false}
                value={field.value}
                onChangeText={(value) => field.onChange(value.toLowerCase())}
                onBlur={field.onBlur}
                error={errors.username?.message}
                hint={`Se va a ver como @${field.value || 'usuario'}`}
              />
            )}
          />

          <Controller
            control={control}
            name="displayName"
            render={({ field }) => (
              <TextField
                label="Nombre visible"
                placeholder="Tu nombre o el de tu proyecto"
                autoComplete="name"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.displayName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <TextField
                label="Bio"
                placeholder="En una o dos frases: qué hacés y qué te gusta."
                multiline
                numberOfLines={3}
                maxLength={160}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.bio?.message}
                hint={`${bio.length}/160`}
                style={styles.multiline}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <DepartmentPicker
                value={isDepartment(field.value) ? field.value : ''}
                onChange={(value) => field.onChange(value)}
                error={errors.city?.message}
              />
            )}
          />
        </View>

        <View style={styles.footer}>
          <Button label="Siguiente" onPress={handleSubmit(onSubmit)} />
          <Button label="Ya tengo cuenta" variant="ghost" onPress={() => router.push('/(auth)/sign-in/email')} />
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
    gap: spacing.lg,
  },
  footer: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  multiline: {
    minHeight: 92,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
})
