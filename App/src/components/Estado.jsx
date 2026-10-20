import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { API_URL } from '../api'
import { cores } from '../theme'

export default function Estado({ carregando, erro, onTentar }) {
  if (carregando) {
    return (
      <View style={styles.caixa}>
        <ActivityIndicator size="large" color={cores.amarelo} />
        <Text style={styles.texto}>Carregando...</Text>
      </View>
    )
  }

  if (erro) {
    return (
      <View style={styles.caixa}>
        <Text style={styles.titulo}>Não foi possível falar com a API</Text>
        <Text style={styles.texto}>{erro}</Text>
        <Text style={styles.texto}>Endereço usado: {API_URL}</Text>
        <Pressable style={styles.botao} onPress={onTentar}>
          <Text style={styles.botaoTexto}>Tentar de novo</Text>
        </Pressable>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  caixa: { padding: 32, alignItems: 'center', gap: 10 },
  titulo: { color: cores.titulo, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  texto: { color: cores.texto, textAlign: 'center' },
  botao: { backgroundColor: cores.amarelo, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6, marginTop: 8 },
  botaoTexto: { color: '#111', fontWeight: '800' },
})
