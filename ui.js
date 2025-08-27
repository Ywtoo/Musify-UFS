// Importa a classe/módulo principal que contém as funções de manipulação da Musify
import { Musify } from './lib.js';

// ===== Dados e elementos =====

// Carrega os livros salvos no localStorage.
// Se não houver nada salvo, reinicia com os livros padrão (resetsongs).
let songs = Musify.loadSongs()

// Garante que o estado atual seja salvo no localStorage
Musify.saveSongs(songs);

// Seleciona elementos HTML que serão manipulados pelo JavaScript
const output = document.getElementById('output');   // Área de exibição de resultados
const forms = document.getElementById('forms');     // Área onde formulários aparecem dinamicamente
const buttons = document.getElementById('buttons'); // Div que contém os botões de ações

// ===== Forms =====
// Cada função abaixo cria dinamicamente um formulário e adiciona
// eventos de "submit" para executar a ação correspondente na Musify.

const $ = id => document.getElementById(id);
function genId(){ return Math.floor(Math.random()*1e6); }

// --- Formulário de adicionar livro --- Atualizado
function formAddHtml(){ 
  return `
    <div class="form">
      <input id="f_title" placeholder="Título" />
      <input id="f_artist" placeholder="Artista" />
      <input id="f_album" placeholder="Álbum" />
      <input id="f_duration" placeholder="Duração (segundos)" />
      <textarea id="f_notes" placeholder="Observações (opcional)" rows="2"></textarea>
      <div class="actions">
        <button id="f_add">Adicionar</button>
        <button id="f_cancel">Cancelar</button>
      </div>
    </div>
  `
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '40px';
  toast.style.right = '40px';
  toast.style.backgroundColor = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '20px 40px';
  toast.style.borderRadius = '5px';
  toast.style.opacity = '0.9';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000); // desaparece após 3 segundos
}

// Usar:
showToast('Operação realizada com sucesso!');

function attachAddHandlers(){
  document.getElementById('f_add').addEventListener('click',()=>{
    const t=document.getElementById('f_title').value.trim(),
          a=document.getElementById('f_artist').value.trim(),
          al=document.getElementById('f_album').value.trim(),
          d=Number(document.getElementById('f_duration').value)||120
    
    if(!t||!a){ 
      alert('Título e artista são obrigatórios'); 
      return 
    }
    
    const obj={
      id: Date.now(), // id simples
      title:t,
      artist:a,
      album:al,
      duration:d,
      notes:document.getElementById('f_notes').value.trim()
    }
    
    let songs = Musify.loadSongs()        // carrega do localStorage
    songs = Musify.addSong(songs, obj)    // adiciona
    Musify.saveSongs(songs)               // salva de volta
    renderList(songs)                     // atualiza a lista
    
    forms.innerHTML='' // fecha o formulário
    showToast('Música adicionada!')
  })

  document.getElementById('f_cancel').addEventListener('click',()=>forms.innerHTML='')
}

function action_add(){ 
  forms.innerHTML = formAddHtml()
  attachAddHandlers()
}

// --- Formulário de atualizar livro --- Atualizado

// Função auxiliar para preencher os inputs do formulário de atualização
function fillInputs(song) {
    if (song) {
        document.getElementById("update_title").value = song.title || '';
        document.getElementById("update_artist").value = song.artist || '';
        document.getElementById("update_album").value = song.album || '';
        document.getElementById("update_duration").value = song.duration || 0;
    }
}

// Função para renderizar o formulário de atualização
function showUpdateForm() {
    // Carrega a lista mais recente para garantir que os dados estão atualizados
    let currentSongs = Musify.loadSongs();

    if (currentSongs.length === 0) {
        forms.innerHTML = "<p>Nenhuma música disponível para atualizar.</p>";
        return;
    }

    // Cria as opções para o dropdown, usando 'artist' em vez de 'author'
    let options = currentSongs.map(s => `<option value="${s.id}">${s.title} — ${s.artist}</option>`).join("");

    // HTML do formulário corrigido para usar os campos corretos (artist, album, duration)
    forms.innerHTML = `
        <div class="form">
            <h3>Atualizar Música</h3>
            <label></label>
            <select id="selectSongToUpdate">${options}</select>
            
            <input id="update_title" placeholder="Título" />
            <input id="update_artist" placeholder="Artista" />
            <input id="update_album" placeholder="Álbum" />
            <input id="update_duration" placeholder="Duração (segundos)" type="number" />
            
            <div class="actions">
                <button id="btnApplyUpdate">Aplicar</button>
                <button id="btnCancelUpdate">Cancelar</button>
            </div>
        </div>
    `;

    const selectElement = document.getElementById("selectSongToUpdate");
    const btnApply = document.getElementById("btnApplyUpdate");
    const btnCancel = document.getElementById("btnCancelUpdate");

    // Preenche os campos do formulário com os dados da música selecionada
    const firstSong = currentSongs.find(s => s.id == selectElement.value);
    fillInputs(firstSong);

    // Atualiza os campos do formulário sempre que uma nova música é selecionada
    selectElement.addEventListener("change", () => {
        const selectedId = parseInt(selectElement.value);
        const selectedSong = currentSongs.find(s => s.id === selectedId);
        fillInputs(selectedSong);
    });

    // Aplica a atualização ao clicar no botão
    btnApply.addEventListener("click", () => {
        const songId = parseInt(selectElement.value);
        
        // Coleta os novos dados do formulário
        const updates = {
            title: document.getElementById("update_title").value.trim(),
            artist: document.getElementById("update_artist").value.trim(),
            album: document.getElementById("update_album").value.trim(),
            duration: Number(document.getElementById("update_duration").value) || 0
        };
        
        // Validação simples
        if (!updates.title || !updates.artist) {
            alert('Título e artista são obrigatórios.');
            return;
        }
        
        // 1. Atualiza a lista de músicas
        songs = Musify.updateSong(currentSongs, songId, updates);
        
        // 2. Salva as alterações no localStorage
        Musify.saveSongs(songs);
        
        // 3. Atualiza a exibição da lista na tela
        renderList(songs);
        
        // 4. Limpa e fecha o formulário
        forms.innerHTML = "";
    });

    // Cancela a operação e fecha o formulário
    btnCancel.addEventListener("click", () => {
        forms.innerHTML = "";
    });
}


// --- Formulário de remover livro --- Atualizado
function showDeleteForm() {
    // Carrega a lista de músicas atual
    let currentSongs = Musify.loadSongs();

    // Se não houver músicas, exibe uma mensagem e encerra
    if (currentSongs.length === 0) {
        forms.innerHTML = "<p>Nenhuma música para remover.</p>";
        return;
    }

    // Cria as opções do <select> com todas as músicas
    const options = currentSongs.map(s => 
        `<option value="${s.id}">${escapeHtml(s.title)} — ${escapeHtml(s.artist)}</option>`
    ).join('');

    // Gera o HTML do formulário
    forms.innerHTML = `
        <div class="form">
            <h3>Remover Música</h3>
            <label></label>
            <select id="selectSongToDelete">${options}</select>
            <div class="actions">
                <button id="btnConfirmDelete">Remover</button>
                <button id="btnCancelDelete">Cancelar</button>
            </div>
        </div>
    `;

    // Adiciona os eventos aos botões
    const selectElement = document.getElementById('selectSongToDelete');
    
    document.getElementById('btnConfirmDelete').addEventListener('click', () => {
        // Pega o ID da música selecionada no dropdown
        const songId = Number(selectElement.value);
        
        // Pega os dados da música para a mensagem de confirmação
        const songToDelete = currentSongs.find(s => s.id === songId);
        
        // Pede confirmação ao usuário (uma boa prática para evitar remoções acidentais)
        if (confirm(`Tem certeza que deseja remover "${songToDelete.title}"?`)) {
            // 1. Remove a música da lista
            songs = Musify.deleteSong(songs, songId);
            
            // 2. Salva a nova lista no localStorage
            Musify.saveSongs(songs);
            
            // 3. Atualiza a exibição na tela
            renderList(songs);
            
            // 4. Fecha o formulário
            forms.innerHTML = '';
        }
    });

    document.getElementById('btnCancelDelete').addEventListener('click', () => {
        // Apenas fecha o formulário
        forms.innerHTML = '';
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
    const filtered = Musify.listSongsByAuthor(songs, author);
    forms.innerHTML = '';
    // Mostra livros ou mensagem caso não encontre
    output.textContent = filtered.length === 0 ? 'Nenhum livro encontrado.' : Musify.listSongs(filtered);
  });
}

// ===== Gráfico de livros por autor =====
function showAuthorChart() {
  // Cria o canvas para o gráfico dentro do output
  output.innerHTML = `<canvas id="authorChart"></canvas>`;
  forms.innerHTML = '';

  // Conta livros agrupados por autor
  const counts = Musify.countsongsByAuthor(songs);

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
      datasets: [{ label: 'Musicas', data, backgroundColor: colors }]
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

  // Busca capas: iTunes (álbum+artista) > Wikipedia (álbum+artista) > Wikipedia (artista)
  const covers = await Promise.all(list.map(async s => {
    // 1. Tenta buscar capa do álbum no iTunes
    if (s.album) {
      const albumQuery = s.album && s.artist ? `${s.album} ${s.artist}` : s.album;
      const itunesImg = albumQuery ? await fetchItunesImage(albumQuery) : null;
      if (itunesImg) return itunesImg;
      // 2. Tenta buscar capa do álbum na Wikipedia
      const wikiAlbumImg = albumQuery ? await fetchWikiImage(albumQuery) : null;
      if (wikiAlbumImg) return wikiAlbumImg;
    }
    // 3. Tenta buscar imagem do artista na Wikipedia
    const wikiArtistImg = await fetchWikiImage(s.artist || s.author);
    if (wikiArtistImg) return wikiArtistImg;
    // 4. Retorna null se não encontrou nenhuma imagem
    return null;
  }));

  list.forEach((s, idx) => {
  const coverImg = covers[idx];
  s.coverImg = coverImg;
  html.push(`<div class="card">
    <div class="cover">
      ${coverImg
        ? `<img src="${coverImg}" class="cover-img" alt="Capa de ${escapeHtml(s.title)}">`
        : (s.title[0] || 'M').toUpperCase()
      }
    </div>
    <div class="meta"><h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.artist)} • ${escapeHtml(s.album || '—')} — ${formatTime(s.duration)}</p></div>
    <div style="display:flex;flex-direction:column;gap:6px">
    <button onclick="playItunesPreview('${escapeHtml(s.title)} ${escapeHtml(s.artist)}')">▶</button>
      <button onclick="enqueue(${s.id})">＋</button>
    </div>
    <div id="itunes-preview-${s.id}"></div>
  </div>`);
});

  html.push('</div>');
  return html.join('\n');
}

async function renderList(list = songs) {
  output.innerHTML = await generateSongGridHTML(list);
}

async function renderAuthorsongs(list, container) {
  container.innerHTML = await generateSongGridHTML(list);
}

function escapeHtml(t){ return (t||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }
function formatTime(sec){ if(!sec) return '0:00'; const m=Math.floor(sec/60); const s=Math.floor(sec%60).toString().padStart(2,'0'); return `${m}:${s}` }

function playById(id) {
  const song = songs.find(s => s.id === id);
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
        renderList(songs); // lista completa
        return;
    }

    const filtered = songs.filter(s => {
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
    const unsorted = Musify.listSingers(songs);
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
    const authorsongs = songs.filter(b => b.author === author);

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

    renderAuthorsongs(authorsongs, songsContainer);
  });

  grid.appendChild(div);
});
}

// ------------------------API--------------------
async function fetchItunesPreview(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  const result = data.results?.[0];
  return result?.previewUrl || null;
}

// Busca imagem de álbum/artista no iTunes
async function fetchItunesImage(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].artworkUrl100.replace('100x100bb', '300x300bb');
  }
  return null;
}

async function getAuthorImage(author) {
  // Tenta buscar imagem na Wikipedia
  const wikiImg = await fetchWikiImage(author);
  if (wikiImg) return wikiImg;

  // Tenta buscar imagem na Last.fm
  const lastFmImg = await getLastFmArtistImage(author);
  if (lastFmImg) return lastFmImg;

  // Usa imagem local/padrão se não encontrar nas APIs
  const song = songs.find(b => b.author === author && typeof b.imagem === 'string' && b.imagem.trim() !== '');
  return song && song.imagem ? song.imagem : 'imagens/BohemiaRhapsody.jpg';
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
      songs = Musify.resetSongs();
      renderList(songs);
      forms.innerHTML = "";
    },
  list: () => { forms.innerHTML = ''; renderList(songs); },
  add: () => { action_add(); },
  update: () => { showUpdateForm(); },
  delete: () => showDeleteForm(),
  clear: () => { forms.innerHTML = ''; Musify.clearSongs(); songs=[]; output.textContent='Musify esvaziada.'; },
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
window.playItunesPreview = async function(query) {
  const previewUrl = await fetchItunesPreview(query);
  const song = songs.find(s => `${s.title} ${s.artist}` === query);
  const playerPanel = document.getElementById('playerPanel');

  if (!playerPanel) return;

  if (previewUrl && song) {
    // Usa a capa da imagem se existir, senão inicial do título
    const coverHTML = song.coverImg
      ? `<img src="${song.coverImg}" class="cover-img" alt="Capa de ${song.title}">`
      : (song.title.charAt(0) || 'M').toUpperCase();

    playerPanel.innerHTML = `
      <div id="nowPlaying">
        <div class="np-row">
          <div class="cover" id="npCover">${coverHTML}</div>
          <div style="flex:1">
            <div id="npTitle"><h3 style="margin:0 0 6px 0">${song.title}</h3></div>
            <div id="npArtist" style="color:var(--muted)">${song.artist}</div>
          </div>
        </div>
        <audio controls autoplay style="width:100%; margin-top: 12px;">
          <source src="${previewUrl}" type="audio/mpeg">
          Seu navegador não suporta áudio embutido.
        </audio>
      </div>
    `;
  } else if (song) {
    playerPanel.innerHTML = `
      <div id="nowPlaying">
        <div class="np-row">
          <div class="cover" id="npCover">M</div>
          <div style="flex:1">
            <div id="npTitle"><h3 style="margin:0 0 6px 0">Prévia não encontrada</h3></div>
            <div id="npArtist" style="color:var(--muted)">${song.artist}</div>
          </div>
        </div>
      </div>
    `;
  } else {
    playerPanel.innerHTML = `
      <div id="nowPlaying">
        <div class="np-row">
          <div class="cover" id="npCover">M</div>
          <div style="flex:1">
            <div id="npTitle"><h3 style="margin:0 0 6px 0">Nenhuma música</h3></div>
            <div id="npArtist" style="color:var(--muted)"></div>
          </div>
        </div>
      </div>
    `;
  }
};
