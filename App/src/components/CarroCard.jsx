import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { categorias, cores, formatarPreco } from '../theme'

export default function CarroCard({ carro, onPress }) {
  const cat = categorias[carro.categoria]

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]} onPress={onPress}>
      <Image source={{ uri: carro.foto }} style={styles.foto} contentFit="cover" transition={200} />
      <View style={[styles.badge, { backgroundColor: cat.cor }]}>
        <Text style={styles.badgeTexto}>{cat.nome}</Text>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.marca}>{carro.marca} · {carro.ano}</Text>
        <Text style={styles.modelo}>{carro.modelo}</Text>
        <View style={styles.rodape}>
          <Text style={styles.preco}>{formatarPreco(carro.preco)}</Text>
          <Text style={styles.potencia}>{carro.potencia}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
    marginBottom: 14,
  },
  foto: { width: '100%', aspectRatio: 16 / 10, backgroundColor: cores.card2 },
  badge: { position: 'absolute', top: 10, left: 10, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  badgeTexto: { color: '#111', fontWeight: '800', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  corpo: { padding: 14, gap: 2 },
  marca: { color: cores.texto, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  modelo: { color: cores.titulo, fontSize: 22, fontWeight: '800' },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  preco: { color: cores.amarelo, fontSize: 18, fontWeight: '800' },
  potencia: { color: cores.texto, fontWeight: '600' },
})
