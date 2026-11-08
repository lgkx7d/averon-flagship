'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function GalleryMobile() {
  const { playHover } = useSound();

  return (
    <section className="relative w-full bg-[#F0EFEB] text-[#080808] py-16 px-5 border-b border-black/15 select-none overflow-hidden">
      {/* Precision Hairline Guides */}
      <div className="absolute top-4 left-5 right-5 flex justify-between text-[8px] font-mono text-[#777777] uppercase tracking-widest pointer-events-none">
        <span>SECTOR 02 // OFF-WHITE EDITORIAL ESSAY</span>
        <span>BERLIN 43°M</span>
      </div>

      {/* Monumental Editorial Typography */}
      <div className="pt-6 mb-12">
        <div className="text-[9px] font-mono tracking-[0.3em] text-[#666666] uppercase flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-black" />
          <span className="font-bold text-black">VISUAL ESSAY // CAMPAIGN 01</span>
        </div>
        <h2 className="font-monumental text-6xl uppercase text-[#080808] tracking-[-0.04em] leading-[0.84]">
          NEW FORM.
          <br />
          <span className="font-serif italic font-normal text-[#1A1A1A] tracking-[-0.025em] text-5xl leading-[0.92] block mt-[-0.08em]">
            NEW UNIFORM.
          </span>
        </h2>
        <p className="text-xs font-mono text-[#444444] leading-relaxed mt-4 border-l-2 border-black/20 pl-3 max-w-sm">
          We reject transient trend cycles. Every garment is cut as an industrial archetype, balancing brutal geometric weight against effortless human kinetics.
        </p>
      </div>

      {/* Sequential Full-Width Mobile Plates */}
      <div className="space-y-10">
        {/* PLATE 01: Hero Silhouette Architecture */}
        <div className="space-y-3">
          <div className="relative w-full aspect-[4/5] bg-[#0B0B0B] border border-black/25 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/editorial/gallery-1.jpg"
              alt="Silhouette Architecture Model"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[8px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                PLATE 01.1 // SILHOUETTE
              </span>
              <h3 className="font-sans font-bold text-base uppercase text-white mt-0.5">
                DOUBLE-FACE HOODIE OVER SELVEDGE
              </h3>
            </div>
          </div>
        </div>

        {/* PLATE 02: Tactile 500GSM Fabric Weave Macro */}
        <div className="space-y-3">
          <div className="relative w-full aspect-[4/5] bg-[#141414] border border-black/30 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/editorial/gallery-fabric.jpg"
              alt="Macro Texture 500GSM"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-150"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white text-black text-[8px] font-mono tracking-widest uppercase font-bold shadow-md">
              MACRO TEXTURE // 500GSM
            </div>
          </div>

          <div className="p-4 bg-[#111111] text-[#F0EFEB] border border-black/20 shadow-lg space-y-2">
            <span className="text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white" />
              MATERIAL INTEGRITY
            </span>
            <p className="text-[11px] font-mono text-[#C8C8C8] leading-relaxed">
              Yarn-dyed organic long-staple cotton spun on vintage shuttle looms in Kojima. High steam pressurized pre-shrinkage.
            </p>
          </div>
        </div>

        {/* PLATE 03: Editorial Dark Profile Study */}
        <div className="space-y-3">
          <div className="relative w-full aspect-[4/5] bg-[#121212] border border-black/25 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/editorial/gallery-2.jpg"
              alt="Dark Profile Study"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-125"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/80 text-white text-[8px] font-mono uppercase tracking-widest border border-white/20">
              PLATE 02.4 // DARK PROFILE
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-black/15 pt-3">
            <span className="text-[10px] font-mono text-[#666666] uppercase">
              MONOLITH STUDY // SER.08
            </span>
            <Link
              href="/editorial"
              onClick={playHover}
              className="flex items-center gap-1.5 text-xs font-mono text-black font-bold uppercase active:opacity-70"
            >
              <span>VIEW FULL ESSAY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* PLATE 04: Structured Bonded Outerwear Sculpture */}
        <div>
          <div className="relative w-full aspect-[4/5] bg-[#0B0B0B] border border-black/25 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/editorial/gallery-isolated.jpg"
              alt="Structured Bonded Outerwear Sculpture"
              fill
              sizes="100vw"
              className="object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/90 border border-white/15 text-white">
              <div className="text-[8px] font-mono text-[#C8C8C8] uppercase tracking-widest">
                SPECIMEN: AVG-26-J04
              </div>
              <h4 className="text-sm font-sans font-bold text-white uppercase mt-0.5">
                STRUCTURED BONDED OUTERWEAR
              </h4>
              <p className="text-[10px] font-mono text-[#C8C8C8] mt-0.5">
                800GSM Wool-Twill Composite with Internal Membrane.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
