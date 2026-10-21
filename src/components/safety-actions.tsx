import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Chip } from '@/components/chip'
import { TextField } from '@/components/text-field'
import { blockProfile, submitReport } from '@/features/trust/api'
import { colors, fontSize, radii, spacing } from '@/theme'
import type { ReportReason, ReportTarget } from '@/types/database'

const REASONS: { value: ReportReason; label: string }[] = [
  { value: 'spam', label: 'Spam' },
  { value: 'harassment', label: 'Acoso' },
  { value: 'scam', label: 'Estafa' },
  { value: 'inappropriate', label: 'Contenido inapropiado' },
  { value: 'other', label: 'Otro' },
]

type Target = {
  type: ReportTarget
  id: string
  authorId: string
  authorName: string
}

type SafetyActionsProps = {
  viewerId: string
  target: Target
  onBlocked?: () => void
}

export function SafetyActions({ viewerId, target, onBlocked }: SafetyActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reason, setReason] = useState<ReportReason>('spam')
  const [details, setDetails] = useState('')

  const reportMutation = useMutation({
    mutationFn: () =>
      submitReport(viewerId, {
        targetType: target.type,
        targetId: target.id,
        targetAuthorId: target.authorId,
        reason,
        details,
      }),
    onSuccess: () => {
      setReportOpen(false)
      setDetails('')
      Alert.alert('Gracias', 'Recibimos tu reporte y lo vamos a revisar.')
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos enviar el reporte',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  const blockMutation = useMutation({
    mutationFn: () => blockProfile(viewerId, target.authorId),
    onSuccess: () => {
      setMenuOpen(false)
      onBlocked?.()
      Alert.alert('Usuario bloqueado', 'No vas a ver más su contenido.')
    },
    onError: (cause) => {
      Alert.alert(
        'No pudimos bloquear al usuario',
        cause instanceof Error ? cause.message : 'Probá de nuevo.',
      )
    },
  })

  const confirmBlock = () => {
    Alert.alert(
      'Bloquear usuario',
      `¿Bloquear a ${target.authorName}? No vas a ver su contenido ni podrá interactuar con vos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Bloquear', style: 'destructive', onPress: () => blockMutation.mutate() },
      ],
    )
  }

  return (
    <>
      <Pressable
        onPress={() => setMenuOpen(true)}
        style={({ pressed }) => [styles.trigger, pressed ? styles.pressed : null]}
        accessibilityLabel="Opciones de seguridad"
      >
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
      </Pressable>

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <Text style={styles.sheetTitle}>Seguridad</Text>
            <Action
              icon="flag-outline"
              label="Reportar"
              onPress={() => {
                setMenuOpen(false)
                setReportOpen(true)
              }}
            />
            <Action
              icon="ban-outline"
              label={blockMutation.isPending ? 'Bloqueando…' : 'Bloquear usuario'}
              onPress={confirmBlock}
              disabled={blockMutation.isPending}
            />
            <Button label="Cancelar" variant="ghost" onPress={() => setMenuOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={reportOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setReportOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setReportOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <Text style={styles.sheetTitle}>Reportar</Text>
            <Text style={styles.sheetHint}>Contanos qué pasó con este contenido.</Text>

            <View style={styles.chips}>
              {REASONS.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={reason === option.value}
                  onPress={() => setReason(option.value)}
                />
              ))}
            </View>

            <TextField
              label="Detalles (opcional)"
              placeholder="Contá un poco más…"
              value={details}
              onChangeText={setDetails}
              multiline
              numberOfLines={3}
              maxLength={500}
              style={styles.details}
            />

            <Button
              label="Enviar reporte"
              onPress={() => reportMutation.mutate()}
              loading={reportMutation.isPending}
            />
            <Button label="Cancelar" variant="ghost" onPress={() => setReportOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

function Action({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress: () => void
  disabled?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.action,
        pressed ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.text} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  trigger: {
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
  disabled: {
    opacity: 0.5,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  sheetTitle: {
    color: colors.heading,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  sheetHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  details: {
    minHeight: 90,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  actionLabel: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
})
