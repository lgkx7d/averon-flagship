'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Plus, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';

export default function RunwayMobile() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const runwayProducts = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 5);
  const { addItem } = useCart();
  const { playHover, playChime } = useSound();

  // Track active slide on swipe scroll without hijacking vertical gestures
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.clientWidth * 0.84; // 84vw
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.max(0, Math.min(runwayProducts.length - 1, index)));
  };

  return (
    <section id="runway" className="relative w-full bg-[#0B0B0B] text-[#F0EFEB] py-16 select-none overflow-hidden border-t border-b border-white/10">
      {/* Top Mobile Runway Header */}
      <div className="px-5 mb-6 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <div className="text-[9px] font-mono tracking-[0.3em] text-[#777777] uppercase flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-white" />
            <span>RUNWAY ARCHIVE // CHAPTER 01</span>
          </div>
          <h2 className="font-monumental text-4xl uppercase text-white tracking-tight leading-none">
            NEW ARRIVALS.
          </h2>
        </div>

        {/* Progress indicator */}
        <div className="text-right space-y-1">
          <div className="text-xs font-mono tracking-widest text-white">
            [ 0{activeIndex + 1} / 0{runwayProducts.length} ]
          </div>
          <div className="w-16 h-1 bg-[#222222] overflow-hidden ml-auto">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${((activeIndex + 1) / runwayProducts.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Swipeable Runway Carousel (Touch-First with Snap, Preserving Natural Vertical Scroll) */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 px-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {runwayProducts.map((product, idx) => {
          // Alternating monochrome card styling: Even = Off-white paper, Odd = Deep obsidian/charcoal
          const isLightCard = idx === 1 || idx === 3;

          return (
            <div
              key={product.id}
              className={`w-[84vw] max-w-[380px] flex-shrink-0 snap-center p-5 flex flex-col justify-between border transition-all ${
                isLightCard
                  ? 'bg-[#F0EFEB] text-[#080808] border-black/20 shadow-2xl'
                  : idx === 2
                  ? 'bg-[#1E1E1E] text-white border-white/20 shadow-2xl'
                  : 'bg-[#121212] text-white border-white/15 shadow-2xl'
              }`}
            >
              {/* Card Header */}
              <div className={`flex items-start justify-between pb-3 border-b ${isLightCard ? 'border-black/15' : 'border-white/10'}`}>
                <div>
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${isLightCard ? 'text-[#666666]' : 'text-[#777777]'}`}>
                    SPREAD 0{idx + 1} // {product.collection}
                  </span>
                  <h3 className={`font-monumental text-2xl uppercase tracking-tight leading-none mt-1 ${isLightCard ? 'text-[#080808]' : 'text-white'}`}>
                    {product.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-mono font-bold ${isLightCard ? 'text-[#080808]' : 'text-white'}`}>
                    {product.formattedPrice}
                  </div>
                </div>
              </div>

              {/* Portrait Product Image */}
              <div className="relative w-full aspect-[3/4] my-3 overflow-hidden bg-[#080808]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="84vw"
                  className="object-cover grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badge */}
                <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase font-bold ${
                  isLightCard ? 'bg-white text-black shadow-md' : 'bg-black/80 text-white border border-white/20'
                }`}>
                  {product.badge || 'MONOLITH ARCHIVE'}
                </div>
              </div>

              {/* Thumb Actions */}
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/product/${product.id}`}
                  onClick={playHover}
                  className={`flex-1 py-3 text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-transform ${
                    isLightCard
                      ? 'bg-[#080808] text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>INSPECT PIECE</span>
                </Link>
                <button
                  onClick={() => {
                    playChime();
                    addItem(product, product.sizes[0], product.colors[0].name);
                  }}
                  className={`p-3 border active:scale-[0.96] transition-transform ${
                    isLightCard
                      ? 'border-black/30 text-black active:bg-black active:text-white'
                      : 'border-white/30 text-white active:bg-white active:text-black'
                  }`}
                  aria-label="Add to bag"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Carousel End Card */}
        <div className="w-[60vw] max-w-[280px] flex-shrink-0 snap-center p-6 bg-[#161616] text-white border border-white/20 flex flex-col justify-between text-center">
          <div className="my-auto space-y-3">
            <div className="text-[9px] font-mono tracking-widest text-[#777777] uppercase">
              RUNWAY COMPLETE
            </div>
            <h4 className="font-monumental text-2xl uppercase tracking-tight">
              VIEW COMPLETE CATALOGUE
            </h4>
          </div>
          <Link
            href="/shop"
            onClick={playChime}
            className="w-full py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.97] transition-transform flex items-center justify-center gap-2"
          >
            <span>EXPLORE [08]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Swipe Affordance Hint */}
      <div className="px-5 mt-4 flex items-center justify-between text-[8px] font-mono text-[#777777] uppercase tracking-widest">
        <span>SWIPE HORIZONTALLY TO BROWSE</span>
        <span>SNAP ASSIST: ACTIVE</span>
      </div>
    </section>
  );
}
