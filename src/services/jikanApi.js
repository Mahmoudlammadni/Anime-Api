const BASE_URL = 'https://api.jikan.moe/v4';
const CACHE_TTL = 10 * 60 * 1000;
const MIN_INTERVAL = 500;
const MAX_RETRIES = 3;
const RETRY_DELAYS = [2000, 4000, 8000];

const cache = new Map();
const inflight = new Map();
const queue = [];
let processing = false;
let lastRequestTime = 0;

async function processQueue() {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const { url, resolve, reject, retries } = queue.shift();

    try {
      const now = Date.now();
      const wait = Math.max(0, MIN_INTERVAL - (now - lastRequestTime));
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));

      lastRequestTime = Date.now();
      const res = await fetch(url);

      if (res.status === 429 && retries > 0) {
        const delay = RETRY_DELAYS[MAX_RETRIES - retries];
        await new Promise((r) => setTimeout(r, delay));
        queue.unshift({ url, resolve, reject, retries: retries - 1 });
        continue;
      }

      if (!res.ok) {
        reject(new Error(`Jikan API error: ${res.status} ${res.statusText}`));
        continue;
      }

      const data = await res.json();
      cache.set(url, { data, timestamp: Date.now() });
      resolve(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        queue.unshift({ url, resolve, reject, retries });
        continue;
      }
      reject(err);
    }
  }

  processing = false;
}

async function apiFetch(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  if (inflight.has(url)) {
    return inflight.get(url);
  }

  const promise = new Promise((resolve, reject) => {
    queue.push({ url, resolve, reject, retries: MAX_RETRIES });
    processQueue();
  });

  inflight.set(
    url,
    promise.finally(() => inflight.delete(url))
  );
  return promise;
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
