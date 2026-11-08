'use client';

import React from 'react';
import GarmentArchiveDesktop from './GarmentArchiveDesktop';
import GarmentArchiveMobile from './GarmentArchiveMobile';

export default function GarmentArchive() {
  return (
    <>
      {/* Desktop Composition (Approved 3-Column Floating Plinths on Off-White Stage) */}
      <div className="hidden md:block">
        <GarmentArchiveDesktop />
      </div>

      {/* Mobile Composition (Dedicated Touch-First Fashion Application Interface) */}
      <div className="block md:hidden">
        <GarmentArchiveMobile />
      </div>
    </>
  );
}
