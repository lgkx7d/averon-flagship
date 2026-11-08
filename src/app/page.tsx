'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OpeningSequence from '@/components/loader/OpeningSequence';
import HeroSection from '@/components/hero/HeroSection';
import HorizontalRunway from '@/components/runway/HorizontalRunway';
import MonumentalGallery from '@/components/editorial/MonumentalGallery';
import GarmentArchive from '@/components/garment-explorer/GarmentArchive';
import CollectionsChapter from '@/components/collections/CollectionsChapter';
import FeaturedDrop from '@/components/editorial/FeaturedDrop';

export default function HomePage() {
  return (
    <>
      {/* Full-viewport cinematic loader (Pure Matte Black with Metallic Logo) */}
      <OpeningSequence />

      {/* Fixed Navigation Header */}
      <Header />

      {/* Primary Flagship Visual Narrative (Matte Black with Layered Off-White Typography) */}
      <HeroSection />

      {/* Horizontal New Arrivals Runway (Alternating Dark and Light Editorial Panels) */}
      <HorizontalRunway />

      {/* Physical Architectural Connector: Dark Runway to Off-White Gallery */}
      <div className="w-full bg-gradient-to-b from-[#0B0B0B] via-[#242424] to-[#F0EFEB] py-6 px-6 md:px-12 border-b border-black/15 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#F0EFEB] rounded-full animate-ping" />
          <span className="text-[#F0EFEB] font-bold">TRANSITION // SECTOR 02: THE OFF-WHITE ARCHIVE CANVAS</span>
        </div>
        <div className="text-[#888888] pt-1 sm:pt-0">
          ELEVATION: +43.2M // OPTICAL CALIBRATION: ACTIVE
        </div>
      </div>

      {/* Monumental Avant-Garde Editorial Gallery (Predominantly Off-White with Floating Architecture) */}
      <MonumentalGallery />

      {/* The Garment Archive Interactive Stage (Off-White Stage with Floating Charcoal Specimen Plinths) */}
      <GarmentArchive />

      {/* Physical Architectural Connector: Off-White Stage to Concrete/Graphite Collections */}
      <div className="w-full bg-gradient-to-b from-[#F0EFEB] via-[#292929] to-[#141414] py-6 px-6 md:px-12 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-black sm:text-white font-bold">TRANSITION // SECTOR 03: GRAPHITE & CONCRETE CHAPTERS</span>
        </div>
        <div className="text-[#555555] sm:text-[#888888] pt-1 sm:pt-0">
          ARCHIVE SPECIMENS: 06 DISCIPLINARY CHAPTERS
        </div>
      </div>

      {/* Collections Chapter Discovery (Mixed Black, Concrete-Grey, and Off-White Compositions) */}
      <CollectionsChapter />

      {/* Featured Drop Expansion Campaign (Return to Dramatic Deep Obsidian Black) */}
      <FeaturedDrop />

      {/* Architectural Flagship Footer (High-Contrast Graphite with Monumental Typography) */}
      <Footer />
    </>
  );
}
