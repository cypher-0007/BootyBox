import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Star, ChevronLeft, ChevronRight, Film } from 'lucide-react';

export default function HeroBanner({ 
  banners, 
  onWatch, 
  onTrailer, 
  watchlist, 
  onToggleWatchlist 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = banners[currentIndex] || banners[0];
  const isSaved = watchlist.some((item) => item.id === current.id);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div 
      className="relative w-full min-h-[580px] lg:min-h-[720px] h-[76vh] max-h-[820px] flex items-end pb-12 sm:pb-16 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.backdrop}
          alt={current.title}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out brightness-[0.8]"
        />
        {/* Layered Vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent w-full lg:w-4/5" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#07090e]/80 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 w-full flex flex-col justify-end">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500 key={current.id}">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            {/* Rating */}
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{current.rating}</span>
            </span>

            <span className="bg-white/10 text-white/90 border border-[#2a3547] px-2 py-0.5 rounded-md font-mono text-[11px]">
              {current.quality}
            </span>

            <span className="bg-white/10 text-white/90 border border-[#2a3547] px-2 py-0.5 rounded-md font-mono text-[11px]">
              {current.year}
            </span>

            <span className="bg-cyan-500/15 text-cyan-300 border border-cyan-400/20 px-2.5 py-0.5 rounded-md text-[11px]">
              {current.type}
            </span>

            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-white/70 hidden sm:inline">{current.audio}</span>

            {current.duration && (
              <>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-white/70 hidden sm:inline">{current.duration}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl">
            {current.title}
          </h1>

          {/* Genre Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {current.genres.map((genre) => (
              <span 
                key={genre} 
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#111724]/90 border border-white/10 text-slate-200"
              >
                {genre}
              </span>
            ))}
            {current.tagline && (
              <span className="text-xs italic text-white/50 hidden md:inline ml-2">
                "{current.tagline}"
              </span>
            )}
          </div>

          {/* Overview */}
          <p className="text-sm sm:text-base text-slate-300/80 line-clamp-3 leading-relaxed max-w-xl">
            {current.overview}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Watch Now */}
            <button
              onClick={() => onWatch(current)}
              className="pirate-gold-btn px-6 py-3 rounded-xl flex items-center gap-2 text-sm sm:text-base cursor-pointer shadow-xl font-bold"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Watch Now</span>
            </button>

            {/* Watch Trailer */}
            <button
              onClick={() => onTrailer(current)}
              className="bg-[#121824]/80 hover:bg-[#1a2333] border border-[#2a3547] text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm sm:text-base font-semibold backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span>Trailer</span>
            </button>

            {/* Watchlist */}
            <button
              onClick={() => onToggleWatchlist(current)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-sm font-semibold backdrop-blur-md ${
                isSaved 
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300' 
                  : 'bg-[#121824]/80 hover:bg-[#1a2333] border-[#2a3547] text-slate-200'
              }`}
              title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {isSaved ? <Check className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? 'In Watchlist' : 'Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Selector on Desktop */}
        <div className="absolute right-4 sm:right-6 bottom-12 hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-[#0b0f17]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            {banners.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-[#0b0f17]/90 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-[#0b0f17]/90 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx 
                  ? 'w-6 bg-gradient-to-r from-[#f5c35b] to-[#e59934]' 
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
