'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Mobile performance optimization: do not mount heavy WebGL scene on mobile
    if (window.innerWidth < 768) {
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });

    let width = container.clientWidth;
    let height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Subtle liquid metallic noise shader plane
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Pseudo-random & noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = vUv;
        vec2 mouse = uMouse / uResolution;
        float dist = distance(uv, mouse);

        // Slow organic metallic undulation
        float t = uTime * 0.15;
        float n1 = noise(uv * 3.0 + t);
        float n2 = noise(uv * 6.0 - t * 0.5);
        float pattern = n1 * 0.6 + n2 * 0.4;

        // Subtle specular metallic shimmer
        float highlight = smoothstep(0.68, 0.72, pattern + (1.0 - dist) * 0.12);
        
        // Dark brutalist obsidian palette: #080808 with silver accents #C8C8C8
        vec3 darkBase = vec3(0.03, 0.03, 0.03);
        vec3 silverShine = vec3(0.78, 0.78, 0.8) * highlight * 0.18;

        // Mouse ripple influence
        float ripple = sin(dist * 25.0 - uTime * 2.0) * 0.02 * exp(-dist * 3.0);

        vec3 finalColor = darkBase + silverShine + vec3(ripple * 0.1);
        gl_FragColor = vec4(finalColor, 0.45);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(width / 2, height / 2) },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      uniforms.uTime.value = (performance.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.uMouse.value.x = e.clientX - rect.left;
      uniforms.uMouse.value.y = rect.height - (e.clientY - rect.top);
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen overflow-hidden"
      aria-hidden="true"
    />
  );
}
