# 🚗 Low & Track Garage — API

API REST de uma concessionária **fictícia** de carros personalizados: **stance**, **track day** e **clássicos**.
Ela fornece os dados para o app mobile [App](../App) (Expo).

Feita com **Java 21 + Spring Boot 4**, usando **Spring Data JPA** com banco **H2 em memória**.
Os dados são carregados automaticamente pelo `data.sql` toda vez que a API sobe, então não precisa instalar banco nenhum.

## Tecnologias

- Java 21
- Spring Boot 4.1 (Spring Web MVC + Spring Data JPA)
- H2 Database (em memória)
- Springdoc OpenAPI (Swagger)
- Maven

## Como rodar

### No IntelliJ IDEA

1. **File > Open** e selecione a pasta `API` (abra como projeto Maven).
2. Espere o IntelliJ carregar as dependências do Maven.
3. Rode a classe `ConcessionariaApiApplication` (botão ▶ ao lado do `main`).

A API sobe em **http://localhost:8080**.
Documentação Swagger: **http://localhost:8080/swagger-ui.html**

Para o app no celular acessar, o PC e o celular precisam estar **na mesma rede Wi-Fi**.
Se o celular não conectar, libere a porta **8080** no Firewall do Windows.

## Endpoints

Todos são **GET** e respondem em JSON.

| Endpoint | O que faz |
|---|---|
| `GET /` | Informações da API e lista de endpoints |
| `GET /carros` | Lista os carros do estoque (versão resumida) |
| `GET /carros/{id}` | Detalhes completos de um carro |
| `GET /marcas` | Marcas disponíveis e quantos carros cada uma tem |
| `GET /projetos` | Projetos stance e clássicos da garagem |
| `GET /projetos/{id}` | Um projeto |

### Filtros de `GET /carros`

| Parâmetro | Exemplo | Descrição |
|---|---|---|
| `categoria` | `stance`, `track`, `classico` | Filtra pela categoria |
| `marca` | `Volkswagen` | Filtra pela marca |
| `busca` | `golf` | Busca no nome da marca/modelo |
| `destaque` | `true` | Só os carros em destaque |

Exemplo: `GET /carros?categoria=stance&marca=Volkswagen`

```json
[
  {
    "id": 1,
    "categoria": "stance",
    "marca": "Volkswagen",
    "modelo": "Gol G6",
    "ano": 2013,
    "potencia": "104 cv",
    "preco": 59900,
    "foto": "https://commons.wikimedia.org/wiki/Special:FilePath/...",
    "destaque": true
  }
]
```

### `GET /carros/{id}`

Os campos da lista + `motor`, `itens` (modificações) e `credito` (autor e licença da foto).
Se o id não existir, responde **404**: `{ "erro": "Carro não encontrado" }`.

### `GET /projetos?tipo=stance` ou `?tipo=classico`

```json
[
  {
    "id": 1,
    "tipo": "stance",
    "nome": "Gol G6 \"Daily Baixo\"",
    "estilo": "Rosca fixa",
    "descricao": "O queridinho do Brasil...",
    "specs": [{ "label": "Altura", "valor": "−7 cm" }, { "label": "Rodas", "valor": "17\" × 8\"" }],
    "modificacoes": ["Suspensão de rosca", "Rodas aro 17\""],
    "foto": "https://commons.wikimedia.org/...",
    "credito": { "autor": "NaBUru38", "licenca": "CC BY-SA 4.0", "link": "https://..." }
  }
]
```

## Estrutura

```
src/main/java/com/concessionaria/api/
  ConcessionariaApiApplication.java   classe principal
  model/
    Carro.java                        entidade JPA (tabela carros)
    Projeto.java                      entidade JPA (tabela projetos)
  repository/
    CarroRepository.java              JpaRepository de Carro
    ProjetoRepository.java            JpaRepository de Projeto (findByTipo)
  dto/                                records devolvidos em JSON
  controller/
    HomeController.java               GET /
    CarroController.java              GET /carros e GET /carros/{id}
    MarcaController.java              GET /marcas
    ProjetoController.java            GET /projetos e GET /projetos/{id}
  config/
    CorsConfig.java                   libera o acesso do app
src/main/resources/
  application.properties              porta, banco H2 e Swagger
  data.sql                            59 carros e 28 projetos
```

## Dados e fotos

- **59 carros** de 11 marcas: Volkswagen, Chevrolet, Fiat, Ford, Honda, Hyundai, Nissan, BMW, Mercedes-Benz, Audi e Puma.
- As fotos são reais, do [Wikimedia Commons](https://commons.wikimedia.org/), com licenças livres. O autor e a licença de cada uma vêm no campo `credito`.
- Os preços e as especificações são **ilustrativos**. Empresa fictícia, projeto acadêmico.
