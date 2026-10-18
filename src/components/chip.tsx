import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, radii, spacing } from '@/theme'

type ChipProps = {
  label: string
  selected?: boolean
  disabled?: boolean
  readOnly?: boolean
  onPress?: () => void
}

export function Chip({ label, selected = false, disabled = false, readOnly = false, onPress }: ChipProps) {
  if (readOnly) {
    return (
      <View style={[styles.base, selected ? styles.selected : null]}>
        <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{label}</Text>
      </View>
    )
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : null,
        pressed && !disabled ? styles.pressed : null,
        disabled && !selected ? styles.disabled : null,
      ]}
    >
      <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
})
