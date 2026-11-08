'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function MonumentalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgTypographyRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Suspended Architectural Plane Refs
  const suspendedPlaneRef = useRef<HTMLDivElement>(null);
  const modelPlateRef = useRef<HTMLDivElement>(null);
  const floatingCharcoalRef = useRef<HTMLDivElement>(null);
  const portraitSlabRef = useRef<HTMLDivElement>(null);
  const sculptureSlabRef = useRef<HTMLDivElement>(null);

  const { playHover } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Deepest Background Extruded Typography Parallax
      if (bgTypographyRef.current) {
        gsap.to(bgTypographyRef.current, {
          x: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // 2. Signature 3D Suspended Architecture: Multi-Plane Differential Parallax
      if (suspendedPlaneRef.current) {
        gsap.to(suspendedPlaneRef.current, {
          y: -50,
          rotateY: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: suspendedPlaneRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (modelPlateRef.current) {
        gsap.to(modelPlateRef.current, {
          y: -25,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: modelPlateRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Overlapping charcoal card moves faster in foreground (high differential depth)
      if (floatingCharcoalRef.current) {
        gsap.to(floatingCharcoalRef.current, {
          y: -85,
          rotateX: -1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: floatingCharcoalRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // 3. Lower Architectural Slabs
      if (portraitSlabRef.current) {
        gsap.to(portraitSlabRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitSlabRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }

      if (sculptureSlabRef.current) {
        gsap.to(sculptureSlabRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sculptureSlabRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F0EFEB] text-[#080808] pt-32 pb-28 md:pt-44 md:pb-40 px-6 md:px-12 overflow-hidden border-b border-black/15 select-none perspective-[1400px]"
    >
      {/* Precision Hairline Architectural Measurement Guides on Off-White Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-8 text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase">
          ELEVATION +43.2M // MATTE CANVAS SPEC: 500GSM BOND
        </div>
        <div className="absolute top-8 right-8 text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase">
          GRID: 1920_AXIS // OC-SURFACE
        </div>
        <div className="absolute left-12 top-0 bottom-0 w-px border-l border-dashed border-black/10" />
        <div className="absolute right-12 top-0 bottom-0 w-px border-r border-dashed border-black/10" />
      </div>

      {/* Deepest Layer: Extruded Architectural Letterforms in Ink Tint */}
      <div
        ref={bgTypographyRef}
        className="absolute top-16 left-0 right-0 font-monumental text-[22vw] leading-none text-black/[0.035] select-none pointer-events-none tracking-tighter whitespace-nowrap will-change-transform z-0"
        aria-hidden="true"
      >
        MONOLITH ARCHIVE // FORM // UNIFORM //
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto">
        {/* Section Header with Monumental Editorial Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24 md:mb-36">
          <div className="lg:col-span-8">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#666666] uppercase mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#080808]" />
              <span className="font-bold text-[#080808]">AVANT-GARDE VISUAL ESSAY // CAMPAIGN 01</span>
            </div>
            <h2
              ref={headlineRef}
              className="font-monumental text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] uppercase text-[#080808] tracking-[-0.04em] leading-[0.84] drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            >
              NEW FORM.
              <br />
              <span className="font-serif italic font-normal text-[#1A1A1A] tracking-[-0.025em] text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] leading-[0.92] block mt-[-0.1em]">
                NEW UNIFORM.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-mono text-[#333333] leading-relaxed border-l-2 border-[#080808]/25 pl-4">
              We reject transient trend cycles. Every garment is cut as an industrial archetype, balancing brutal geometric weight against effortless human kinetics.
            </p>
            <div className="text-[10px] font-mono text-[#666666] uppercase tracking-widest pt-2">
              LOCATION: BERLIN ARCHIVE // ELEVATION: 43M
            </div>
          </div>
        </div>

        {/* SIGNATURE 3D EDITORIAL COMPOSITION:
            Suspended Matte-Black Structural Planes above Off-White Canvas with Overlapping Charcoal Plinths */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-28 md:mb-44">
          {/* Main Monumental Visual Slabs (Multi-Layer Z-Axis Architecture) */}
          <div
            ref={suspendedPlaneRef}
            className="lg:col-span-7 relative will-change-transform"
          >
            {/* Suspended Powder-Coated Metal Backdrop Structure */}
            <div className="absolute -inset-4 bg-[#080808] -z-10 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.45)] border border-black/40 transform -rotate-1 hidden sm:block" />

            {/* Main Foreground Model Slab */}
            <div
              ref={modelPlateRef}
              className="relative h-[600px] md:h-[820px] bg-[#0B0B0B] border border-black/30 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] group"
              data-cursor="VIEW"
            >
              <Image
                src="/images/editorial/gallery-1.jpg"
                alt="Editorial Avant-Garde Model Study"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />

              {/* Physical Depth Cast Typography */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                <div>
                  <span className="text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                    PLATE 01.1 // SILHOUETTE ARCHITECTURE
                  </span>
                  <h4 className="text-lg font-sans font-bold text-white uppercase mt-0.5 drop-shadow-md">
                    DOUBLE-FACE HOODIE OVER SELVEDGE
                  </h4>
                </div>
                <span className="text-xs font-mono text-white/80 font-bold">[ 01 ]</span>
              </div>
            </div>
          </div>

          {/* Overlapping Cantilevered Charcoal Structural Plinth */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 z-20">
            {/* Suspended Floating Specimen Frame with Directional Shadow */}
            <div
              ref={floatingCharcoalRef}
              className="relative w-full aspect-[4/5] bg-[#141414] border border-black/35 overflow-hidden shadow-[0_30px_70px_-10px_rgba(0,0,0,0.5)] group will-change-transform"
              data-cursor="EXPLORE"
            >
              <Image
                src="/images/editorial/gallery-fabric.jpg"
                alt="Tactile 500GSM Fabric Weave Macro Study"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover grayscale contrast-150 group-hover:scale-110 transition-transform duration-700"
              />
              {/* High-Contrast Technical Tag Plate */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-[9px] font-mono tracking-widest uppercase font-bold shadow-md">
                MACRO TEXTURE // 500GSM WEAVE
              </div>
            </div>

            {/* Industrial Physical Metal Box Specification */}
            <div className="p-7 bg-[#111111] text-[#F0EFEB] border border-black/30 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.35)] space-y-3">
              <span className="text-[10px] font-mono text-[#C8C8C8] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white" />
                MATERIAL INTEGRITY // ARCHIVE SPEC
              </span>
              <p className="text-xs font-mono text-[#C8C8C8] leading-relaxed">
                Yarn-dyed organic long-staple cotton spun on vintage shuttle looms. Pre-shrunk under high steam pressure to eliminate longitudinal dimensional distortion.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetrical Composition 2: Suspended Dark Portrait & Monolithic Outerwear Slabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div
              ref={portraitSlabRef}
              className="relative w-full aspect-[3/4] bg-[#121212] border border-black/25 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] group will-change-transform"
              data-cursor="EXPLORE"
            >
              <Image
                src="/images/editorial/gallery-2.jpg"
                alt="Editorial Portrait Study"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 text-white text-[9px] font-mono uppercase tracking-widest border border-white/20">
                PLATE 02.4 // DARK PROFILE
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/20 pt-4">
              <span className="text-xs font-mono text-[#555555] uppercase font-semibold">
                MONOLITH STUDY // SER.08
              </span>
              <Link
                href="/editorial"
                onMouseEnter={playHover}
                className="flex items-center gap-2 text-xs font-mono text-[#080808] hover:text-black font-bold uppercase transition-colors"
              >
                <span>VIEW FULL CAMPAIGN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div
            ref={sculptureSlabRef}
            className="lg:col-span-7 order-1 lg:order-2 relative h-[550px] md:h-[750px] bg-[#0B0B0B] border border-black/30 overflow-hidden shadow-[0_35px_80px_-20px_rgba(0,0,0,0.4)] group will-change-transform"
          >
            <Image
              src="/images/editorial/gallery-isolated.jpg"
              alt="Giant Isolated Outerwear Sculpture"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 p-5 bg-[#080808]/95 border border-white/20 max-w-md shadow-2xl">
              <div className="text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                SPECIMEN: AVG-26-J04 // MONOLITH
              </div>
              <h4 className="text-base font-sans font-bold text-white uppercase mt-0.5">
                STRUCTURED BONDED OUTERWEAR
              </h4>
              <p className="text-[11px] font-mono text-[#C8C8C8] mt-1">
                800GSM Wool-Twill Composite with Internal Heat-Sealed Membrane.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
