'use client';

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import NextImage from '@/components/NextImage';

type Layer = {
  key: 'top' | 'middle' | 'bottom';
  src: string;
  baseSize: [number, number];
  z: number;
  offsetY?: number;
};

const LAYERS: Layer[] = [
  {
    key: 'top',
    src: '/cover/topMercusuar.svg',
    baseSize: [106, 75],
    z: 30,
    offsetY: 10,
  },
  {
    key: 'middle',
    src: '/cover/middleMercusuar.svg',
    baseSize: [129, 102],
    z: 20,
    offsetY: -4,
  },
  {
    key: 'bottom',
    src: '/cover/bottomMercusuar.svg',
    baseSize: [156, 152],
    z: 10,
  },
];

export default function Mercusuar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out', // Smoother easing for organic movement
          transformOrigin: '50% 100%', // Origin at bottom center
        },
      });

      // Set initial state - all lighthouse parts are hidden
      gsap.set('.lighthouse-layer', {
        width: 0,
        opacity: 0,
        y: 50, // Start from below
        scale: 0.8, // Slightly smaller for "emerging" effect
      });

      // Staggered animation for each layer
      tl.to('.lighthouse-layer', {
        opacity: 1,
        y: 0,
        width: (i) => `${LAYERS[i].baseSize[0] * 1.2}px`,
        scale: 1.1, // Slightly overshoot
        duration: 1.2,
        stagger: {
          each: 0.3,
          from: 'start',
          ease: 'power1.in', // Accelerating stagger
        },
      }).to(
        '.lighthouse-layer',
        {
          width: (i) => `${LAYERS[i].baseSize[0]}px`,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.2,
            from: 'start',
          },
          ease: 'elastic.out(0.5, 0.3)', // Bouncy, settling effect
        },
        '-=0.5',
      ); // Overlap with previous animation
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className='relative flex min-h-screen w-full items-end justify-center overflow-hidden perspective-distant'
    >
      <div className='flex flex-col items-center justify-end'>
        {LAYERS.map(({ key, src, baseSize: [w, h], z, offsetY }) => (
          <NextImage
            key={key}
            src={src}
            alt={`Mercusuar Lantai ${key}`}
            width={w * 1.3}
            height={h * 1.3}
            priority
            className={`${offsetY ? `${offsetY > 0 ? 'mb-' + offsetY / 2 : '-mb-' + -offsetY / 2}` : ''} z-${z}`}
            imgClassName={`lighthouse-layer ${key} mx-auto max-w-[200%] transform overflow-hidden`}
          />
        ))}
      </div>
    </div>
  );
}
