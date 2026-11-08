'use client';

import React from 'react';

interface ArchitecturalMarqueeProps {
  text?: string[];
  speed?: 'normal' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
}

export default function ArchitecturalMarquee({
  text = [
    'AVERON ARCHIVE',
    'AUTUMN/WINTER 2026',
    'MONOLITH SPECIFICATION',
    'UNIFORM FOR THE UNDEFINED',
    '500GSM DOUBLE-FACE',
    '16OZ OKAYAMA SELVEDGE',
    '316L SURGICAL CHROME',
    'DISCONTINUED UPON DEPLETION',
  ],
  speed = 'normal',
  className = '',
}: ArchitecturalMarqueeProps) {
  const repeatedText = [...text, ...text, ...text];

  return (
    <div
      className={`w-full overflow-hidden border-t border-b border-white/10 bg-[#080808] py-4 select-none relative ${className}`}
      aria-hidden="true"
    >
      <div className={speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee'}>
        {repeatedText.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 mx-4 whitespace-nowrap">
            <span className="font-monumental text-2xl sm:text-3xl md:text-4xl uppercase text-white/40 hover:text-white transition-colors tracking-tight">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

