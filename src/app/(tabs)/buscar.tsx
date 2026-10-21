import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'
import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { useAuth } from '@/features/auth/auth-context'
import { getAvatarUrl } from '@/features/profile/api'
import { useProfileSearch } from '@/features/profile/search'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { LookingFor } from '@/types/database'

const LOOKING_FOR_LABELS: Record<LookingFor, string> = {
  banda: 'Banda',
  integrantes: 'Integrantes',
  productor: 'Productor',
  clases: 'Clases',
  shows: 'Shows',
}

export default function BuscarScreen() {
  const router = useRouter()
  const { profile } = useAuth()
  const [term, setTerm] = useState('')
  const search = useProfileSearch(term, profile?.id)
  const results = search.data ?? []

  return (
    <Screen>
      <PageHeader title="Buscar" subtitle="Gente de la escena, por nombre o usuario." />

      <TextField
        placeholder="Buscá por nombre o usuario"
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={setTerm}
        returnKeyType="search"
        style={styles.input}
      />

      <View style={styles.results}>
        {term.trim().length < 2 ? (
          <EmptyState
            icon="search-outline"
            title="Empezá a buscar"
            description="Escribí al menos dos letras. Los filtros por instrumento y género llegan con el módulo de avisos."
          />
        ) : search.isPending ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primaryText} />
          </View>
        ) : search.isError ? (
          <EmptyState
            icon="cloud-offline-outline"
            title="No pudimos buscar"
            description="Revisá la conexión con Supabase y probá de nuevo."
            actionLabel="Reintentar"
            onAction={() => void search.refetch()}
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon="people-outline"
            title="No encontramos a nadie"
            description={`No hay perfiles que coincidan con “${term.trim()}”. Probá con el nombre de usuario.`}
          />
        ) : (
          results.map((result) => (
            <Pressable
              key={result.id}
              onPress={() =>
                router.push({ pathname: '/perfil/[id]', params: { id: result.id } })
              }
              style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
            >
              <Avatar uri={getAvatarUrl(result.avatar_path)} name={result.display_name} size={48} />
              <View style={styles.cardBody}>
                <Text style={styles.name}>{result.display_name}</Text>
                <Text style={styles.username}>@{result.username}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                  <Text style={styles.meta}>{result.city}</Text>
                </View>
                {result.looking_for.length > 0 ? (
                  <Text style={styles.lookingFor}>
                    Busca: {result.looking_for.map((value) => LOOKING_FOR_LABELS[value]).join(', ')}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          ))
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.xl,
  },
  results: {
    gap: spacing.md,
  },
  loading: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.75,
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  username: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  meta: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  lookingFor: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    marginTop: 4,
  },
})
