import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, spacing } from '@/theme'

type LoadingViewProps = {
  label?: string
}

export function LoadingView({ label = 'Cargando…' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primaryText} size="large" />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
})
