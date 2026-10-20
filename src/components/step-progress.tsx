import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, radii, spacing } from '@/theme'

type StepProgressProps = {
  total: number
  current: number
}

export function StepProgress({ total, current }: StepProgressProps) {
  const filled = Math.min(Math.max(current, 0), total)

  return (
    <View
      style={styles.wrapper}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total, now: filled }}
    >
      <Text style={styles.label}>
        Paso {filled} de {total}
      </Text>
      <View style={styles.track}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={[styles.segment, index < filled ? styles.segmentActive : null]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.primaryText,
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  track: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
})
