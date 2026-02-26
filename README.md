# 🎵 Musify

<p align="center">
  <img src="https://img.shields.io/badge/Status-Academic%20Project-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Architecture-ES%20Modules-2C8EBB?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-iTunes%20%7C%20Wikipedia%20%7C%20Last.fm-8E75B2?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Storage-localStorage-success?style=for-the-badge" />
</p>

## Sumário / Summary

- [English](#english)
- [Português](#portuguese)

<a name="english"></a>

## English

Musify is a lightweight web-based music collection manager built with **HTML, CSS and Vanilla JavaScript (ES Modules)**.

The application allows users to manage a personal music collection, create playlists, search external APIs, and visualize statistics — all running as a static web app.

---

## 🚀 Features

- 🎧 Local music collection management (CRUD)
- ⭐ Favorites & playlists persisted in `localStorage`
- 🔎 Search with autocomplete via iTunes API
- 🖼 Artist image fetching (Wikipedia + Last.fm integration)
- 📊 Simple statistics visualization using Chart.js
- ▶️ Preview player for iTunes track samples
- 🧩 Modular architecture using ES modules

---

## 🏗 Architecture

The project was refactored and organized using a modular structure:

```

index.html
style.css
ui.js        → UI rendering & DOM interaction
api.js       → External API integration
lib.js       → Data utilities & persistence
imagens/     → Static assets

```

- Separation of concerns between UI, API, and utilities
- ES module-based structure
- Organized CSS (layout, components, responsive)
- Local persistence using browser storage

---

## 👨‍💻 My Contribution

This was a collaborative academic project.  
I was primarily responsible for:

- UI structure and rendering logic (`ui.js`)
- External API integration (`api.js`)
- Project organization and modularization
- Fixing duplicated utility logic
- Improving separation of responsibilities

Other team members contributed with filtering logic, CSS styling, and favorites handling.

---

## 🖥 Running Locally

Because this project uses ES Modules, it must be served via a local server.

### Option 1 — Python

```bash
python -m http.server 8000
```

Open:

```
http://localhost:8000

```

### Option 2 — Node

```bash
npm install -g http-server
http-server -c-1 . -p 8000
```

---

## 🔗 External Dependencies

* Chart.js (CDN)
* iTunes Search API
* Wikipedia API
* Last.fm API

Note: Some API calls may fail due to rate limits or CORS restrictions.

---

## ⚖️ Legal / Rights

Audio previews provided by the iTunes Search API. All music rights belong to their respective owners.



## 📌 Technical Highlights

* Vanilla JavaScript (no frameworks)
* ES6 Modules
* API orchestration and async handling
* Client-side state persistence
* Basic data visualization
* Clean project structure

---

## 📄 License

No license specified.

---

<a name="portuguese"></a>

## Português

Musify é um gerenciador de coleção de música leve baseado na web construído com **HTML, CSS e JavaScript Vanilla (Módulos ES)**.

A aplicação permite que usuários gerenciem uma coleção pessoal de música, criem playlists, busquem APIs externas e visualizem estatísticas — tudo rodando como um aplicativo estático web.

---

## 🚀 Funcionalidades

- 🎧 Gerenciamento local da coleção de música (CRUD)
- ⭐ Favoritos e playlists persistidos em `localStorage`
- 🔎 Busca com autocomplete via API do iTunes
- 🖼 Busca de imagem de artista (integração Wikipedia + Last.fm)
- 📊 Visualização simples de estatísticas usando Chart.js
- ▶️ Player de pré-visualização para samples de faixas do iTunes
- 🧩 Arquitetura modular usando Módulos ES

---

## 🏗 Arquitetura

O projeto foi refatorado e organizado usando uma estrutura modular:

```

index.html
style.css
ui.js        → Renderização da UI & interação com o DOM
api.js       → Integração com APIs externas
lib.js       → Utilitários de dados & persistência
imagens/     → Recursos estáticos

```

- Separação de responsabilidades entre UI, API e utilitários
- Estrutura baseada em Módulos ES
- CSS organizado (layout, componentes, responsivo)
- Persistência local usando armazenamento do navegador

---

## 👨‍💻 Minha Contribuição

Este foi um projeto acadêmico colaborativo.  
Eu fui responsável principalmente por:

- Estrutura e lógica de renderização da UI (`ui.js`)
- Integração com APIs externas (`api.js`)
- Organização e modularização do projeto
- Correção de lógica utilitária duplicada
- Melhoria na separação de responsabilidades

Outros membros da equipe contribuíram com lógica de filtragem, estilização CSS e manipulação de favoritos.

---

## 🖥 Executando Localmente

Como este projeto usa Módulos ES, ele precisa ser servido via um servidor local.

### Opção 1 — Python

```bash
python -m http.server 8000
```

Abra:

```
http://localhost:8000

```

### Opção 2 — Node

```bash
npm install -g http-server
http-server -c-1 . -p 8000
```

---

## 🔗 Dependências Externas

* Chart.js (CDN)
* iTunes Search API
* Wikipedia API
* Last.fm API

Observação: Algumas chamadas de API podem falhar devido a limites de taxa ou restrições de CORS.

---

## ⚖️ Direitos / Legal

Pré-visualizações de áudio fornecidas pela iTunes Search API. Todos os direitos musicais pertencem aos respectivos proprietários.


## 📌 Destaques Técnicos

* JavaScript Vanilla (sem frameworks)
* Módulos ES6
* Orquestração de APIs e tratamento assíncrono
* Persistência de estado no cliente
* Visualização básica de dados
* Estrutura de projeto limpa

---

## 📄 Licença

Nenhuma licença especificada.

