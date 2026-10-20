# 📱 Low & Track Garage — App

Aplicativo mobile feito com **Expo (React Native)** para a concessionária fictícia **Low & Track Garage**:
carros **stance**, **track day** e **clássicos**.

O app consome a API [API](../API) (Java + Spring Boot).

🎨 **Protótipo no Figma:** https://www.figma.com/design/M5a2AAPrg2DtZAyV95JJiG/Low---Track-Garage---App

No Figma, aperte ▶ (Apresentar) para navegar pelo protótipo: clicar no carro abre os detalhes,
"Ver projetos" abre a tela de projetos e a seta ← volta para o estoque.

## Telas

| Tela | Arquivo | Endpoint consumido |
|---|---|---|
| **Estoque** — lista de carros com busca e filtros por categoria e marca | `src/app/index.jsx` | `GET /carros` e `GET /marcas` |
| **Detalhes do carro** — foto, preço, motor, potência e modificações | `src/app/carro/[id].jsx` | `GET /carros/:id` |
| **Projetos** — projetos stance e clássicos | `src/app/projetos.jsx` | `GET /projetos?tipo=` |

## Tecnologias

- Expo SDK 58 + React Native
- Expo Router (navegação por arquivos)
- expo-image (fotos)
- `fetch` para consumir a API

## Como rodar

1. **Suba a API primeiro**: abra a pasta `API` no IntelliJ e rode a classe
   `ConcessionariaApiApplication` (ela sobe em `http://localhost:8080`).
2. **Rode o app** (neste projeto):
   ```bash
   npm install
   npx expo start
   ```
3. No celular, instale o **Expo Go** e leia o QR Code que aparece no terminal.
   O celular precisa estar **na mesma rede Wi-Fi** do PC.

> No PowerShell, se aparecer "execução de scripts foi desabilitada", use `npm.cmd install` e `npx.cmd expo start`.
> Para abrir no navegador do PC, aperte `w` no terminal do Expo.

### Endereço da API

O app descobre sozinho o IP do PC que está rodando o Expo e usa `http://IP-DO-PC:8080` (veja `src/api.js`).
Se precisar trocar, crie um arquivo `.env` na raiz do app:

```
EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
```

Se o app mostrar "Não foi possível falar com a API":
- confira se a API está rodando;
- confira se o celular está no mesmo Wi-Fi;
- libere a porta 8080 no Firewall do Windows.

## Estrutura

```
src/
  app/
    _layout.jsx        navegação em pilha (Stack)
    index.jsx          tela de Estoque
    carro/[id].jsx     tela de Detalhes do carro
    projetos.jsx       tela de Projetos
  components/
    CarroCard.jsx      card de carro da lista
    Chip.jsx           botão de filtro
    Estado.jsx         carregando / erro
  api.js               funções que chamam os endpoints GET
  useGet.js            hook de carregamento (dados, carregando, erro)
  theme.js             cores e formatação de preço
```

## Créditos

Fotos reais do [Wikimedia Commons](https://commons.wikimedia.org/) com licenças livres (o crédito aparece na tela de detalhes).
Preços e especificações são ilustrativos. Projeto acadêmico.
