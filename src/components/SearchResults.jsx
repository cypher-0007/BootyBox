import React from 'react';
import MediaCard from './MediaCard';
import { Search, XCircle } from 'lucide-react';

export default function SearchResults({ 
  query, 
  results = [], 
  onWatch, 
  watchlist, 
  onToggleWatchlist,
  onClearSearch,
  loading = false,
  error = null
}) {
  return (
    <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 my-8 space-y-6">
      
      {/* Search Header */}
      <div className="flex items-center justify-between border-b border-[#232d3d] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Search Results for <span className="gold-gradient-text">"{query}"</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Found {results.length} matching movies and shows
          </p>
        </div>

        <button
          onClick={onClearSearch}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#111724] hover:bg-[#1a2333] px-3.5 py-1.5 rounded-xl border border-[#232d3d] transition-colors cursor-pointer"
        >
          <XCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Clear search</span>
        </button>
      </div>

      {/* Results Grid */}
      {loading ? (
        <p role="status" className="text-center py-16 text-sm text-slate-400">Searching TMDB…</p>
      ) : error ? (
        <p role="alert" className="text-center py-16 text-sm text-rose-300">TMDB search failed: {error}</p>
      ) : results.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121824] border border-[#232d3d] flex items-center justify-center text-slate-500">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">No results found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any title matching "{query}". Try checking your spelling or search by genre.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {results.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onWatch={onWatch}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
