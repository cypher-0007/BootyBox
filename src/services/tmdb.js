// ─────────────────────────────────────────────────────────────────────────────
// TMDB API Service
// All requests use Bearer token auth (recommended over api_key param)
// Docs: https://developer.themoviedb.org/reference
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

// ── Image URL helpers ────────────────────────────────────────────────────────
export const posterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = 'w1280') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const avatarUrl = (path, size = 'w185') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

// ── Genre ID → Name map (TMDB standard IDs) ─────────────────────────────────
export const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
  // TV-specific
  10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News',
  10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap',
  10767: 'Talk', 10768: 'War & Politics',
};

export const mapGenreIds = (ids = []) =>
  ids.slice(0, 3).map((id) => GENRE_MAP[id]).filter(Boolean);

// ── Runtime formatter ────────────────────────────────────────────────────────
export const formatRuntime = (mins) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

// ── Vote count formatter ─────────────────────────────────────────────────────
export const formatVotes = (n) => {
  if (!n) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
};

// ── Normalise a TMDB movie object → our app shape ───────────────────────────
export const normaliseMovie = (m) => ({
  id: `tmdb-movie-${m.id}`,
  tmdbId: m.id,
  title: m.title || m.original_title || 'Untitled',
  originalTitle: m.original_title,
  tagline: m.tagline || null,
  type: 'Movie',
  rating: m.vote_average ? +m.vote_average.toFixed(1) : 0,
  votes: formatVotes(m.vote_count),
  year: m.release_date ? new Date(m.release_date).getFullYear() : null,
  quality: '4K UHD',
  duration: formatRuntime(m.runtime),
  genres: m.genres
    ? m.genres.map((g) => g.name)
    : mapGenreIds(m.genre_ids),
  ageRating: m.adult ? '18+' : 'PG-13',
  audio: 'Multi-Lang',
  backdrop: backdropUrl(m.backdrop_path),
  poster: posterUrl(m.poster_path),
  overview: m.overview || '',
  director: null, // populated separately from credits
  cast: [],       // populated separately
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  trailerUrl: null, // populated separately from videos
  seasons: null,
});

// ── Normalise a TMDB TV show object → our app shape ─────────────────────────
export const normaliseTv = (t) => ({
  id: `tmdb-tv-${t.id}`,
  tmdbId: t.id,
  title: t.name || t.original_name || 'Untitled',
  originalTitle: t.original_name,
  tagline: t.tagline || null,
  type: t.genres?.some((g) => [16, 10762].includes(g.id)) ? 'Animation' : 'TV Series',
  rating: t.vote_average ? +t.vote_average.toFixed(1) : 0,
  votes: formatVotes(t.vote_count),
  year: t.first_air_date ? new Date(t.first_air_date).getFullYear() : null,
  quality: '4K HDR',
  duration: t.number_of_seasons
    ? `${t.number_of_seasons} Season${t.number_of_seasons > 1 ? 's' : ''}`
    : null,
  episodesCount: t.number_of_seasons ? `Season ${t.number_of_seasons}` : null,
  genres: t.genres
    ? t.genres.map((g) => g.name)
    : mapGenreIds(t.genre_ids),
  ageRating: t.adult ? '18+' : '16+',
  audio: 'Multi-Lang',
  backdrop: backdropUrl(t.backdrop_path),
  poster: posterUrl(t.poster_path),
  overview: t.overview || '',
  director: t.created_by?.map((c) => c.name).join(' & ') || null,
  cast: [],
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  trailerUrl: null,
  seasons: null,
});

// ── Core fetch helper ────────────────────────────────────────────────────────
const tmdbFetch = async (endpoint, params = {}) => {
  if (!ACCESS_TOKEN) {
    throw new Error('TMDB is not configured. Add VITE_TMDB_ACCESS_TOKEN to your .env file.');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let message = `TMDB request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.status_message) message = body.status_message;
    } catch {
      // Keep the HTTP status message when the response is not JSON.
    }
    throw new Error(message);
  }
  return res.json();
};

// ── Public API functions ─────────────────────────────────────────────────────

/** Trending movies + TV this week — used for hero banners */
export const fetchTrending = async (page = 1) => {
  const data = await tmdbFetch('/trending/all/week', { page });
  return data.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map((item) =>
    item.media_type === 'tv' ? normaliseTv(item) : normaliseMovie(item)
  );
};

/** Popular movies */
export const fetchPopularMovies = async (page = 1) => {
  const data = await tmdbFetch('/movie/popular', { page });
  return data.results.map(normaliseMovie);
};

/** Top-rated movies (used for Top 10 section) */
export const fetchTopRatedMovies = async (page = 1) => {
  const data = await tmdbFetch('/movie/top_rated', { page });
  return data.results.map(normaliseMovie);
};

/** Popular TV shows */
export const fetchPopularTV = async (page = 1) => {
  const data = await tmdbFetch('/tv/popular', { page });
  return data.results.map(normaliseTv);
};

/** Top-rated TV */
export const fetchTopRatedTV = async (page = 1) => {
  const data = await tmdbFetch('/tv/top_rated', { page });
  return data.results.map(normaliseTv);
};

/** Animation — uses discover with animation genre id=16 */
export const fetchAnimation = async (page = 1) => {
  const [movies, tv] = await Promise.all([
    tmdbFetch('/discover/movie', { with_genres: '16', sort_by: 'popularity.desc', page }),
    tmdbFetch('/discover/tv', { with_genres: '16', sort_by: 'popularity.desc', page }),
  ]);
  return [
    ...movies.results.map(normaliseMovie),
    ...tv.results.map(normaliseTv),
  ].sort((a, b) => b.rating - a.rating);
};

/** Full movie details (includes runtime, tagline, credits, videos) */
export const fetchMovieDetails = async (tmdbId) => {
  const [data, videos] = await Promise.all([
    tmdbFetch(`/movie/${tmdbId}`, { append_to_response: 'credits' }),
    tmdbFetch(`/movie/${tmdbId}/videos`),
  ]);
  const base = normaliseMovie(data);

  // Director
  const director = data.credits?.crew?.find((c) => c.job === 'Director');
  base.director = director?.name || null;

  // Cast (top 6)
  base.cast = (data.credits?.cast || []).slice(0, 6).map((c) => ({
    name: c.name,
    role: c.character,
    avatar: avatarUrl(c.profile_path) ||
      'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.name) + '&background=1a2333&color=f5c35b',
  }));

  // Trailer
  const trailer = selectYouTubeTrailer(videos.results);
  base.trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`
    : null;

  return base;
};

/** Full TV details */
export const fetchTVDetails = async (tmdbId) => {
  const [data, videos] = await Promise.all([
    tmdbFetch(`/tv/${tmdbId}`, { append_to_response: 'credits' }),
    tmdbFetch(`/tv/${tmdbId}/videos`),
  ]);
  const base = normaliseTv(data);

  // Cast (top 6)
  base.cast = (data.credits?.cast || []).slice(0, 6).map((c) => ({
    name: c.name,
    role: c.character,
    avatar: avatarUrl(c.profile_path) ||
      'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.name) + '&background=1a2333&color=f5c35b',
  }));

  // Trailer
  const trailer = selectYouTubeTrailer(videos.results);
  base.trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`
    : null;

  // Seasons (first 3 for brevity)
  if (data.seasons?.length) {
    base.seasons = data.seasons
      .filter((s) => s.season_number > 0)
      .slice(0, 3)
      .map((s) => ({
        seasonNumber: s.season_number,
        title: s.name,
        poster: posterUrl(s.poster_path),
        overview: s.overview,
        episodes: [], // lazy-loaded when player opens
      }));
  }

  return base;
};

const selectYouTubeTrailer = (videos = []) =>
  videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official)
  || videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
  || videos.find((video) => video.site === 'YouTube' && video.type === 'Teaser');

/** Multi-search (movies + TV) */
export const searchMulti = async (query, page = 1) => {
  if (!query?.trim()) return [];
  const data = await tmdbFetch('/search/multi', { query: query.trim(), page });
  return data.results
    .filter((r) => r.media_type !== 'person')
    .map((item) => (item.media_type === 'tv' ? normaliseTv(item) : normaliseMovie(item)));
};
