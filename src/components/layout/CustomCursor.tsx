'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pointRef = useRef<SVGCircleElement>(null);
  const tailLineRef = useRef<SVGLineElement>(null);
  const reticleRef = useRef<SVGGElement>(null);

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for fine pointer (mouse/trackpad) and reduced motion preference
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const point = pointRef.current;
    const tailLine = tailLineRef.current;
    const reticle = reticleRef.current;
    if (!point || !tailLine) return;

    let targetX = -100;
    let targetY = -100;
    let tailX = -100;
    let tailY = -100;
    let isVisible = false;
    let isInitialized = false;
    let isHoveringInteractive = false;

    // Radius animation target for hover state
    let currentRadius = 2.5;
    let targetRadius = 2.5;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isInitialized) {
        // Initialize position without trail flash
        tailX = targetX;
        tailY = targetY;
        isInitialized = true;
        document.body.classList.add('has-custom-cursor');
      }

      if (!isVisible) {
        isVisible = true;
        if (svgRef.current) svgRef.current.style.opacity = '1';
      }

      // Check if hovering an interactive control
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, select, textarea, [role="button"], [data-cursor]')
      );

      if (isInteractive !== isHoveringInteractive) {
        isHoveringInteractive = isInteractive;
        targetRadius = isInteractive ? 3.5 : 2.5;
        if (reticle) {
          gsap.to(reticle, {
            opacity: isInteractive ? 0.9 : 0,
            scale: isInteractive ? 1 : 0.4,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
      if (svgRef.current) svgRef.current.style.opacity = '0';
    };

    const onPointerEnter = () => {
      isVisible = true;
      if (svgRef.current) svgRef.current.style.opacity = '1';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);

    // High performance ticker for trail physics
    const tickerCallback = () => {
      if (!isVisible || !isInitialized) return;

      // Smooth lerp follower with delta-ratio independence
      const lerpFactor = 1.0 - Math.pow(1.0 - 0.36, gsap.ticker.deltaRatio());
      tailX += (targetX - tailX) * lerpFactor;
      tailY += (targetY - tailY) * lerpFactor;

      const dx = targetX - tailX;
      const dy = targetY - tailY;
      const dist = Math.hypot(dx, dy);

      // Interpolate radius smoothly
      currentRadius += (targetRadius - currentRadius) * 0.25;
      point.setAttribute('r', currentRadius.toFixed(2));

      // Update precision point position
      point.setAttribute('cx', targetX.toFixed(1));
      point.setAttribute('cy', targetY.toFixed(1));

      if (reticle) {
        reticle.setAttribute('transform', `translate(${targetX.toFixed(1)}, ${targetY.toFixed(1)})`);
      }

      // Controlled velocity tail:
      // Maximum length capped at 22px so it feels like a precision instrument, not a comet
      const maxTailLen = 22;

      if (dist < 0.5) {
        // Contract completely into the point when stationary
        tailLine.setAttribute('x1', targetX.toFixed(1));
        tailLine.setAttribute('y1', targetY.toFixed(1));
        tailLine.setAttribute('x2', targetX.toFixed(1));
        tailLine.setAttribute('y2', targetY.toFixed(1));
        tailLine.setAttribute('opacity', '0');
      } else {
        const clampedDist = Math.min(dist, maxTailLen);
        const nx = dx / dist;
        const ny = dy / dist;

        const startX = targetX - nx * clampedDist;
        const startY = targetY - ny * clampedDist;

        tailLine.setAttribute('x1', startX.toFixed(1));
        tailLine.setAttribute('y1', startY.toFixed(1));
        tailLine.setAttribute('x2', targetX.toFixed(1));
        tailLine.setAttribute('y2', targetY.toFixed(1));

        // Subtly stretch opacity with velocity
        const trailAlpha = Math.min(clampedDist / 14, 1) * 0.75;
        tailLine.setAttribute('opacity', trailAlpha.toFixed(2));
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[999999] opacity-0 transition-opacity duration-200"
      style={{ mixBlendMode: 'difference' }}
      aria-hidden="true"
    >
      {/* Precision Trailing Tail: Follows smoothly, stretches with velocity, contracts on stop */}
      <line
        ref={tailLineRef}
        x1="-100"
        y1="-100"
        x2="-100"
        y2="-100"
        stroke="#FFFFFF"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0"
      />

      {/* Reticle: Subtle precision crosshair guides on interactive hover */}
      <g ref={reticleRef} opacity="0" style={{ transformOrigin: '0 0' }}>
        <line x1="-8" y1="0" x2="-5" y2="0" stroke="#FFFFFF" strokeWidth="0.75" />
        <line x1="5" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="0.75" />
        <line x1="0" y1="-8" x2="0" y2="-5" stroke="#FFFFFF" strokeWidth="0.75" />
        <line x1="0" y1="5" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="0.75" />
      </g>

      {/* Precision Point: 5px diameter (radius 2.5px), sharp, high contrast */}
      <circle
        ref={pointRef}
        cx="-100"
        cy="-100"
        r="2.5"
        fill="#FFFFFF"
      />
    </svg>
  );
}
