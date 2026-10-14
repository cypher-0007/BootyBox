import React from 'react';
import { X, Play, Trash2, Bookmark } from 'lucide-react';

export default function WatchlistModal({ 
  watchlist, 
  onClose, 
  onWatch, 
  onRemove, 
  onClearAll 
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a0e16] border border-[#232d3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#232d3d] bg-[#0e131d]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">My Watchlist</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {watchlist.length}
                </span>
              </div>
              <p className="text-xs text-slate-400">Movies and shows you saved to watch later</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {watchlist.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {watchlist.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121824] border border-[#232d3d] flex items-center justify-center text-slate-500">
                <Bookmark className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">Your watchlist is empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Browse movies and shows, then click the watchlist button on any title to save it here.
                </p>
              </div>
              <button
                onClick={onClose}
                className="pirate-gold-btn px-6 py-2.5 rounded-xl text-xs font-bold shadow-md"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {watchlist.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-[#0f1420] hover:bg-[#161d2d] border border-[#232d3d] hover:border-amber-400/40 transition-all shadow-md"
                >
                  {/* Left: Thumbnail & Meta */}
                  <div 
                    onClick={() => { onWatch(item); onClose(); }}
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/10">
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover group-hover:scale-106 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 truncate transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="font-mono">{item.year || 2024}</span>
                        <span>•</span>
                        <span className="text-amber-300 font-mono font-bold">★ {item.rating}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{item.type || 'Movie'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { onWatch(item); onClose(); }}
                      className="p-2 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-400/30 transition-colors cursor-pointer"
                      title="Play now"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove from list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
