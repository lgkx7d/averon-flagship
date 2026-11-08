'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { ProductCategory } from '@/types/product';
import { useSound } from '@/hooks/useSound';

export interface FilterState {
  category: ProductCategory | 'all';
  size: string;
  color: string;
  sort: 'newest' | 'price-asc' | 'price-desc';
}

interface ProductFilterBarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalFilteredCount: number;
}

export default function ProductFilterBar({
  filters,
  onChange,
  totalFilteredCount,
}: ProductFilterBarProps) {
  const { playHover } = useSound();

  const handleCategory = (category: ProductCategory | 'all') => {
    playHover();
    onChange({ ...filters, category });
  };

  const handleSize = (size: string) => {
    playHover();
    onChange({ ...filters, size: filters.size === size ? 'all' : size });
  };

  const handleSort = (sort: FilterState['sort']) => {
    playHover();
    onChange({ ...filters, sort });
  };

  const resetFilters = () => {
    playHover();
    onChange({ category: 'all', size: 'all', color: 'all', sort: 'newest' });
  };

  return (
    <div className="w-full bg-[#0B0B0B] border border-white/10 p-5 md:p-6 mb-12 space-y-5 select-none">
      {/* Top Header of the Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white font-bold">
          <SlidersHorizontal className="w-4 h-4 text-white" />
          <span>FILTER SYSTEM // SHOWING {totalFilteredCount} SPECIMENS</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#777777] hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET ALL</span>
          </button>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#777777] uppercase">SORT:</span>
            <select
              value={filters.sort}
              onChange={(e) => handleSort(e.target.value as FilterState['sort'])}
              className="bg-[#161616] border border-white/20 text-xs font-mono text-white px-2 py-1 focus:outline-none"
            >
              <option value="newest">EDITION: NEWEST</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Options: Categories & Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Category Pills */}
        <div className="md:col-span-8 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'ALL PIECES' },
            { id: 'tops', label: '01 TOPS' },
            { id: 'bottoms', label: '02 BOTTOMS' },
            { id: 'layers', label: '03 LAYERS' },
            { id: 'jackets', label: '04 JACKETS' },
            { id: 'accessories', label: '05 ACCESSORIES' },
          ].map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id as ProductCategory | 'all')}
                className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 border transition-all ${
                  isSelected
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#161616] text-[#777777] border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Size Selector Pills */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
          <span className="text-[10px] font-mono text-[#777777] uppercase mr-1">SIZE:</span>
          {['S', 'M', 'L', 'XL'].map((s) => {
            const isSelected = filters.size === s;
            return (
              <button
                key={s}
                onClick={() => handleSize(s)}
                className={`w-8 h-8 text-[11px] font-mono border transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#161616] text-[#777777] border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

