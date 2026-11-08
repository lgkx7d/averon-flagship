'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { playHover, playChime } = useSound();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playChime();
    addItem(product, product.sizes[0], product.colors[0].name);
  };

  return (
    <div className="group relative bg-[#0B0B0B] border border-white/10 hover:border-white/40 transition-all duration-500 flex flex-col justify-between">
      {/* Top Card Info Bar */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777777] uppercase">
        <span>{product.sku}</span>
        <span>{product.categoryName}</span>
      </div>

      {/* Image Container with Hover Shift & Overlay */}
      <Link
        href={`/product/${product.id}`}
        onMouseEnter={playHover}
        className="relative w-full aspect-[3/4] bg-[#080808] overflow-hidden block"
        data-cursor="VIEW"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#080808]/90 border border-white/20 text-[9px] font-mono tracking-widest text-white uppercase">
            {product.badge}
          </div>
        )}

        {/* Quick View Pill on Hover */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 py-2.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase">
          <Eye className="w-3.5 h-3.5" />
          <span>INSPECT PIECE</span>
        </div>
      </Link>

      {/* Bottom Card Specs & Add Action */}
      <div className="p-5 border-t border-white/10 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/product/${product.id}`}
              className="font-monumental text-xl md:text-2xl text-white uppercase tracking-tight hover:underline line-clamp-1 block leading-tight"
            >
              {product.name}
            </Link>
            <div className="text-[11px] font-mono text-[#777777] mt-0.5">
              {product.collection}
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-white whitespace-nowrap pt-1">
            {product.formattedPrice}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3.5 h-3.5 border border-white/30"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#C8C8C8] hover:text-white transition-colors"
            title="Add to bag"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
}

