'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Plus, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';

export default function RunwayDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const runwayProducts = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 5);
  const { addItem } = useCart();
  const { playHover, playChime } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return; // Dedicated mobile runway takes over on touchscreens

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
        }),
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`;
          }
          const slide = Math.min(
            runwayProducts.length,
            Math.max(1, Math.ceil(self.progress * runwayProducts.length))
          );
          setCurrentSlideIndex(slide);
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [runwayProducts.length]);

  return (
    <section
      id="runway"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0B0B0B] border-t border-b border-white/10 select-none"
    >
      {/* Top Fixed HUD within the pinned section */}
      <div className="absolute top-0 left-0 w-full z-20 px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-[#777777] uppercase">
          <span className="w-2 h-2 bg-white" />
          <span className="text-white font-bold">EDITORIAL RUNWAY // SPREADS 01—05</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">ALTERNATING MONOCHROME ARCHIVE</span>
        </div>

        {/* Progress & Slide Count */}
        <div className="flex items-center gap-6">
          <div className="text-xs font-mono tracking-widest text-white">
            [ 0{currentSlideIndex} / 0{runwayProducts.length} ]
          </div>
          <div className="w-24 sm:w-36 h-1 bg-[#292929] overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-white transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Runway Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full pt-16 pb-8 pl-6 md:pl-12 pr-24 space-x-8 md:space-x-12 will-change-transform"
      >
        {/* Intro Runway Title Card (Matte Obsidian) */}
        <div className="w-[320px] md:w-[420px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-8 bg-[#111111] border border-white/15 shadow-2xl">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase">
              CHAPTER 01 // RUNWAY ARCHIVE
            </span>
            <h3 className="font-monumental text-5xl md:text-6xl uppercase text-white tracking-[-0.035em] leading-[0.85]">
              NEW ARRIVALS.
            </h3>
            <p className="font-serif italic text-2xl text-[#C8C8C8] leading-tight">
              &ldquo;Form follows architecture, not fashion.&rdquo;
            </p>
            <p className="text-xs font-mono text-[#777777] leading-relaxed pt-2">
              Alternating editorial panels rendered in deep obsidian, crisp off-white paper stock, and industrial concrete tones. Scroll to progress through the runway.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-[9px] font-mono text-[#777777] uppercase tracking-wider">
              SCROLL DOWN TO PROGRESS RUNWAY →
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="text-[10px] font-mono text-[#C8C8C8] flex justify-between">
              <span>EDITION: MONOLITH</span>
              <span>RESTOCK: NEVER</span>
            </div>
          </div>
        </div>

        {/* SPREAD 01: Deep Charcoal Monolith (Dark Environment) */}
        {runwayProducts[0] && (
          <div className="w-[480px] md:w-[580px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-7 bg-[#141414] border border-white/15 relative overflow-hidden group hover:border-white/40 transition-all shadow-2xl">
            <div
              className="absolute -top-10 -right-6 font-monumental text-[22rem] leading-none text-white/5 pointer-events-none select-none"
              aria-hidden="true"
            >
              01
            </div>

            <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                  RUNWAY SPREAD 01 // OVERSIZED MONOLITH
                </span>
                <h4 className="font-monumental text-3xl md:text-4xl text-white uppercase tracking-tight mt-0.5">
                  {runwayProducts[0].name}
                </h4>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-white">
                  {runwayProducts[0].formattedPrice}
                </div>
                <div className="text-[9px] font-mono text-[#777777] uppercase">
                  500GSM DOUBLE-FACE
                </div>
              </div>
            </div>

            <div className="relative flex-1 my-4 bg-[#080808] overflow-hidden border border-white/5">
              <Image
                src={runwayProducts[0].images[0]}
                alt={runwayProducts[0].name}
                fill
                sizes="600px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#080808]/90 border border-white/15 text-[9px] font-mono tracking-widest text-white uppercase">
                KOJIMA, JAPAN // INTERLOCK WEAVE
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 relative z-10">
              <Link
                href={`/product/${runwayProducts[0].id}`}
                onMouseEnter={playHover}
                className="flex-1 py-3.5 px-4 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2"
                data-cursor="VIEW"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT PIECE</span>
              </Link>
              <button
                onClick={() => {
                  playChime();
                  addItem(runwayProducts[0], runwayProducts[0].sizes[0], runwayProducts[0].colors[0].name);
                }}
                className="p-3.5 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Add to bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SPREAD 02: High-Contrast Crisp Off-White Architectural Paper (Light Environment) */}
        {runwayProducts[1] && (
          <div className="w-[440px] md:w-[520px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-7 bg-[#F0EFEB] text-[#080808] border border-black/20 relative overflow-hidden group hover:border-black/50 transition-all shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
            <div
              className="absolute -top-10 -right-6 font-monumental text-[22rem] leading-none text-black/[0.05] pointer-events-none select-none"
              aria-hidden="true"
            >
              02
            </div>

            <div className="flex items-start justify-between border-b border-black/15 pb-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
                  RUNWAY SPREAD 02 // OFF-WHITE ARCHIVE
                </span>
                <h4 className="font-serif italic text-3xl md:text-4xl text-[#080808] tracking-tight leading-none mt-1">
                  Distressed Wide-Leg
                </h4>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-[#080808]">
                  {runwayProducts[1].formattedPrice}
                </span>
                <div className="text-[9px] font-mono text-[#666666] uppercase">
                  16OZ OKAYAMA SHUTTLE
                </div>
              </div>
            </div>

            <div className="relative flex-1 my-4 bg-[#080808] overflow-hidden border border-black/15 shadow-inner">
              <Image
                src={runwayProducts[1].images[0]}
                alt={runwayProducts[1].name}
                fill
                sizes="520px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white text-black font-mono text-[9px] uppercase tracking-widest font-bold shadow-md">
                16OZ RAW SELVEDGE // SHUTTLE WEAVED
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 relative z-10">
              <Link
                href={`/product/${runwayProducts[1].id}`}
                onMouseEnter={playHover}
                className="flex-1 py-3.5 px-4 bg-[#080808] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                data-cursor="VIEW"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT PIECE</span>
              </Link>
              <button
                onClick={() => {
                  playChime();
                  addItem(runwayProducts[1], runwayProducts[1].sizes[0], runwayProducts[1].colors[0].name);
                }}
                className="p-3.5 border border-black/30 hover:border-black text-black hover:bg-black hover:text-white transition-colors"
                aria-label="Add to bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SPREAD 03: Concrete Grey Structure (Tactical Environment) */}
        {runwayProducts[2] && (
          <div className="w-[420px] md:w-[480px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-7 bg-[#202020] border border-white/20 text-[#F0EFEB] shadow-2xl group hover:border-white/50 transition-all">
            <div className="space-y-1 border-b border-white/15 pb-4">
              <div className="flex justify-between text-[10px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                <span>{runwayProducts[2].sku}</span>
                <span className="font-bold text-white">{runwayProducts[2].formattedPrice}</span>
              </div>
              <h4 className="font-mono font-bold text-base md:text-lg text-white uppercase tracking-wider">
                [ SPECIMEN: {runwayProducts[2].name} ]
              </h4>
            </div>

            <div className="relative flex-1 my-4 bg-[#080808] overflow-hidden border border-white/10 shadow-lg">
              <Image
                src={runwayProducts[2].images[0]}
                alt={runwayProducts[2].name}
                fill
                sizes="480px"
                className="object-cover grayscale contrast-150 brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 text-[9px] font-mono text-white bg-black/80 px-2 py-0.5 border border-white/20">
                + BALACLAVA HOOD (DUAL CHAMBER)
              </div>
              <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white bg-black/80 px-2 py-0.5 border border-white/20">
                + INTERNAL SLING HARNESS
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#C8C8C8] uppercase border-t border-white/10 pt-2">
                <div>WEIGHT: 650 GSM</div>
                <div>ZIP: YKK EXCELLA</div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/product/${runwayProducts[2].id}`}
                  onMouseEnter={playHover}
                  className="flex-1 py-3.5 px-4 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2"
                  data-cursor="VIEW"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>INSPECT PIECE</span>
                </Link>
                <button
                  onClick={() => {
                    playChime();
                    addItem(runwayProducts[2], runwayProducts[2].sizes[0], runwayProducts[2].colors[0].name);
                  }}
                  className="p-3.5 border border-white/30 hover:border-white text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Add to bag"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPREAD 04: High-Contrast Crisp Off-White Architectural Plate (Light Environment) */}
        {runwayProducts[3] && (
          <div className="w-[460px] md:w-[560px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-7 bg-[#EBE9E4] text-[#080808] border border-black/20 relative overflow-hidden group hover:border-black/50 transition-all shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
            <div
              className="absolute -bottom-8 -left-4 font-monumental text-[14rem] leading-none text-black/[0.05] pointer-events-none select-none tracking-tighter"
              aria-hidden="true"
            >
              COAT
            </div>

            <div className="flex items-start justify-between border-b border-black/15 pb-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
                  RUNWAY SPREAD 04 // TAILORED ARCHITECTURE
                </span>
                <h4 className="font-monumental text-3xl md:text-4xl text-[#080808] uppercase tracking-tight mt-0.5">
                  {runwayProducts[3].name}
                </h4>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-[#080808]">
                  {runwayProducts[3].formattedPrice}
                </div>
                <div className="text-[9px] font-mono text-[#666666] uppercase">
                  MILAN TAILORING
                </div>
              </div>
            </div>

            <div className="relative flex-1 my-4 bg-[#080808] overflow-hidden border border-black/15 shadow-inner">
              <Image
                src={runwayProducts[3].images[0]}
                alt={runwayProducts[3].name}
                fill
                sizes="560px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white text-black text-[9px] font-mono tracking-widest uppercase font-bold shadow-md">
                BONDED WOOL TWILL // FIDLOCK HARDWARE
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 relative z-10">
              <Link
                href={`/product/${runwayProducts[3].id}`}
                onMouseEnter={playHover}
                className="flex-1 py-3.5 px-4 bg-[#080808] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                data-cursor="VIEW"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT PIECE</span>
              </Link>
              <button
                onClick={() => {
                  playChime();
                  addItem(runwayProducts[3], runwayProducts[3].sizes[0], runwayProducts[3].colors[0].name);
                }}
                className="p-3.5 border border-black/30 hover:border-black text-black hover:bg-black hover:text-white transition-colors"
                aria-label="Add to bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SPREAD 05: Deep Obsidian with Metallic Chrome Detailing */}
        {runwayProducts[4] && (
          <div className="w-[420px] md:w-[500px] h-[75vh] flex-shrink-0 flex flex-col justify-between p-7 bg-[#0B0B0B] border border-white/15 relative overflow-hidden group hover:border-white/50 transition-all shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                  SPREAD 05 // METALLIC ACCENT
                </span>
                <h4 className="font-serif italic text-2xl md:text-3xl text-white tracking-tight mt-0.5">
                  Chrome Gothic <span className="font-monumental not-italic uppercase tracking-wider text-xl">Harness</span>
                </h4>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-white">
                  {runwayProducts[4].formattedPrice}
                </div>
                <div className="text-[9px] font-mono text-[#777777] uppercase">
                  316L SURGICAL STEEL
                </div>
              </div>
            </div>

            <div className="relative flex-1 my-4 bg-[#080808] overflow-hidden border border-white/10">
              <Image
                src={runwayProducts[4].images[0]}
                alt={runwayProducts[4].name}
                fill
                sizes="500px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#080808]/90 border border-white/15 text-[9px] font-mono tracking-widest text-[#C8C8C8] uppercase">
                TUSCANY BRIDLE LEATHER // CNC MIRROR HARDWARE
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/product/${runwayProducts[4].id}`}
                onMouseEnter={playHover}
                className="flex-1 py-3.5 px-4 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2"
                data-cursor="VIEW"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT PIECE</span>
              </Link>
              <button
                onClick={() => {
                  playChime();
                  addItem(runwayProducts[4], runwayProducts[4].sizes[0], runwayProducts[4].colors[0].name);
                }}
                className="p-3.5 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Add to bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Runway Outro Link Card */}
        <div className="w-[300px] md:w-[360px] h-[75vh] flex-shrink-0 flex flex-col justify-center items-center p-8 bg-[#161616] border border-white/20 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 border border-white flex items-center justify-center">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mb-2">
              RUNWAY COMPLETE
            </div>
            <h4 className="font-monumental text-3xl uppercase text-white tracking-tight">
              COMPLETE CATALOGUE
            </h4>
          </div>
          <Link
            href="/shop"
            onMouseEnter={playHover}
            className="w-full py-4 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors shadow-lg"
          >
            EXPLORE 08 PIECES
          </Link>
        </div>
      </div>
    </section>
  );
}
