import { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { buscarProjetos } from '../api'
import { useGet } from '../useGet'
import { cores } from '../theme'
import Chip from '../components/Chip'
import Estado from '../components/Estado'

const abas = [
  { id: 'stance', nome: 'Stance', cor: cores.stance },
  { id: 'classico', nome: 'Clássicos', cor: cores.classico },
]

export default function Projetos() {
  const [tipo, setTipo] = useState('stance')
  const { dados, carregando, erro, recarregar } = useGet(() => buscarProjetos(tipo), [tipo])
  const cor = abas.find((a) => a.id === tipo).cor

  return (
    <FlatList
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={styles.lista}
      data={erro ? [] : dados ?? []}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Projetos da garagem</Text>
          <Text style={styles.sub}>Inspirações de stance e restaurações de clássicos.</Text>
          <View style={styles.abas}>
            {abas.map((a) => (
              <Chip key={a.id} texto={a.nome} cor={a.cor} ativo={tipo === a.id} onPress={() => setTipo(a.id)} />
            ))}
          </View>
          <Estado carregando={carregando} erro={erro} onTentar={recarregar} />
        </View>
      }
      renderItem={({ item }) =>
        carregando ? null : (
          <View style={styles.card}>
            <Image source={{ uri: item.foto }} style={styles.foto} contentFit="cover" transition={200} />
            <View style={styles.corpo}>
              <Text style={[styles.estilo, { color: cor }]}>{item.estilo.toUpperCase()}</Text>
              <Text style={styles.nome}>{item.nome}</Text>
              <View style={styles.specs}>
                {item.specs.map((s) => (
                  <View key={s.label} style={styles.spec}>
                    <Text style={styles.specLabel}>{s.label.toUpperCase()}</Text>
                    <Text style={styles.specValor}>{s.valor}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.mods}>{item.modificacoes.join(' · ')}</Text>
            </View>
          </View>
        )
      }
    />
  )
}

const styles = StyleSheet.create({
  lista: { padding: 16, paddingBottom: 40 },
  titulo: { color: cores.titulo, fontSize: 28, fontWeight: '900' },
  sub: { color: cores.texto, marginTop: 4 },
  abas: { flexDirection: 'row', gap: 8, marginVertical: 14 },
  card: { backgroundColor: cores.card, borderRadius: 10, overflow: 'hidden', marginBottom: 14, borderWidth: 1, borderColor: cores.borda },
  foto: { width: '100%', aspectRatio: 4 / 3, backgroundColor: cores.card2 },
  corpo: { padding: 14, gap: 6 },
  estilo: { fontWeight: '800', fontSize: 11, letterSpacing: 1.5 },
  nome: { color: cores.titulo, fontSize: 20, fontWeight: '800' },
  specs: { flexDirection: 'row', gap: 8 },
  spec: { flex: 1, backgroundColor: cores.card2, borderRadius: 6, padding: 8 },
  specLabel: { color: cores.texto, fontSize: 10, letterSpacing: 1 },
  specValor: { color: cores.titulo, fontWeight: '700' },
  descricao: { color: cores.texto, lineHeight: 20 },
  mods: { color: cores.titulo, fontSize: 12, opacity: 0.8 },
})
