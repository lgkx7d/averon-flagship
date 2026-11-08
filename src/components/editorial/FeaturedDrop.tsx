'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function FeaturedDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { playHover } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Pin slit section: start narrow (height 20vh / scaleY 0.25), then expand to 95vh full bleed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        slitRef.current,
        {
          clipPath: 'polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)',
          scale: 0.95,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          ease: 'power2.inOut',
        }
      ).fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        0.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#080808] py-24 md:py-36 px-6 md:px-12 select-none overflow-hidden border-b border-white/10"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Section Tagline */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase">
          <span>FEATURED DROP // LIMITED CAMPAIGN</span>
          <span>ALLOCATION: 100 UNITS WORLDWIDE</span>
        </div>

        {/* Expanding Slit Viewport Canvas */}
        <div
          ref={slitRef}
          className="relative w-full h-[60vh] md:h-[80vh] bg-[#0B0B0B] border border-white/15 overflow-hidden transition-all group"
          data-cursor="EXPLORE"
        >
          <Image
            src="/images/editorial/drop-campaign.jpg"
            alt="AVERON Featured Drop Campaign Silhouette"
            fill
            sizes="100vw"
            className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent" />

          {/* Overlaid Headline & Mask Reveal */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10"
          >
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] font-mono tracking-[0.4em] text-white/80 uppercase bg-black/60 px-3 py-1 border border-white/20 inline-block">
                DROP 001 // THE MONOLITH CAPSULE
              </span>

              <h2 className="font-monumental text-5xl sm:text-7xl md:text-9xl uppercase text-white tracking-[-0.04em] leading-[0.84]">
                BUILT DIFFERENT.
                <br />
                <span className="font-serif italic font-normal text-[#C8C8C8] tracking-[-0.025em] text-4xl sm:text-6xl md:text-8xl block mt-[-0.08em]">
                  WORN DIFFERENT.
                </span>
              </h2>

              <p className="text-xs md:text-sm font-mono text-[#C8C8C8] max-w-xl leading-relaxed pt-2">
                Uncompromising construction engineered for the fringe of urban civilization. Japanese shuttle-loomed selvedge denim paired with raw industrial metallic hardware.
              </p>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/drops"
                  onMouseEnter={playHover}
                  className="px-8 py-4 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center gap-2 group/btn"
                >
                  <span>EXPLORE THE DROP</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </Link>

                <div className="text-[10px] font-mono text-[#777777] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>DROP ACTIVE // REMAINING ALLOCATION: 34%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

