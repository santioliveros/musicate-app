import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { LoadingView } from '@/components/loading-view'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { getAvatarUrl } from '@/features/profile/api'
import { useCatalog } from '@/features/profile/catalog'
import { useProfileTaxonomy } from '@/features/profile/taxonomy'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { LookingFor, SkillLevel } from '@/types/database'

const LOOKING_FOR_LABELS: Record<LookingFor, string> = {
  banda: 'Banda',
  integrantes: 'Integrantes',
  productor: 'Productor',
  clases: 'Clases',
  shows: 'Shows',
}

const LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

export default function PerfilScreen() {
  const router = useRouter()
  const { profile, session, signOut } = useAuth()
  const catalog = useCatalog()
  const taxonomy = useProfileTaxonomy(profile?.id)
  const [signingOut, setSigningOut] = useState(false)

  // Si ya no hay usuario no mostramos un spinner eterno: el redirect a la
  // bienvenida lo hace SignOutRedirect. Solo cargamos mientras hay sesión.
  if (!profile) {
    return session ? (
      <LoadingView label="Cargando tu perfil…" />
    ) : (
      <LoadingView label="Cerrando sesión…" />
    )
  }

  const instruments = (catalog.data?.instruments ?? []).filter((instrument) =>
    taxonomy.data?.instrumentIds.includes(instrument.id),
  )
  const genres = (catalog.data?.genres ?? []).filter((genre) =>
    taxonomy.data?.genreIds.includes(genre.id),
  )

  const links: { label: string; url: string | null; icon: keyof typeof Ionicons.glyphMap }[] = [
    { label: 'Instagram', url: profile.instagram_url, icon: 'logo-instagram' },
    { label: 'YouTube', url: profile.youtube_url, icon: 'logo-youtube' },
    { label: 'Spotify', url: profile.spotify_url, icon: 'musical-notes-outline' },
    { label: 'Sitio web', url: profile.website_url, icon: 'globe-outline' },
  ]

  const openLink = (url: string) => {
    const normalized = /^https?:\/\//.test(url) ? url : `https://${url}`
    void Linking.openURL(normalized)
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      // No hace falta navegar acá: SignOutRedirect detecta la sesión caída.
    } catch (cause) {
      setSigningOut(false)
      Alert.alert(
        'No pudimos cerrar sesión',
        cause instanceof Error ? cause.message : 'Revisá la conexión y probá de nuevo.',
      )
    }
  }

  const confirmSignOut = () => {
    Alert.alert('Cerrar sesión', '¿Seguro que querés salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: () => void handleSignOut() },
    ])
  }

  return (
    <Screen>
      <PageHeader title="Mi perfil" subtitle="Así te ve la escena." />

      <View style={styles.identity}>
        <Avatar uri={getAvatarUrl(profile.avatar_path)} name={profile.display_name} size={88} />
        <View style={styles.identityCopy}>
          <Text style={styles.name}>{profile.display_name}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
          <View style={styles.cityRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.city}>{profile.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat value={profile.followers_count} label="Seguidores" />
        <Stat value={profile.following_count} label="Siguiendo" />
        <Stat value={0} label="Avisos" />
      </View>

      <Button
        label="Editar perfil"
        variant="secondary"
        onPress={() => router.push('/(auth)/editar-perfil')}
      />

      {profile.bio ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      ) : null}

      {profile.looking_for.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estoy buscando</Text>
          <View style={styles.chips}>
            {profile.looking_for.map((value) => (
              <Chip key={value} label={LOOKING_FOR_LABELS[value]} selected readOnly />
            ))}
          </View>
        </View>
      ) : null}

      {instruments.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instrumentos</Text>
          <Text style={styles.sectionHint}>
            Nivel {LEVEL_LABELS[taxonomy.data?.level ?? 'intermediate']}
          </Text>
          <View style={styles.chips}>
            {instruments.map((instrument) => (
              <Chip key={instrument.id} label={instrument.name} readOnly />
            ))}
          </View>
        </View>
      ) : null}

      {genres.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Géneros</Text>
          <View style={styles.chips}>
            {genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} readOnly />
            ))}
          </View>
        </View>
      ) : null}

      {links.some((link) => Boolean(link.url)) ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links</Text>
          {links.map((link) => {
            if (!link.url) return null
            return (
              <Pressable
                key={link.label}
                onPress={() => openLink(link.url as string)}
                style={({ pressed }) => [styles.linkRow, pressed ? styles.pressed : null]}
              >
                <Ionicons name={link.icon} size={20} color={colors.primaryText} />
                <Text style={styles.linkLabel}>{link.label}</Text>
                <Ionicons name="open-outline" size={16} color={colors.textMuted} />
              </Pressable>
            )
          })}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Button
          label="Cerrar sesión"
          variant="danger"
          onPress={confirmSignOut}
          loading={signingOut}
        />
      </View>
    </Screen>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  identityCopy: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  username: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  city: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  section: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.heading,
    fontSize: fontSize.md,
    fontWeight: '800',
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  bio: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 21,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.75,
  },
  linkLabel: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.xxl,
  },
})
