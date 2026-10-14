import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { PirateSkull } from './PirateIcons';

export default function Footer({ onCategoryClick }) {
  return (
    <footer className="w-full bg-[#05070a] border-t border-[#1e2638] pt-12 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Brand & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f5c35b] to-[#0df5c6] p-[1.5px]">
                <div className="w-full h-full bg-[#05070a] rounded-[10px] flex items-center justify-center">
                  <PirateSkull className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider gold-gradient-text font-sans">
                BOOTYBOX
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch movies and TV series online for free in HD and 4K quality. Fast streaming with multiple audio and subtitle support.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Genres
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(1, 9).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryClick(cat)}
                  className="text-left text-slate-400 hover:text-amber-300 transition-colors py-0.5 truncate cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-amber-300 cursor-pointer transition-colors">Popular Movies</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer transition-colors">Top TV Shows</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer transition-colors">Trending Anime</span></li>
              <li><span className="hover:text-amber-300 cursor-pointer transition-colors">Top 10 Today</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Legal & Policy
            </h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer transition-colors">DMCA Disclaimer</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Contact Us</span></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="border-t border-[#1e2638] pt-6 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-400 font-semibold">Disclaimer:</strong> BootyBox does not store any files on its servers. All contents are provided by non-affiliated third parties.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-slate-400 font-mono text-[10px]">
            <span>© 2026 BootyBox. All rights reserved.</span>
            <span>Fast, clean streaming platform</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
