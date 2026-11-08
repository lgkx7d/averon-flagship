'use client';

import React from 'react';

export default function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* 4-column subtle architectural grid line markers */}
      <div className="w-full h-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-20">
        <div className="h-full border-r border-white/10" />
        <div className="h-full border-r border-white/10" />
        <div className="hidden md:block h-full border-r border-white/10" />
        <div className="hidden md:block h-full border-r border-white/10" />
      </div>

      {/* Top Left System Stamp */}
      <div className="absolute top-4 left-6 hidden lg:flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#777777] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        <span>SYS.ONLINE // FLG-26</span>
      </div>

      {/* Top Right System Stamp */}
      <div className="absolute top-4 right-6 hidden lg:block text-[9px] font-mono tracking-widest text-[#777777] uppercase text-right">
        <span>ARCHIVE REF: 0x88F9</span>
      </div>

      {/* Bottom Corner Grid Crosshairs */}
      <div className="absolute bottom-4 left-6 hidden lg:block text-[9px] font-mono tracking-widest text-[#777777] uppercase">
        <span>[ 52°31&apos;12&quot;N 13°24&apos;18&quot;E ]</span>
      </div>

      <div className="absolute bottom-4 right-6 hidden lg:block text-[9px] font-mono tracking-widest text-[#777777] uppercase text-right">
        <span>AVR // PHASE 01</span>
      </div>
    </div>
  );
}

