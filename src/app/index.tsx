import { Redirect } from 'expo-router'

import { LoadingView } from '@/components/loading-view'
import { useAuth } from '@/features/auth/auth-context'

export default function Index() {
  const { loading, session, profile } = useAuth()

  if (loading) return <LoadingView label="Abriendo musikate…" />
  if (!session) return <Redirect href="/(auth)/sign-in" />
  if (!profile?.onboarded_at) return <Redirect href="/(auth)/onboarding" />

  return <Redirect href="/(tabs)" />
}
