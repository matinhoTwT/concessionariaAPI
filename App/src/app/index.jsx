import { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { buscarCarros, buscarMarcas } from '../api'
import { useGet } from '../useGet'
import { categorias, cores } from '../theme'
import CarroCard from '../components/CarroCard'
import Chip from '../components/Chip'
import Estado from '../components/Estado'

const filtrosCategoria = [
  { id: '', nome: 'Todos', cor: cores.amarelo },
  ...Object.entries(categorias).map(([id, c]) => ({ id, ...c, nome: id === 'classico' ? 'Clássicos' : c.nome })),
]

export default function Inicio() {
  const [categoria, setCategoria] = useState('')
  const [marca, setMarca] = useState('')
  const [busca, setBusca] = useState('')

  const carros = useGet(() => buscarCarros({ categoria, marca, busca }), [categoria, marca, busca])
  const marcas = useGet(buscarMarcas)

  const cabecalho = (
    <View>
      <View style={styles.hero}>
        <Text style={styles.tag}>STANCE · TRACK DAY · CLÁSSICOS</Text>
        <Text style={styles.titulo}>
          Baixo na rua.{'\n'}
          <Text style={{ color: cores.amarelo }}>Rápido</Text> na pista.
        </Text>
        <Pressable style={styles.botaoProjetos} onPress={() => router.push('/projetos')}>
          <Text style={styles.botaoProjetosTexto}>Ver projetos stance e clássicos →</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.busca}
        placeholder="Buscar marca ou modelo..."
        placeholderTextColor={cores.texto}
        value={busca}
        onChangeText={setBusca}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {filtrosCategoria.map((f) => (
          <Chip key={f.id} texto={f.nome} cor={f.cor} ativo={categoria === f.id} onPress={() => setCategoria(f.id)} />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip texto="Todas as marcas" ativo={marca === ''} onPress={() => setMarca('')} />
        {marcas.dados?.map((m) => (
          <Chip
            key={m.nome}
            texto={`${m.nome} (${m.total})`}
            ativo={marca === m.nome}
            onPress={() => setMarca(m.nome)}
          />
        ))}
      </ScrollView>

      {carros.dados && <Text style={styles.total}>{carros.dados.length} carro(s) encontrado(s)</Text>}
      <Estado carregando={carros.carregando && !carros.dados} erro={carros.erro} onTentar={carros.recarregar} />
    </View>
  )

  return (
    <FlatList
      data={carros.erro ? [] : carros.dados ?? []}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <CarroCard carro={item} onPress={() => router.push(`/carro/${item.id}`)} />
      )}
      ListHeaderComponent={cabecalho}
      ListEmptyComponent={
        !carros.carregando && !carros.erro ? <Text style={styles.vazio}>Nenhum carro encontrado.</Text> : null
      }
      contentContainerStyle={styles.lista}
      style={{ backgroundColor: cores.fundo }}
    />
  )
}

const styles = StyleSheet.create({
  lista: { padding: 16, paddingBottom: 40 },
  hero: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: cores.amarelo,
    marginBottom: 16,
  },
  tag: { color: cores.amarelo, fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 6 },
  titulo: { color: cores.titulo, fontSize: 32, fontWeight: '900', lineHeight: 36 },
  botaoProjetos: { marginTop: 16, alignSelf: 'flex-start' },
  botaoProjetosTexto: { color: cores.amarelo, fontWeight: '700' },
  busca: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    color: cores.titulo,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  chips: { gap: 8, paddingVertical: 10 },
  total: { color: cores.texto, marginVertical: 8 },
  vazio: { color: cores.texto, textAlign: 'center', padding: 32 },
})
