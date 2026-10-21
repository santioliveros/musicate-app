import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { EmptyState } from '@/components/empty-state'
import { LoadingView } from '@/components/loading-view'
import { SafetyActions } from '@/components/safety-actions'
import { Screen } from '@/components/screen'
import { useAuth } from '@/features/auth/auth-context'
import { getAvatarUrl } from '@/features/profile/api'
import { isProfileBlocked, unblockProfile } from '@/features/trust/api'
import { supabase } from '@/lib/supabase'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { LookingFor, Profile } from '@/types/database'

const LOOKING_FOR_LABELS: Record<LookingFor, string> = {
  banda: 'Banda',
  integrantes: 'Integrantes',
  productor: 'Productor',
  clases: 'Clases',
  shows: 'Shows',
}

export default function PublicProfileScreen() {
  const router = useRouter()
  const { profile: viewer } = useAuth()
  const { id } = useLocalSearchParams<{ id?: string }>()

  const profileQuery = useQuery({
    queryKey: ['public-profile', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id as string)
        .maybeSingle()

      if (error) throw error
      return (data as Profile | null) ?? null
    },
  })

  const blockedQuery = useQuery({
    queryKey: ['blocked', viewer?.id, id],
    enabled: Boolean(viewer?.id && id),
    queryFn: () => isProfileBlocked(viewer?.id as string, id as string),
  })

  const unblock = useMutation({
    mutationFn: () => unblockProfile(viewer?.id as string, id as string),
    onSuccess: async () => {
      await blockedQuery.refetch()
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos desbloquear',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  if (!id) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="Perfil no encontrado"
          description="El enlace no tiene un perfil válido."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  if (profileQuery.isPending) return <LoadingView label="Cargando perfil…" />

  if (!profileQuery.data) {
    return (
      <Screen>
        <EmptyState
          icon="person-outline"
          title="No pudimos abrir este perfil"
          description="Puede que no exista o que haya sido dado de baja."
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </Screen>
    )
  }

  const profile = profileQuery.data
  const isSelf = viewer?.id === profile.id

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Perfil</Text>
        {viewer && !isSelf ? (
          <SafetyActions
            viewerId={viewer.id}
            target={{
              type: 'profile',
              id: profile.id,
              authorId: profile.id,
              authorName: profile.display_name,
            }}
            onBlocked={() => void blockedQuery.refetch()}
          />
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      {blockedQuery.data ? (
        <View style={styles.blockedBanner}>
          <Ionicons name="ban-outline" size={20} color={colors.danger} />
          <Text style={styles.blockedText}>Bloqueaste a este usuario.</Text>
          <Button
            label={unblock.isPending ? 'Desbloqueando…' : 'Desbloquear'}
            variant="secondary"
            onPress={() => unblock.mutate()}
            disabled={unblock.isPending}
          />
        </View>
      ) : (
        <>
          <View style={styles.identity}>
            <Avatar
              uri={getAvatarUrl(profile.avatar_path)}
              name={profile.display_name}
              size={88}
            />
            <Text style={styles.name}>{profile.display_name}</Text>
            <Text style={styles.username}>@{profile.username}</Text>
            <View style={styles.cityRow}>
              <Ionicons name="location-outline" size={14} color={colors.textMuted} />
              <Text style={styles.city}>{profile.city}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <Stat value={profile.followers_count} label="Seguidores" />
            <Stat value={profile.following_count} label="Siguiendo" />
          </View>

          {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}

          {profile.looking_for.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Está buscando</Text>
              <View style={styles.tags}>
                {profile.looking_for.map((value) => (
                  <View key={value} style={styles.tag}>
                    <Text style={styles.tagText}>{LOOKING_FOR_LABELS[value]}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </>
      )}
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
    color: colors.heading,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  identity: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xl,
  },
  name: {
    color: colors.heading,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: spacing.sm,
  },
  username: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
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
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    color: colors.heading,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  bio: {
    color: colors.text,
    fontSize: fontSize.sm,
    lineHeight: 21,
    marginTop: spacing.xl,
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
  blockedBanner: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.dangerMuted,
  },
  blockedText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
})
