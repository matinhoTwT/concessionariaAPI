export const cores = {
  fundo: '#0c0d10',
  card: '#14161b',
  card2: '#1c1f26',
  borda: '#2a2e37',
  texto: '#a3a8b4',
  titulo: '#f4f4f5',
  amarelo: '#ffcc00',
  stance: '#b388ff',
  track: '#ff4d2e',
  classico: '#e9c46a',
}

export const categorias = {
  stance: { nome: 'Stance', cor: cores.stance },
  track: { nome: 'Track Day', cor: cores.track },
  classico: { nome: 'Clássico', cor: cores.classico },
}

export const formatarPreco = (valor) =>
  'R$ ' + valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
