import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Department } from '@/features/profile/departments'

// "Qué buscás en la app". Por ahora vive solo en el cliente: la base todavía
// no tiene columna para esto (profiles.looking_for es otra cosa).
export const SEEKING_OPTIONS = [
  'Socializar',
  'Entretenimiento',
  'Clases',
  'Shows en vivo',
  'Otro',
] as const

export type SeekingOption = (typeof SEEKING_OPTIONS)[number]

// Los géneros son texto libre hasta que tengamos catálogo, pero para no
// romper el esquema de Supabase (array de text) el wizard los normaliza igual.
export type SignInDraft = {
  // Paso 1 · Identidad
  username: string
  displayName: string
  bio: string
  city: Department | ''
  // Paso 2 · Tus gustos (solo UI)
  genres: string
  favoriteArtists: string
  favoriteSongs: string
  // Paso 3 · Qué buscás (solo UI)
  seeking: SeekingOption[]
  // Paso 3 · Email para el código
  email: string
}

export const EMPTY_DRAFT: SignInDraft = {
  username: '',
  displayName: '',
  bio: '',
  city: '',
  genres: '',
  favoriteArtists: '',
  favoriteSongs: '',
  seeking: [],
  email: '',
}

type SignInDraftContextValue = {
  draft: SignInDraft
  updateDraft: (patch: Partial<SignInDraft>) => void
  resetDraft: () => void
}

const SignInDraftContext = createContext<SignInDraftContextValue | null>(null)

/**
 * Guarda lo que se completa en los 3 pasos del sign-in mientras se navega
 * entre pantallas (el OTP llega recién al final y es ahí cuando hay sesión).
 * Es a propósito en memoria: si la app se reinicia, el wizard arranca de cero.
 */
export function SignInDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<SignInDraft>(EMPTY_DRAFT)

  const value = useMemo<SignInDraftContextValue>(
    () => ({
      draft,
      updateDraft: (patch) => setDraft((current) => ({ ...current, ...patch })),
      resetDraft: () => setDraft(EMPTY_DRAFT),
    }),
    [draft],
  )

  return <SignInDraftContext.Provider value={value}>{children}</SignInDraftContext.Provider>
}

export function useSignInDraft() {
  const context = useContext(SignInDraftContext)
  if (!context) {
    throw new Error('useSignInDraft debe usarse dentro de SignInDraftProvider')
  }
  return context
}
