import { Stack } from 'expo-router'

import { colors } from '@/theme'

// El primer pantallazo de la app sin sesión sigue siendo la bienvenida
// (src/app/index.tsx), que ahora es la que redirige acá.
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="onboarding" />
    </Stack>
  )
}
