import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Bookmark, 
  Film, 
  Tv, 
  Sparkles, 
  Flame 
} from 'lucide-react';
import { PirateSkull } from './PirateIcons';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  watchlistCount, 
  onOpenWatchlist 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'all', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'animation', label: 'Animation' },
    { id: 'top-ranked', label: 'Trending' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090d14]/95 backdrop-blur-md border-b border-[#1e2638] shadow-2xl shadow-black/80 py-2.5' 
          : 'bg-gradient-to-b from-[#07090e]/95 via-[#07090e]/70 to-transparent py-3.5'
      }`}>
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-7 lg:gap-10">
            <button 
              onClick={() => setActiveTab('all')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              {/* Pirate Skull Emblem in Logo */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#f5c35b] to-[#0df5c6] p-[1.5px] shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0a0e16] rounded-[10px] flex items-center justify-center">
                  <PirateSkull className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider gold-gradient-text font-sans">
                  BOOTYBOX
                </span>
                <span className="text-[10px] text-amber-200/50 -mt-1 tracking-widest font-mono uppercase">
                  Streaming
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === link.id
                      ? 'text-amber-300 bg-amber-500/15 border border-amber-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Search & Watchlist */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Search Input Box */}
            <div className={`relative flex items-center transition-all duration-300 ${
              isSearchFocused ? 'w-48 sm:w-72' : 'w-36 sm:w-56 lg:w-64'
            }`}>
              <Search className="absolute left-3 w-4 h-4 text-amber-400/50 pointer-events-none" />
              <input
                type="text"
                placeholder="Search movies & shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-[#111724]/90 border border-[#232d3d] focus:border-amber-400/60 rounded-full pl-9 pr-8 py-1.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-white p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Watchlist Button */}
            <button
              onClick={onOpenWatchlist}
              className="relative p-2 rounded-xl bg-[#111724] border border-[#232d3d] hover:border-amber-400/50 hover:bg-amber-500/10 text-amber-400 hover:text-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              title="View Watchlist"
            >
              <Bookmark className="w-4 h-4 fill-amber-400/30" />
              <span className="hidden sm:inline text-xs font-bold text-slate-200">Watchlist</span>
              {watchlistCount > 0 && (
                <span className="bg-gradient-to-r from-[#f5c35b] to-[#e59934] text-[#090d14] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#111724] border border-[#232d3d] text-amber-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/90 backdrop-blur-xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">Navigation</p>
            
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeTab === link.id
                      ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold'
                      : 'text-slate-200 bg-[#111724] hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#232d3d]">
              <button 
                onClick={() => { onOpenWatchlist(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-[#111724] hover:bg-white/15 text-white py-3 rounded-xl text-sm font-semibold border border-amber-500/30"
              >
                <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                <span>My Saved Watchlist ({watchlistCount})</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            BootyBox • Free Movies & TV Series
          </div>
        </div>
      )}
    </>
  );
}
