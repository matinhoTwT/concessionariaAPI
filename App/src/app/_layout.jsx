import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { cores } from '../theme'

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.titulo,
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Low & Track Garage' }} />
        <Stack.Screen name="carro/[id]" options={{ title: 'Detalhes do carro' }} />
        <Stack.Screen name="projetos" options={{ title: 'Projetos' }} />
      </Stack>
    </>
  )
}
