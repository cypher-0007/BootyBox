import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, Zap, QrCode, Anchor } from 'lucide-react';
import { PirateSkull, DoubloonCoin, CrossedSwords } from './PirateIcons';

export default function AppDownloadModal({ onClose, onToast }) {
  const handleDownloadApk = () => {
    onToast({ type: 'success', message: '🏴‍☠️ Smuggling BootyBox Privateer APK (v3.4.2)...' });
    setTimeout(onClose, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c1017] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#f5c35b] via-[#e59934] to-[#0df5c6] p-[2px] shadow-xl shadow-amber-500/25">
            <div className="w-full h-full bg-[#0a0e16] rounded-[14px] flex items-center justify-center text-amber-400">
              <PirateSkull className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Smuggle BootyBox to Mobile
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/80 max-w-sm mx-auto leading-relaxed">
            Plunder movies & series on the go. Zero buffering on the high seas, offline caching for flights & voyages, and Smart TV casting.
          </p>
        </div>

        {/* Simulated Golden QR Code */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#111724] p-5 rounded-2xl border border-[#2a3547]">
          
          <div className="bg-[#f5c35b] p-3 rounded-2xl shadow-lg shrink-0">
            <div className="w-32 h-32 bg-[#0a0e16] rounded-xl p-2 flex flex-col items-center justify-between text-amber-400">
              <QrCode className="w-24 h-24 text-amber-400" />
              <span className="text-[9px] font-mono font-black tracking-widest text-amber-300 uppercase">
                PIRATE SCAN
              </span>
            </div>
          </div>

          {/* Perks */}
          <div className="text-left space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero scurvy ads or trackers</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Download 4K treasures offline</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified privateer build</span>
            </div>
          </div>
        </div>

        {/* Direct Download Button */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadApk}
            className="w-full pirate-gold-btn py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            <Anchor className="w-4 h-4" />
            <span>Download BootyBox APK (Android & TV)</span>
          </button>
          <p className="text-[11px] text-amber-300/50 font-mono">
            ⚓ Compatible with Android 7.0+, Android TV, FireStick & iOS Progressive App
          </p>
        </div>

      </div>
    </div>
  );
}
