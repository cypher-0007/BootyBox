import React from 'react';
import { Play, Star, Bookmark, Check, Plus } from 'lucide-react';

export default function MediaCard({ 
  item, 
  onWatch, 
  watchlist = [], 
  onToggleWatchlist 
}) {
  const isSaved = watchlist.some((saved) => saved.id === item.id);

  return (
    <div className="group relative flex flex-col w-full cursor-pointer select-none">
      
      {/* Poster Image Container */}
      <div 
        onClick={() => onWatch(item)}
        className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#101520] shadow-md border border-[#232d3d] group-hover:border-amber-400/50 group-hover:shadow-xl group-hover:shadow-amber-500/10 transition-all duration-300"
      >
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Hover Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          
          {/* Watchlist Quick-Add Icon Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(item);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-md ${
              isSaved
                ? 'bg-amber-400 text-[#0a0d14] font-bold'
                : 'bg-black/60 text-slate-200 hover:bg-black/90 hover:text-white border border-white/10'
            }`}
            title={isSaved ? "Saved in Watchlist" : "Add to Watchlist"}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>

          {/* Quality Badge */}
          <span className="bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300 px-1.5 py-0.5 rounded border border-white/10 font-mono uppercase tracking-wider">
            {item.quality || 'HD'}
          </span>
        </div>

        {/* Center Glowing Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Play Button Circle */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5c35b] to-[#e59934] flex items-center justify-center shadow-xl shadow-amber-500/40 transform group-hover:scale-100 scale-75 transition-transform duration-300">
              <Play className="w-5 h-5 text-[#0a0d14] fill-[#0a0d14] ml-0.5" />
            </div>
          </div>
        </div>

        {/* Bottom Poster Metadata */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-semibold text-white z-10">
          {item.rating && (
            <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-amber-300 font-mono">
              <Star className="w-3 h-3 fill-amber-300" />
              <span>{item.rating}</span>
            </div>
          )}

          {item.episodesCount && (
            <span className="bg-cyan-500/80 backdrop-blur-md text-[#081016] font-bold px-1.5 py-0.5 rounded text-[10px]">
              {item.episodesCount}
            </span>
          )}
        </div>
      </div>

      {/* Card Info Below Poster */}
      <div className="mt-2.5 px-0.5 space-y-1">
        <h3 
          onClick={() => onWatch(item)}
          className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-amber-300 truncate transition-colors"
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-slate-300">{item.year || 2024}</span>
            <span>•</span>
            <span className="truncate max-w-[85px] sm:max-w-[100px]">
              {item.genres ? item.genres[0] : (item.type || 'Movie')}
            </span>
          </div>
          {item.duration && (
            <span className="text-[10px] text-slate-400">{item.duration}</span>
          )}
        </div>
      </div>
    </div>
  );
}
