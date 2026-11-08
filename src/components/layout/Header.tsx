'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';
import NavigationOverlay from '@/components/navigation/NavigationOverlay';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getTotalCount, openCart } = useCart();
  const { isSoundOn, toggleSound, playHover, playChime } = useSound();
  const totalCount = getTotalCount();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSearch = () => {
    playHover();
    window.dispatchEvent(new CustomEvent('averon-open-search'));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3 md:py-4 shadow-xl'
            : 'bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent py-5 md:py-7'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Preserved AVERON Chrome Gothic Wordmark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="relative w-28 sm:w-36 h-7 sm:h-9 block group"
              data-cursor="AVERON"
            >
              <Image
                src="/brand/averon-logo-transparent.png"
                alt="AVERON"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain object-left filter brightness-110 group-hover:brightness-150 transition-all duration-300"
              />
            </Link>

            <span className="hidden xl:inline text-[9px] font-mono tracking-widest text-[#777777] uppercase border-l border-white/10 pl-4">
              [ EDITION 01 // MONOLITH ]
            </span>
          </div>

          {/* Center: Editorial Navigation Links with Rolling Text Hover */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-[0.25em] uppercase font-bold">
            {[
              { label: 'SHOP', href: '/shop' },
              { label: 'NEW ARRIVALS', href: '/#runway' },
              { label: 'COLLECTIONS', href: '/collections' },
              { label: 'EDITORIAL', href: '/editorial' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={playHover}
                className="type-hover-roll text-[#C8C8C8] hover:text-white transition-colors py-0.5 group"
              >
                <span>{link.label}</span>
                <span className="text-white" aria-hidden="true">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions (Search, Sound, Bag, Menu) */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] font-mono tracking-widest uppercase">
            {/* Search Trigger (Desktop/Tablet) */}
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 text-[#C8C8C8] hover:text-white transition-colors py-1 group"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH</span>
            </button>

            {/* Sound Toggle (Desktop/Tablet) */}
            <button
              onClick={() => {
                toggleSound();
              }}
              className="hidden sm:flex items-center gap-1.5 text-[#777777] hover:text-white transition-colors py-1"
              title={isSoundOn ? 'Sound: Active (Press M to mute)' : 'Sound: Muted (Press M to unmute)'}
              aria-label="Toggle ambient sound"
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                  <span className="hidden lg:inline text-[9px] text-white">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#777777]" />
                  <span className="hidden lg:inline text-[9px]">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Bag Trigger */}
            <button
              onClick={() => {
                playChime();
                openCart();
              }}
              className="flex items-center gap-2 text-white hover:text-[#C8C8C8] transition-colors py-1 relative"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BAG</span>
              <span className="bg-white text-black px-1.5 py-0.2 text-[9px] font-bold font-mono">
                {mounted ? totalCount : 0}
              </span>
            </button>

            {/* Full-screen Menu Trigger */}
            <button
              onClick={() => {
                playChime();
                setIsNavOpen(true);
              }}
              className="flex items-center gap-2 border border-white/20 hover:border-white px-3 py-1 text-white hover:bg-white hover:text-black transition-all"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Navigation Overlay */}
      <NavigationOverlay
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />
    </>
  );
}
