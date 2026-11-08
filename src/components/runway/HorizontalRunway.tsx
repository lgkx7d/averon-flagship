'use client';

import React from 'react';
import RunwayDesktop from './RunwayDesktop';
import RunwayMobile from './RunwayMobile';

export default function HorizontalRunway() {
  return (
    <>
      {/* Desktop Composition (Approved Pinned Horizontal Scrub) */}
      <div className="hidden md:block">
        <RunwayDesktop />
      </div>

      {/* Mobile Composition (Dedicated Touch Swipe Carousel without Scroll Hijacking) */}
      <div className="block md:hidden">
        <RunwayMobile />
      </div>
    </>
  );
}
