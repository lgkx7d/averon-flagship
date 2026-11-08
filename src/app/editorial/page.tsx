'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export default function EditorialPage() {
  const { playHover } = useSound();

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[#080808] pt-32 pb-36 px-6 md:px-12 select-none">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Header */}
          <div className="border-b border-white/10 pb-12 mb-16">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#777777] uppercase flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>EDITORIAL CAMPAIGN // ESSAY 01</span>
            </div>
            <h1 className="font-monumental text-6xl sm:text-8xl md:text-9xl uppercase text-white tracking-[-0.04em] leading-[0.84] mb-6">
              THE MONOLITH ESSAY.
            </h1>
            <p className="text-xs md:text-sm font-mono text-[#C8C8C8] max-w-2xl leading-relaxed">
              A visual investigation into digital fashion brutalism, tactile weight, and the deliberate erosion of conventional silhouette proportions.
            </p>
          </div>

          {/* Editorial Article Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative w-full aspect-[16/10] bg-[#0B0B0B] border border-white/10 overflow-hidden">
                <Image
                  src="/images/editorial/gallery-1.jpg"
                  alt="Editorial plate 01"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-cover grayscale contrast-125"
                />
              </div>

              <div className="space-y-4 pt-4">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                  THESIS STATEMENT // BERLIN & MILAN
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white uppercase leading-snug">
                  THE BODY AS AN ARCHITECTURAL MONUMENT
                </h3>
                <p className="text-sm font-mono text-[#C8C8C8] leading-relaxed">
                  Traditional streetwear relies on graphic saturation and fleeting hype signifiers. AVERON reduces the proposition to fundamental structural physics: heavy organic yarn density, razor-sharp shoulder geometry, unwashed selvedge stiffness, and cold liquid chrome accents.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="relative w-full aspect-[4/5] bg-[#0B0B0B] border border-white/10 overflow-hidden">
                <Image
                  src="/images/editorial/gallery-fabric.jpg"
                  alt="Fabric texture plate"
                  fill
                  sizes="450px"
                  className="object-cover grayscale contrast-150"
                />
              </div>

              <div className="p-6 bg-[#0B0B0B] border border-white/10 space-y-4">
                <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                  CURATORIAL CREDITS
                </div>
                <div className="space-y-2 text-xs font-mono text-[#C8C8C8]">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">DIRECTION:</span>
                    <span>AVERON ATELIER</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">PHOTOGRAPHY:</span>
                    <span>ARCHIVE STUDY 01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">HARDWARE:</span>
                    <span>316L SURGICAL STEEL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">LOCATION:</span>
                    <span>KOJIMA // MILAN // BERLIN</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/shop"
                    onMouseEnter={playHover}
                    className="w-full py-3 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>EXPLORE ALL SPECIMENS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

