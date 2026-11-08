'use client';

import React from 'react';
import HeroDesktop from './HeroDesktop';
import HeroMobile from './HeroMobile';

export default function HeroSection() {
  return (
    <>
      {/* Desktop Composition (Approved 2.5D Parallax & WebGL Canvas) */}
      <div className="hidden md:block">
        <HeroDesktop />
      </div>

      {/* Mobile-Exclusive Portrait Composition (Touch-First & Non-Trapping Scroll) */}
      <div className="block md:hidden">
        <HeroMobile />
      </div>
    </>
  );
}
