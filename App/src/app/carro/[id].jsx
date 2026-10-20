import { Image } from 'expo-image'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { buscarCarro } from '../../api'
import { useGet } from '../../useGet'
import { categorias, cores, formatarPreco } from '../../theme'
import Estado from '../../components/Estado'

export default function DetalheCarro() {
  const { id } = useLocalSearchParams()
  const { dados: carro, carregando, erro, recarregar } = useGet(() => buscarCarro(id), [id])
  const [interesse, setInteresse] = useState(false)

  if (!carro) return <Estado carregando={carregando} erro={erro} onTentar={recarregar} />

  const cat = categorias[carro.categoria]

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: 40 }}>
      <Stack.Screen options={{ title: carro.modelo }} />

      <Image source={{ uri: carro.foto }} style={styles.foto} contentFit="cover" transition={200} />

      <View style={styles.corpo}>
        <View style={[styles.badge, { backgroundColor: cat.cor }]}>
          <Text style={styles.badgeTexto}>{cat.nome}</Text>
        </View>
        <Text style={styles.marca}>{carro.marca} · {carro.ano}</Text>
        <Text style={styles.modelo}>{carro.modelo}</Text>
        <Text style={styles.preco}>{formatarPreco(carro.preco)}</Text>

        <View style={styles.specs}>
          <View style={styles.spec}>
            <Text style={styles.specLabel}>MOTOR</Text>
            <Text style={styles.specValor}>{carro.motor}</Text>
          </View>
          <View style={styles.spec}>
            <Text style={styles.specLabel}>POTÊNCIA</Text>
            <Text style={styles.specValor}>{carro.potencia}</Text>
          </View>
        </View>

        <Text style={styles.subtitulo}>O que tem no projeto</Text>
        {carro.itens.map((item) => (
          <View key={item} style={styles.item}>
            <View style={[styles.ponto, { backgroundColor: cat.cor }]} />
            <Text style={styles.itemTexto}>{item}</Text>
          </View>
        ))}

        <Pressable style={styles.botao} onPress={() => setInteresse(true)}>
          <Text style={styles.botaoTexto}>{interesse ? '✓ Interesse registrado!' : 'Tenho interesse'}</Text>
        </Pressable>
        {interesse && (
          <Text style={styles.aviso}>A equipe da garagem entraria em contato (app de estudo, nada é enviado).</Text>
        )}

        <Pressable onPress={() => Linking.openURL(carro.credito.link)}>
          <Text style={styles.credito}>
            📷 Foto: {carro.credito.autor} · {carro.credito.licenca} (Wikimedia Commons)
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  foto: { width: '100%', aspectRatio: 4 / 3, backgroundColor: cores.card2 },
  corpo: { padding: 18, gap: 6 },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, marginBottom: 4 },
  badgeTexto: { color: '#111', fontWeight: '800', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  marca: { color: cores.texto, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 },
  modelo: { color: cores.titulo, fontSize: 30, fontWeight: '900' },
  preco: { color: cores.amarelo, fontSize: 24, fontWeight: '800' },
  specs: { flexDirection: 'row', gap: 10, marginVertical: 12 },
  spec: { flex: 1, backgroundColor: cores.card, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: cores.borda },
  specLabel: { color: cores.texto, fontSize: 11, letterSpacing: 1 },
  specValor: { color: cores.titulo, fontWeight: '700', fontSize: 15, marginTop: 2 },
  subtitulo: { color: cores.titulo, fontWeight: '800', fontSize: 17, marginTop: 6, marginBottom: 4 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  ponto: { width: 8, height: 8, borderRadius: 4 },
  itemTexto: { color: cores.texto, fontSize: 15 },
  botao: { backgroundColor: cores.amarelo, borderRadius: 8, paddingVertical: 15, alignItems: 'center', marginTop: 18 },
  botaoTexto: { color: '#111', fontWeight: '900', fontSize: 15, textTransform: 'uppercase', letterSpacing: 1 },
  aviso: { color: cores.texto, fontSize: 13, textAlign: 'center' },
  credito: { color: cores.texto, fontSize: 11, marginTop: 16, opacity: 0.8 },
})
