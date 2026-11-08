'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, CornerDownRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function HeroMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const [touchDelta, setTouchDelta] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });

  const { playHover, playChime } = useSound();

  // Subtle finger-responsive touch depth shift
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = (e.touches[0].clientX - touchStartRef.current.x) * 0.08;
    const dy = (e.touches[0].clientY - touchStartRef.current.y) * 0.05;
    // Clamp to subtle range so it feels like a physical camera shift
    setTouchDelta({
      x: Math.max(-15, Math.min(15, dx)),
      y: Math.max(-10, Math.min(10, dy)),
    });
  };

  const handleTouchEnd = () => {
    // Spring back gently
    setTouchDelta({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] bg-[#080808] text-[#F0EFEB] overflow-hidden select-none flex flex-col justify-between pt-20 pb-6 px-5"
    >
      {/* Background Architectural Context Image (Subtle Grain) */}
      <div className="absolute inset-0 z-0 opacity-15 filter blur-[1px] pointer-events-none">
        <Image
          src="/images/editorial/hero-bg.jpg"
          alt="Brutalist architectural context"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/90" />
      </div>

      {/* Top Mobile Status Bar */}
      <div className="relative z-20 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-[#777777] uppercase border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          <span className="font-bold">EDITION 01: MONOLITH</span>
        </div>
        <div className="text-[9px] text-[#777777]">BERLIN // KOJIMA</div>
      </div>

      {/* Giant Cropped Background Brand Typography Behind Subject */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center overflow-hidden">
        <div
          className="font-monumental text-[42vw] leading-[0.78] text-white/15 tracking-tighter uppercase select-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${-touchDelta.x * 0.8}px, ${-touchDelta.y * 0.8}px, 0)`,
          }}
          aria-hidden="true"
        >
          AVE
        </div>
        <div
          className="font-monumental text-[42vw] leading-[0.78] text-white/15 tracking-tighter uppercase select-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${touchDelta.x * 0.8}px, ${touchDelta.y * 0.8}px, 0)`,
          }}
          aria-hidden="true"
        >
          RON
        </div>
      </div>

      {/* Centerpiece: Dominant Portrait Model Silhouette */}
      <div
        ref={modelRef}
        className="absolute inset-x-0 bottom-16 mx-auto w-full max-w-sm h-[75dvh] z-20 pointer-events-none flex items-end justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${touchDelta.x}px, ${touchDelta.y}px, 0) scale(1.02)`,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/editorial/hero-model.jpg"
            alt="AVERON Archival Monolith Portrait"
            fill
            priority
            sizes="90vw"
            className="object-contain object-bottom filter grayscale contrast-125 brightness-95"
          />
        </div>
      </div>

      {/* Foreground Statement Overlapping Model */}
      <div className="relative z-25 text-center mt-auto mb-4 pointer-events-none">
        <div className="text-[9px] font-mono tracking-[0.35em] text-[#C8C8C8] uppercase mb-1 drop-shadow-md">
          2026 ARCHIVE SYSTEM
        </div>
        <h1 className="leading-none flex flex-col items-center">
          <span className="font-monumental text-5xl sm:text-6xl uppercase tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            UNIFORM
          </span>
          <span className="font-serif italic text-4xl sm:text-5xl text-white/95 mt-[-0.1em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            FOR THE UNDEFINED.
          </span>
        </h1>
      </div>

      {/* Bottom Thumb-Friendly Actions & Explore Prompt */}
      <div className="relative z-30 flex flex-col gap-3">
        {/* Actions Row */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/shop"
            onClick={playChime}
            className="w-full py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase text-center active:scale-[0.97] transition-transform shadow-lg"
          >
            SHOP CATALOGUE
          </Link>
          <a
            href="#runway"
            onClick={playHover}
            className="w-full py-3.5 border border-white/30 text-white font-mono text-xs font-bold tracking-widest uppercase text-center active:scale-[0.97] bg-black/40 backdrop-blur-md transition-transform"
          >
            RUNWAY [05]
          </a>
        </div>

        {/* Scroll cue */}
        <div className="flex items-center justify-between text-[8px] font-mono text-[#777777] uppercase tracking-widest pt-1 border-t border-white/10">
          <span>SWIPE DOWN TO EXPLORE</span>
          <div className="flex items-center gap-1 text-white">
            <span>SCROLL</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
