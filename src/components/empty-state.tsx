import { Ionicons } from '@expo/vector-icons'
import type { ComponentProps } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { colors, fontSize, spacing } from '@/theme'

type EmptyStateProps = {
  icon?: ComponentProps<typeof Ionicons>['name']
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon = 'sparkles-outline',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={26} color={colors.primaryText} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" style={styles.action} />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
})
