import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { EmptyState } from '@/components/empty-state'
import { ListingCard } from '@/components/listing-card'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'
import { TextField } from '@/components/text-field'
import { useAuth } from '@/features/auth/auth-context'
import { useListings } from '@/features/listings/api'
import { LISTING_TYPE_OPTIONS } from '@/features/listings/labels'
import { useCatalog } from '@/features/profile/catalog'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { ListingType } from '@/types/database'

export default function AvisosScreen() {
  const { profile } = useAuth()
  const catalog = useCatalog()
  const [type, setType] = useState<ListingType | 'all'>('all')
  const [instrumentId, setInstrumentId] = useState<number | null>(null)
  const [genreId, setGenreId] = useState<number | null>(null)
  const [zone, setZone] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const listings = useListings({ type, instrumentId, genreId, zone })
  const activeFilters =
    (type !== 'all' ? 1 : 0) +
    (instrumentId ? 1 : 0) +
    (genreId ? 1 : 0) +
    (zone.trim() ? 1 : 0)

  const clearFilters = () => {
    setType('all')
    setInstrumentId(null)
    setGenreId(null)
    setZone('')
  }

  const instrumentName = (id: number | null) =>
    catalog.data?.instruments.find((instrument) => instrument.id === id)?.name
  const genreName = (id: number | null) =>
    catalog.data?.genres.find((genre) => genre.id === id)?.name

  return (
    <Screen>
      <PageHeader
        title="Avisos"
        subtitle="Encontrá gente para tocar, producir o aprender."
      />

      <Pressable
        onPress={() => setShowFilters((value) => !value)}
        style={({ pressed }) => [styles.filterToggle, pressed ? styles.pressed : null]}
      >
        <Ionicons name="options-outline" size={18} color={colors.primary} />
        <Text style={styles.filterToggleText}>
          Filtros{activeFilters > 0 ? ` (${activeFilters})` : ''}
        </Text>
        <Ionicons
          name={showFilters ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textMuted}
        />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeRow}
        style={styles.typeScroll}
      >
        <Chip label="Todos" selected={type === 'all'} onPress={() => setType('all')} />
        {LISTING_TYPE_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={type === option.value}
            onPress={() => setType(option.value)}
          />
        ))}
      </ScrollView>

      {showFilters ? (
        <View style={styles.filtersPanel}>
          <Text style={styles.filterLabel}>Instrumento</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}
          >
            <Chip
              label="Todos"
              selected={instrumentId === null}
              onPress={() => setInstrumentId(null)}
            />
            {(catalog.data?.instruments ?? []).map((instrument) => (
              <Chip
                key={instrument.id}
                label={instrument.name}
                selected={instrumentId === instrument.id}
                onPress={() => setInstrumentId(instrument.id)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Género</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}
          >
            <Chip label="Todos" selected={genreId === null} onPress={() => setGenreId(null)} />
            {(catalog.data?.genres ?? []).map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                selected={genreId === genre.id}
                onPress={() => setGenreId(genre.id)}
              />
            ))}
          </ScrollView>

          <TextField
            label="Zona"
            placeholder="Centro, Pocitos, Remoto…"
            value={zone}
            onChangeText={setZone}
            autoCapitalize="none"
          />

          {activeFilters > 0 ? (
            <Button label="Limpiar filtros" variant="ghost" onPress={clearFilters} />
          ) : null}
        </View>
      ) : null}

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {listings.data?.length ?? 0} {listings.data?.length === 1 ? 'aviso' : 'avisos'}
        </Text>
        <Text style={styles.listHint}>Más recientes primero</Text>
      </View>

      {listings.isPending ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : listings.isError ? (
        <EmptyState
          icon="cloud-offline-outline"
          title="No pudimos cargar los avisos"
          description="Revisá la conexión y que la migración 0004 esté aplicada en Supabase."
          actionLabel="Reintentar"
          onAction={() => void listings.refetch()}
        />
      ) : listings.data.length === 0 ? (
        <EmptyState
          icon="megaphone-outline"
          title={activeFilters > 0 ? 'No hay avisos con esos filtros' : 'Todavía no hay avisos'}
          description={
            activeFilters > 0
              ? 'Probá con otro instrumento, género o zona.'
              : profile
                ? 'Cuando alguien publique un aviso, va a aparecer acá.'
                : 'Completá tu perfil para empezar a conectar.'
          }
          actionLabel={activeFilters > 0 ? 'Limpiar filtros' : undefined}
          onAction={activeFilters > 0 ? clearFilters : undefined}
        />
      ) : (
        <View style={styles.list}>
          {listings.data.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              instrumentName={instrumentName(listing.instrument_id)}
              genreName={genreName(listing.genre_id)}
            />
          ))}
        </View>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  filterToggleText: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  typeScroll: {
    marginBottom: spacing.lg,
  },
  typeRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  filtersPanel: {
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterLabel: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  listTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '800',
  },
  listHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  loading: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  list: {
    gap: spacing.md,
  },
})
