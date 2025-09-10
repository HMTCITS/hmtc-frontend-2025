'use client';
import React, { useState } from 'react';

import LazySection from '@/components/LazySection';

export default function LazySectionSandbox() {
  const [count, setCount] = useState(0);
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Lazy Section</h1>
      <p className='max-w-2xl text-sm text-muted-foreground'>
        Scroll down untuk melihat lazy load. Setiap section menggunakan
        IntersectionObserver. Contoh kedua dapat toggle visibility berkali-kali.
      </p>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='h-[60vh] rounded border p-6'>
          Spacer {i + 1}
        </div>
      ))}
      <LazySection onVisible={() => setCount((c) => c + 1)}>
        <div className='rounded border bg-green-50 p-6'>
          <h2 className='font-satoshi text-xl font-semibold'>
            Once Lazy Section
          </h2>
          <p>Appear count: {count}</p>
        </div>
      </LazySection>
      <LazySection
        once={false}
        threshold={0.3}
        fallback={<div className='h-40 animate-pulse rounded bg-gray-100' />}
      >
        <div className='rounded border bg-blue-50 p-6'>
          <h2 className='font-satoshi text-xl font-semibold'>
            Toggle Lazy Section
          </h2>
          <p>Scroll away and back to hide/show again.</p>
        </div>
      </LazySection>
    </main>
  );
}
