import React, { useRef } from 'react';
import MediaCard from './MediaCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function MediaSection({ 
  title, 
  subtitle,
  items = [], 
  onWatch, 
  watchlist, 
  onToggleWatchlist,
  onSeeMore,
  icon: Icon
}) {
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

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 my-9">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#f5c35b] to-[#e59934]" />
          <div>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-amber-400" />}
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {title}
              </h2>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 -mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Action: Scroll Buttons & "More" */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-xl bg-[#111724] border border-[#232d3d] text-slate-300 hover:text-white hover:border-amber-400/40 transition-colors shadow-sm"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-xl bg-[#111724] border border-[#232d3d] text-slate-300 hover:text-white hover:border-amber-400/40 transition-colors shadow-sm"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {onSeeMore && (
            <button
              onClick={onSeeMore}
              className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>See all</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Carousel Row */}
      <div 
        ref={rowRef}
        className="flex items-start gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className="w-[145px] sm:w-[175px] md:w-[195px] lg:w-[215px] shrink-0"
          >
            <MediaCard
              item={item}
              onWatch={onWatch}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
