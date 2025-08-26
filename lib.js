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
const books = [{ id: 1, title: "Bohemian Rhapsody", author: "Queen", year: 1975, genre: "Rock", imagem: "imagens/BohemianRhapsody.jpg", spotifyId: "4u7EnebtmKWzUH433cf5Qv" },
  { id: 2, title: "Garota de Ipanema", author: "Tom Jobim & Vinicius de Moraes", year: 1962, genre: "Bossa Nova", spotifyId: "1V3oqAXt5Xiyj3RtHHLZ8O" },
  { id: 3, title: "Billie Jean", author: "Michael Jackson", year: 1982, genre: "Pop", spotifyId: "7J1uxwnxfQLu4APicE5Rnj" },
  { id: 4, title: "Smells Like Teen Spirit", author: "Nirvana", year: 1991, genre: "Grunge", spotifyId: "4AYxbcsoSAh8lIyYzdWI8I" },
  { id: 5, title: "No Woman, No Cry", author: "Bob Marley", year: 1974, genre: "Reggae", spotifyId: "423hwXFgoN8RYmqLoLuVvY" },
  { id: 6, title: "Like a Rolling Stone", author: "Bob Dylan", year: 1965, genre: "Folk Rock", spotifyId: "7JPQnsEfbXDNf1fo4djmZF" },
  { id: 7, title: "Clube da Esquina Nº 2", author: "Milton Nascimento & Lô Borges", year: 1972, genre: "MPB", spotifyId: "5Ce7UBu9aKfg2VZE4v8yvn" },
  { id: 8, title: "Imagine", author: "John Lennon", year: 1971, genre: "Soft Rock", spotifyId: "29U7stRjqHU6rMiS8BfaI9" },
  { id: 9, title: "Yesterday", author: "The Beatles", year: 1965, genre: "Rock", spotifyId: "3BQHpFgAp4l80e1XslIjNI" },
  { id: 10, title: "Aquarela do Brasil", author: "Ary Barroso", year: 1939, genre: "Samba", spotifyId: "15CKbJwxAhzEcqFlhQ9PFp" },
  { id: 11, title: "Asa Branca", author: "Luiz Gonzaga", year: 1947, genre: "Forró", spotifyId: "4HH7tAjimHWnlLJZDFYQQ1" },
  { id: 12, title: "What a Wonderful World", author: "Louis Armstrong", year: 1967, genre: "Jazz", spotifyId: "29U7stRjqHU6rMiS8BfaI9" },
  { id: 13, title: "Hotel California", author: "Eagles", year: 1976, genre: "Rock", spotifyId: "40riOy7x9W7GXjyGp4pjAv" },
  { id: 14, title: "Stairway to Heaven", author: "Led Zeppelin", year: 1971, genre: "Rock", spotifyId: "5CQ30WqJwcep0pYcV4AMNc" },
  { id: 15, title: "Águas de Março", author: "Tom Jobim & Elis Regina", year: 1972, genre: "MPB", spotifyId: "1y7OxO5i6sfrHXAmUM77YG" },
  { id: 16, title: "Detalhes", author: "Roberto Carlos", year: 1971, genre: "MPB", spotifyId: "6GklxoRGZuxbyXn6BO9w4P" },
  { id: 17, title: "Construção", author: "Chico Buarque", year: 1971, genre: "MPB", spotifyId: "0VUgbCK0k8QWGpLiEV8YYZ" },
  { id: 18, title: "O Mundo é um Moinho", author: "Cartola", year: 1976, genre: "Samba", spotifyId: "3PavsmA9S6QA5lNmmsuOif" },
  { id: 19, title: "Trem das Onze", author: "Adoniran Barbosa", year: 1964, genre: "Samba", spotifyId: "2TI5GBkbrrFtZRM5v1heeb" },
  { id: 20, title: "Sampa", author: "Caetano Veloso", year: 1978, genre: "MPB", spotifyId: "2VBN5kSs1fyiE5fnOYeKsG" },
  { id: 21, title: "Só Tinha de Ser com Você", author: "Elis Regina & Tom Jobim", year: 1974, genre: "Bossa Nova", spotifyId: "0NgHrYujmDe8iSkailmd05" },
  { id: 22, title: "Rosa", author: "Pixinguinha", year: 1917, genre: "Choro", spotifyId: "28FsqnHmaiNqgiIcPwhWvT" },
  { id: 23, title: "Thriller", author: "Michael Jackson", year: 1982, genre: "Pop", spotifyId: "20efeySIfZoiSaISGLBbNs" },
  { id: 24, title: "Let It Be", author: "The Beatles", year: 1970, genre: "Rock", spotifyId: "7iN1s7xHE4ifF5povM6A48" },
  { id: 25, title: "Evidências", author: "Chitãozinho & Xororó", year: 1990, genre: "Sertanejo", spotifyId: "1X95pCQG939KCbJL6yVQgw" },
  { id: 26, title: "Chega de Saudade", author: "João Gilberto", year: 1959, genre: "Bossa Nova", spotifyId: "0FeWwTN4MVjp4yToGMLRF4" },
  { id: 27, title: "O Leãozinho", author: "Caetano Veloso", year: 1977, genre: "MPB", spotifyId: "4LhxdvP3lfgH3ciOyO1BX1" },
  { id: 28, title: "País Tropical", author: "Jorge Ben Jor", year: 1969, genre: "Samba Rock", spotifyId: "4877bJ149OUJZHTiU5Jg8P" },
  { id: 29, title: "Cálice", author: "Chico Buarque & Gilberto Gil", year: 1973, genre: "MPB", spotifyId: "3ntkJVSYJIPDKBJj2uYLRa" },
  { id: 30, title: "Panis et Circenses", author: "Os Mutantes & Gilberto Gil", year: 1968, genre: "Tropicália", spotifyId: "0Dmnb3C3GaGdyjlyWaWLDr" },
  { id: 31, title: "Andar com Fé", author: "Gilberto Gil", year: 1982, genre: "MPB", spotifyId: "2BvDFQOl4JieEGK2cgKOey" },
  { id: 32, title: "Menino do Rio", author: "Caetano Veloso", year: 1979, genre: "MPB", spotifyId: "4DeYRatKHPJECIhvIAcfGC" },
  { id: 33, title: "Tempo Perdido", author: "Legião Urbana", year: 1986, genre: "Rock Brasileiro", spotifyId: "57UtOUa6Rgp5s8xPbsEtTv" },
  { id: 34, title: "Pra Não Dizer que Não Falei das Flores", author: "Geraldo Vandré", year: 1968, genre: "MPB", spotifyId: "78lTDfRCqtxSvByIRMiXF2" },
  { id: 35, title: "Apenas Mais Uma de Amor", author: "Lulu Santos", year: 1986, genre: "Pop Rock", spotifyId: "6YNCE5qtrTa7YcnAOAEsDQ" },
  { id: 36, title: "Lanterna dos Afogados", author: "Paralamas do Sucesso", year: 1989, genre: "Rock Brasileiro", spotifyId: "7u2dLvfzLcIBdTtswsaL7i" },
  { id: 37, title: "Metamorfose Ambulante", author: "Raul Seixas", year: 1973, genre: "Rock Brasileiro", spotifyId: "2Yk0HvfTaijA47aM0Fj88u" },
  { id: 38, title: "Domingo no Parque", author: "Gilberto Gil", year: 1967, genre: "Tropicália", spotifyId: "0HMa3XCtloTdy3cL00lWNz" },
  { id: 39, title: "Flores", author: "Titãs", year: 1989, genre: "Rock Brasileiro", spotifyId: "7p1kRO0ysz7EnYSCeDnsXn" },
  { id: 40, title: "Será", author: "Legião Urbana", year: 1985, genre: "Rock Brasileiro", spotifyId: "38qT8Jupxr2lgdIAJNq8Tz" },
  { id: 41, title: "Gita", author: "Raul Seixas", year: 1974, genre: "Rock Brasileiro", spotifyId: "1DYzTTaSD8KsmzedIuZTO7" },
  { id: 42, title: "Caminhando (Pra Não Dizer que Não Falei das Flores)", author: "Geraldo Vandré", year: 1968, genre: "Protesto/MPB", spotifyId: "3Xx06WzioypZaMOzxQ3xyc" },
  { id: 43, title: "Wish You Were Here", author: "Pink Floyd", year: 1975, genre: "Progressive Rock", spotifyId: "6mFkJmJqdDVQ1REhVfGgd1" },
  { id: 44, title: "Hey Jude", author: "The Beatles", year: 1968, genre: "Rock", spotifyId: "0OCU3aksJvvs4kejv48oLD" },
  { id: 45, title: "Lose Yourself", author: "Eminem", year: 2002, genre: "Hip Hop", spotifyId: "213x4gsFDm04hSqIUkg88w" },
  { id: 46, title: "Juízo Final", author: "Nelson Cavaquinho", year: 1973, genre: "Samba", spotifyId: "6jpuvDQtHOp15xcy0oqeaS" },
  { id: 47, title: "Canto de Ossanha", author: "Baden Powell & Vinicius de Moraes", year: 1966, genre: "Bossa Nova", spotifyId: "76bNcEBsBn8gbzwcU1QlRK" },
  { id: 48, title: "Killing in the Name", author: "Rage Against the Machine", year: 1992, genre: "Rap Metal", spotifyId: "3FUS56gKr9mVBmzvlnodlh" },
  { id: 49, title: "Smells Like Teen Spirit", author: "Nirvana", year: 1991, genre: "Grunge", spotifyId: "4AYxbcsoSAh8lIyYzdWI8I" },
  { id: 50, title: "Shape of You", author: "Ed Sheeran", year: 2017, genre: "Pop", spotifyId: "65gHs4yzO6y2Z0ZdLtDoEu" }
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
const listSingers = (books, letra) => {
  const autores = books.map(book => book.author);
  const autoresUnicos = autores.filter((value, index, self) => recursiveIndexOf(self, value) === index);
  return autoresUnicos;
}

const listSingersByLetters = (books, letra) => {
  if (!letra || toLower(letra) === "all") {
    return autoresUnicos;
  }
  return autoresUnicos.filter(autor => toLower(autor[0]) === toLower(letra));
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
  const recursiveIndexOf = (lista, valorBuscado, i = 0) => {
		if (i >= tamanho(lista)) return -1;
		if (lista[i] === valorBuscado) return i;
		return recursiveIndexOf(lista, valorBuscado, i + 1);
	}

  //-------------Length com recursividade-------------------
	const tamanho = ([x, ...xs]) => x === undefined ? 0 : 1 + tamanho(xs)
	
	// ---------------Split com recursividade --------------
	const slipAux = (char, separadores, i = 0) => {
		if (i === tamanho(separadores)) {return false}     
		if (char === separadores[i]) {return true} 
		return slipAux(char, separadores, i + 1)     
	}

	const meuSplit = (texto, separadores, indice = 0, palavraAtual = "") => {
		//Condição de parada
		if (indice === tamanho(texto)) {return palavraAtual === "" ? [] : [palavraAtual]}

		const letra = texto[indice];         
		const separador = slipAux(letra, separadores);

		if (separador) {return palavraAtual === "" 
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
		if (inicio > fim) {return ""}
		if (str[inicio] === " ") {return myStrip(str, inicio + 1, fim)}
		if (str[fim] === " ") {return myStrip(str, inicio, fim - 1)}

		return buildString(str, inicio, fim)
	}
	
	// ------------ Lower com recursividade --------
	const toLowerAux = (letra) => {
		const minusculas = "abcdefghijklmnopqrstuvwxyz"
		const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		
		const encontrarLetra = (i = 0) => {
			if (i > tamanho(maiusculas)) {return letra}
			return letra === maiusculas[i]
			? minusculas[i]
			: encontrarLetra(i + 1)
		}
		return encontrarLetra()
	}
	
	const toLower = (texto, inicio = 0, fim = tamanho(texto), resultado = "") => {
		if (inicio === fim) {return resultado}
		
		const letra = toLowerAux(texto[inicio])
		
		return toLower(texto, inicio + 1, fim, resultado + letra)
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
  formatBooks, shortFormat, fullFormat, listSingers, listSingersByLetters,

  // Transformações
  markOldBooks, addCategoryByAuthor, updateTitles, renameFields
}