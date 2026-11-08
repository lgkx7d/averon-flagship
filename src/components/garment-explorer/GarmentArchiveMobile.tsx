'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function GarmentArchiveMobile() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tops');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [productIndex, setProductIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const touchStartX = useRef<number>(0);

  const { addItem } = useCart();
  const { playHover, playChime, playDrop } = useSound();

  const matchingProducts = PRODUCTS.filter((p) => p.category === selectedCategory);
  const currentProduct: Product = matchingProducts[productIndex] || matchingProducts[0] || PRODUCTS[0];
  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleCategoryChange = (category: ProductCategory) => {
    if (category === selectedCategory || isTransitioning) return;
    setIsTransitioning(true);
    playDrop();

    setTimeout(() => {
      setSelectedCategory(category);
      setProductIndex(0);
      setSelectedSizeIndex(0);
      setIsTransitioning(false);
    }, 150);
  };

  const nextProduct = () => {
    if (matchingProducts.length <= 1) return;
    playHover();
    setProductIndex((prev) => (prev + 1) % matchingProducts.length);
  };

  const prevProduct = () => {
    if (matchingProducts.length <= 1) return;
    playHover();
    setProductIndex((prev) => (prev - 1 + matchingProducts.length) % matchingProducts.length);
  };

  // Horizontal swipe between garments
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextProduct();
      } else {
        prevProduct();
      }
    }
  };

  const handleAddToBag = () => {
    playChime();
    const size = currentProduct.sizes[selectedSizeIndex] || currentProduct.sizes[0];
    const color = currentProduct.colors[0]?.name || 'Standard';
    addItem(currentProduct, size, color);
  };

  return (
    <section className="relative w-full bg-[#F0EFEB] text-[#080808] py-14 px-5 border-b border-black/15 select-none overflow-hidden">
      {/* Top Header: Active Category Title and Specimen Navigation */}
      <div className="mb-6 border-b border-black/15 pb-4">
        <div className="text-[9px] font-mono tracking-[0.3em] text-[#666666] uppercase flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-black" />
          <span>GARMENT ARCHIVE // STAGE SPECIMEN</span>
        </div>

        <div className="flex items-end justify-between gap-2">
          <h2
            className={`font-monumental text-4xl sm:text-5xl uppercase tracking-tight leading-none text-[#080808] transition-opacity duration-200 ${
              isTransitioning ? 'opacity-20' : 'opacity-100'
            }`}
          >
            {activeCategoryMeta.title}.
          </h2>

          {/* Prev/Next specimen pager */}
          {matchingProducts.length > 1 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={prevProduct}
                className="p-2 border border-black/20 text-black active:bg-black active:text-white transition-colors"
                aria-label="Previous garment in category"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-[#555555]">
                0{productIndex + 1}/0{matchingProducts.length}
              </span>
              <button
                onClick={nextProduct}
                className="p-2 border border-black/20 text-black active:bg-black active:text-white transition-colors"
                aria-label="Next garment in category"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Centerpiece: Prominent Swipeable Garment Frame */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full aspect-[3/4] bg-[#0B0B0B] border border-black/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-6"
      >
        <Image
          src={currentProduct.images[0]}
          alt={currentProduct.name}
          fill
          priority
          sizes="95vw"
          className={`object-cover grayscale contrast-125 brightness-95 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

        {/* Specimen Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-white text-[8px] font-mono uppercase tracking-widest border border-white/20">
          {currentProduct.sku} // {currentProduct.collection}
        </div>

        {/* Swipe Hint */}
        {matchingProducts.length > 1 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/70 text-[#C8C8C8] text-[8px] font-mono tracking-wider">
            SWIPE ↔
          </div>
        )}

        {/* Bottom Metadata Bar */}
        <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/90 border border-white/15 text-white flex items-end justify-between">
          <div>
            <div className="text-[8px] font-mono text-[#C8C8C8] uppercase tracking-widest">
              {currentProduct.categoryName}
            </div>
            <h3 className="font-monumental text-xl uppercase tracking-tight text-white mt-0.5">
              {currentProduct.name}
            </h3>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            {currentProduct.formattedPrice}
          </div>
        </div>
      </div>

      {/* Bottom Controls within Comfortable Thumb Reach */}
      <div className="space-y-4">
        {/* Horizontal Category Selector Pills */}
        <div>
          <div className="text-[8px] font-mono tracking-widest text-[#666666] uppercase mb-1.5">
            SELECT ARCHIVE CHAPTER
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-[11px] font-mono tracking-wider uppercase px-3.5 py-2 border flex-shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#080808] text-white border-black font-bold shadow-md scale-105'
                      : 'bg-white/85 text-[#555555] border-black/20 active:scale-95'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection Grid */}
        <div>
          <div className="flex justify-between text-[8px] font-mono tracking-widest text-[#666666] uppercase mb-1.5">
            <span>CHOOSE ARCHIVE SIZE</span>
            <span className="text-black font-bold">{currentProduct.sizes[selectedSizeIndex]}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {currentProduct.sizes.map((size, idx) => (
              <button
                key={size}
                onClick={() => {
                  playHover();
                  setSelectedSizeIndex(idx);
                }}
                className={`py-2.5 text-xs font-mono font-bold uppercase border text-center transition-all ${
                  selectedSizeIndex === idx
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 active:scale-95'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Thumb Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleAddToBag}
            className="w-full py-4 bg-[#080808] text-white font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG [{currentProduct.formattedPrice}]</span>
          </button>

          <Link
            href={`/product/${currentProduct.id}`}
            onClick={playHover}
            className="w-full py-3 border border-black/30 text-black font-mono text-xs font-bold tracking-widest uppercase text-center active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>INSPECT FULL SPECIFICATION</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
