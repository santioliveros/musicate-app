import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'

import { LoadingView } from '@/components/loading-view'
import { useAuth } from '@/features/auth/auth-context'
import { colors, fontSize } from '@/theme'

export default function TabsLayout() {
  const { loading, session, profile } = useAuth()

  if (loading) return <LoadingView />
  if (!session) return <Redirect href="/(auth)/sign-in" />
  if (!profile?.onboarded_at) return <Redirect href="/(auth)/onboarding" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  )
}

