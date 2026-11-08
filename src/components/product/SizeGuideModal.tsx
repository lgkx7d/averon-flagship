'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const { playHover } = useSound();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#080808]/90 backdrop-blur-xl">
      <div
        className="w-full max-w-2xl bg-[#0B0B0B] border border-white/20 p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Size Guide"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white" />
            <h3 className="text-xs font-mono tracking-widest uppercase font-bold text-white">
              AVERON SIZING ARCHIVE // METRIC SPECIFICATION
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#777777] hover:text-white p-1"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Philosophy notice */}
        <div className="p-4 bg-[#161616] border border-white/10 mb-6 space-y-2">
          <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
            FIT PHILOSOPHY: MONUMENTAL OVERSIZED
          </div>
          <p className="text-xs font-mono text-[#C8C8C8] leading-relaxed">
            All AVERON silhouettes are intentionally engineered with dropped shoulders and exaggerated columnar width. For an intentional runway box drape, select your true standard size. For a closer fit, size down one unit.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => {
              playHover();
              setUnit('cm');
            }}
            className={`px-3 py-1 text-xs font-mono border ${
              unit === 'cm'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-[#161616] text-[#777777] border-white/10'
            }`}
          >
            CENTIMETERS (CM)
          </button>
          <button
            onClick={() => {
              playHover();
              setUnit('in');
            }}
            className={`px-3 py-1 text-xs font-mono border ${
              unit === 'in'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-[#161616] text-[#777777] border-white/10'
            }`}
          >
            INCHES (IN)
          </button>
        </div>

        {/* Sizing Table */}
        <div className="border border-white/10 overflow-x-auto mb-6">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#161616] text-[#777777] border-b border-white/10">
              <tr>
                <th className="p-3">SIZE</th>
                <th className="p-3">CHEST</th>
                <th className="p-3">SHOULDER</th>
                <th className="p-3">LENGTH</th>
                <th className="p-3">SLEEVE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              <tr>
                <td className="p-3 font-bold">1 / S</td>
                <td className="p-3">{unit === 'cm' ? '128 cm' : '50.4 in'}</td>
                <td className="p-3">{unit === 'cm' ? '62 cm' : '24.4 in'}</td>
                <td className="p-3">{unit === 'cm' ? '74 cm' : '29.1 in'}</td>
                <td className="p-3">{unit === 'cm' ? '60 cm' : '23.6 in'}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">2 / M</td>
                <td className="p-3">{unit === 'cm' ? '134 cm' : '52.7 in'}</td>
                <td className="p-3">{unit === 'cm' ? '65 cm' : '25.5 in'}</td>
                <td className="p-3">{unit === 'cm' ? '76 cm' : '29.9 in'}</td>
                <td className="p-3">{unit === 'cm' ? '62 cm' : '24.4 in'}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">3 / L</td>
                <td className="p-3">{unit === 'cm' ? '140 cm' : '55.1 in'}</td>
                <td className="p-3">{unit === 'cm' ? '68 cm' : '26.7 in'}</td>
                <td className="p-3">{unit === 'cm' ? '78 cm' : '30.7 in'}</td>
                <td className="p-3">{unit === 'cm' ? '64 cm' : '25.2 in'}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">4 / XL</td>
                <td className="p-3">{unit === 'cm' ? '146 cm' : '57.4 in'}</td>
                <td className="p-3">{unit === 'cm' ? '71 cm' : '27.9 in'}</td>
                <td className="p-3">{unit === 'cm' ? '80 cm' : '31.5 in'}</td>
                <td className="p-3">{unit === 'cm' ? '66 cm' : '26.0 in'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C8C8C8] transition-colors"
        >
          CLOSE MATRIX
        </button>
      </div>
    </div>
  );
}

