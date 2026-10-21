import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'

import { useAuth } from '@/features/auth/auth-context'
import { useSignInDraft } from '@/features/auth/sign-in-draft'

/**
 * Al cerrar sesión, vuelve al inicio (bienvenida) y descarta el wizard a medio
 * completar, para que el próximo usuario no herede datos del anterior.
 *
 * Se apoya en un ref: cuando el usuario cierra sesión, `session` pasa de un
 * valor válido a null. Ese cambio es la señal, no el simple "no hay sesión",
 * así el primer arranque de la app sin login no dispara navegación.
 */
export function useSignOutRedirect() {
  const router = useRouter()
  const { session, loading } = useAuth()
  const { resetDraft } = useSignInDraft()
  const hadSession = useRef(false)

  useEffect(() => {
    if (loading) return

    if (session) {
      hadSession.current = true
      return
    }

    if (hadSession.current) {
      hadSession.current = false
      resetDraft()
      router.replace('/')
    }
  }, [session, loading, resetDraft, router])
}
