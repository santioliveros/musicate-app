import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

import { colors } from '@/theme'

type BackButtonProps = {
  onPress: () => void
  accessibilityLabel?: string
}

/** Botón de volver para pantallas apiladas (fuera de las tabs). */
export function BackButton({ onPress, accessibilityLabel = 'Volver' }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <Ionicons name="arrow-back" size={22} color={colors.text} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
})
