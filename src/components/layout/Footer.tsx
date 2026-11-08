'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function Footer() {
  const { playHover, playChime } = useSound();

  const scrollToTop = () => {
    playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#101010] text-[#F0EFEB] border-t-2 border-white/15 pt-20 pb-12 relative overflow-hidden select-none">
      {/* Precision Structural Guide Details */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-6 left-8 text-[9px] font-mono text-[#888888] tracking-[0.3em] uppercase">
          TERMINUS BASE // GRAPHITE MONOCHROME ARCHITECTURE
        </div>
        <div className="absolute top-6 right-8 text-[9px] font-mono text-[#888888] tracking-[0.3em] uppercase">
          STATUS: ONLINE // 2026 ARCHIVE
        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top Grid: Newsletter & Technical Manifest */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Manifest column */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#888888] uppercase">
              AVERON // MANIFESTO & PHILOSOPHY
            </div>
            <h3 className="text-xl md:text-2xl font-sans font-bold uppercase text-white tracking-tight leading-snug">
              UNIFORM FOR THE UNDEFINED. A DIGITAL FASHION EXHIBITION THAT HAPPENS TO SUPPORT SHOPPING.
            </h3>
            <p className="text-xs font-mono text-[#C8C8C8] leading-relaxed max-w-md">
              Constructed at the intersection of digital brutalism, chrome gothic typography, and heavyweight Japanese textiles. Every piece is an archival specimen engineered for permanent utility.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#888888] uppercase">
              ARCHIVE DIRECTORY
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#C8C8C8]">
              <li>
                <Link href="/shop" onMouseEnter={playHover} className="hover:text-white transition-colors">
                  COMPLETE CATALOGUE
                </Link>
              </li>
              <li>
                <Link href="/collections" onMouseEnter={playHover} className="hover:text-white transition-colors">
                  COLLECTIONS CHAPTERS
                </Link>
              </li>
              <li>
                <Link href="/drops" onMouseEnter={playHover} className="hover:text-white transition-colors">
                  FEATURED DROPS
                </Link>
              </li>
              <li>
                <Link href="/editorial" onMouseEnter={playHover} className="hover:text-white transition-colors">
                  EDITORIAL CAMPAIGN
                </Link>
              </li>
              <li>
                <span className="text-[#888888]">SIZE ARCHIVE GUIDE</span>
              </li>
            </ul>
          </div>

          {/* Technical Newsletter / Transmission */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#888888] uppercase">
              TRANSMISSIONS // DISPATCH SIGNALS
            </div>
            <p className="text-xs font-mono text-[#888888]">
              RECEIVE PRIVATE DROPS AND ARCHIVE ALLOCATIONS PRIOR TO PUBLIC RELEASE.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('TRANSMISSION SUBSCRIBED // PROTOCOL REGISTERED');
              }}
              className="flex items-center border border-white/20 bg-[#0B0B0B]"
            >
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS..."
                className="w-full bg-transparent px-4 py-3 text-xs font-mono text-white placeholder-[#777777] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-white text-black text-xs font-mono font-bold uppercase hover:bg-[#C8C8C8] transition-colors flex-shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Monumental Architectural Typography Watermark */}
        <div className="pt-12 text-center overflow-hidden">
          <div className="font-monumental text-5xl sm:text-7xl md:text-9xl text-white/[0.06] tracking-tighter uppercase whitespace-nowrap select-none">
            AVERON FLAGSHIP // UNIFORM FOR THE UNDEFINED
          </div>
        </div>

        {/* Monumental Chrome Gothic Logo Display (Authentic Preserved Logo) */}
        <div className="py-12 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-[3/1] opacity-85 hover:opacity-100 transition-opacity duration-700 animate-chrome-sweep">
            <Image
              src="/brand/averon-logo-original.png"
              alt="AVERON Chrome Emblem"
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-contain filter drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            />
          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono text-[#888888] uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span>© 2026 AVERON DIGITAL FLAGSHIP</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span>SYSTEM 1.0.4</span>
          </div>

          <div className="flex items-center gap-6">
            <span>DESIGN: DIGITAL FASHION BRUTALISM</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors border border-white/15 px-3 py-1 bg-white/5"
            >
              <span>TOP OF FLAGSHIP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
