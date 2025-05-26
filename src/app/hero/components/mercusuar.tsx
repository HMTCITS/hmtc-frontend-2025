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
    offsetY: 7,
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
      const tl = gsap.timeline({ defaults: { ease: 'slow(0.7, 0.7, false)' } });

      tl.fromTo(
        '.lighthouse-layer',
        {
          width: 0,
          transformOrigin: '50% 100%',
        },
        {
          width: (i) => `${LAYERS[i].baseSize[0] * 1.2}px`,
          duration: 1,
          stagger: { each: 0.25, from: 'start' },
        },
      ).to('.lighthouse-layer', {
        width: (i) => `${LAYERS[i].baseSize[0]}px`,
        duration: 1,
        stagger: { each: 0.45, from: 'end' },
      });
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
            className={`${offsetY ? `${offsetY > 0 ? 'mb-' + offsetY / 2 : '-mb-' + -offsetY / 2}` : ''} z-${z} `}
            imgClassName={`lighthouse-layer w-0 ${key} mx-auto max-w-[200%] transform`}
          />
        ))}
      </div>
    </div>
  );
}
