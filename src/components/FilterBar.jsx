import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowUpDown, Film, Tv, Sparkles, Layers } from 'lucide-react';

export default function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedType, 
  setSelectedType, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 my-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e2638] pb-4">
        
        {/* Type Toggles (All, Movies, TV Shows, Animation) */}
        <div className="flex items-center gap-1.5 bg-[#0f1420] p-1 rounded-2xl border border-[#232d3d] w-fit shadow-md">
          <button
            onClick={() => setSelectedType('all')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All</span>
          </button>
          
          <button
            onClick={() => setSelectedType('Movie')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'Movie'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies</span>
          </button>

          <button
            onClick={() => setSelectedType('TV Series')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'TV Series'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>TV Shows</span>
          </button>

          <button
            onClick={() => setSelectedType('Animation')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'Animation'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Animation</span>
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-2 bg-[#0f1420] border border-[#232d3d] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm text-slate-300 shadow-md">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-xs sm:text-sm"
            >
              <option value="popular" className="bg-[#0f1420] text-slate-200">Most Popular</option>
              <option value="rating" className="bg-[#0f1420] text-slate-200">Top Rated</option>
              <option value="newest" className="bg-[#0f1420] text-slate-200">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Horizontal Genre Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'pirate-gold-btn text-[#090d14] shadow-md shadow-amber-500/20'
                  : 'bg-[#111724] text-slate-300 hover:text-white hover:bg-[#182133] border border-[#232d3d]'
              }`}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
