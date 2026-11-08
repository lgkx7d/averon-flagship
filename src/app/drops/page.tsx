'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { ArrowUpRight, Flame, ShieldAlert } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function DropsPage() {
  const dropProducts = PRODUCTS.filter((p) => p.isFeaturedDrop);
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
              <span>TRANSMISSION ARCHIVE // LIMITED DROPS</span>
            </div>
            <h1 className="font-monumental text-6xl sm:text-8xl md:text-9xl uppercase text-white tracking-[-0.04em] leading-[0.84] mb-6">
              THE DROP CAPSULE.
            </h1>
            <p className="text-xs md:text-sm font-mono text-[#C8C8C8] max-w-2xl leading-relaxed">
              Curated micro-allocations released without prior notice. Each piece is constructed with experimental finishes, hand-numbered hardware, and will not be re-manufactured.
            </p>
          </div>

          {/* Campaign Banner Slit */}
          <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#0B0B0B] border border-white/15 overflow-hidden mb-16 flex flex-col justify-end p-8 md:p-16">
            <Image
              src="/images/editorial/drop-campaign.jpg"
              alt="Drop Capsule Visual"
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale contrast-125 brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ALLOCATION 001 ACTIVE // 34% REMAINING</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase text-white tracking-tight">
                MONOLITH DROP 01
              </h2>
              <p className="text-xs font-mono text-[#C8C8C8]">
                Distressed wide-leg selvedge denim, 800gsm peaked coat, and 75mm chiseled platform boots.
              </p>
            </div>
          </div>

          {/* Drop Items Grid */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-[#777777] uppercase tracking-wider">
            <span>ALLOCATED SPECIMENS: {dropProducts.length}</span>
            <span>SHIPPING DISPATCH: IMMEDIATE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dropProducts.map((product) => (
              <ProductCard key={product.id} product={product} priority />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

