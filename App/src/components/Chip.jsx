import { Pressable, StyleSheet, Text } from 'react-native'
import { cores } from '../theme'

export default function Chip({ texto, ativo, cor = cores.amarelo, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, ativo && { backgroundColor: cor, borderColor: cor }]}
    >
      <Text style={[styles.texto, ativo && styles.textoAtivo]}>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.card,
  },
  texto: { color: cores.texto, fontWeight: '600', fontSize: 13 },
  textoAtivo: { color: '#111' },
})
