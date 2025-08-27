// Importa a classe/módulo principal que contém as funções de manipulação da livraria
import { Livraria } from './lib.js';

// ===== Dados e elementos =====

// Carrega os livros salvos no localStorage.
// Se não houver nada salvo, reinicia com os livros padrão (resetBooks).
let books = Livraria.loadBooks()

// Garante que o estado atual seja salvo no localStorage
Livraria.saveBooks(books);

// Seleciona elementos HTML que serão manipulados pelo JavaScript
const output = document.getElementById('output');   // Área de exibição de resultados
const forms = document.getElementById('forms');     // Área onde formulários aparecem dinamicamente
const buttons = document.getElementById('buttons'); // Div que contém os botões de ações

// ===== Forms =====
// Cada função abaixo cria dinamicamente um formulário e adiciona
// eventos de "submit" para executar a ação correspondente na livraria.

// --- Formulário de adicionar livro ---
function showAddForm() {
  forms.innerHTML = `
    <h3>Adicionar Livro</h3>
    <form id="addForm">
      <input type="number" id="addId" placeholder="ID" required />
      <input type="text" id="addTitle" placeholder="Título" required />
      <input type="text" id="addAuthor" placeholder="Autor" required />
      <input type="number" id="addYear" placeholder="Ano" required />
      <button type="submit">Adicionar</button>
    </form>
  `;
  // Quando o formulário é enviado
  document.getElementById('addForm').addEventListener('submit', e => {
    e.preventDefault(); // Evita recarregar a página
    const newBook = {
      id: Number(document.getElementById('addId').value),
      title: document.getElementById('addTitle').value,
      author: document.getElementById('addAuthor').value,
      year: Number(document.getElementById('addYear').value)
    };
    books = Livraria.addBook(books, newBook); // Chama a função da lib
    Livraria.saveBooks(books); // Salva no localStorage
    forms.innerHTML = ''; // Limpa o formulário
    output.textContent = 'Livro adicionado!';
  });
}

// --- Formulário de atualizar livro ---
function showUpdateForm() {
  forms.innerHTML = `
    <h3>Atualizar Livro</h3>
    <form id="updateForm">
      <input type="number" id="updateId" placeholder="ID do livro" required />
      <input type="text" id="updateTitle" placeholder="Novo título" />
      <input type="text" id="updateAuthor" placeholder="Novo autor" />
      <input type="number" id="updateYear" placeholder="Novo ano" />
      <button type="submit">Atualizar</button>
    </form>
  `;
  document.getElementById('updateForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = Number(document.getElementById('updateId').value);
    const updates = {};
    const title = document.getElementById('updateTitle').value;
    const author = document.getElementById('updateAuthor').value;
    const year = document.getElementById('updateYear').value;
    if(title) updates.title = title;
    if(author) updates.author = author;
    if(year) updates.year = Number(year);
    books = Livraria.updateBook(books, id, updates); // Atualiza dados
    Livraria.saveBooks(books);
    forms.innerHTML = '';
    output.textContent = 'Livro atualizado!';
  });
}

// --- Formulário de remover livro ---
function showDeleteForm() {
  forms.innerHTML = `
    <h3>Remover Livro</h3>
    <form id="deleteForm">
      <input type="number" id="deleteId" placeholder="ID do livro" required />
      <button type="submit">Remover</button>
    </form>
  `;
  document.getElementById('deleteForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = Number(document.getElementById('deleteId').value);
    books = Livraria.deleteBook(books, id); // Remove
    Livraria.saveBooks(books);
    forms.innerHTML = '';
    output.textContent = 'Livro removido!';
  });
}

// --- Formulário para listar livros por autor ---
function showListByAuthorForm() {
  forms.innerHTML = `
    <h3>Listar livros por autor</h3>
    <form id="authorForm">
      <input type="text" id="authorName" placeholder="Nome do autor" required />
      <button type="submit">Listar</button>
    </form>
  `;
  document.getElementById('authorForm').addEventListener('submit', e => {
    e.preventDefault();
    const author = document.getElementById('authorName').value;
    const filtered = Livraria.listBooksByAuthor(books, author);
    forms.innerHTML = '';
    // Mostra livros ou mensagem caso não encontre
    output.textContent = filtered.length === 0 ? 'Nenhum livro encontrado.' : Livraria.listBooks(filtered);
  });
}

// ===== Gráfico de livros por autor =====
function showAuthorChart() {
  // Cria o canvas para o gráfico dentro do output
  output.innerHTML = `<canvas id="authorChart"></canvas>`;
  forms.innerHTML = '';

  // Conta livros agrupados por autor
  const counts = Livraria.countBooksByAuthor(books);

  // Ordena do menor para o maior
  const sorted = Object.entries(counts).sort((a,b) => a[1]-b[1]);

  // Extrai rótulos (autores) e valores (quantidade)
  const labels = sorted.map(([autor]) => autor);
  const data = sorted.map(([_, qtd]) => qtd);

  // Gera cores aleatórias para as barras
  const colors = labels.map(() => `hsl(${Math.random()*360}, 70%, 60%)`);

  // Cria o gráfico de barras horizontais usando Chart.js
  const ctx = document.getElementById('authorChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label: 'Livros', data, backgroundColor: colors }]
    },
    options: {
      indexAxis: 'y', // Barras horizontais
      plugins: { legend: { display: false } }, // Remove legenda
      scales: { x: { beginAtZero: true }, y: { ticks: { autoSkip: false } } }
    }
  });
}

//Feat: Davi
async function generateSongGridHTML(list) {
  if (!list || list.length === 0) {
    return '<div style="color:var(--muted)">Nenhuma música na coleção.</div>';
  }

  const html = ['<div class="song-grid">'];

  // Busca imagens do álbum ou cantor no Wikipedia
  const covers = await Promise.all(list.map(async s => {
    // Tenta capa do álbum
    if (s.album) {
      const albumQuery = s.album && s.artist ? `${s.album} ${s.artist}` : s.album;
      const albumImg = albumQuery ? await fetchWikiImage(albumQuery) : null;
      if (albumImg) return albumImg;
    }
    // Tenta imagem do cantor
    const artistImg = await fetchWikiImage(s.artist || s.author);
    if (artistImg) return artistImg;
    // Se não achar, retorna null
    return null;
  }));

  list.forEach((s, idx) => {
    const coverImg = covers[idx];
    html.push(`<div class="card">
      <div class="cover">
        ${coverImg
          ? `<img src="${coverImg}" class="cover-img" alt="Capa de ${escapeHtml(s.title)}">`
          : (s.title[0] || 'M').toUpperCase()
        }
      </div>
      <div class="meta"><h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.artist)} • ${escapeHtml(s.album || '—')} — ${formatTime(s.duration)}</p></div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button onclick="playById(${s.id})">▶</button>
        <button onclick="enqueue(${s.id})">＋</button>
      </div>
    </div>`);
  });

  html.push('</div>');
  return html.join('\n');
}

async function renderList(list = books) {
  output.innerHTML = await generateSongGridHTML(list);
}

async function renderAuthorBooks(list, container) {
  container.innerHTML = await generateSongGridHTML(list);
}

function escapeHtml(t){ return (t||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }
function formatTime(sec){ if(!sec) return '0:00'; const m=Math.floor(sec/60); const s=Math.floor(sec%60).toString().padStart(2,'0'); return `${m}:${s}` }

function playById(id) {
  const song = books.find(s => s.id === id);
  if (!song || !song.spotifyId) return;

  // Atualiza o painel do player com o embed do Spotify
  const playerPanel = document.getElementById('playerPanel');
  playerPanel.innerHTML = `
    <iframe
      id="spotifyPlayer"
      src="https://open.spotify.com/embed/track/${song.spotifyId}"
      width="100%"
      height="220px"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media">
    </iframe>
  `;
}

const search = document.getElementById('globalSearch');

search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();

    if(!q){ 
        renderList(books); // lista completa
        return;
    }

    const filtered = books.filter(s => {
        const text = (s.title + s.artist + (s.album || '')).toLowerCase();
        return text.includes(q);
    });

    renderList(filtered);
});



  // Feat: Gabriel 
// --- Navegador de autores
let allAuthorsCache = null;

function showAuthorsGrid(letra = "all") {
  output.innerHTML = `
    <h3 class="authors-title">Selecione um autor</h3>
    <div id="lettersMenu"></div>
    <div id="authorsGrid"></div>
  `;

  // Menu de letras (sem alterações)
  const letters = ["Todos", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const lettersMenu = document.getElementById('lettersMenu');
  lettersMenu.innerHTML = '';
  letters.forEach(l => {
    const btn = document.createElement('button');
    btn.textContent = l;
    btn.className = 'letter-btn' + ((l === "Todos" && letra === "all") || l === letra ? ' selected' : '');
    btn.onclick = () => showAuthorsGrid(l === "Todos" ? "all" : l);
    lettersMenu.appendChild(btn);
  });

  // Código para filtrar autores (sem alterações)
  if (!allAuthorsCache) {
    const unsorted = Livraria.listSingers(books);
    allAuthorsCache = [...unsorted].sort((a, b) => {
      const cleanA = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const cleanB = b.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return cleanA.localeCompare(cleanB);
    });
  }

  const authors = letra === "all" 
    ? allAuthorsCache 
    : allAuthorsCache.filter(author => {
        const firstChar = author.charAt(0).normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return firstChar === letra.toLowerCase();
      });

  const grid = document.getElementById('authorsGrid');
  grid.innerHTML = '';
  authors.forEach(async author => {
  const div = document.createElement('div');
  div.className = 'author-card';

  let imgUrl = await getAuthorImage(author);

  let cover;
  if (imgUrl && !imgUrl.endsWith('BohemiaRhapsody.jpg')) {
    cover = document.createElement('img');
    cover.alt = author;
    cover.src = imgUrl;
    cover.className = 'author-img';
  } else {
    cover = document.createElement('div');
    cover.className = 'cover author-img';
    cover.textContent = (author[0] || 'A').toUpperCase();
  }

  const name = document.createElement('div');
  name.className = 'author-name';
  name.textContent = author;

  div.appendChild(cover);
  div.appendChild(name);

  div.addEventListener('click', async () => {
    // Filtrar músicas pelo autor selecionado
    const authorBooks = books.filter(b => b.author === author);

    output.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.id = 'backToAuthors';
    backButton.className = 'back-btn';
    backButton.textContent = '⬅ Voltar';
    backButton.onclick = () => showAuthorsGrid(letra);
    output.appendChild(backButton);

    // Exibir informações do autor
    imgUrl = await getAuthorImage(author);
    const lastFmData = await fetchLastFmArtist(author);

    const authorHeader = document.createElement('div');
    authorHeader.className = 'author-details';
    authorHeader.innerHTML = `
      ${imgUrl && !imgUrl.endsWith('BohemiaRhapsody.jpg')
        ? `<img src="${imgUrl}" alt="${author}" class="author-img-large">`
        : `<div class="cover author-img-large">${(author[0] || 'A').toUpperCase()}</div>`
      }
      <div>
        <h2 class="author-details-name">${author}</h2>
        <div class="author-details-meta">
          ${lastFmData?.url ? `<a href="${lastFmData.url}" target="_blank">Perfil no Last.fm</a><br>` : ''}
          ${lastFmData?.stats?.listeners ? `<b>Ouvintes:</b> ${lastFmData.stats.listeners}<br>` : ''}
          ${lastFmData?.tags?.tag ? `<b>Estilos:</b> ${lastFmData.tags.tag.map(t => t.name).join(', ')}` : ''}
        </div>
      </div>
    `;
    output.appendChild(authorHeader);

    const songsContainer = document.createElement('div');
    songsContainer.id = 'songsContainer';
    output.appendChild(songsContainer);

    renderAuthorBooks(authorBooks, songsContainer);
  });

  grid.appendChild(div);
});
}

// ------------------------API--------------------
async function fetchSpotifyCover(spotifyId, accessToken) {
  const url = `https://api.spotify.com/v1/tracks/${spotifyId}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await response.json();
  // Pega a imagem maior disponível
  return data.album.images[0]?.url || null;
}

async function getAuthorImage(author) {
  // Tenta buscar imagem na Wikipedia
  const wikiImg = await fetchWikiImage(author);
  if (wikiImg) return wikiImg;

  // Tenta buscar imagem na Last.fm
  const lastFmImg = await getLastFmArtistImage(author);
  if (lastFmImg) return lastFmImg;

  // Usa imagem local/padrão se não encontrar nas APIs
  const book = books.find(b => b.author === author && typeof b.imagem === 'string' && b.imagem.trim() !== '');
  return book && book.imagem ? book.imagem : 'imagens/BohemiaRhapsody.jpg';
}

async function fetchLastFmArtist(artistName) {
  const apiKey = '254828efebce648b8c698471e2cd36d0';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&autocorrect=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.artist;
}

async function getLastFmArtistImage(artistName) {
  const artist = await fetchLastFmArtist(artistName);
  if (artist && artist.image && artist.image.length > 0) {
    // Pega a maior imagem que NÃO seja a padrão (estrela)
    const imgObj = artist.image.reverse().find(img =>
      img['#text'] && !img['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f.png')
    );
    if (imgObj && imgObj['#text']) return imgObj['#text'];
  }
  return null;
}

async function fetchWikiImage(artistName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(artistName)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
  const response = await fetch(url);
  const data = await response.json();
  const pages = data.query.pages;
  for (const pageId in pages) {
    if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
      return pages[pageId].thumbnail.source;
    }
  }
  return null;
}

async function fetchWikiSummary(artistName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(artistName)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`;
  const response = await fetch(url);
  const data = await response.json();
  const pages = data.query.pages;
  for (const pageId in pages) {
    if (pages[pageId].extract) {
      return pages[pageId].extract;
    }
  }
  return null;
}

// ===== Actions =====
// Dicionário que associa cada ação a uma função
const actions = {
  init: () => {
      books = Livraria.resetBooks();
      renderList(books);
      forms.innerHTML = "";
    },
  list: () => { forms.innerHTML = ''; renderList(books); },
  add: () => showAddForm(),
  update: () => showUpdateForm(),
  delete: () => showDeleteForm(),
  clear: () => { forms.innerHTML = ''; Livraria.clearBooks(); books=[]; output.textContent='Livraria esvaziada.'; },
  listByAuthor: () => showListByAuthorForm(),
  browseByAuthor: () => showAuthorsGrid(),
  countByAuthor: () => showAuthorChart(),
  exit: () => { forms.innerHTML = ''; output.textContent='Bye, bye! :)'; }
};

// ===== Event listener =====
// Captura cliques nos botões do menu e chama a ação correspondente
buttons.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    const action = e.target.dataset.action; // Lê o "data-action" do botão
    if(action && actions[action]) actions[action](); // Executa a função correspondente
  }
});

window.playById = playById;