import { QueryClientProvider } from '@tanstack/react-query'
// Stack se importa del subpath público 'expo-router/stack' y no de 'expo-router'
// a propósito: expo-router también exporta un SplashScreen (otro módulo), y con
// los dos imports juntos Babel colapsa ambos en el mismo namespace, dejando
// SplashScreen sin setOptions.
import { Stack } from 'expo-router/stack'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui'

import { AuthProvider, useAuth } from '@/features/auth/auth-context'
import { SignInDraftProvider } from '@/features/auth/sign-in-draft'
import { registerPushToken } from '@/features/trust/push'
import { queryClient } from '@/lib/query-client'
import { colors } from '@/theme'

// Mantiene el splash nativo (app.json → expo-splash-screen, el wordmark) visible
// hasta que la primera pantalla de React ya dibujó. Así el paso del splash
// nativo a la bienvenida no muestra ningún frame negro.
// Va en el scope global y sin await, como pide la doc de Expo.
void SplashScreen.preventAutoHideAsync().catch(() => {
  // En entornos sin el módulo nativo (p. ej. web) no hay splash que retener.
})

SplashScreen.setOptions({ duration: 250, fade: true })

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
            <PushRegistrar />
            <SplashGate />
          </SignInDraftProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

/**
 * Registra el token de push del dispositivo una vez que hay sesión. En web y
 * en Expo Go no hace nada: el push real requiere un development build.
 */
function PushRegistrar() {
  const { profile } = useAuth()

  useEffect(() => {
    if (!profile?.id) return
    void registerPushToken(profile.id).catch((cause) => {
      console.warn('[push] no se pudo registrar el token:', cause)
    })
  }, [profile?.id])

  return null
}

/**
 * Esconde el splash nativo solo cuando el árbol ya se montó. Al ir como hermano
 * del Stack, corre después de que las pantallas quedaron en pantalla.
 */
function SplashGate() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return null
}
