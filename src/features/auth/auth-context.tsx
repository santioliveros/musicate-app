import type { Session } from '@supabase/supabase-js'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'

type AuthContextValue = {
  session: Session | null
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function fetchProfile(userId: string): Promise<Profile | null> {
  const query = () => supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  let { data, error } = await query()

  // El trigger de alta corre en la misma transacción, pero puede haber una
  // diferencia de milisegundos entre el usuario y el perfil.
  if (!error && !data) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    ;({ data, error } = await query())
  }

  if (error) {
    console.warn('[auth] no se pudo cargar el perfil:', error.message)
    return null
  }

  return (data as Profile | null) ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return

      setSession(data.session)
      if (data.session) {
        const nextProfile = await fetchProfile(data.session.user.id)
        if (active) setProfile(nextProfile)
      }
      if (active) setLoading(false)
    }

    void bootstrap()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return

      setSession(nextSession)
      if (nextSession) {
        void fetchProfile(nextSession.user.id).then((nextProfile) => {
          if (active) setProfile(nextProfile)
        })
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      setProfile(null)
      return
    }

    setProfile(await fetchProfile(data.session.user.id))
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({ session, profile, loading, refreshProfile, signOut }),
    [session, profile, loading, refreshProfile, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
