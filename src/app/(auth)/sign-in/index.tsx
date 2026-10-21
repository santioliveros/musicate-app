import { Redirect } from 'expo-router'

// El sign-in pasó a ser un wizard de 3 pasos: /(auth)/sign-in/identidad.
export default function SignInIndex() {
  return <Redirect href="/(auth)/sign-in/identidad" />
}
