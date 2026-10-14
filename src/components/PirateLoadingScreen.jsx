import React, { useState, useEffect } from 'react';
import { PirateSkull } from './PirateIcons';

export default function PirateLoadingScreen({ onFinished, duration = 1800 }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Checking the sails...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = 25;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 30 && next < 65) {
          setStatusText('Mooring private streams...');
        } else if (next >= 65 && next < 95) {
          setStatusText('Opening the BootyBox...');
        } else if (next >= 100) {
          setStatusText('Ready to stream!');
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinished) onFinished();
            }, 400);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onFinished]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-400 select-none ${
      isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

      {/* Pirate Crest with animated ring */}
      <div className="relative mb-6">
        {/* Pulsing Outer Rings */}
        <div className="absolute -inset-4 rounded-full border border-amber-500/20 animate-ping opacity-30" />
        <div className="absolute -inset-2 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:12s]" />

        {/* Central Gold Skull Medallion */}
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#f5c35b] via-[#e59934] to-[#0df5c6] p-[2.5px] shadow-2xl shadow-amber-500/30">
          <div className="w-full h-full bg-[#0a0e16] rounded-[22px] flex items-center justify-center">
            <PirateSkull className="w-12 h-12 text-amber-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Brand Title */}
      <div className="text-center space-y-1 mb-8">
        <h1 className="text-3xl font-black tracking-widest text-white gold-gradient-text">
          BOOTYBOX
        </h1>
        <p className="text-[11px] font-mono tracking-widest uppercase text-amber-300/70">
          Streaming Platform
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 sm:w-80 space-y-2">
        <div className="w-full h-1.5 bg-[#141b29] rounded-full overflow-hidden border border-[#232d3d] p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-[#f5c35b] via-[#e59934] to-[#0df5c6] rounded-full transition-all duration-75 shadow-sm shadow-amber-400/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="text-amber-300/80">{statusText}</span>
          <span className="text-white/60">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Skip button for convenience */}
      <button
        onClick={() => {
          setIsFading(true);
          setTimeout(() => { if (onFinished) onFinished(); }, 200);
        }}
        className="mt-8 text-xs text-slate-500 hover:text-amber-400 font-mono transition-colors cursor-pointer"
      >
        Skip intro &rarr;
      </button>

    </div>
  );
}
