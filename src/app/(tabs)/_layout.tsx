import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { LoadingView } from '@/components/loading-view'
import { useAuth } from '@/features/auth/auth-context'
import { colors, fontSize, spacing } from '@/theme'

// Alto del contenido de la barra (ícono + label) sin contar el inset del
// dispositivo. La altura por defecto de las tabs (49) no deja aire para el
// label, y al pasar un `height` propio la librería NO le suma el inset, así
// que lo sumamos nosotros. 78 = ícono (24) + separación (4) + label (18) +
// padding arriba/abajo (8 + 12) + aire.
const TAB_BAR_CONTENT_HEIGHT = 78

export default function TabsLayout() {
  const { loading, session } = useAuth()
  const insets = useSafeAreaInsets()

  if (loading) return <LoadingView />
  if (!session) return <Redirect href="/(auth)/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryText,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: TAB_BAR_CONTENT_HEIGHT + insets.bottom,
          // Sube el contenido para que el label no quede pegado al borde.
          paddingTop: spacing.sm,
          paddingBottom: insets.bottom + spacing.md,
        },
        // Sin esto el label aparece pegado al ícono en pantallas de poca altura.
        tabBarIconStyle: {
          marginBottom: spacing.xs,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '600',
          marginBottom: 0,
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
