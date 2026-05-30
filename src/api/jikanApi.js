const BASE_URL = 'https://api.jikan.moe/v4';
const CACHE_TTL = 5 * 60 * 1000;

const cache = new Map();

async function apiFetch(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Jikan API error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();

  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

function clearCache() {
  cache.clear();
}

// ===== ANIME =====
export const animeService = {
  getList: (page = 1) => apiFetch(`${BASE_URL}/anime?page=${page}`),

  getTop: (filter = '', page = 1) => {
    const f = filter ? `&filter=${filter}` : '';
    return apiFetch(`${BASE_URL}/top/anime?page=${page}${f}`);
  },

  getDetails: (id) => apiFetch(`${BASE_URL}/anime/${id}/full`),

  getCharacters: (id) => apiFetch(`${BASE_URL}/anime/${id}/characters`),

  getStaff: (id) => apiFetch(`${BASE_URL}/anime/${id}/staff`),

  getRecommendations: (id) => apiFetch(`${BASE_URL}/anime/${id}/recommendations`),

  getRelations: (id) => apiFetch(`${BASE_URL}/anime/${id}/relations`),

  search: (query, page = 1) =>
    apiFetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`),

  getSeasonal: (year, season) =>
    apiFetch(`${BASE_URL}/anime?year=${year}&season=${season}`),

  getByGenre: (genreId, page = 1) =>
    apiFetch(`${BASE_URL}/anime?genres=${genreId}&page=${page}`),
};

// ===== CHARACTERS =====
export const characterService = {
  getDetails: (id) => apiFetch(`${BASE_URL}/characters/${id}/full`),

  search: (query) =>
    apiFetch(`${BASE_URL}/characters?q=${encodeURIComponent(query)}`),
};

// ===== MANGA =====
export const mangaService = {
  getTop: (page = 1) => apiFetch(`${BASE_URL}/top/manga?page=${page}`),

  getDetails: (id) => apiFetch(`${BASE_URL}/manga/${id}/full`),

  search: (query, page = 1) =>
    apiFetch(`${BASE_URL}/manga?q=${encodeURIComponent(query)}&page=${page}`),
};

// ===== GENRES =====
export const genreService = {
  getAnimeGenres: () => apiFetch(`${BASE_URL}/genres/anime`),

  getMangaGenres: () => apiFetch(`${BASE_URL}/genres/manga`),

  getAnimeByGenre: (genreId, page = 1) =>
    apiFetch(`${BASE_URL}/anime?genres=${genreId}&page=${page}`),
};

// ===== PEOPLE =====
export const peopleService = {
  getDetails: (id) => apiFetch(`${BASE_URL}/people/${id}/full`),

  search: (query) =>
    apiFetch(`${BASE_URL}/people?q=${encodeURIComponent(query)}`),
};

export { clearCache };
