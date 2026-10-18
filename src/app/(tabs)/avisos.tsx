import { useRouter } from 'expo-router'

import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Screen } from '@/components/screen'

export default function AvisosScreen() {
  const router = useRouter()

  return (
    <Screen>
      <PageHeader
        title="Avisos"
        subtitle="Buscá integrantes, bandas, productores y clases."
      />
      <EmptyState
        icon="megaphone-outline"
        title="Todavía no hay avisos"
        description="El módulo de avisos es el próximo paso del roadmap. Mientras tanto, completá tu perfil para que te encuentren."
        actionLabel="Ir a mi perfil"
        onAction={() => router.push('/(tabs)/perfil')}
      />
    </Screen>
  )
}
