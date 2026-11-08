'use client';

import React from 'react';
import GalleryDesktop from './GalleryDesktop';
import GalleryMobile from './GalleryMobile';

export default function MonumentalGallery() {
  return (
    <>
      {/* Desktop Composition (Approved 3D Floating Architecture & Multi-Plane Parallax) */}
      <div className="hidden md:block">
        <GalleryDesktop />
      </div>

      {/* Mobile-Exclusive Composition (Sequential Full-Width Portrait Plates on Off-White Canvas) */}
      <div className="block md:hidden">
        <GalleryMobile />
      </div>
    </>
  );
}
