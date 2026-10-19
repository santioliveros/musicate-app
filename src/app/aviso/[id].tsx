import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as Linking from 'expo-linking'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { EmptyState } from '@/components/empty-state'
import { LoadingView } from '@/components/loading-view'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { useAuth } from '@/features/auth/auth-context'
import {
  sendInterest,
  useListing,
  useListingContact,
  useListingInterests,
  useMyInterest,
} from '@/features/listings/api'
import { LISTING_TYPE_LABELS } from '@/features/listings/labels'
import { getAvatarUrl } from '@/features/profile/api'
import { useCatalog } from '@/features/profile/catalog'
import { formatLongDate, formatShortDate } from '@/lib/format'
import { colors, fontSize, radii, spacing } from '@/theme'
import type {
  ContactType,
  ListingContact,
  ListingInterestWithProfile,
} from '@/types/database'

const CONTACT_LABELS: Record<ContactType, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  email: 'Email',
}

const CONTACT_TYPES: ContactType[] = ['whatsapp', 'instagram', 'email']

export default function ListingDetailScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { profile } = useAuth()
  const { id } = useLocalSearchParams<{ id?: string }>()
  const listingQuery = useListing(id)
  const catalog = useCatalog()
  const listing = listingQuery.data
  const isOwner = Boolean(listing && profile?.id === listing.author_id)
  const myInterest = useMyInterest(id, profile?.id)
  const contact = useListingContact(id)
  const interests = useListingInterests(id, isOwner)

  const [showInterestForm, setShowInterestForm] = useState(false)
  const [message, setMessage] = useState('')
  const [contactType, setContactType] = useState<ContactType>('whatsapp')
  const [contactValue, setContactValue] = useState('')

  const interestMutation = useMutation({
    mutationFn: async () => {
      if (!listing || !profile) throw new Error('No hay sesión activa.')

      await sendInterest({
        listingId: listing.id,
        profileId: profile.id,
        message,
        contactType: contactValue.trim() ? contactType : null,
        contactValue,
      })
    },
    onSuccess: () => {
      setShowInterestForm(false)
      setMessage('')
      setContactValue('')
      void queryClient.invalidateQueries({ queryKey: ['my-interest', id, profile?.id] })
      void queryClient.invalidateQueries({ queryKey: ['listing-contact', id] })
      void queryClient.invalidateQueries({ queryKey: ['listing-interests', id] })
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos enviar el interés',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  if (!id) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="Aviso no encontrado"
          description="El enlace no tiene un aviso válido."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  if (listingQuery.isPending) {
    return <LoadingView label="Cargando aviso…" />
  }

  if (listingQuery.isError || !listing) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="No pudimos abrir el aviso"
          description="Puede haber vencido o ya no estar disponible."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  const instrument = catalog.data?.instruments.find(
    (item) => item.id === listing.instrument_id,
  )
  const genre = catalog.data?.genres.find((item) => item.id === listing.genre_id)
  const alreadyInterested = Boolean(myInterest.data)

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Aviso</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{LISTING_TYPE_LABELS[listing.type]}</Text>
      </View>

      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.subtitle}>
        {formatLongDate(listing.created_at)}
        {listing.zone ? ` · ${listing.zone}` : ''}
      </Text>

      {instrument || genre || listing.band_name ? (
        <View style={styles.tags}>
          {instrument ? <Tag label={instrument.name} /> : null}
          {genre ? <Tag label={genre.name} /> : null}
          {listing.band_name ? <Tag label={listing.band_name} /> : null}
        </View>
      ) : null}

      <Text style={styles.description}>{listing.description}</Text>

      <View style={styles.authorCard}>
        <Avatar
          uri={getAvatarUrl(listing.author.avatar_path)}
          name={listing.author.display_name}
          size={48}
        />
        <View style={styles.authorCopy}>
          <Text style={styles.authorName}>{listing.author.display_name}</Text>
          <Text style={styles.authorMeta}>
            @{listing.author.username}
            {listing.author.city ? ` · ${listing.author.city}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Publicado" value={formatLongDate(listing.created_at)} />
        <InfoRow label="Vence" value={formatLongDate(listing.expires_at)} />
        {listing.zone ? <InfoRow label="Zona" value={listing.zone} /> : null}
      </View>

      {isOwner ? (
        <>
          <View style={styles.ownerNote}>
            <Ionicons name="person-circle-outline" size={20} color={colors.primaryText} />
            <Text style={styles.ownerText}>Este aviso es tuyo.</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Interesados</Text>
              <Text style={styles.sectionCount}>{interests.data?.length ?? 0}</Text>
            </View>

            {interests.isPending ? (
              <ActivityIndicator color={colors.primaryText} style={styles.loading} />
            ) : interests.isError ? (
              <Text style={styles.mutedText}>No pudimos cargar los interesados.</Text>
            ) : interests.data?.length === 0 ? (
              <Text style={styles.mutedText}>Todavía no hay interesados.</Text>
            ) : (
              interests.data?.map((interest) => (
                <InterestCard key={interest.profile_id} interest={interest} />
              ))
            )}
          </View>
        </>
      ) : alreadyInterested ? (
        <>
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primaryText} />
            <Text style={styles.successText}>
              Ya enviaste tu interés. El autor puede contactarte.
            </Text>
          </View>
          {contact.data ? <ContactCard contact={contact.data} /> : null}
        </>
      ) : showInterestForm ? (
        <View style={styles.interestForm}>
          <Text style={styles.formTitle}>Enviar interés</Text>
          <Text style={styles.formHint}>
            Contale al autor por qué te interesa. Tu contacto es opcional.
          </Text>
          <TextField
            label="Mensaje"
            placeholder="Ej.: Toco hace 5 años y me copa el proyecto."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            maxLength={300}
            style={styles.messageInput}
          />

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Tu contacto (opcional)</Text>
            <View style={styles.chips}>
              {CONTACT_TYPES.map((type) => (
                <Chip
                  key={type}
                  label={CONTACT_LABELS[type]}
                  selected={contactType === type}
                  onPress={() => setContactType(type)}
                />
              ))}
            </View>
            <TextField
              placeholder={contactType === 'email' ? 'vos@ejemplo.com' : '@tu_usuario'}
              value={contactValue}
              onChangeText={setContactValue}
              autoCapitalize="none"
              keyboardType={contactType === 'email' ? 'email-address' : 'default'}
            />
          </View>

          <Button
            label="Enviar interés"
            onPress={() => interestMutation.mutate()}
            loading={interestMutation.isPending}
          />
          <Button
            label="Cancelar"
            variant="ghost"
            onPress={() => setShowInterestForm(false)}
          />
        </View>
      ) : (
        <>
          <View style={styles.contactCard}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.primaryText} />
            <View style={styles.contactCopy}>
              <Text style={styles.contactTitle}>Contacto privado</Text>
              <Text style={styles.contactText}>
                Enviá un interés para ver el contacto del autor.
              </Text>
            </View>
          </View>
          <Button
            label="Me interesa"
            onPress={() => setShowInterestForm(true)}
            style={styles.interestButton}
          />
        </>
      )}
    </Screen>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )
}

function ContactCard({ contact }: { contact: ListingContact }) {
  const url = contactUrl(contact)

  return (
    <View style={styles.contactCard}>
      <Ionicons name="call-outline" size={20} color={colors.primaryText} />
      <View style={styles.contactCopy}>
        <Text style={styles.contactTitle}>Contacto del autor</Text>
        <Text style={styles.contactText}>
          {CONTACT_LABELS[contact.contact_type]}: {contact.contact_value}
        </Text>
      </View>
      {url ? (
        <Button
          label="Abrir"
          variant="secondary"
          onPress={() => void Linking.openURL(url)}
          style={styles.contactButton}
        />
      ) : null}
    </View>
  )
}

function InterestCard({ interest }: { interest: ListingInterestWithProfile }) {
  const url = interest.contact_value
    ? contactUrl({
        contact_type: interest.contact_type ?? 'whatsapp',
        contact_value: interest.contact_value,
      })
    : null

  return (
    <View style={styles.interestCard}>
      <Avatar
        uri={getAvatarUrl(interest.profile.avatar_path)}
        name={interest.profile.display_name}
        size={40}
      />
      <View style={styles.interestCopy}>
        <Text style={styles.interestName}>{interest.profile.display_name}</Text>
        <Text style={styles.interestMeta}>
          @{interest.profile.username} · {formatShortDate(interest.created_at)}
        </Text>
        {interest.message ? <Text style={styles.interestMessage}>{interest.message}</Text> : null}
        {interest.contact_value ? (
          <Text style={styles.interestContact}>
            {CONTACT_LABELS[interest.contact_type ?? 'whatsapp']}: {interest.contact_value}
          </Text>
        ) : null}
      </View>
      {url ? (
        <Pressable onPress={() => void Linking.openURL(url)} style={styles.interestAction}>
          <Ionicons name="open-outline" size={18} color={colors.primaryText} />
        </Pressable>
      ) : null}
    </View>
  )
}

function contactUrl(contact: ListingContact) {
  const value = contact.contact_value.trim()
  if (!value) return null
  if (/^https?:\/\//.test(value)) return value
  if (contact.contact_type === 'email') return `mailto:${value}`
  if (contact.contact_type === 'instagram') {
    return `https://instagram.com/${value.replace(/^@/, '')}`
  }
  const digits = value.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : null
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
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
  headerTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    marginBottom: spacing.md,
  },
  typeText: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  description: {
    color: colors.text,
    fontSize: fontSize.md,
    lineHeight: 25,
    marginTop: spacing.xl,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  authorCopy: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  authorMeta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  infoCard: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  infoValue: {
    flexShrink: 1,
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
    textAlign: 'right',
  },
  ownerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
  },
  ownerText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  section: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  sectionCount: {
    color: colors.primaryText,
    fontSize: fontSize.sm,
    fontWeight: '800',
  },
  loading: {
    paddingVertical: spacing.lg,
  },
  mutedText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  interestCard: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  interestCopy: {
    flex: 1,
    gap: 3,
  },
  interestName: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  interestMeta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  interestMessage: {
    color: colors.text,
    fontSize: fontSize.sm,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  interestContact: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  interestAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryMuted,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  contactCopy: {
    flex: 1,
    gap: 3,
  },
  contactTitle: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  contactText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
  },
  contactButton: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
  },
  successText: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.sm,
  },
  interestButton: {
    marginTop: spacing.md,
  },
  interestForm: {
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  formTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  formHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    lineHeight: 18,
  },
  messageInput: {
    minHeight: 90,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
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
})
