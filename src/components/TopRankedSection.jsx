import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Plus, Check } from 'lucide-react';

export default function TopRankedSection({ items = [], onWatch, watchlist = [], onToggleWatchlist }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 my-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#f5c35b] to-[#e59934]" />
          <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            Top 10 Most Watched Today
          </h2>
        </div>

        {/* Scroll Chevrons */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl bg-[#111724] border border-[#232d3d] text-slate-300 hover:text-white hover:border-amber-400/40 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl bg-[#111724] border border-[#232d3d] text-slate-300 hover:text-white hover:border-amber-400/40 transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ranked Carousel Row */}
      <div
        ref={rowRef}
        className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {items.map((item) => {
          const isSaved = watchlist.some((saved) => saved.id === item.id);

          return (
            <div
              key={item.id}
              className="group relative flex items-end shrink-0 w-[215px] sm:w-[255px] select-none cursor-pointer"
              onClick={() => onWatch(item)}
            >
              {/* Giant Stylized Rank Number */}
              <div className="relative -mr-5 sm:-mr-7 z-0 pointer-events-none select-none">
                <span className="text-[95px] sm:text-[125px] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.25)] group-hover:[-webkit-text-stroke:2px_#f5c35b] transition-all font-mono">
                  {item.rank}
                </span>
              </div>

              {/* Poster Card */}
              <div className="relative z-10 flex-1 aspect-[2/3] rounded-xl overflow-hidden bg-[#101520] shadow-xl border border-[#232d3d] group-hover:border-amber-400/70 group-hover:shadow-amber-500/10 transition-all duration-300">
                <img
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Quick Add */}
                <div className="absolute top-2.5 right-2.5 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(item);
                    }}
                    className={`p-1.5 rounded-lg backdrop-blur-md transition-all shadow-md ${
                      isSaved
                        ? 'bg-amber-400 text-[#090d14] font-bold'
                        : 'bg-black/60 text-slate-200 hover:bg-black/90 hover:text-white border border-white/10'
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f5c35b] to-[#e59934] flex items-center justify-center shadow-xl shadow-amber-500/40 transform group-hover:scale-100 scale-75 transition-transform duration-300">
                    <Play className="w-4 h-4 text-[#090d14] fill-[#090d14] ml-0.5" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-20">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-amber-300 font-bold flex items-center gap-1 font-mono">
                      <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                      {item.rating}
                    </span>
                    <span className="text-slate-300 font-mono text-[9px]">{item.views}</span>
                  </div>
                  <h4 className="text-xs font-bold truncate group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
