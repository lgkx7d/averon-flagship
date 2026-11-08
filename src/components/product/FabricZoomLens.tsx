'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface FabricZoomLensProps {
  src: string;
  alt: string;
  badge?: string;
  className?: string;
}

export default function FabricZoomLens({
  src,
  alt,
  badge,
  className = '',
}: FabricZoomLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setZoomPos({ x: xPercent, y: yPercent });
    setCursorPos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onMouseMove={handleMouseMove}
      className={`relative w-full aspect-[3/4] bg-[#0B0B0B] border border-white/15 overflow-hidden group shadow-2xl select-none ${className}`}
      data-cursor={isZooming ? 'MACRO' : 'VIEW'}
    >
      {/* Base Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover grayscale contrast-125 brightness-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />

      {/* Overlaid Badge */}
      {badge && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#080808]/90 border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase z-10 pointer-events-none">
          {badge}
        </div>
      )}

      {/* Watermark Identifier */}
      <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#080808]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-[#C8C8C8] uppercase tracking-widest z-10 pointer-events-none">
        <span>AVERON TACTILE SPECIMEN</span>
        <span className="hidden sm:inline">HOVER TO ACTIVATE MACRO LOUPE</span>
        <span>100% ARCHIVE PROTOTYPE</span>
      </div>

      {/* Circular Tactile Magnifier Lens */}
      {isZooming && (
        <div
          className="absolute pointer-events-none w-44 h-44 rounded-full border-2 border-white/70 shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden z-20 hidden md:block"
          style={{
            left: `${cursorPos.x - 88}px`,
            top: `${cursorPos.y - 88}px`,
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '350%',
              backgroundRepeat: 'no-repeat',
              filter: 'grayscale(100%) contrast(140%) brightness(100%)',
            }}
          />
          <div className="absolute inset-0 border border-white/30 rounded-full" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 border border-white/20 text-[8px] font-mono text-white tracking-widest uppercase">
            3.5X MACRO
          </div>
        </div>
      )}
    </div>
  );
}

