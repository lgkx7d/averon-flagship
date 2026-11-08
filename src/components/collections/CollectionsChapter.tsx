'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/products';
import { useSound } from '@/hooks/useSound';

export default function CollectionsChapter() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const { playHover } = useSound();

  const activeCollection = COLLECTIONS[hoveredIndex] || COLLECTIONS[0];

  return (
    <section className="relative w-full bg-[#141414] text-[#F0EFEB] py-28 md:py-44 px-6 md:px-12 border-b border-white/10 select-none overflow-hidden">
      {/* Precision Structural Background Guides */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-8 left-8 text-[9px] font-mono text-[#888888] tracking-[0.3em] uppercase">
          DISCOVERY ZONE // CONCRETE & CHARCOAL ARCHITECTURE
        </div>
        <div className="absolute top-8 right-8 text-[9px] font-mono text-[#888888] tracking-[0.3em] uppercase">
          INDEX: 06 CHAPTERS // AVERON SYSTEM
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#888888] uppercase flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-white" />
              <span>CATEGORY DISCOVERY // CHAPTERS 01-06</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-black uppercase text-white tracking-tight">
              COLLECTIONS INDEX.
            </h2>
          </div>
          <div className="text-xs font-mono text-[#C8C8C8] max-w-sm">
            EXPLORE THE SIX DISCIPLINARY CHAPTERS OF THE AVERON UNIFORM SYSTEM.
          </div>
        </div>

        {/* Dual Column Layout: Interactive Category List + Dramatic Stage Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Category list with large interactive typography */}
          <div className="lg:col-span-7 space-y-2">
            {COLLECTIONS.map((col, idx) => {
              const isActive = hoveredIndex === idx;
              return (
                <div
                  key={col.id}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    playHover();
                  }}
                  className={`border-b border-white/10 py-5 transition-all group ${
                    isActive ? 'bg-white/[0.03] pl-4' : 'pl-0'
                  }`}
                >
                  <Link
                    href={col.slug === 'all' ? '/shop' : `/collections/${col.slug}`}
                    className="flex items-center justify-between"
                    data-cursor="EXPLORE"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="text-xs font-mono text-[#888888] group-hover:text-white transition-colors">
                        {col.number}
                      </span>
                      <span
                        className={`font-monumental text-3xl sm:text-5xl md:text-6xl uppercase tracking-[-0.035em] transition-all duration-300 leading-none ${
                          isActive
                            ? 'text-white translate-x-2'
                            : 'text-[#888888] hover:text-[#C8C8C8]'
                        }`}
                      >
                        {col.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#888888] group-hover:text-white transition-colors">
                      <span className="hidden sm:inline">[{col.productCount} SPECIMENS]</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>

                  {isActive && (
                    <div className="mt-2 pl-12 hidden sm:block text-xs font-mono text-[#C8C8C8] animate-fadeIn">
                      {col.subtitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Suspended Composition Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] bg-[#0B0B0B] border border-white/20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] group">
              <Image
                key={activeCollection.image}
                src={activeCollection.image}
                alt={activeCollection.title}
                fill
                sizes="500px"
                className="object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#080808]/90 border border-white/15 backdrop-blur-md shadow-2xl">
                <div className="text-[10px] font-mono text-[#888888] uppercase tracking-widest">
                  CURATED CHAPTER // ACTIVE FOCUS
                </div>
                <h4 className="font-monumental text-xl sm:text-2xl uppercase text-white tracking-tight mt-0.5">
                  {activeCollection.title}
                </h4>
                <p className="text-[11px] font-mono text-[#C8C8C8] mt-1">
                  {activeCollection.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
