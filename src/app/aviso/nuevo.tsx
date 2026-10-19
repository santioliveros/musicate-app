import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
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

import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { useAuth } from '@/features/auth/auth-context'
import { createListing } from '@/features/listings/api'
import { LISTING_TYPE_OPTIONS } from '@/features/listings/labels'
import { useCatalog } from '@/features/profile/catalog'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { ContactType } from '@/types/database'

const LISTING_TYPE_VALUES = [
  'looking_for_member',
  'looking_for_band',
  'looking_for_producer',
  'offering_production',
  'offering_lessons',
  'looking_for_lessons',
] as const

const CONTACT_TYPES = ['whatsapp', 'instagram', 'email'] as const

const schema = z.object({
  type: z.enum(LISTING_TYPE_VALUES),
  title: z.string().trim().min(6, 'Mínimo 6 caracteres.').max(80, 'Máximo 80 caracteres.'),
  description: z
    .string()
    .trim()
    .min(20, 'Contá un poco más: mínimo 20 caracteres.')
    .max(600, 'Máximo 600 caracteres.'),
  instrumentId: z.number().nullable(),
  genreId: z.number().nullable(),
  zone: z.string().trim().max(60, 'Máximo 60 caracteres.'),
  bandName: z.string().trim().max(40, 'Máximo 40 caracteres.'),
  contactType: z.enum(CONTACT_TYPES),
  contactValue: z
    .string()
    .trim()
    .min(3, 'Agregá un contacto para que te respondan.')
    .max(200, 'Máximo 200 caracteres.'),
})

type FormValues = z.infer<typeof schema>

const DEFAULT_VALUES: FormValues = {
  type: 'looking_for_member',
  title: '',
  description: '',
  instrumentId: null,
  genreId: null,
  zone: '',
  bandName: '',
  contactType: 'whatsapp',
  contactValue: '',
}

const CONTACT_LABELS: Record<ContactType, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  email: 'Email',
}

const CONTACT_PLACEHOLDERS: Record<ContactType, string> = {
  whatsapp: '+598 99 123 456',
  instagram: '@tu_usuario',
  email: 'vos@ejemplo.com',
}

export default function NewListingScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { profile } = useAuth()
  const catalog = useCatalog()

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  })

  const contactType = watch('contactType')

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      createListing({
        type: values.type,
        title: values.title,
        description: values.description,
        instrumentId: values.instrumentId,
        genreId: values.genreId,
        zone: values.zone,
        bandName: values.bandName,
        contactType: values.contactType,
        contactValue: values.contactValue,
      }),
    onSuccess: (id) => {
      void queryClient.invalidateQueries({ queryKey: ['listings'] })
      void queryClient.invalidateQueries({ queryKey: ['my-listings'] })
      router.replace({ pathname: '/aviso/[id]', params: { id } })
    },
    onError: (cause) => {
      const message = cause instanceof Error ? cause.message : 'No pudimos publicar el aviso.'

      if (message.includes('listing_limit_reached')) {
        Alert.alert(
          'Límite de avisos',
          'Ya tenés 3 avisos activos. Cerrá uno antes de publicar otro.',
        )
        return
      }

      if (message.includes('contact_required')) {
        setError('contactValue', { type: 'manual', message: 'Agregá un contacto.' })
        return
      }

      Alert.alert('No pudimos publicar', message)
    },
  })

  const onSubmit = handleSubmit((values) => mutation.mutate(values))

  if (!profile) return null

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>Publicar aviso</Text>
            <Text style={styles.headerSubtitle}>Contá qué buscás y cómo te contactan.</Text>
          </View>
        </View>

        <Section title="¿Qué buscás?" hint="Elegí el tipo de aviso.">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <View style={styles.chips}>
                {LISTING_TYPE_OPTIONS.map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    selected={field.value === option.value}
                    onPress={() => field.onChange(option.value)}
                  />
                ))}
              </View>
            )}
          />
        </Section>

        <Section title="El aviso">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                label="Título"
                placeholder="Ej.: Busco baterista para banda indie"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.title?.message}
                maxLength={80}
                hint={`${field.value.length}/80`}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                label="Descripción"
                placeholder="Contá el estilo, el nivel, los ensayos, qué esperás…"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.description?.message}
                multiline
                numberOfLines={5}
                maxLength={600}
                style={styles.multiline}
                hint={`${field.value.length}/600`}
              />
            )}
          />
        </Section>

        <Section title="Detalles" hint="Opcional, pero ayuda a que te encuentren.">
          <Controller
            control={control}
            name="instrumentId"
            render={({ field }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Instrumento</Text>
                <View style={styles.chips}>
                  <Chip
                    label="Sin especificar"
                    selected={field.value === null}
                    onPress={() => field.onChange(null)}
                  />
                  {(catalog.data?.instruments ?? []).map((instrument) => (
                    <Chip
                      key={instrument.id}
                      label={instrument.name}
                      selected={field.value === instrument.id}
                      onPress={() => field.onChange(instrument.id)}
                    />
                  ))}
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="genreId"
            render={({ field }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Género</Text>
                <View style={styles.chips}>
                  <Chip
                    label="Sin especificar"
                    selected={field.value === null}
                    onPress={() => field.onChange(null)}
                  />
                  {(catalog.data?.genres ?? []).map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      selected={field.value === genre.id}
                      onPress={() => field.onChange(genre.id)}
                    />
                  ))}
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="zone"
            render={({ field }) => (
              <TextField
                label="Zona"
                placeholder="Centro, Pocitos, Remoto…"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.zone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bandName"
            render={({ field }) => (
              <TextField
                label="Nombre de la banda o proyecto"
                placeholder="Opcional"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.bandName?.message}
              />
            )}
          />
        </Section>

        <Section title="Contacto" hint="Se muestra recién cuando alguien envía un interés.">
          <Controller
            control={control}
            name="contactType"
            render={({ field }) => (
              <View style={styles.chips}>
                {CONTACT_TYPES.map((type) => (
                  <Chip
                    key={type}
                    label={CONTACT_LABELS[type]}
                    selected={field.value === type}
                    onPress={() => field.onChange(type)}
                  />
                ))}
              </View>
            )}
          />
          <Controller
            control={control}
            name="contactValue"
            render={({ field }) => (
              <TextField
                label={CONTACT_LABELS[contactType]}
                placeholder={CONTACT_PLACEHOLDERS[contactType]}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={errors.contactValue?.message}
                autoCapitalize="none"
                keyboardType={contactType === 'email' ? 'email-address' : 'default'}
              />
            )}
          />
        </Section>

        <Button
          label="Publicar aviso"
          onPress={onSubmit}
          loading={mutation.isPending}
          disabled={catalog.isPending}
        />

        <Text style={styles.footnote}>
          Podés tener hasta 3 avisos activos. Se cierran solos a los 30 días.
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
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
  multiline: {
    minHeight: 120,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  footnote: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
})
