'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import ProductFilterBar, { FilterState } from '@/components/product/ProductFilterBar';
import { PRODUCTS } from '@/data/products';

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    size: 'all',
    color: 'all',
    sort: 'newest',
  });

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (filters.category !== 'all') {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters.size !== 'all') {
      list = list.filter((p) => p.sizes.some((s) => s.includes(filters.size)));
    }

    if (filters.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [filters]);

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[#080808] pt-32 pb-36 px-6 md:px-12 select-none">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Editorial Page Header */}
          <div className="border-b border-white/10 pb-12 mb-12">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#777777] uppercase flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>THE DIGITAL ARCHIVE // PERMANENT SPECIFICATION</span>
            </div>
            <h1 className="font-monumental text-6xl sm:text-8xl md:text-9xl uppercase text-white tracking-[-0.04em] leading-[0.84] mb-6">
              COMPLETE CATALOGUE.
            </h1>
            <p className="text-xs md:text-sm font-mono text-[#C8C8C8] max-w-2xl leading-relaxed">
              Every specimen conceived for the AVERON uniform system. Monumental heavyweight jersey, unwashed shuttle-loomed selvedge denim, technical fleece balaclavas, bonded tailoring, and CNC machined surgical steel hardware.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <ProductFilterBar
            filters={filters}
            onChange={setFilters}
            totalFilteredCount={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-white/10 bg-[#0B0B0B]">
              <p className="font-mono text-sm uppercase text-[#777777]">
                NO SPECIMENS MATCH CURRENT FILTER MATRIX
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 4} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

