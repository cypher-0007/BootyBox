// ─────────────────────────────────────────────────────────────────────────────
// Custom React hooks for TMDB data fetching
// Each hook returns: { data, loading, error }
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchTrending,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchPopularTV,
  fetchTopRatedTV,
  fetchAnimation,
  fetchMovieDetails,
  fetchTVDetails,
  searchMulti,
} from '../services/tmdb';

// ── Generic hook factory ─────────────────────────────────────────────────────
function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    setError(null);
    fetcher()
      .then((result) => { if (mounted.current) setData(result); })
      .catch((err) => { if (mounted.current) setError(err.message); })
      .finally(() => { if (mounted.current) setLoading(false); });
    return () => { mounted.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// ── Public hooks ─────────────────────────────────────────────────────────────

/** Trending content for hero banners */
export const useTrending = () => useFetch(() => fetchTrending(), []);

/** Popular movies section */
export const usePopularMovies = () => useFetch(() => fetchPopularMovies(), []);

/** Top-rated movies for Top 10 section */
export const useTopRatedMovies = () => useFetch(() => fetchTopRatedMovies(), []);

/** Popular TV shows */
export const usePopularTV = () => useFetch(() => fetchPopularTV(), []);

/** Top-rated TV shows */
export const useTopRatedTV = () => useFetch(() => fetchTopRatedTV(), []);

/** Animation */
export const useAnimation = () => useFetch(() => fetchAnimation(), []);

/** 
 * Full details for a specific item (movie or TV show).
 * Pass the item to get enriched data (cast, trailer, director, seasons).
 */
export const useItemDetails = (item) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    if (!item?.tmdbId) {
      setData(item);
      setLoading(false);
      setError(null);
      return () => { active = false; };
    }

    setData(null);
    setLoading(true);
    setError(null);
    const fetcher = item.type === 'Movie' ? fetchMovieDetails : fetchTVDetails;
    fetcher(item.tmdbId)
      .then((result) => { if (active) setData(result); })
      .catch((err) => { if (active) { setError(err.message); setData(item); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [item?.tmdbId, item?.type]);

  return { data: data || item, loading, error };
};

/**
 * Live TMDB search — debounced 400ms.
 * Returns { results, loading, error }
 */
export const useTMDBSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!query?.trim()) { setResults([]); setLoading(false); return; }

    setLoading(true);
    timer.current = setTimeout(() => {
      searchMulti(query)
        .then((res) => { setResults(res); setError(null); })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer.current);
  }, [query]);

  return { results, loading, error };
};

/**
 * Combined Top 10 — merges top-rated movies + TV, sorts by rating.
 */
export const useTop10 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchTopRatedMovies(), fetchTopRatedTV()])
      .then(([movies, tv]) => {
        const merged = [...movies, ...tv]
          .filter((item) => item.rating >= 7.5)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)
          .map((item, idx) => ({ ...item, rank: idx + 1, views: `${(4.5 - idx * 0.3).toFixed(1)}M views` }));
        setData(merged);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
