import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#181c24]/95 border border-white/10 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
      {icons[toast.type] || icons.info}
      <p className="text-sm font-medium">{toast.message}</p>
      <button 
        onClick={onClose}
        className="ml-2 text-white/50 hover:text-white p-1 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
