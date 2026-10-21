import { Ionicons } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TextField } from '@/components/text-field'
import { DEPARTMENTS, type Department } from '@/features/profile/departments'
import { colors, fontSize, radii, spacing } from '@/theme'

type DepartmentPickerProps = {
  value: Department | ''
  onChange: (value: Department) => void
  error?: string
}

export function DepartmentPicker({ value, onChange, error }: DepartmentPickerProps) {
  const insets = useSafeAreaInsets()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return DEPARTMENTS as readonly Department[]
    return DEPARTMENTS.filter((department) => department.toLowerCase().includes(term))
  }, [search])

  const close = () => {
    setOpen(false)
    setSearch('')
  }

  const select = (department: Department) => {
    onChange(department)
    close()
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Ciudad</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ciudad: ${value || 'sin elegir'}. Tocá para elegir un departamento.`}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          error ? styles.triggerError : null,
          pressed ? styles.pressed : null,
        ]}
      >
        <Ionicons name="location-outline" size={20} color={colors.textMuted} />
        <Text style={value ? styles.value : styles.placeholder}>{value || 'Elegí tu departamento'}</Text>
        <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="slide" onRequestClose={close}>
        <View style={styles.backdrop}>
          <Pressable style={styles.backdropFill} onPress={close} accessibilityLabel="Cerrar" />
          <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xl }]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>¿De dónde sos?</Text>
              <Pressable onPress={close} hitSlop={8} accessibilityLabel="Cerrar selector">
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <TextField
              placeholder="Buscar departamento"
              autoCapitalize="none"
              autoCorrect={false}
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              ListEmptyComponent={
                <Text style={styles.empty}>No encontramos ese departamento.</Text>
              }
              renderItem={({ item }) => {
                const selected = item === value
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => select(item)}
                    style={({ pressed }) => [
                      styles.row,
                      selected ? styles.rowSelected : null,
                      pressed ? styles.pressed : null,
                    ]}
                  >
                    <Text style={[styles.rowLabel, selected ? styles.rowLabelSelected : null]}>
                      {item}
                    </Text>
                    {selected ? (
                      <Ionicons name="checkmark" size={20} color={colors.primaryText} />
                    ) : null}
                  </Pressable>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 52,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },
  triggerError: {
    borderColor: colors.danger,
  },
  pressed: {
    opacity: 0.75,
  },
  value: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.md,
  },
  placeholder: {
    flex: 1,
    color: colors.textMuted,
    fontSize: fontSize.md,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.xs,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  backdropFill: {
    flex: 1,
  },
  sheet: {
    maxHeight: '85%',
    gap: spacing.md,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    backgroundColor: colors.surfaceElevated,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    color: colors.heading,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  list: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
  },
  rowSelected: {
    backgroundColor: colors.primaryMuted,
  },
  rowLabel: {
    color: colors.text,
    fontSize: fontSize.md,
  },
  rowLabelSelected: {
    color: colors.primaryText,
    fontWeight: '700',
  },
  empty: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    paddingVertical: spacing.lg,
    textAlign: 'center',
  },
})
