'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/products';
import { useSound } from '@/hooks/useSound';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { playHover, playChime } = useSound();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      playChime();
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, playChime]);

  if (!isOpen) return null;

  const currentCollection = COLLECTIONS[activeCategory] || COLLECTIONS[0];

  return (
    <div
      className="fixed inset-0 z-[9992] bg-[#080808] flex flex-col justify-between p-6 md:p-12 overflow-hidden transition-all duration-500"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="relative w-28 h-8 block"
            aria-label="AVERON Home"
          >
            <Image
              src="/brand/averon-logo-transparent.png"
              alt="AVERON"
              fill
              className="object-contain object-left filter brightness-125"
            />
          </Link>
          <span className="hidden sm:inline text-[10px] font-mono tracking-widest text-[#777777] uppercase border-l border-white/10 pl-4">
            NAVIGATION TAKEOVER // INDEX 2026
          </span>
        </div>

        <button
          onClick={() => {
            playHover();
            onClose();
          }}
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white hover:text-[#C8C8C8] transition-colors p-2"
          aria-label="Close navigation"
        >
          <span>CLOSE [ESC]</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content: Categories & Dynamic Image Preview Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 md:py-12">
        {/* Enormous Editorial Category Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-2 md:space-y-4">
          {COLLECTIONS.map((col, index) => {
            const isActive = activeCategory === index;
            return (
              <div
                key={col.id}
                onMouseEnter={() => {
                  setActiveCategory(index);
                  playHover();
                }}
                className="group relative"
              >
                <Link
                  href={col.slug === 'all' ? '/shop' : `/collections/${col.slug}`}
                  onClick={onClose}
                  className="flex items-baseline gap-4 md:gap-8 transition-all duration-300"
                  data-cursor="EXPLORE"
                >
                  <span className="text-xs md:text-sm font-mono tracking-widest text-[#777777] group-hover:text-white transition-colors">
                    {col.number}
                  </span>
                  <span
                    className={`font-monumental text-4xl sm:text-6xl md:text-8xl uppercase tracking-[-0.035em] transition-all duration-300 leading-[0.88] ${
                      isActive
                        ? 'text-white translate-x-4'
                        : 'text-[#292929] hover:text-[#777777]'
                    }`}
                  >
                    {col.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono tracking-widest text-[#C8C8C8]">
                    [{col.productCount} PIECES]
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Dynamic Image / Editorial Preview Box */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center items-end">
          <div className="relative w-full max-w-md aspect-[3/4] bg-[#0B0B0B] border border-white/10 p-3 overflow-hidden shadow-2xl">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                key={currentCollection.image}
                src={currentCollection.image}
                alt={currentCollection.title}
                fill
                sizes="450px"
                className="object-cover grayscale transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 border border-white/10 bg-[#080808]/80 backdrop-blur-md">
                <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                  CHAPTER {currentCollection.number} // {currentCollection.subtitle}
                </div>
                <h4 className="text-sm font-sans font-bold text-white uppercase mt-1">
                  {currentCollection.title}
                </h4>
                <p className="text-[11px] font-mono text-[#C8C8C8] line-clamp-2 mt-1">
                  {currentCollection.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Auxiliary Links */}
      <div className="w-full border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex flex-wrap gap-6 tracking-widest uppercase">
          <Link href="/shop" onClick={onClose} className="hover:text-white transition-colors">
            COMPLETE CATALOGUE
          </Link>
          <Link href="/drops" onClick={onClose} className="hover:text-white transition-colors">
            FEATURED DROPS
          </Link>
          <Link href="/editorial" onClick={onClose} className="hover:text-white transition-colors">
            EDITORIAL CAMPAIGN
          </Link>
        </div>

        <div className="text-[10px] tracking-widest uppercase">
          AVERON DIGITAL ARCHIVE // ALL RIGHTS RESERVED © 2026
        </div>
      </div>
    </div>
  );
}

