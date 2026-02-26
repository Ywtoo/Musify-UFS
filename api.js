// =====================================================================
// MUSIFY - MÓDULO DE APIs EXTERNAS
// =====================================================================
// Este arquivo centraliza todas as integrações com APIs externas:
// - iTunes API: Preview de músicas e capas de álbuns
// - Wikipedia API: Imagens de artistas
// - Last.fm API: Informações e fotos de artistas
// =====================================================================

// Cache global de imagens para evitar requisições duplicadas
const imageCache = new Map();

// =====================================================================
// SEÇÃO 1: FUNÇÕES UTILITÁRIAS
// =====================================================================

/**
 * Pausa a execução por um tempo determinado (útil para rate limiting de APIs)
 * @param {number} ms - Tempo em milissegundos
 * @returns {Promise} Promise que resolve após o tempo especificado
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função genérica para buscar dados de APIs externas com cache
 * @param {string} url - URL da API a ser consultada
 * @returns {Promise<Object>} Dados retornados pela API
 */
export async function fetchApi(url) {
  try {
    // Verifica se a URL já está no cache
    if (imageCache.has(url)) {
      return imageCache.get(url);
    }

    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    imageCache.set(url, data);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    return {};
  }
}

// =====================================================================
// SEÇÃO 2: iTunes API
// =====================================================================

/**
 * Busca URL de preview de uma música no iTunes
 * @param {string} query - Termo de busca (título + artista)
 * @returns {Promise<string|null>} URL do preview ou null
 */
export async function fetchItunesPreview(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
  const data = await fetchApi(url);
  const result = data.results?.[0];
  return result?.previewUrl || null;
}

/**
 * Busca a capa de um álbum no iTunes
 * @param {string} query - Nome do álbum + artista
 * @returns {Promise<string|null>} URL da imagem ou null
 */
export async function getItunesAlbumImage(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=1`;
  const data = await fetchApi(url);
  if (data.results && data.results.length > 0) {
    // Consegue uma imagem de resolução melhor
    return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
  }
  return null;
}

/**
 * Busca a capa de uma música específica no iTunes
 * @param {string} title - Título da música
 * @param {string} artist - Nome do artista
 * @returns {Promise<string|null>} URL da imagem ou null
 */
export async function getItunesSongImage(title, artist) {
  const query = `${title} ${artist}`;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
  const data = await fetchApi(url);
  if (data.results && data.results.length > 0) {
    // Consegue uma imagem de resolução melhor
    return data.results[0].artworkUrl100?.replace('100x100bb', '600x600bb');
  }
  return null;
}

// =====================================================================
// SEÇÃO 3: Wikipedia API
// =====================================================================

/**
 * Busca uma imagem do Wikipedia para um artista
 * Tenta múltiplas variações do nome para aumentar as chances de sucesso
 * @param {string} query - Nome do artista
 * @returns {Promise<string|Array|null>} URL da imagem, array de URLs (duplas) ou null
 */
export async function getWikiImage(query) {
  const cleanQuery = query.replace(/^(os|as|the)\s+/i, '').trim();
  
  // Se for colaboração, busca para cada artista
  if (query.includes('&')) {
    const parts = query.split('&').map(p => p.trim());
    const images = [];
    for (const part of parts) {
      const img = await getWikiImage(part);
      if (img) images.push(img);
      await sleep(200);
    }
    return images.length > 0 ? images : null;
  }

  const andQuery = cleanQuery.replace(/&/g, 'and');
  const noSpaceQuery = cleanQuery.replace(/\s+/g, '');
  const asciiQuery = cleanQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Lista de variações do nome para tentar
  const variants = [
    query, cleanQuery, andQuery, noSpaceQuery, asciiQuery,
    `${cleanQuery} (band)`, `${cleanQuery} (group)`, `${cleanQuery} (duo)`,
    `${cleanQuery} (musician)`, `${cleanQuery} (singer)`, `${cleanQuery} (artist)`,
    `${cleanQuery} (rapper)`, `${cleanQuery} (composer)`, `${cleanQuery} (producer)`,
    `${cleanQuery} (DJ)`, `${andQuery} (band)`, `${andQuery} (group)`, `${andQuery} (duo)`,
    `${asciiQuery} (band)`, `${asciiQuery} (group)`, `${asciiQuery} (duo)`
  ];

  // Tenta cada variação até encontrar uma imagem
  for (const variant of variants) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(variant)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
    const data = await fetchApi(url);
    if (data.query && data.query.pages) {
      const pages = data.query.pages;
      for (const pageId in pages) {
        if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
          return pages[pageId].thumbnail.source;
        }
      }
    }
    await sleep(200);
  }
  return null;
}

// =====================================================================
// SEÇÃO 4: Last.fm API
// =====================================================================

/**
 * Busca imagem de um artista no Last.fm
 * @param {string} artistName - Nome do artista
 * @returns {Promise<string|null>} URL da imagem ou null
 */
export async function getLastFmArtistImage(artistName) {
  const apiKey = '254828efebce648b8c698471e2cd36d0';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&autocorrect=1`;
  const data = await fetchApi(url);
  const artist = data.artist;
  if (artist && artist.image && artist.image.length > 0) {
    const imgObj = artist.image.reverse().find(img =>
      img['#text'] && !img['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f.png')
    );
    if (imgObj && imgObj['#text']) return imgObj['#text'];
  }
  return null;
}

/**
 * Busca informações completas de um artista (imagem, URL, estatísticas, tags)
 * Combina dados do Wikipedia e Last.fm
 * @param {string} artist - Nome do artista
 * @returns {Promise<Object>} Objeto com imgUrl, url, listeners e tags
 */
export async function fetchArtistInfo(artist) {
  // Busca imagem específica na Wikipedia para artistas
  const imgUrl = await fetchBestImage(artist, true);

  // Busca dados do Last.fm
  const apiKey = '254828efebce648b8c698471e2cd36d0';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json&autocorrect=1`;
  const data = await fetchApi(url);

  return {
    imgUrl,
    url: data.artist?.url,
    listeners: data.artist?.stats?.listeners,
    tags: data.artist?.tags?.tag?.map(t => t.name).join(', ')
  };
}

// =====================================================================
// SEÇÃO 5: BUSCA INTELIGENTE DE IMAGENS
// =====================================================================

/**
 * Busca a melhor imagem disponível tentando múltiplas fontes
 * Para artistas: Wikipedia → Last.fm
 * Para músicas/álbuns: iTunes
 * @param {string} query - Termo de busca
 * @param {boolean} isArtist - Se true, busca imagem de artista; se false, de álbum/música
 * @returns {Promise<string|null>} URL da melhor imagem encontrada ou null
 */
export async function fetchBestImage(query, isArtist = false) {
  try {
    // Se for uma busca por artista, prioriza a Wikipedia
    if (isArtist) {
      try {
        // Primeiro tenta no Wikipedia
        const wikiImg = await getWikiImage(query);
        if (wikiImg) return wikiImg;
      } catch (e) {
        console.log("Erro ao buscar imagem da Wikipedia:", e);
      }

      try {
        // Depois no Last.fm
        const lastFmImg = await getLastFmArtistImage(query);
        if (lastFmImg) return lastFmImg;
      } catch (e) {
        console.log("Erro ao buscar imagem no Last.fm:", e);
      }
    }
    // Para álbuns e músicas, prioriza o iTunes
    else {
      try {
        // Busca diretamente no iTunes para álbuns/músicas
        const itunesImg = await getItunesAlbumImage(query);
        if (itunesImg) return itunesImg;
      } catch (e) {
        console.log("Erro ao buscar imagem do álbum no iTunes:", e);
      }
    }

    // Retorna null se não achar a imagem
    return null;
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return null;
  }
}

// =====================================================================
// FIM DO ARQUIVO - API MODULE
// =====================================================================
