import React from 'react';

// Jolly Roger Pirate Skull with Eye Patch & Bandana
export function PirateSkull({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Bandana tie on left */}
      <path d="M4 10c-1.5-1-2.5-3-2-4 .5-1 2.5-.5 3.5.5" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
      <path d="M3.5 11c-1 1-1.5 2.5-.8 3 .8.5 2-.5 2.5-1.5" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
      
      {/* Skull Head */}
      <path d="M5 10c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.2-.95 4.18-2.5 5.5v2.5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2.5C6.05 14.18 5 12.2 5 10z" />
      
      {/* Bandana fold line across forehead */}
      <path d="M5 8.5c3-1.5 11-1.5 14 0" stroke="currentColor" />
      
      {/* Left eye (Patch) */}
      <path d="M8 12.5l2 2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="9" cy="13.5" r="1.8" fill="currentColor" />
      <path d="M6 7l5 9" stroke="currentColor" strokeDasharray="1.5 1.5" />

      {/* Right Eye (Normal skull eye socket) */}
      <ellipse cx="15" cy="13.5" rx="1.5" ry="1.8" fill="currentColor" />

      {/* Nose cavity */}
      <path d="M12 16v1.2" />

      {/* Teeth slots */}
      <path d="M10 20v-1" />
      <path d="M12 20v-1" />
      <path d="M14 20v-1" />
    </svg>
  );
}

// Treasure Chest with Gold Glow
export function TreasureChest({ className = "w-5 h-5", open = false, ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Chest body */}
      <rect x="3" y="11" width="18" height="10" rx="2" />
      {/* Metal banding */}
      <path d="M7 11v10" />
      <path d="M17 11v10" />
      {/* Keyhole plate */}
      <rect x="10.5" y="14" width="3" height="4" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      <circle cx="12" cy="15.5" r="0.6" fill="white" />
      
      {/* Curved Chest Lid */}
      {open ? (
        <path d="M3 11c0-4 3.5-7 9-7s9 3 9 7" strokeDasharray="2 1" />
      ) : (
        <path d="M3 11c0-3.5 3.5-6 9-6s9 2.5 9 6" />
      )}
      <path d="M7 5.5v5.5" />
      <path d="M17 5.5v5.5" />
    </svg>
  );
}

// Ship's Wheel / Captain's Helm
export function ShipsHelm({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" />
      
      {/* 8 Handles */}
      <line x1="12" y1="1" x2="12" y2="5" strokeWidth="2.2" />
      <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2.2" />
      <line x1="1" y1="12" x2="5" y2="12" strokeWidth="2.2" />
      <line x1="19" y1="12" x2="23" y2="12" strokeWidth="2.2" />

      {/* Diagonal handles */}
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" strokeWidth="2" />
      <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" strokeWidth="2" />
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" strokeWidth="2" />
      <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" strokeWidth="2" />

      {/* Inner spokes */}
      <line x1="12" y1="5" x2="12" y2="9.5" />
      <line x1="12" y1="14.5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="9.5" y2="12" />
      <line x1="14.5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// Crossed Cutlasses / Pirate Swords
export function CrossedSwords({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* First Sword */}
      <path d="M19 4L7 16" />
      <path d="M19 4c1 0 2 1 2 2L9 18" fill="currentColor" fillOpacity="0.2" />
      <path d="M5 18l-2 2" strokeWidth="2.5" />
      <path d="M7 16c0 1.5-1 2.5-2.5 2.5S2 17.5 2 16" />

      {/* Second Sword */}
      <path d="M5 4l12 12" />
      <path d="M5 4c-1 0-2 1-2 2l12 12" fill="currentColor" fillOpacity="0.2" />
      <path d="M19 18l2 2" strokeWidth="2.5" />
      <path d="M17 16c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5" />
    </svg>
  );
}

// Pirate Doubloon Coin
export function DoubloonCoin({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <circle cx="12" cy="12" r="9" fill="#f5c35b" fillOpacity="0.2" stroke="#f5c35b" />
      <circle cx="12" cy="12" r="7" stroke="#e59934" strokeDasharray="1.5 1.5" />
      {/* Mini Skull imprint */}
      <path d="M10 11c0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.8 1.5v1h-2.4v-1c-.5-.3-.8-.9-.8-1.5z" fill="#f5c35b" />
      <circle cx="11.2" cy="11" r="0.5" fill="#000" />
      <circle cx="12.8" cy="11" r="0.5" fill="#000" />
    </svg>
  );
}

// Nautical Compass Rose
export function CompassRose({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,4 14,10 20,12 14,14 12,20 10,14 4,12 10,10" fill="currentColor" fillOpacity="0.3" />
      <polygon points="12,4 12,12 14,10" fill="currentColor" />
      <polygon points="20,12 12,12 14,14" fill="currentColor" />
      <polygon points="12,20 12,12 10,14" fill="currentColor" />
      <polygon points="4,12 12,12 10,10" fill="currentColor" />
    </svg>
  );
}
