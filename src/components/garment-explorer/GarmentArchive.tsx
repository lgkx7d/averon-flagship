'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCategory, Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';

const CATEGORIES: { id: ProductCategory; label: string; number: string; title: string }[] = [
  { id: 'tops', label: '01 TOPS', number: '01', title: 'MONOLITH JERSEY' },
  { id: 'bottoms', label: '02 BOTTOMS', number: '02', title: 'SELVEDGE DENIM' },
  { id: 'layers', label: '03 LAYERS', number: '03', title: 'BALACLAVA FLEECE' },
  { id: 'jackets', label: '04 JACKETS', number: '04', title: 'BONDED TAILORING' },
  { id: 'accessories', label: '05 ACCESSORIES', number: '05', title: 'CHROME HARDWARE' },
];

export default function GarmentArchive() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tops');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const stageImageRef = useRef<HTMLDivElement>(null);
  const categoryTitleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const { playHover, playChime, playDrop } = useSound();

  const matchingProducts = PRODUCTS.filter((p) => p.category === selectedCategory);
  const [productIndex, setProductIndex] = useState<number>(0);
  const currentProduct: Product = matchingProducts[productIndex] || matchingProducts[0] || PRODUCTS[0];
  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleCategoryChange = (category: ProductCategory) => {
    if (category === selectedCategory || isTransitioning) return;
    setIsTransitioning(true);
    playDrop();

    const titleEl = categoryTitleRef.current;
    const numEl = numberRef.current;
    const imgEl = stageImageRef.current;
    const infoEl = infoRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedCategory(category);
        setProductIndex(0);
        setSelectedColorIndex(0);
        setSelectedSizeIndex(0);

        // Entry animation for new typography & visual stage
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' }
          );
        }

        if (numEl) {
          gsap.fromTo(
            numEl,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
          );
        }

        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { opacity: 0, scale: 0.94, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }

        if (infoEl) {
          gsap.fromTo(
            infoEl,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 }
          );
        }

        setIsTransitioning(false);
      },
    });

    // Exit animations
    if (titleEl) {
      tl.to(titleEl, { y: '-110%', opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);
    }
    if (numEl) {
      tl.to(numEl, { y: -25, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    }
    if (imgEl) {
      tl.to(imgEl, { opacity: 0, scale: 1.04, duration: 0.35, ease: 'power2.in' }, 0);
    }
    if (infoEl) {
      tl.to(infoEl, { opacity: 0, x: -15, duration: 0.25, ease: 'power2.in' }, 0);
    }
  };

  const nextProduct = () => {
    if (matchingProducts.length <= 1 || isTransitioning) return;
    playHover();
    setProductIndex((prev) => (prev + 1) % matchingProducts.length);
  };

  const prevProduct = () => {
    if (matchingProducts.length <= 1 || isTransitioning) return;
    playHover();
    setProductIndex((prev) => (prev - 1 + matchingProducts.length) % matchingProducts.length);
  };

  const handleAddToBag = () => {
    playChime();
    const size = currentProduct.sizes[selectedSizeIndex] || currentProduct.sizes[0];
    const color = currentProduct.colors[selectedColorIndex]?.name || currentProduct.colors[0]?.name;
    addItem(currentProduct, size, color);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F0EFEB] text-[#080808] border-b border-black/15 flex flex-col justify-between pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 select-none overflow-hidden">
      {/* Precision Hairline Guides across the Stage */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-6 left-8 text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase">
          STAGE 02 // OFF-WHITE ARCHITECTURAL ARENA
        </div>
        <div className="absolute top-6 right-8 text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase">
          SCALE: 1:1 SPEC // ARCHIVE PLATFORM
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto flex-1 flex flex-col justify-between">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-6 mb-8 gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#666666] uppercase flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#080808]" />
              <span className="font-bold text-[#080808]">THE GARMENT ARCHIVE // ARCHITECTURAL STAGE</span>
            </div>
            {/* Monumental Interactive Category Title in Deep Solid Black */}
            <div className="overflow-hidden h-14 sm:h-20 md:h-24 flex items-center">
              <h2
                ref={categoryTitleRef}
                className="font-monumental text-4xl sm:text-6xl md:text-8xl uppercase text-[#080808] tracking-[-0.035em] leading-none will-change-transform"
              >
                {activeCategoryMeta.title}.
              </h2>
            </div>
          </div>

          {/* High-Contrast Interactive Category Selector Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  onMouseEnter={playHover}
                  className={`text-xs font-mono tracking-widest uppercase px-4 py-2 border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-[#080808] text-white border-black font-bold shadow-lg scale-105'
                      : 'bg-white/85 text-[#555555] border-black/20 hover:border-black hover:text-black hover:bg-white'
                  }`}
                  data-cursor="SELECT"
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Stage Exhibition Grid: Floating Charcoal and Matte-Black Plinths */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center my-auto py-4">
          {/* Left: Floating Charcoal Metadata & Technical Structure */}
          <div className="lg:col-span-3 order-2 lg:order-1 bg-[#121212] text-[#F0EFEB] border border-black/30 p-6 md:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] space-y-6">
            <div className="space-y-1">
              <div
                ref={numberRef}
                className="font-monumental text-6xl text-white/20 select-none leading-none"
              >
                {activeCategoryMeta.number}
              </div>
              <div className="text-[10px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                SPECIMEN CLASSIFICATION
              </div>
              <div className="text-xs font-mono text-white font-bold">
                {currentProduct.collection}
              </div>
              <div className="text-[11px] font-mono text-[#C8C8C8]">
                SKU: {currentProduct.sku}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                TECHNICAL ATTRIBUTES
              </div>
              {Object.entries(currentProduct.specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs font-mono">
                  <span className="text-[#888888]">{key}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* Prev / Next specimen controls */}
            {matchingProducts.length > 1 && (
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={prevProduct}
                  className="p-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Previous specimen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#C8C8C8]">
                  0{productIndex + 1} / 0{matchingProducts.length}
                </span>
                <button
                  onClick={nextProduct}
                  className="p-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Next specimen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Center Stage: Floating Matte-Black Display Plinth */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center relative">
            <div
              ref={stageImageRef}
              className="relative w-full max-w-lg aspect-[3/4] bg-[#0B0B0B] border border-black/30 overflow-hidden shadow-[0_35px_80px_-20px_rgba(0,0,0,0.45)] group"
              data-cursor="VIEW"
            >
              <Image
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 550px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#080808]/95 border border-white/15 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest shadow-xl">
                <span>STAGE SPECIMEN // ARCHIVE</span>
                <span>{currentProduct.badge || 'AUTHENTIC ARCHIVE'}</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Charcoal Product Selection & Add to Bag Interface */}
          <div
            ref={infoRef}
            className="lg:col-span-3 order-3 bg-[#121212] text-[#F0EFEB] border border-black/30 p-6 md:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] space-y-6"
          >
            <div>
              <div className="text-[10px] font-mono text-[#C8C8C8] uppercase tracking-widest mb-1">
                {currentProduct.categoryName}
              </div>
              <h3 className="font-monumental text-3xl md:text-4xl uppercase text-white tracking-tight">
                {currentProduct.name}
              </h3>
              <div className="text-base font-mono font-bold text-white mt-1">
                {currentProduct.formattedPrice}
              </div>
            </div>

            <p className="text-xs font-mono text-[#888888] leading-relaxed">
              {currentProduct.tagline}
            </p>

            {/* Color Palette Selector */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                COLORWAY: {currentProduct.colors[selectedColorIndex]?.name}
              </div>
              <div className="flex gap-2">
                {currentProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      playHover();
                      setSelectedColorIndex(idx);
                    }}
                    className={`w-7 h-7 rounded-none border transition-all ${
                      selectedColorIndex === idx
                        ? 'border-white scale-110 shadow-md'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                <span>SELECT ARCHIVE SIZE</span>
                <span className="text-[#C8C8C8]">{currentProduct.sizes[selectedSizeIndex]}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.sizes.map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => {
                      playHover();
                      setSelectedSizeIndex(idx);
                    }}
                    className={`py-2 text-xs font-mono border transition-all text-center ${
                      selectedSizeIndex === idx
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#222222] text-[#888888] border-white/10 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToBag}
                className="w-full py-4 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2 group shadow-lg"
                data-cursor="ADD"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>

              <Link
                href={`/product/${currentProduct.id}`}
                onMouseEnter={playHover}
                className="w-full py-3 border border-white/20 text-xs font-mono tracking-widest uppercase text-white hover:border-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT FULL SPECIFICATION</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Stage Footer */}
        <div className="border-t border-black/15 pt-4 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-[#666666] uppercase tracking-widest">
          <span>THE GARMENT ARCHIVE // RESTOCK POLICY: DISCONTINUED UPON DEPLETION</span>
          <span>COMPLIMENTARY WORLDWIDE DISPATCH ON ORDERS OVER $500</span>
        </div>
      </div>
    </section>
  );
}
