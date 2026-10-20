import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui'

import { AuthProvider } from '@/features/auth/auth-context'
import { SignInDraftProvider } from '@/features/auth/sign-in-draft'
import { queryClient } from '@/lib/query-client'
import { colors } from '@/theme'

export default function RootLayout() {
  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background)
  }, [])

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Guarda lo cargado en los 3 pasos del sign-in hasta validar el OTP. */}
          <SignInDraftProvider>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}
            />
          </SignInDraftProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
