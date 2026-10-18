import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

import { colors, radii } from '@/theme'

type AvatarProps = {
  uri?: string | null
  name: string
  size?: number
}

export function Avatar({ uri, name, size = 56 }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.34 }]}>{initials || '?'}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
  },
  initials: {
    color: colors.textMuted,
    fontWeight: '800',
  },
})
