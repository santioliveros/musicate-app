import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { z } from 'zod'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { EmptyState } from '@/components/empty-state'
import { LoadingView } from '@/components/loading-view'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { useAuth } from '@/features/auth/auth-context'
import {
  getAvatarUrl,
  updateProfile,
  uploadAvatar,
  type UpdateProfileInput,
} from '@/features/profile/api'
import { useCatalog } from '@/features/profile/catalog'
import { useProfileTaxonomy } from '@/features/profile/taxonomy'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { LookingFor, SkillLevel } from '@/types/database'

const LOOKING_FOR_VALUES = ['banda', 'integrantes', 'productor', 'clases', 'shows'] as const
const LEVEL_VALUES = ['beginner', 'intermediate', 'advanced'] as const

const LOOKING_FOR_OPTIONS: { value: LookingFor; label: string }[] = [
  { value: 'banda', label: 'Banda' },
  { value: 'integrantes', label: 'Integrantes' },
  { value: 'productor', label: 'Productor' },
  { value: 'clases', label: 'Clases' },
  { value: 'shows', label: 'Shows' },
]

const LEVEL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
]

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || /^https?:\/\/.+\..+/.test(value),
    'Usá un link que empiece con https://',
  )

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Mínimo 3 caracteres.')
    .max(20, 'Máximo 20 caracteres.')
    .regex(/^[a-z0-9_]+$/, 'Solo minúsculas, números y guion bajo.'),
  displayName: z.string().trim().min(2, 'Mínimo 2 caracteres.').max(40, 'Máximo 40 caracteres.'),
  bio: z.string().max(160, 'Máximo 160 caracteres.'),
  city: z.string().trim().min(2, 'Decinos dónde estás.'),
  lookingFor: z.array(z.enum(LOOKING_FOR_VALUES)).max(3, 'Hasta 3 opciones.'),
  instrumentIds: z.array(z.number()).min(1, 'Elegí al menos un instrumento.').max(3, 'Hasta 3.'),
  genreIds: z.array(z.number()).min(1, 'Elegí al menos un género.').max(3, 'Hasta 3.'),
  level: z.enum(LEVEL_VALUES),
  instagramUrl: optionalUrl,
  youtubeUrl: optionalUrl,
  spotifyUrl: optionalUrl,
  websiteUrl: optionalUrl,
})

type FormValues = z.infer<typeof schema>

const DEFAULT_VALUES: FormValues = {
  username: '',
  displayName: '',
  bio: '',
  city: 'Montevideo',
  lookingFor: [],
  instrumentIds: [],
  genreIds: [],
  level: 'intermediate',
  instagramUrl: '',
  youtubeUrl: '',
  spotifyUrl: '',
  websiteUrl: '',
}

export default function OnboardingScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { edit } = useLocalSearchParams<{ edit?: string }>()
  const isEdit = edit === '1'
  const { profile, refreshProfile, loading } = useAuth()
  const catalog = useCatalog()
  const taxonomy = useProfileTaxonomy(profile?.id)
  const initialized = useRef(false)
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  })

  const displayName = watch('displayName')

  useEffect(() => {
    if (!profile || initialized.current) return
    if (taxonomy.isPending) return

    initialized.current = true
    reset({
      username: profile.username,
      displayName: profile.display_name,
      bio: profile.bio ?? '',
      city: profile.city,
      lookingFor: profile.looking_for ?? [],
      instrumentIds: taxonomy.data?.instrumentIds ?? [],
      genreIds: taxonomy.data?.genreIds ?? [],
      level: taxonomy.data?.level ?? 'intermediate',
      instagramUrl: profile.instagram_url ?? '',
      youtubeUrl: profile.youtube_url ?? '',
      spotifyUrl: profile.spotify_url ?? '',
      websiteUrl: profile.website_url ?? '',
    })
  }, [profile, taxonomy.data, taxonomy.isPending, reset])

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!profile) throw new Error('No hay perfil para guardar.')

      const input: UpdateProfileInput = {
        username: values.username,
        displayName: values.displayName,
        bio: values.bio,
        city: values.city,
        lookingFor: values.lookingFor,
        instrumentIds: values.instrumentIds,
        genreIds: values.genreIds,
        level: values.level,
        instagramUrl: values.instagramUrl,
        youtubeUrl: values.youtubeUrl,
        spotifyUrl: values.spotifyUrl,
        websiteUrl: values.websiteUrl,
      }

      await updateProfile(profile.id, input)
      if (avatarUri) await uploadAvatar(profile.id, avatarUri)
      await refreshProfile()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile-taxonomy', profile?.id] })
      router.replace(isEdit ? '/(tabs)/perfil' : '/(tabs)')
    },
    onError: (cause) => {
      const code =
        typeof cause === 'object' && cause !== null && 'code' in cause
          ? String((cause as { code?: unknown }).code)
          : ''
      const message = cause instanceof Error ? cause.message : 'No pudimos guardar tu perfil.'

      if (code === '23505' || message.toLowerCase().includes('duplicate')) {
        setError('username', { type: 'manual', message: 'Ese usuario ya está tomado.' })
        return
      }

      Alert.alert('No pudimos guardar', message)
    },
  })

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a tus fotos para elegir tu avatar.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    })

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri)
    }
  }

  if (loading) {
    return <LoadingView label="Preparando tu perfil…" />
  }

  if (!profile) {
    return (
      <Screen>
        <EmptyState
          icon="person-outline"
          title="No pudimos cargar tu perfil"
          description="Revisá que las migraciones estén aplicadas y que el trigger de alta haya creado tu perfil. Después probá de nuevo."
          actionLabel="Reintentar"
          onAction={() => void refreshProfile()}
        />
      </Screen>
    )
  }

  if (catalog.isError) {
    return (
      <Screen>
        <EmptyState
          icon="cloud-offline-outline"
          title="No pudimos cargar los instrumentos"
          description="Revisá la conexión con Supabase y probá de nuevo. Si el proyecto es nuevo, corré las migraciones."
          actionLabel="Reintentar"
          onAction={() => void catalog.refetch()}
        />
      </Screen>
    )
  }

  const avatarPreview = avatarUri ?? getAvatarUrl(profile.avatar_path)

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{isEdit ? 'TU PERFIL' : 'PASO 1 DE 1'}</Text>
          <Text style={styles.title}>{isEdit ? 'Editar perfil' : 'Armá tu perfil musical'}</Text>
          <Text style={styles.subtitle}>
            {isEdit
              ? 'Actualizá cómo te ve la escena.'
              : 'Esto es lo que va a ver la gente cuando te encuentre. Podés cambiarlo después.'}
          </Text>
        </View>

        <Pressable onPress={() => void pickAvatar()} style={styles.avatarRow}>
          <Avatar uri={avatarPreview} name={displayName || profile.display_name} size={72} />
          <View style={styles.avatarCopy}>
            <Text style={styles.avatarTitle}>Foto de perfil</Text>
            <Text style={styles.avatarHint}>Tocá para elegir una imagen cuadrada.</Text>
          </View>
          <Ionicons name="camera-outline" size={22} color={colors.textMuted} />
        </Pressable>

        <Section title="Identidad">
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextField
                label="Usuario"
                placeholder="tu_usuario"
                autoCapitalize="none"
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
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                multiline
                numberOfLines={3}
                maxLength={160}
                style={styles.multiline}
                error={errors.bio?.message}
                hint={`${field.value.length}/160`}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField
                label="Ciudad"
                placeholder="Montevideo"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.city?.message}
              />
            )}
          />
        </Section>

        <Section title="Tu música" hint="Elegí hasta 3 instrumentos y 3 géneros.">
          <Controller
            control={control}
            name="instrumentIds"
            render={({ field }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Instrumentos</Text>
                <View style={styles.chips}>
                  {(catalog.data?.instruments ?? []).map((instrument) => {
                    const selected = field.value.includes(instrument.id)
                    const atMax = field.value.length >= 3 && !selected
                    return (
                      <Chip
                        key={instrument.id}
                        label={instrument.name}
                        selected={selected}
                        disabled={atMax}
                        onPress={() =>
                          field.onChange(
                            selected
                              ? field.value.filter((id) => id !== instrument.id)
                              : [...field.value, instrument.id],
                          )
                        }
                      />
                    )
                  })}
                </View>
                {errors.instrumentIds?.message ? (
                  <Text style={styles.error}>{errors.instrumentIds.message}</Text>
                ) : null}
              </View>
            )}
          />

          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nivel</Text>
                <View style={styles.chips}>
                  {LEVEL_OPTIONS.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      selected={field.value === option.value}
                      onPress={() => field.onChange(option.value)}
                    />
                  ))}
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="genreIds"
            render={({ field }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Géneros</Text>
                <View style={styles.chips}>
                  {(catalog.data?.genres ?? []).map((genre) => {
                    const selected = field.value.includes(genre.id)
                    const atMax = field.value.length >= 3 && !selected
                    return (
                      <Chip
                        key={genre.id}
                        label={genre.name}
                        selected={selected}
                        disabled={atMax}
                        onPress={() =>
                          field.onChange(
                            selected
                              ? field.value.filter((id) => id !== genre.id)
                              : [...field.value, genre.id],
                          )
                        }
                      />
                    )
                  })}
                </View>
                {errors.genreIds?.message ? (
                  <Text style={styles.error}>{errors.genreIds.message}</Text>
                ) : null}
              </View>
            )}
          />
        </Section>

        <Section title="Qué buscás" hint="Hasta 3 opciones. Es lo que más ayuda a que te encuentren.">
          <Controller
            control={control}
            name="lookingFor"
            render={({ field }) => (
              <View style={styles.chips}>
                {LOOKING_FOR_OPTIONS.map((option) => {
                  const selected = field.value.includes(option.value)
                  const atMax = field.value.length >= 3 && !selected
                  return (
                    <Chip
                      key={option.value}
                      label={option.label}
                      selected={selected}
                      disabled={atMax}
                      onPress={() =>
                        field.onChange(
                          selected
                            ? field.value.filter((value) => value !== option.value)
                            : [...field.value, option.value],
                        )
                      }
                    />
                  )
                })}
              </View>
            )}
          />
        </Section>

        <Section title="Links" hint="Opcional. Sumá tu Instagram, YouTube, Spotify o sitio.">
          {(
            [
              { name: 'instagramUrl', label: 'Instagram', placeholder: 'https://instagram.com/tu_usuario' },
              { name: 'youtubeUrl', label: 'YouTube', placeholder: 'https://youtube.com/@tu_usuario' },
              { name: 'spotifyUrl', label: 'Spotify', placeholder: 'https://open.spotify.com/artist/...' },
              { name: 'websiteUrl', label: 'Sitio web', placeholder: 'https://tu-sitio.com' },
            ] as const
          ).map(({ name, label, placeholder }) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field }) => (
                <TextField
                  label={label}
                  placeholder={placeholder}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors[name]?.message}
                />
              )}
            />
          ))}
        </Section>

        <Button
          label={isEdit ? 'Guardar cambios' : 'Entrar a musikate'}
          onPress={handleSubmit((values) => mutation.mutate(values))}
          loading={mutation.isPending}
          disabled={catalog.isPending}
        />

        {isEdit ? (
          <Button label="Cancelar" variant="ghost" onPress={() => router.back()} />
        ) : null}
      </Screen>
    </KeyboardAvoidingView>
  )
}

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
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
  eyebrow: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.xl,
  },
  avatarCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  avatarTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  avatarHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 17,
  },
  section: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    gap: spacing.xs,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 17,
  },
  sectionBody: {
    gap: spacing.md,
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
  error: {
    color: colors.danger,
    fontSize: fontSize.xs,
  },
  multiline: {
    minHeight: 92,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
})
