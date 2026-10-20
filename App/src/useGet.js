import { useEffect, useState } from 'react'

export function useGet(funcao, dependencias = []) {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const carregar = async () => {
    setCarregando(true)
    setErro(null)
    try {
      setDados(await funcao())
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, dependencias)

  return { dados, carregando, erro, recarregar: carregar }
}
