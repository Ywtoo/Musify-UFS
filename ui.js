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
  // Cria um canvas para o gráfico
  forms.innerHTML = `<canvas id="authorChart"></canvas>`;
  output.textContent = '';

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

  // Feat: Gabriel test
// --- Navegador de autores
function showAuthorsGrid() {
  output.innerHTML = `
    <h3>Selecione um autor</h3>
    <div id="authorsGrid"></div>
  `;

  const authors = Livraria.listSingers(books);
  const grid = document.getElementById('authorsGrid');

  async function getAuthorImage(author) {
  // Tenta Wiki
  const wikiImg = await fetchWikiImage(author);
  if (wikiImg) return wikiImg;
  // Tenta Last.fm
  const lastFmImg = await getLastFmArtistImage(author);
  if (lastFmImg) return lastFmImg;
  // Usa imagem local/padrão
  const book = books.find(b => b.author === author && typeof b.imagem === 'string' && b.imagem.trim() !== '');
  return book && book.imagem ? book.imagem : 'imagens/BohemiaRhapsody.jpg';
}

  authors.forEach(async author => {
  const div = document.createElement('div');
  div.className = 'author-card';

  const img = document.createElement('img');
  img.alt = author;
  img.src = await getAuthorImage(author);

  const name = document.createElement('div');
  name.className = 'author-name';
  name.textContent = author;

  div.appendChild(img);
  div.appendChild(name);

  // Torna o clique assíncrono para usar await
  div.addEventListener('click', async () => {
  const imgUrl = await getAuthorImage(author);
  const lastFmData = await fetchLastFmArtist(author);
  const wikiSummary = await fetchWikiSummary(author);

  // Extrai dados do Last.fm
  const listeners = lastFmData?.stats?.listeners || 'N/A';
  const plays = lastFmData?.stats?.plays || 'N/A';
  const tags = lastFmData?.tags?.tag?.map(t => t.name).join(', ') || 'N/A';
  const bio = lastFmData?.bio?.summary || '';
  const url = lastFmData?.url || '#';

  output.innerHTML = `
    <button id="backToAuthors" style="margin-bottom:16px;">⬅ Voltar</button>
    <div style="display:flex;align-items:center;gap:24px;">
      <img src="${imgUrl}" alt="${author}" style="width:90px;height:90px;border-radius:50%;border:3px solid #a4193d;background:#eee;object-fit:cover;">
      <div>
        <h2 style="margin:0;">${author}</h2>
        <div style="font-size:14px;color:#444;">
          <a href="${url}" target="_blank">Perfil no Last.fm</a><br>
          <b>Ouvintes:</b> ${listeners}<br>
          <b>Estilos:</b> ${tags}
        </div>
      </div>
    </div>
    <pre style="white-space:pre-wrap">${Livraria.listBooksByAuthor(books, author).length === 0 ? 'Nenhuma música encontrada.' : Livraria.listBooks(Livraria.listBooksByAuthor(books, author))}</pre>
  `;
  document.getElementById('backToAuthors').onclick = showAuthorsGrid;
});


  grid.appendChild(div);
});
}


// ===== Actions =====
// Dicionário que associa cada ação a uma função
const actions = {
  init: () => {
    books = Livraria.resetBooks();
    output.textContent = "📚 Livraria iniciada com lista de livros padrão!";
    forms.innerHTML = "";
  },
  list: () => { forms.innerHTML = ''; output.textContent = Livraria.listBooks(books); },
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

// ------------------------API--------------------
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
