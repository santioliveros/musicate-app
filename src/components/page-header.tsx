import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, spacing } from '@/theme'

type PageHeaderProps = {
  title: string
  subtitle?: string
  right?: ReactNode
}

export function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.heading,
    fontSize: fontSize.xxl,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.heading,
    fontSize: fontSize.sm,
    lineHeight: 20,
    opacity: 0.75,
  },
})
