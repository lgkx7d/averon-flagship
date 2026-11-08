'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag, ShieldCheck, Ruler, Check, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';
import SizeGuideModal from '@/components/product/SizeGuideModal';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);

  const { addItem, openCart } = useCart();
  const { playHover, playChime } = useSound();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40 && product.images.length > 1) {
      if (diff < 0) {
        // Next image
        setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
      } else {
        // Prev image
        setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  const handleAddToBag = () => {
    playChime();
    const size = product.sizes[selectedSizeIndex] || product.sizes[0];
    const color = product.colors[selectedColorIndex]?.name || product.colors[0]?.name;
    addItem(product, size, color, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    playHover();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('LINK COPIED TO CLIPBOARD');
    }
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto select-none">
      {/* Breadcrumb row */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10 text-xs font-mono text-[#777777] uppercase tracking-wider">
        <Link
          href="/shop"
          onMouseEnter={playHover}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO CATALOGUE</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <span>{product.sku}</span>
          <span>•</span>
          <span>{product.collection}</span>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
        {/* Left: Tactile Image Gallery & Rail */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
          {/* Vertical Thumbnail Rail */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => {
                  playHover();
                  setSelectedImageIndex(idx);
                }}
                className={`relative w-18 md:w-20 aspect-[3/4] bg-[#0B0B0B] border transition-all overflow-hidden flex-shrink-0 ${
                  selectedImageIndex === idx
                    ? 'border-white scale-105'
                    : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover grayscale contrast-125"
                />
              </button>
            ))}
          </div>

          {/* Large Hero Stage View (Touch Swipe on Mobile, Zoom/Hover on Desktop) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex-1 aspect-[3/4] bg-[#0B0B0B] border border-white/15 overflow-hidden group shadow-2xl touch-pan-y"
            data-cursor="VIEW"
          >
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#080808]/90 border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase">
                {product.badge}
              </div>
            )}

            {/* Mobile Swipe / Image Indicator */}
            {product.images.length > 1 && (
              <div className="md:hidden absolute top-4 right-4 px-2 py-0.5 bg-black/80 border border-white/20 text-[9px] font-mono text-white">
                0{selectedImageIndex + 1} / 0{product.images.length}
              </div>
            )}

            {/* Editorial Watermark */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#080808]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest">
              <span>AVERON ARCHIVE SPECIMEN</span>
              <span className="hidden sm:inline">100% AUTHENTIC PROTOTYPE</span>
              <span className="sm:hidden text-white">SWIPE ↔</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Spec & Buy Box */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#777777] uppercase mb-2">
              <span>{product.categoryName} // {product.sku}</span>
              <button
                onClick={handleShare}
                className="hover:text-white transition-colors flex items-center gap-1.5"
                title="Share piece"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE</span>
              </button>
            </div>

            <h1 className="font-monumental text-4xl sm:text-5xl md:text-6xl uppercase text-white tracking-[-0.03em] leading-[0.88]">
              {product.name}
            </h1>

            <div className="text-2xl font-mono font-bold text-white mt-3">
              {product.formattedPrice}
            </div>
          </div>

          <p className="text-xs md:text-sm font-mono text-[#C8C8C8] leading-relaxed">
            {product.description}
          </p>

          <div className="p-3 bg-[#161616] border border-white/10 text-[11px] font-mono text-[#777777] leading-relaxed">
            {product.editorialNote}
          </div>

          {/* Color Variant Selector */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex justify-between text-xs font-mono tracking-wider uppercase">
              <span className="text-[#777777]">COLORWAY:</span>
              <span className="text-white font-bold">
                {product.colors[selectedColorIndex]?.name}
              </span>
            </div>

            <div className="flex gap-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => {
                    playHover();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-9 h-9 border transition-all ${
                    selectedColorIndex === idx
                      ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                      : 'border-white/20 hover:border-white/60'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector with Size Guide Trigger */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex justify-between items-center text-xs font-mono tracking-wider uppercase">
              <span className="text-[#777777]">SELECT ARCHIVAL SIZE:</span>
              <button
                onClick={() => {
                  playHover();
                  setIsSizeGuideOpen(true);
                }}
                className="flex items-center gap-1.5 text-[#C8C8C8] hover:text-white underline transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {product.sizes.map((size, idx) => (
                <button
                  key={size}
                  onClick={() => {
                    playHover();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`py-3 text-xs font-mono border transition-all text-center ${
                    selectedSizeIndex === idx
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#161616] text-[#777777] border-white/10 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Add to Bag Action */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={handleAddToBag}
              className={`w-full py-5 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                isAdded
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-white text-black hover:bg-[#C8C8C8]'
              }`}
              data-cursor="ADD"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>PIECE ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG // {product.formattedPrice}</span>
                </>
              )}
            </button>

            <button
              onClick={openCart}
              className="w-full py-3.5 border border-white/20 text-xs font-mono tracking-widest uppercase text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              VIEW SHOPPING BAG
            </button>
          </div>

          {/* Technical Specifications Accordion / Cards */}
          <div className="space-y-4 pt-6 border-t border-white/10 text-xs font-mono">
            <div className="p-4 bg-[#0B0B0B] border border-white/10 space-y-2">
              <div className="text-[10px] text-[#777777] uppercase tracking-widest">
                FIT & PROPORTION
              </div>
              <p className="text-[#C8C8C8]">{product.fit}</p>
            </div>

            <div className="p-4 bg-[#0B0B0B] border border-white/10 space-y-2">
              <div className="text-[10px] text-[#777777] uppercase tracking-widest">
                FABRIC & MATERIAL COMPOSITION
              </div>
              <p className="text-[#C8C8C8]">{product.composition}</p>
            </div>

            <div className="p-4 bg-[#0B0B0B] border border-white/10 space-y-2">
              <div className="text-[10px] text-[#777777] uppercase tracking-widest">
                CARE & MAINTENANCE
              </div>
              <p className="text-[#C8C8C8]">{product.care}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Archive Specimens Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-white/10 pt-16">
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase mb-1">
                CONNECTED SILHOUETTES
              </div>
              <h3 className="text-2xl font-sans font-black uppercase text-white tracking-tight">
                COMPATIBLE SPECIMENS.
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono text-[#777777] hover:text-white uppercase underline"
            >
              ALL PIECES →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Bag Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-[#080808]/95 backdrop-blur-md border-t border-white/15 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0">
          <div className="text-[10px] font-mono text-[#777777] uppercase truncate">
            {product.name}
          </div>
          <div className="text-sm font-mono font-bold text-white">
            {product.formattedPrice}
          </div>
        </div>

        <button
          onClick={handleAddToBag}
          className="px-5 py-3 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.96] transition-transform flex items-center gap-2 flex-shrink-0 shadow-lg"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isAdded ? 'ADDED' : 'ADD TO BAG'}</span>
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}

