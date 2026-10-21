import { Stack } from 'expo-router'

import { colors } from '@/theme'

export default function SignInLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  )
}
