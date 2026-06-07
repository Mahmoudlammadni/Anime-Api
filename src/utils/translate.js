const CACHE_KEY = 'api_translations';
const MAX_CACHE = 200;

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE) {
      const trimmed = {};
      const recent = keys.slice(-MAX_CACHE);
      recent.forEach((k) => { trimmed[k] = cache[k]; });
      localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch {
    /* localStorage full or unavailable */
  }
}

const cache = loadCache();

function cacheKey(text, target) {
  const t = text.slice(0, 500);
  return `${target}:${t}`;
}

export async function translateText(text, target) {
  if (!text || target === 'en') return text;

  const key = cacheKey(text, target);
  if (cache[key]) return cache[key];

  const maxLen = 2000;
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLen) {
    chunks.push(text.slice(i, i + maxLen));
  }

  const translated = await Promise.all(
    chunks.map((chunk) => translateChunk(chunk, target))
  );

  const result = translated.join('');
  cache[key] = result;
  saveCache(cache);
  return result;
}

async function translateChunk(text, target) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${target}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Translate error: ${res.status}`);
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch {
    return text;
  }
}
