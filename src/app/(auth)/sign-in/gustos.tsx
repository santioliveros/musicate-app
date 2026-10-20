import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Screen } from '@/components/screen'
import { StepProgress } from '@/components/step-progress'
import { TextField } from '@/components/text-field'
import { useSignInDraft } from '@/features/auth/sign-in-draft'
import { colors, fontSize, radii, spacing } from '@/theme'

export default function SignInTastesScreen() {
  const router = useRouter()
  const { draft, updateDraft } = useSignInDraft()

  // Sin validación: por ahora son cajas de texto libres y el perfil no las
  // guarda todavía (ver sign-in-draft.tsx).
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <View style={styles.header}>
          <StepProgress total={3} current={2} />
          <Text style={styles.title}>Tus gustos</Text>
          <Text style={styles.subtitle}>Lo que te mueve. Nos sirve para mostrarte gente afin.</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Géneros"
            placeholder="Rock, cumbia, jazz…"
            autoCapitalize="none"
            value={draft.genres}
            onChangeText={(value) => updateDraft({ genres: value })}
            hint="Separalos con comas si son varios."
          />

          <TextField
            label="Artistas / bandas favoritos"
            placeholder="Tus referentes de siempre"
            autoCapitalize="none"
            value={draft.favoriteArtists}
            onChangeText={(value) => updateDraft({ favoriteArtists: value })}
          />

          <View style={styles.songs}>
            <View style={styles.songsHeader}>
              <Ionicons name="musical-notes-outline" size={18} color={colors.primaryText} />
              <Text style={styles.songsTitle}>3 canciones favoritas</Text>
            </View>
            <SongsEditor
              value={draft.favoriteSongs}
              onChange={(value) => updateDraft({ favoriteSongs: value })}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button label="Siguiente" onPress={() => router.push('/(auth)/sign-in/buscas')} />
          <Button label="Atrás" variant="ghost" onPress={() => router.back()} />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  )
}

export const SONG_SEPARATOR = ' · '

/**
 * Una caja por canción. Se guarda como una sola línea separada por `SONG_SEPARATOR`
 * para que sea trivial cambiar a columnas cuando haya catálogo.
 */
function SongsEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const current = value.split(SONG_SEPARATOR)

  const update = (index: number, next: string) => {
    const songs = [0, 1, 2].map((slot) => (slot === index ? next : (current[slot] ?? '')))
    onChange(songs.join(SONG_SEPARATOR))
  }

  return (
    <View style={styles.songFields}>
      {[0, 1, 2].map((index) => (
        <TextField
          key={index}
          placeholder={`Canción ${index + 1}`}
          value={current[index] ?? ''}
          onChangeText={(next) => update(index, next.replace(/\s*·\s*/g, ' '))}
          maxLength={120}
        />
      ))}
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
  songs: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  songsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  songsTitle: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  songFields: {
    gap: spacing.sm,
  },
  footer: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
})
