'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';
import { useSound } from '@/hooks/useSound';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playHover, playChime } = useSound();

  // Listen for custom trigger or keyboard Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playChime();
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      playChime();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('averon-open-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('averon-open-search', handleCustomOpen);
    };
  }, [isOpen, playChime]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Filter products
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-16 md:pt-24 px-4 bg-[#080808]/90 backdrop-blur-xl">
      <div
        className="w-full max-w-3xl bg-[#0B0B0B] border border-white/20 shadow-2xl p-6 md:p-8 relative flex flex-col max-h-[80vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search Catalog"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white" />
            <span className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">
              INDEX SEARCH // ARCHIVE QUERY
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#777777] hover:text-white transition-colors p-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input box */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-[#777777]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PIECE, CATEGORY, OR SPEC..."
            className="w-full bg-[#161616] border border-white/15 px-12 py-4 text-sm font-mono tracking-wider text-white placeholder-[#777777] focus:outline-none focus:border-white transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-[#777777] hover:text-white text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick query tags */}
        {!query && (
          <div className="mb-6">
            <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mb-3">
              QUICK FILTERS
            </div>
            <div className="flex flex-wrap gap-2">
              {['HEAVYWEIGHT', 'RAW SELVEDGE', 'FLEECE', 'OUTERWEAR', 'CHROME ACCESSORY'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      playHover();
                    }}
                    className="text-xs font-mono px-3 py-1.5 border border-white/10 hover:border-white text-[#C8C8C8] hover:text-white transition-colors bg-[#161616]"
                  >
                    + {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {query && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-[#777777] uppercase tracking-wider">
                NO SPECIMENS FOUND MATCHING &ldquo;{query}&rdquo;
              </p>
              <p className="font-mono text-xs text-[#777777]/60 mt-2">
                TRY SEARCHING FOR TEE, DENIM, HOODIE, OR JACKET
              </p>
            </div>
          )}

          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-3 bg-[#161616]/50 hover:bg-[#161616] border border-white/5 hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-18 bg-[#080808] relative overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#777777] tracking-widest uppercase">
                    {product.sku} // {product.categoryName}
                  </div>
                  <h4 className="text-sm font-sans font-bold tracking-tight text-white group-hover:text-[#F0EFEB]">
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono text-[#C8C8C8] mt-0.5">
                    {product.formattedPrice}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#777777] group-hover:text-white transition-colors pr-2">
                <span>VIEW SPEC</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#777777]">
          <span>[ESC] TO CLOSE</span>
          <span>[CMD+K] SHORTCUT</span>
        </div>
      </div>
    </div>
  );
}

