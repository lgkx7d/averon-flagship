'use client';

import { useState, useEffect } from 'react';
import { sound } from '@/lib/audio';

export function useSound() {
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    setIsSoundOn(!sound.getIsMuted());

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle sound with key 'm' if not in input
      if (
        (e.key === 'm' || e.key === 'M') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        const enabled = sound.toggleMute();
        setIsSoundOn(enabled);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSound = () => {
    const enabled = sound.toggleMute();
    setIsSoundOn(enabled);
  };

  return {
    isSoundOn,
    toggleSound,
    playHover: () => sound.playHoverClick(),
    playChime: () => sound.playMetallicChime(),
    playDrop: () => sound.playSubDrop(),
  };
}

