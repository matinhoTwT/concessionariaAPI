import Constants from 'expo-constants'

const ipDoPc = Constants.expoConfig?.hostUri?.split(':')[0]

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || (ipDoPc ? `http://${ipDoPc}:8080` : 'http://localhost:8080')

async function get(caminho) {
  const resposta = await fetch(`${API_URL}${caminho}`)
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar ${caminho}`)
  }
  return resposta.json()
}

export const buscarCarros = (filtros = {}) => {
  const params = new URLSearchParams(
    Object.entries(filtros).filter(([, valor]) => valor)
  ).toString()
  return get(`/carros${params ? `?${params}` : ''}`)
}

export const buscarCarro = (id) => get(`/carros/${id}`)
export const buscarMarcas = () => get('/marcas')
export const buscarProjetos = (tipo) => get(`/projetos${tipo ? `?tipo=${tipo}` : ''}`)
