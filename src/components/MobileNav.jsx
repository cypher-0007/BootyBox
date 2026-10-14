import React from 'react';
import { Home, Film, Tv, Flame, Bookmark } from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab, watchlistCount, onOpenWatchlist }) {
  const items = [
    { id: 'all', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'top-ranked', label: 'Trending', icon: Flame },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d14]/95 backdrop-blur-xl border-t border-[#1e2638] py-2 px-4 md:hidden flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={onOpenWatchlist}
        className="relative flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
      >
        <div className="relative">
          <Bookmark className="w-5 h-5" />
          {watchlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-gradient-to-r from-[#f5c35b] to-[#e59934] text-[#090d14] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {watchlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-tight">Saved</span>
      </button>
    </nav>
  );
}
