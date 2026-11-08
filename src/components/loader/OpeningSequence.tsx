'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useSound } from '@/hooks/useSound';

interface OpeningSequenceProps {
  onComplete?: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AVERON / SYSTEM INITIALIZING');
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const { playChime, playDrop } = useSound();

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('averon_entered');
    const isReturning = Boolean(hasVisited);

    let currentProgress = 0;
    let isFinished = false;

    // Track real assets: fonts, document ready, logo image
    const criticalAssets = [
      '/brand/averon-logo-original.png',
      '/images/editorial/hero-model.jpg',
      '/images/editorial/hero-bg.jpg',
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length + 1; // +1 for fonts

    const updateRealProgress = () => {
      loadedCount++;
      const targetPercent = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      currentProgress = targetPercent;
      setProgress(targetPercent);

      if (targetPercent >= 100 && !isFinished) {
        completeSequence();
      }
    };

    // Load fonts
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setStatusText('TYPOGRAPHY LOADED // KERN BUFFERS OK');
        updateRealProgress();
      }).catch(updateRealProgress);
    } else {
      updateRealProgress();
    }

    // Preload critical images
    criticalAssets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setStatusText(`ASSET BUFFERED // ${src.split('/').pop()}`);
        updateRealProgress();
      };
      img.onerror = () => {
        // Never block on failure
        updateRealProgress();
      };
    });

    // Fallback safety timeout: 2.8s for first visit, 0.9s for returning
    const safetyTimeout = setTimeout(() => {
      if (!isFinished) {
        setProgress(100);
        completeSequence();
      }
    }, isReturning ? 900 : 2800);

    const completeSequence = () => {
      if (isFinished) return;
      isFinished = true;
      setStatusText('SYSTEM ONLINE // LAUNCHING FLAGSHIP');
      sessionStorage.setItem('averon_entered', 'true');

      // Audio accent
      playDrop();

      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 400);
        },
      });

      // Logo brief enlarge and spatial clipping expansion
      if (logoRef.current) {
        tl.to(logoRef.current, {
          scale: 1.08,
          filter: 'brightness(1.5)',
          duration: 0.5,
          ease: 'power2.out',
        });
      }
      if (containerRef.current) {
        tl.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.85,
          ease: 'power4.inOut',
        });
      }
    };

    // Keyboard ESC to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFinished) {
        clearTimeout(safetyTimeout);
        completeSequence();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playChime, playDrop, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[99999] bg-[#080808] flex flex-col items-center justify-between p-6 md:p-12 select-none pointer-events-auto transition-opacity ${
        isDone ? 'pointer-events-none' : ''
      }`}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Top Technical Metadata */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777777] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>INITIALIZATION SEQUENCE // CORE-01</span>
        </div>
        <button
          onClick={() => {
            setIsDone(true);
            setIsVisible(false);
            if (onComplete) onComplete();
          }}
          className="hover:text-white transition-colors border border-white/20 px-3 py-1 bg-white/5"
        >
          [ESC] SKIP INTRO
        </button>
      </div>

      {/* Central Hero Chrome Logo Emergence */}
      <div className="relative flex flex-col items-center justify-center max-w-4xl w-full my-auto">
        <div
          ref={logoRef}
          className="relative w-full max-w-[700px] aspect-[3/1] animate-chrome-sweep flex items-center justify-center"
        >
          <Image
            src="/brand/averon-logo-original.png"
            alt="AVERON Chrome Gothic Emblem"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 700px"
            className="object-contain filter drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
          />
        </div>

        {/* Dynamic status line */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="text-[11px] font-mono tracking-[0.3em] text-[#C8C8C8] uppercase font-bold text-center">
            {statusText}
          </div>
          <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
            UNIFORM FOR THE UNDEFINED // PHASE 01
          </div>
        </div>
      </div>

      {/* Bottom Technical HUD & Real Loading Bar */}
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777777] uppercase">
          <div className="flex items-center gap-4">
            <span>MEM: 128MB</span>
            <span>SHADERS: COMPILED</span>
            <span>GSAP: SYNCED</span>
          </div>
          <div className="text-white font-bold">{progress}%</div>
        </div>

        <div className="w-full h-[2px] bg-[#161616] overflow-hidden relative">
          <div
            ref={wipeRef}
            className="h-full bg-gradient-to-r from-[#777777] via-[#C8C8C8] to-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

