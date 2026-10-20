# 🚗 Low & Track Garage

Projeto acadêmico de uma concessionária **fictícia** de carros personalizados: **stance**, **track day** e **clássicos**.

O repositório tem duas partes:

| Pasta | O que é | Tecnologia | Abrir com |
|---|---|---|---|
| [`API/`](API) | API REST com os carros e projetos | Java 21 + Spring Boot 4 + JPA + H2 | IntelliJ IDEA |
| [`App/`](App) | Aplicativo mobile que consome a API | Expo (React Native) | VS Code |

🎨 **Protótipo no Figma:** https://www.figma.com/design/M5a2AAPrg2DtZAyV95JJiG/Low---Track-Garage---App

## Requisitos atendidos

- Protótipo do app no Figma (3 telas com navegação)
- API com GETs: `/carros`, `/carros/{id}`, `/marcas`, `/projetos`, `/projetos/{id}`
- App consumindo os GETs da API
- App com 3 telas: Estoque, Detalhes do carro e Projetos
- README em cada projeto ([API](API/README.md) e [App](App/README.md))

## Como rodar

1. **API:** abra a pasta `API` no IntelliJ e rode a classe `ConcessionariaApiApplication` (sobe em http://localhost:8080).
2. **App:** abra a pasta `App` no VS Code e, no terminal:
   ```
   npm install
   npx expo start
   ```
   Leia o QR Code com o **Expo Go** (celular no mesmo Wi-Fi do PC) ou aperte `w` para abrir no navegador.
