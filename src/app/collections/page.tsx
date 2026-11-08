'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COLLECTIONS } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function CollectionsIndexPage() {
  const { playHover } = useSound();

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[#080808] pt-32 pb-36 px-6 md:px-12 select-none">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Header */}
          <div className="border-b border-white/10 pb-12 mb-16">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#777777] uppercase flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>COLLECTIONS ARCHIVE // CHAPTER SPECIFICATION</span>
            </div>
            <h1 className="font-monumental text-6xl sm:text-8xl md:text-9xl uppercase text-white tracking-[-0.04em] leading-[0.84] mb-6">
              COLLECTION CHAPTERS.
            </h1>
            <p className="text-xs md:text-sm font-mono text-[#C8C8C8] max-w-2xl leading-relaxed">
              Organized into six distinct structural chapters. Select an archive category below to explore individual specimen cuts, technical fabric weights, and sizing matrices.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={col.slug === 'all' ? '/shop' : `/collections/${col.slug}`}
                onMouseEnter={playHover}
                className="group bg-[#0B0B0B] border border-white/10 hover:border-white/40 transition-all flex flex-col justify-between overflow-hidden"
                data-cursor="EXPLORE"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#777777] uppercase">
                  <span>CHAPTER {col.number}</span>
                  <span>[{col.productCount} SPECIMENS]</span>
                </div>

                <div className="relative w-full aspect-[4/5] bg-[#080808] overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-sans font-black text-white uppercase tracking-tight">
                      {col.name}
                    </h3>
                    <p className="text-xs font-mono text-[#C8C8C8] mt-1 line-clamp-2">
                      {col.title} — {col.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#777777] group-hover:text-white transition-colors">
                  <span>EXPLORE CHAPTER ARCHIVE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

