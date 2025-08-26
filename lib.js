// Chave usada no localStorage para salvar os livros
const STORAGE_KEY = "livraria::books"

// ========================
// Persistência (salvar, carregar, limpar os dados)
// ========================

// Carrega a lista de livros do localStorage
// Se não existir nada salvo, retorna um array vazio
const loadBooks = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// Salva a lista de livros no localStorage (convertendo para texto JSON)
const saveBooks = books =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))

// Remove todos os livros do localStorage
const clearBooks = () => {
  localStorage.removeItem(STORAGE_KEY)
  console.log("Livraria limpa.")
}

// Restaura uma lista inicial de livros (pré-cadastrados)
// Útil para resetar o sistema com dados de exemplo
const resetBooks = () => {
const books = [
  { id: 1, title: "Bohemian Rhapsody", author: "Queen", year: 1975, genre: "Rock", imagem: "imagens/BohemianRhapsody.jpg" },
  { id: 2, title: "Garota de Ipanema", author: "Tom Jobim & Vinicius de Moraes", year: 1962, genre: "Bossa Nova" },
  { id: 3, title: "Billie Jean", author: "Michael Jackson", year: 1982, genre: "Pop" },
  { id: 4, title: "Smells Like Teen Spirit", author: "Nirvana", year: 1991, genre: "Grunge" },
  { id: 5, title: "No Woman, No Cry", author: "Bob Marley", year: 1974, genre: "Reggae" },
  { id: 6, title: "Like a Rolling Stone", author: "Bob Dylan", year: 1965, genre: "Folk Rock" },
  { id: 7, title: "Clube da Esquina Nº 2", author: "Milton Nascimento & Lô Borges", year: 1972, genre: "MPB" },
  { id: 8, title: "Imagine", author: "John Lennon", year: 1971, genre: "Soft Rock" },
  { id: 9, title: "Yesterday", author: "The Beatles", year: 1965, genre: "Rock" },
  { id: 10, title: "Aquarela do Brasil", author: "Ary Barroso", year: 1939, genre: "Samba" },
  { id: 11, title: "Asa Branca", author: "Luiz Gonzaga", year: 1947, genre: "Forró" },
  { id: 12, title: "What a Wonderful World", author: "Louis Armstrong", year: 1967, genre: "Jazz" },
  { id: 13, title: "Hotel California", author: "Eagles", year: 1976, genre: "Rock" },
  { id: 14, title: "Stairway to Heaven", author: "Led Zeppelin", year: 1971, genre: "Rock" },
  { id: 15, title: "Águas de Março", author: "Tom Jobim & Elis Regina", year: 1972, genre: "MPB" },
  { id: 16, title: "Detalhes", author: "Roberto Carlos", year: 1971, genre: "MPB" },
  { id: 17, title: "Construção", author: "Chico Buarque", year: 1971, genre: "MPB" },
  { id: 18, title: "O Mundo é um Moinho", author: "Cartola", year: 1976, genre: "Samba" },
  { id: 19, title: "Trem das Onze", author: "Adoniran Barbosa", year: 1964, genre: "Samba" },
  { id: 20, title: "Sampa", author: "Caetano Veloso", year: 1978, genre: "MPB" },
  { id: 21, title: "Só Tinha de Ser com Você", author: "Elis Regina & Tom Jobim", year: 1974, genre: "Bossa Nova" },
  { id: 22, title: "Rosa", author: "Pixinguinha", year: 1917, genre: "Choro" },
  { id: 23, title: "Thriller", author: "Michael Jackson", year: 1982, genre: "Pop" },
  { id: 24, title: "Let It Be", author: "The Beatles", year: 1970, genre: "Rock" },
  { id: 25, title: "Evidências", author: "Chitãozinho & Xororó", year: 1990, genre: "Sertanejo" },
  { id: 26, title: "Chega de Saudade", author: "João Gilberto", year: 1959, genre: "Bossa Nova" },
  { id: 27, title: "O Leãozinho", author: "Caetano Veloso", year: 1977, genre: "MPB" },
  { id: 28, title: "País Tropical", author: "Jorge Ben Jor", year: 1969, genre: "Samba Rock" },
  { id: 29, title: "Cálice", author: "Chico Buarque & Gilberto Gil", year: 1973, genre: "MPB" },
  { id: 30, title: "Panis et Circenses", author: "Os Mutantes & Gilberto Gil", year: 1968, genre: "Tropicália" },
  { id: 31, title: "Andar com Fé", author: "Gilberto Gil", year: 1982, genre: "MPB" },
  { id: 32, title: "Menino do Rio", author: "Caetano Veloso", year: 1979, genre: "MPB" },
  { id: 33, title: "Tempo Perdido", author: "Legião Urbana", year: 1986, genre: "Rock Brasileiro" },
  { id: 34, title: "Pra Não Dizer que Não Falei das Flores", author: "Geraldo Vandré", year: 1968, genre: "MPB" },
  { id: 35, title: "Apenas Mais Uma de Amor", author: "Lulu Santos", year: 1986, genre: "Pop Rock" },
  { id: 36, title: "Lanterna dos Afogados", author: "Paralamas do Sucesso", year: 1989, genre: "Rock Brasileiro" },
  { id: 37, title: "Metamorfose Ambulante", author: "Raul Seixas", year: 1973, genre: "Rock Brasileiro" },
  { id: 38, title: "Domingo no Parque", author: "Gilberto Gil", year: 1967, genre: "Tropicália" },
  { id: 39, title: "Flores", author: "Titãs", year: 1989, genre: "Rock Brasileiro" },
  { id: 40, title: "Será", author: "Legião Urbana", year: 1985, genre: "Rock Brasileiro" },
  { id: 41, title: "Gita", author: "Raul Seixas", year: 1974, genre: "Rock Brasileiro" },
  { id: 42, title: "Caminhando (Pra Não Dizer que Não Falei das Flores)", author: "Geraldo Vandré", year: 1968, genre: "Protesto/MPB" },
  { id: 43, title: "Wish You Were Here", author: "Pink Floyd", year: 1975, genre: "Progressive Rock" },
  { id: 44, title: "Hey Jude", author: "The Beatles", year: 1968, genre: "Rock" },
  { id: 45, title: "Lose Yourself", author: "Eminem", year: 2002, genre: "Hip Hop" },
  { id: 46, title: "Juízo Final", author: "Nelson Cavaquinho", year: 1973, genre: "Samba" },
  { id: 47, title: "Canto de Ossanha", author: "Baden Powell & Vinicius de Moraes", year: 1966, genre: "Bossa Nova" },
  { id: 48, title: "Killing in the Name", author: "Rage Against the Machine", year: 1992, genre: "Rap Metal" },
  { id: 49, title: "Smells Like Teen Spirit", author: "Nirvana", year: 1991, genre: "Grunge" },
  { id: 50, title: "Shape of You", author: "Ed Sheeran", year: 2017, genre: "Pop" }
]


  saveBooks(books) // salva os livros no localStorage
  console.log("Livros iniciais salvos.")
  return books              // retorna os livros
}

// ========================
// CRUD funcional (Create, Read, Update, Delete)
// ========================

// Adiciona um novo livro (retorna um novo array)
const addBook = (books, newBook) => [...books, newBook]

// Atualiza um livro existente (caso encontre o id)
const updateBook = (books, id, updates) =>
  books.map(book => (book.id === id ? { ...book, ...updates } : book))

// Remove um livro pelo id
const deleteBook = (books, id) =>
  books.filter(book => book.id !== id)

// ========================
// Listagem e formatação
// ========================

// Lista os livros em formato de texto simples
const listBooks = books =>
  books.map(book => `${book.id} - "${book.title}" (${book.author}, ${book.year})`).join('\n')

// Lista apenas os livros de um autor específico
const listBooksByAuthor = (books, authorName) =>
  books.filter(book => book.author === authorName)

// Listagem de cantores
const listSingers = (books) => {
  const autores = books.map(book => book.author);
  const autoresUnicos = autores.filter((value, index, self) => recursiveIndexOf(self, value) === index);
  return autoresUnicos;
}

// Conta quantos livros cada autor possui
// Exemplo de retorno: { "Machado de Assis": 5, "Jorge Amado": 8 }
const countBooksByAuthor = (books) =>
  books.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1
    return acc
  }, {})

// Permite formatar a lista de livros de forma flexível
// Recebe uma função "formatFn" que define como cada livro deve aparecer
const formatBooks = (books, formatFn) =>
  books.map((book, index) => formatFn(book, index)).join('\n')

// Formatação curta: apenas o título com numeração
const shortFormat = (book, i) => `${i + 1}. ${book.title}`

// Formatação completa: id, título, autor e ano
const fullFormat = book =>
  `${book.id} - "${book.title}" (${book.author}, ${book.year})`

// ========================
// Transformações adicionais
// ========================

// Marca livros antigos com base em um ano de corte
// Adiciona a propriedade "old: true/false"
const markOldBooks = (books, cutoffYear) =>
  books.map(book => ({ ...book, old: book.year < cutoffYear }))

// Adiciona uma categoria com base no autor (função fornecida pelo usuário)
const addCategoryByAuthor = (books, classifyAuthorFn) =>
  books.map(book => ({ ...book, category: classifyAuthorFn(book.author) }))

// Aplica uma transformação nos títulos (ex: deixar tudo maiúsculo)
const updateTitles = (books, transformFn) =>
  books.map(book => ({ ...book, title: transformFn(book.title) }))

// Permite renomear os campos de cada livro (ex: trocar "title" por "nome")
const renameFields = (books, renamerFn) =>
  books.map(book => renamerFn(book))

// ========================
// Auxiliares
// ========================
// Função recursiva para encontrar o índice de um elemento em um array
function recursiveIndexOf(arr, value, start = 0) {
  if (start >= arr.length) return -1; // Não encontrado
  if (arr[start] === value) return start; // Encontrou
  return recursiveIndexOf(arr, value, start + 1);
}
// ========================
// Exporta todas as funções como um objeto Livraria
// Isso facilita o uso em outros arquivos (ex: ui.js)
// ========================
export const Livraria = {
  // Persistência
  loadBooks, saveBooks, resetBooks, clearBooks,

  // CRUD
  addBook, updateBook, deleteBook,

  // Exibição
  listBooks, listBooksByAuthor, countBooksByAuthor,
  formatBooks, shortFormat, fullFormat, listSingers,

  // Transformações
  markOldBooks, addCategoryByAuthor, updateTitles, renameFields
}