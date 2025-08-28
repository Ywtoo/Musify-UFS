// Chave usada no localStorage para salvar as músicas
const STORAGE_KEY = "Musify::songs"

// ========================
// Persistência (salvar, carregar, limpar os dados)
// ========================

// Carrega a lista de músicas do localStorage
// Se não existir nada salvo, retorna um array vazio
const loadSongs = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// Salva a lista de músicas no localStorage (convertendo para texto JSON)
const saveSongs = songs =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs))

// Remove todas as músicas do localStorage
const clearSongs = () => {
  localStorage.removeItem(STORAGE_KEY)
  console.log("Musify limpa.")
}

// Restaura uma lista inicial de músicas (pré-cadastradas)
// Útil para resetar o sistema com dados de exemplo
const resetSongs = () => {
  const songs = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", year: 1975, genre: "Rock", artist: "Queen", album: "A Night at the Opera", duration: 354 },
    { id: 2, title: "Garota de Ipanema", artist: "Tom Jobim & Vinicius de Moraes", year: 1962, genre: "Bossa Nova", artist: "Tom Jobim & Vinicius de Moraes", album: "Getz/Gilberto", duration: 201 },
    { id: 3, title: "Billie Jean", artist: "Michael Jackson", year: 1982, genre: "Pop", artist: "Michael Jackson", album: "Thriller", duration: 294 },
    { id: 4, title: "Smells Like Teen Spirit", artist: "Nirvana", year: 1991, genre: "Grunge", artist: "Nirvana", album: "Nevermind", duration: 301 },
    { id: 5, title: "No Woman, No Cry", artist: "Bob Marley", year: 1974, genre: "Reggae", artist: "Bob Marley", album: "Natty Dread", duration: 257 },
    { id: 6, title: "Like a Rolling Stone", artist: "Bob Dylan", year: 1965, genre: "Folk Rock", artist: "Bob Dylan", album: "Highway 61 Revisited", duration: 369 },
    { id: 7, title: "Clube da Esquina Nº 2", artist: "Milton Nascimento & Lô Borges", year: 1972, genre: "MPB", artist: "Milton Nascimento & Lô Borges", album: "Clube da Esquina", duration: 312 },
    { id: 8, title: "Imagine", artist: "John Lennon", year: 1971, genre: "Soft Rock", artist: "John Lennon", album: "Imagine", duration: 183 },
    { id: 9, title: "Yesterday", artist: "The Beatles", year: 1965, genre: "Rock", artist: "The Beatles", album: "Help!", duration: 125 },
    { id: 10, title: "Aquarela do Brasil", artist: "Ary Barroso", year: 1939, genre: "Samba", artist: "Ary Barroso", album: "Aquarela do Brasil", duration: 200 },
    { id: 11, title: "Asa Branca", artist: "Luiz Gonzaga", year: 1947, genre: "Forró", artist: "Luiz Gonzaga", album: "Asa Branca", duration: 180 },
    { id: 12, title: "What a Wonderful World", artist: "Louis Armstrong", year: 1967, genre: "Jazz", artist: "Louis Armstrong", album: "What a Wonderful World", duration: 140 },
    { id: 13, title: "Hotel California", artist: "Eagles", year: 1976, genre: "Rock", artist: "Eagles", album: "Hotel California", duration: 391 },
    { id: 14, title: "Stairway to Heaven", artist: "Led Zeppelin", year: 1971, genre: "Rock", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: 482 },
    { id: 15, title: "Águas de Março", artist: "Tom Jobim & Elis Regina", year: 1972, genre: "MPB", artist: "Tom Jobim & Elis Regina", album: "Elis & Tom", duration: 149 },
    { id: 16, title: "Detalhes", artist: "Roberto Carlos", year: 1971, genre: "MPB", artist: "Roberto Carlos", album: "Detalhes", duration: 230 },
    { id: 17, title: "Construção", artist: "Chico Buarque", year: 1971, genre: "MPB", artist: "Chico Buarque", album: "Construção", duration: 330 },
    { id: 18, title: "O Mundo é um Moinho", artist: "Cartola", year: 1976, genre: "Samba", artist: "Cartola", album: "O Mundo é um Moinho", duration: 180 },
    { id: 19, title: "Trem das Onze", artist: "Adoniran Barbosa", year: 1964, genre: "Samba", artist: "Adoniran Barbosa", album: "Trem das Onze", duration: 150 },
    { id: 20, title: "Sampa", artist: "Caetano Veloso", year: 1978, genre: "MPB", artist: "Caetano Veloso", album: "Sampa", duration: 210 },
    { id: 21, title: "Só Tinha de Ser com Você", artist: "Elis Regina & Tom Jobim", year: 1974, genre: "Bossa Nova", artist: "Elis Regina & Tom Jobim", album: "Elis & Tom", duration: 195 },
    { id: 22, title: "Rosa", artist: "Pixinguinha", year: 1917, genre: "Choro", artist: "Pixinguinha", album: "Rosa", duration: 160 },
    { id: 23, title: "Thriller", artist: "Michael Jackson", year: 1982, genre: "Pop", artist: "Michael Jackson", album: "Thriller", duration: 358 },
    { id: 24, title: "Let It Be", artist: "The Beatles", year: 1970, genre: "Rock", artist: "The Beatles", album: "Let It Be", duration: 243 },
    { id: 25, title: "Evidências", artist: "Chitãozinho & Xororó", year: 1990, genre: "Sertanejo", artist: "Chitãozinho & Xororó", album: "Evidências", duration: 210 },
    { id: 26, title: "Chega de Saudade", artist: "João Gilberto", year: 1959, genre: "Bossa Nova", artist: "João Gilberto", album: "Chega de Saudade", duration: 172 },
    { id: 27, title: "O Leãozinho", artist: "Caetano Veloso", year: 1977, genre: "MPB", artist: "Caetano Veloso", album: "O Leãozinho", duration: 180 },
    { id: 28, title: "País Tropical", artist: "Jorge Ben Jor", year: 1969, genre: "Samba Rock", artist: "Jorge Ben Jor", album: "País Tropical", duration: 200 },
    { id: 29, title: "Cálice", artist: "Chico Buarque & Gilberto Gil", year: 1973, genre: "MPB", artist: "Chico Buarque & Gilberto Gil", album: "Cálice", duration: 190 },
    { id: 30, title: "Panis et Circenses", artist: "Os Mutantes & Gilberto Gil", year: 1968, genre: "Tropicália", artist: "Os Mutantes & Gilberto Gil", album: "Tropicália", duration: 185 },
    { id: 31, title: "Andar com Fé", artist: "Gilberto Gil", year: 1982, genre: "MPB", artist: "Gilberto Gil", album: "Andar com Fé", duration: 210 },
    { id: 32, title: "Menino do Rio", artist: "Caetano Veloso", year: 1979, genre: "MPB", artist: "Caetano Veloso", album: "Menino do Rio", duration: 205 },
    { id: 33, title: "Tempo Perdido", artist: "Legião Urbana", year: 1986, genre: "Rock Brasileiro", artist: "Legião Urbana", album: "Dois", duration: 240 },
    { id: 34, title: "Pra Não Dizer que Não Falei das Flores", artist: "Geraldo Vandré", year: 1968, genre: "MPB", artist: "Geraldo Vandré", album: "Pra Não Dizer que Não Falei das Flores", duration: 260 },
    { id: 35, title: "Apenas Mais Uma de Amor", artist: "Lulu Santos", year: 1986, genre: "Pop Rock", artist: "Lulu Santos", album: "Apenas Mais Uma de Amor", duration: 230 },
    { id: 36, title: "Lanterna dos Afogados", artist: "Paralamas do Sucesso", year: 1989, genre: "Rock Brasileiro", artist: "Paralamas do Sucesso", album: "Lanterna dos Afogados", duration: 280 },
    { id: 37, title: "Metamorfose Ambulante", artist: "Raul Seixas", year: 1973, genre: "Rock Brasileiro", artist: "Raul Seixas", album: "Metamorfose Ambulante", duration: 210 },
    { id: 38, title: "Domingo no Parque", artist: "Gilberto Gil", year: 1967, genre: "Tropicália", artist: "Gilberto Gil", album: "Domingo no Parque", duration: 240 },
    { id: 39, title: "Flores", artist: "Titãs", year: 1989, genre: "Rock Brasileiro", artist: "Titãs", album: "Flores", duration: 250 },
    { id: 40, title: "Será", artist: "Legião Urbana", year: 1985, genre: "Rock Brasileiro", artist: "Legião Urbana", album: "Será", duration: 230 },
    { id: 41, title: "Gita", artist: "Raul Seixas", year: 1974, genre: "Rock Brasileiro", artist: "Raul Seixas", album: "Gita", duration: 220 },
    { id: 42, title: "Caminhando (Pra Não Dizer que Não Falei das Flores)", artist: "Geraldo Vandré", year: 1968, genre: "Protesto/MPB", artist: "Geraldo Vandré", album: "Caminhando", duration: 260 },
    { id: 43, title: "Wish You Were Here", artist: "Pink Floyd", year: 1975, genre: "Progressive Rock", artist: "Pink Floyd", album: "Wish You Were Here", duration: 334 },
    { id: 44, title: "Hey Jude", artist: "The Beatles", year: 1968, genre: "Rock", artist: "The Beatles", album: "Hey Jude", duration: 431 },
    { id: 45, title: "Lose Yourself", artist: "Eminem", year: 2002, genre: "Hip Hop", artist: "Eminem", album: "8 Mile", duration: 326 },
    { id: 46, title: "Juízo Final", artist: "Nelson Cavaquinho", year: 1973, genre: "Samba", artist: "Nelson Cavaquinho", album: "Juízo Final", duration: 180 },
    { id: 47, title: "Canto de Ossanha", artist: "Baden Powell & Vinicius de Moraes", year: 1966, genre: "Bossa Nova", artist: "Baden Powell & Vinicius de Moraes", album: "Canto de Ossanha", duration: 210 },
    { id: 48, title: "Killing in the Name", artist: "Rage Against the Machine", year: 1992, genre: "Rap Metal", artist: "Rage Against the Machine", album: "Rage Against the Machine", duration: 314 },
    { id: 49, title: "Smells Like Teen Spirit", artist: "Nirvana", year: 1991, genre: "Grunge", artist: "Nirvana", album: "Nevermind", duration: 301 },
    { id: 50, title: "Shape of You", artist: "Ed Sheeran", year: 2017, genre: "Pop", artist: "Ed Sheeran", album: "divide", duration: 233 }
  ]


  saveSongs(songs)
  console.log("Músicas iniciais salvas.")
  return songs
}

// ========================
// CRUD funcional (Create, Read, Update, Delete)
// ========================

// Adiciona uma nova música (retorna um novo array)
const addSong = (songs, newsong) => [...songs, newsong]

// Atualiza uma música existente (caso encontre o id)
const updateSong = (songs, id, updates) =>
  songs.map(song => (song.id === id ? { ...song, ...updates } : song))

// Remove uma música pelo id
const deleteSong = (songs, id) =>
  songs.filter(song => song.id !== id)

// ========================
// Listagem e formatação
// ========================

// Lista as músicas em formato de texto simples
const listsongs = songs =>
  songs.map(song => `${song.id} - "${song.title}" (${song.artist}, ${song.year})`).join('\n')

// Lista apenas as músicas de um autor específico
const listsongsByArtist = (songs, artistName) =>
  songs.filter(song => song.artist === artistName)

// Retorna uma lista de todos os artistas/cantores únicos
const listSingers = (songs, letra) => {
  const autores = songs.map(song => song.artist);
  const autoresUnicos = autores.filter((value, index, self) => recursiveIndexOf(self, value) === index);
  return autoresUnicos;
}

const listSingersByLetters = (songs, letra) => {
  if (!letra || toLower(letra) === "all") {
    return autoresUnicos;
  }
  return autoresUnicos.filter(autor => toLower(autor[0]) === toLower(letra));
}


// Conta quantas músicas cada autor possui
// Exemplo de retorno: { "Queen": 5, "Michael Jackson": 8 }
const countsongsByArtist = (songs) =>
  songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1
    return acc
  }, {})

// Permite formatar a lista de músicas de forma flexível
// Recebe uma função "formatFn" que define como cada música deve aparecer
const formatsongs = (songs, formatFn) =>
  songs.map((song, index) => formatFn(song, index)).join('\n')

// Formatação curta: apenas o título com numeração
const shortFormat = (song, i) => `${i + 1}. ${song.title}`

// Formatação completa: id, título, autor e ano
const fullFormat = song =>
  `${song.id} - "${song.title}" (${song.artist}, ${song.year})`

// ========================
// Transformações adicionais
// ========================

// Marca músicas antigas com base em um ano de corte
// Adiciona a propriedade "old: true/false"
const markOldsongs = (songs, cutoffYear) =>
  songs.map(song => ({ ...song, old: song.year < cutoffYear }))

// Adiciona uma categoria com base no artista (função fornecida pelo usuário)
const addCategoryByArtist = (songs, classifyArtistFn) =>
  songs.map(song => ({ ...song, category: classifyArtistFn(song.artist) }))

// Aplica uma transformação nos títulos das músicas (ex: deixar tudo maiúsculo)
const updateTitles = (songs, transformFn) =>
  songs.map(song => ({ ...song, title: transformFn(song.title) }))

// Permite renomear os campos de cada música (ex: trocar "title" por "nome")
const renameFields = (songs, renamerFn) =>
  songs.map(song => renamerFn(song))

// ========================
// Favoritos e Playlist
// ========================

// Alternar Favoritos
const toggleFavorite = (songs, id) =>
   songs.map(song => song.id === id ? { ...song, favorite: !song.favorite } : song);

//Pega os Favoritos
const getFavoriteSongs = songs => songs.filter(song => song.favorite);

// Cria nova Plylist
const createPlaylist = (playlists, name) => { 
  const newPlaylist = {
    id: Date.now(), name, songs: [], created: new Date().toISOString() 
  }
  return [...playlists, newPlaylist]
}

// Adciona músicas na Plylist//
const addSongToPlaylist = (playlists, playlistId, songId) =>
  playlists.map(playlist =>
    playlist.id === playlistId
      ? { ...playlist, songs: [...playlist.songs, songId] }
      : playlist
  )

// Remove músicas da Plylist//
const removeFromPlaylist = (playlists, playlistId, songId) =>
  playlists.map(playlist =>

playlist.id === playlistId
    ? { ...playlist, songs: playlist.songs.filter(id => id !== songId) }
  : playlist
)

// Deleta Playlist//
const deletePlaylist = (playlists, playlistId) =>
  playlists.filter(playlist => playlist.id !== playlistId)

// Pega as músicas de uma Plylist//
const getPlaylistSongs = (playlists, playlistId, allsongs) => {
  const playlist = playlists.find(p => p.id === playlistId)
  if (!playlist) return []
  return allsongs.filter(song => playlist.songs.includes(song.id))
}

// ========================
// Auxiliares
// ========================
// Função recursiva para encontrar o índice de um elemento em um array
const recursiveIndexOf = (lista, valorBuscado, i = 0) => {
  if (i >= tamanho(lista)) return -1;
  if (lista[i] === valorBuscado) return i;
  return recursiveIndexOf(lista, valorBuscado, i + 1);
}

//-------------Length com recursividade-------------------
const tamanho = ([x, ...xs]) => x === undefined ? 0 : 1 + tamanho(xs)

// ---------------Split com recursividade --------------
const slipAux = (char, separadores, i = 0) => {
  if (i === tamanho(separadores)) { return false }
  if (char === separadores[i]) { return true }
  return slipAux(char, separadores, i + 1)
}

const meuSplit = (texto, separadores, indice = 0, palavraAtual = "") => {
  //Condição de parada
  if (indice === tamanho(texto)) { return palavraAtual === "" ? [] : [palavraAtual] }

  const letra = texto[indice];
  const separador = slipAux(letra, separadores);

  if (separador) {
    return palavraAtual === ""
      ? meuSplit(texto, separadores, indice + 1, "")
      : [palavraAtual, ...meuSplit(texto, separadores, indice + 1, "")]
  } else {
    return meuSplit(texto, separadores, indice + 1, palavraAtual + letra)
  }
}

//------------------ Strip com recursividade --------------------
const buildString = (str, inicio, fim, strNoSpaces = "") => {
  return inicio > fim
    ? strNoSpaces
    : buildString(str, inicio + 1, fim, strNoSpaces + str[inicio])
}

const myStrip = (str, inicio = 0, fim = tamanho(str) - 1) => {
  if (inicio > fim) { return "" }
  if (str[inicio] === " ") { return myStrip(str, inicio + 1, fim) }
  if (str[fim] === " ") { return myStrip(str, inicio, fim - 1) }

  return buildString(str, inicio, fim)
}

// ------------ Lower com recursividade --------
const toLowerAux = (letra) => {
  const minusculas = "abcdefghijklmnopqrstuvwxyz"
  const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const encontrarLetra = (i = 0) => {
    if (i > tamanho(maiusculas)) { return letra }
    return letra === maiusculas[i]
      ? minusculas[i]
      : encontrarLetra(i + 1)
  }
  return encontrarLetra()
}

const toLower = (texto, inicio = 0, fim = tamanho(texto), resultado = "") => {
  if (inicio === fim) { return resultado }

  const letra = toLowerAux(texto[inicio])

  return toLower(texto, inicio + 1, fim, resultado + letra)
}


// ========================
// Exporta todas as funções como um objeto Musify
// Isso facilita o uso em outros arquivos (ex: ui.js)
// ========================
export const Musify = {

  // Sistema de favoritos e playlist
  toggleFavorite, getFavoriteSongs, createPlaylist, addSongToPlaylist,
  removeFromPlaylist, deletePlaylist, getPlaylistSongs,

  // Persistência
  loadSongs, saveSongs, resetSongs, clearSongs,

  // CRUD
  addSong, updateSong, deleteSong,

  // Exibição
  listsongs, listsongsByArtist, countsongsByArtist,
  formatsongs, shortFormat, fullFormat, listSingers, listSingersByLetters,

  // Transformações
  markOldsongs, addCategoryByArtist, updateTitles, renameFields
}