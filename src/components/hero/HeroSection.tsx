'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerDownRight, ArrowDown } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { useSound } from '@/hooks/useSound';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const foregroundStatementRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const { playHover, playChime } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const textLeft = textLeftRef.current;
      const textRight = textRightRef.current;
      const model = modelRef.current;
      const backdrop = backdropRef.current;
      const hud = hudRef.current;
      const pinSection = pinSectionRef.current;
      const statement = foregroundStatementRef.current;

      if (!container || !textLeft || !textRight || !model || !backdrop || !hud || !pinSection || !statement) {
        return;
      }

      // Mouse-driven 2.5D Parallax on Desktop
      if (window.innerWidth > 1024) {
        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 2;
          const yPos = (clientY / window.innerHeight - 0.5) * 2;

          // Model 3D depth shift
          gsap.to(model, {
            x: xPos * 20,
            y: yPos * 12,
            rotateY: xPos * 2.5,
            duration: 1.2,
            ease: 'power2.out',
          });

          // Background monumental typography moves opposite
          gsap.to(textLeft, {
            x: -xPos * 18,
            duration: 1.4,
            ease: 'power2.out',
          });
          gsap.to(textRight, {
            x: xPos * 18,
            duration: 1.4,
            ease: 'power2.out',
          });

          // Foreground statement moves slightly faster (multi-plane depth)
          gsap.to(statement, {
            x: xPos * 10,
            y: yPos * 6,
            duration: 1.0,
            ease: 'power2.out',
          });

          gsap.to(backdrop, {
            x: -xPos * 8,
            y: -yPos * 6,
            duration: 1.6,
            ease: 'power2.out',
          });
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMouseMove);
      }

      // Hero Pinned Scroll Choreography (GSAP ScrollTrigger)
      const pinTrigger = ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        animation: gsap.timeline()
          // Stage 2: Background typography separates horizontally
          .to(
            textLeft,
            {
              x: '-22vw',
              opacity: 0.15,
              ease: 'power1.inOut',
            },
            0
          )
          .to(
            textRight,
            {
              x: '22vw',
              opacity: 0.15,
              ease: 'power1.inOut',
            },
            0
          )
          // Stage 3: Model scales and shifts in 3D perspective
          .to(
            model,
            {
              scale: 1.14,
              y: '-6vh',
              filter: 'contrast(1.25) brightness(1.05)',
              ease: 'power2.out',
            },
            0
          )
          // Stage 4: Foreground statement expands and floats
          .to(
            statement,
            {
              y: '-10vh',
              scale: 1.05,
              ease: 'power2.out',
            },
            0
          )
          // Stage 5: Backdrop reveals architectural texture and HUD fades
          .to(
            backdrop,
            {
              opacity: 0.65,
              scale: 1.06,
              ease: 'power1.inOut',
            },
            0.15
          )
          .to(
            hud,
            {
              opacity: 0,
              y: 35,
              ease: 'power2.in',
            },
            0.45
          ),
      });

      return () => {
        pinTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinSectionRef} className="relative w-full h-screen overflow-hidden bg-[#080808]">
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 select-none overflow-hidden"
      >
        {/* WebGL Canvas Shimmer Plane */}
        <HeroCanvas />

        {/* Deep Atmospheric Backdrop Architecture */}
        <div
          ref={backdropRef}
          className="absolute inset-0 z-0 opacity-20 filter blur-[1px] scale-105 pointer-events-none transition-transform duration-1000"
        >
          <Image
            src="/images/editorial/hero-bg.jpg"
            alt="Brutalist architectural context"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80" />
        </div>

        {/* Top Technical Metadata HUD */}
        <div className="relative z-10 w-full flex items-start justify-between text-[10px] font-mono tracking-[0.25em] text-[#777777] uppercase">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span className="font-bold">AVERON DIGITAL FLAGSHIP // PHASE 01</span>
            </div>
            <div>SPECIFICATION: MONOLITH UNIFORM 2026</div>
          </div>

          <div className="hidden md:block text-right space-y-1">
            <div className="text-[#C8C8C8]">KOJIMA // MILAN // BERLIN</div>
            <div>CLASSIFICATION: UNRESTRICTED ARCHIVE</div>
          </div>
        </div>

        {/* LAYER 1 (Behind Model): Monumental Condensed Grotesk ("AVE" / "RON") */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-10 px-2 sm:px-6 md:px-10">
          <div
            ref={textLeftRef}
            className="font-monumental text-[22vw] leading-none text-white/80 tracking-tighter uppercase select-none drop-shadow-2xl translate-y-[-4vh]"
            aria-hidden="true"
          >
            AVE
          </div>
          <div
            ref={textRightRef}
            className="font-monumental text-[22vw] leading-none text-white/80 tracking-tighter uppercase select-none drop-shadow-2xl translate-y-[-4vh]"
            aria-hidden="true"
          >
            RON
          </div>
        </div>

        {/* LAYER 2 (Midground): Full-Body Fashion Silhouette */}
        <div
          ref={modelRef}
          className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-xl md:max-w-2xl h-[85vh] z-20 pointer-events-none flex items-end justify-center perspective-[1000px]"
          data-cursor="EXPLORE"
        >
          <div className="relative w-full h-full max-h-[880px]">
            <Image
              src="/images/editorial/hero-model.jpg"
              alt="AVERON Archival Monolith Silhouette"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain object-bottom filter grayscale contrast-125 brightness-95"
            />
          </div>
        </div>

        {/* Authentic AVERON Chrome Logo Accent Badge (Selective, Preserved) */}
        <div className="hidden sm:block absolute sm:top-[12%] md:top-[13%] left-1/2 -translate-x-1/2 z-30 pointer-events-none w-48 sm:w-64 md:w-80 aspect-[3/1] animate-chrome-sweep opacity-95">
          <Image
            src="/brand/averon-logo-transparent.png"
            alt="AVERON Chrome Gothic Original Emblem"
            fill
            sizes="(max-width: 640px) 200px, 380px"
            className="object-contain filter brightness-125 drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* LAYER 3 (Foreground, Overlapping Model): Monumental Editorial Statement */}
        <div
          ref={foregroundStatementRef}
          className="absolute inset-x-0 top-[44%] md:top-[40%] z-25 pointer-events-none flex flex-col items-center justify-center text-center px-4"
        >
          <div className="text-[10px] md:text-xs font-mono tracking-[0.45em] text-[#C8C8C8] uppercase mb-1 drop-shadow-md">
            ARCHIVE SYSTEM // 2026 MANIFESTO
          </div>
          <h1 className="flex flex-col items-center leading-none">
            <span className="font-monumental text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] tracking-[-0.04em] text-white uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              UNIFORM
            </span>
            <span className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-[9.5rem] tracking-[-0.025em] text-white/95 mt-[-0.15em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              FOR THE UNDEFINED.
            </span>
          </h1>
        </div>

        {/* Bottom Technical HUD & Actions */}
        <div
          ref={hudRef}
          className="relative z-30 w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end pt-2 md:pt-8"
        >
          {/* Left: Editorial Annotation */}
          <div className="md:col-span-5 space-y-1.5">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#777777] uppercase flex items-center gap-2">
              <CornerDownRight className="w-3 h-3 text-white" />
              <span>COLLECTION THESIS</span>
            </div>
            <p className="text-xs font-mono text-[#C8C8C8] max-w-sm leading-relaxed">
              500GSM Japanese double-face cotton. 16oz shuttle selvedge denim. 316L mirror-polished chrome steel.
            </p>
          </div>

          {/* Center: Scroll Down Indicator */}
          <div className="md:col-span-2 flex flex-col items-center justify-end pb-2">
            <a
              href="#runway"
              onMouseEnter={playHover}
              onClick={playChime}
              className="group flex flex-col items-center gap-2 text-[#777777] hover:text-white transition-colors"
              aria-label="Scroll to horizontal runway"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase">
                SCROLL ARCHIVE
              </span>
              <div className="w-7 h-11 border border-white/20 rounded-full flex items-start justify-center p-1.5 group-hover:border-white transition-colors">
                <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce" />
              </div>
            </a>
          </div>

          {/* Right: Actions */}
          <div className="md:col-span-5 flex flex-col md:items-end justify-end space-y-3">
            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                onMouseEnter={playHover}
                className="px-6 py-3.5 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors"
                data-cursor="VIEW"
              >
                EXPLORE FLAGSHIP
              </Link>
              <a
                href="#runway"
                onMouseEnter={playHover}
                className="px-6 py-3.5 border border-white/30 text-xs font-mono tracking-widest uppercase text-white hover:border-white hover:bg-white/10 transition-colors"
              >
                VIEW RUNWAY [05]
              </a>
            </div>
            <div className="text-[9px] font-mono text-[#777777] tracking-wider uppercase">
              STATUS: STABLE // ARCHIVE SPEC-09
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
