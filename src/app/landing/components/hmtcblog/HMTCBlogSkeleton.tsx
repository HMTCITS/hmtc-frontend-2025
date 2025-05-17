'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

type HMTCBlogSkeletonProps = {
  /**
   * Berapa post yang akan ditampilkan skeleton-nya
   * Default: mobile=1, desktop=3
   */
  mobileCount?: number;
  desktopCount?: number;
  /**
   * Tinggi skeleton per card; default pakai aspect ratio 4/3.
   * Jika ingin override, bisa masukkan number (px) atau string (CSS).
   */
  skeletonHeight?: number | string;
};

export default function HMTCBlogSkeleton({
  mobileCount = 1,
  desktopCount = 3,
  skeletonHeight,
}: HMTCBlogSkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Mulai dengan mobileCount agar SSR tidak error
  const [visiblePostCount, setVisiblePostCount] = useState(mobileCount);

  useEffect(() => {
    // hanya berjalan di client
    const updateCount = () => {
      setVisiblePostCount(window.innerWidth < 768 ? mobileCount : desktopCount);
    };

    // hitung pertama kali
    updateCount();
    // perbarui saat resize
    window.addEventListener('resize', updateCount);

    return () => {
      window.removeEventListener('resize', updateCount);
    };
  }, [mobileCount, desktopCount]);

  // fallback skeleton yang standar
  const defaultSkeleton = (
    <div
      style={{
        height:
          typeof skeletonHeight === 'number'
            ? `${skeletonHeight}px`
            : (skeletonHeight ?? undefined),
      }}
      className='aspect-[4/3] w-full animate-pulse rounded-md bg-gray-200'
    />
  );

  return (
    <section
      ref={ref}
      className='max-w-screen bg-white px-4 pt-10 pb-24 md:px-[10%] md:pt-24'
      aria-label='Loading blog posts'
    >
      <div className='container mx-auto p-6 lg:p-0'>
        {/* Title Skeleton */}
        <Skeleton className='mb-3 h-6 w-32' />
        <Skeleton className='mb-10 h-16 w-full max-w-[80%]' />

        {/* Posts Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {Array.from({ length: visiblePostCount }).map((_, idx) => (
            <div key={idx} className='w-full'>
              {/* Skeleton Image */}
              {defaultSkeleton}
              {/* Skeleton Title & Text */}
              <Skeleton className='mt-4 mb-2 h-7 w-5/6' />
              <Skeleton className='mb-1 h-4 w-full' />
              <Skeleton className='h-4 w-11/12' />
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className='mt-8 flex justify-center'>
          <Skeleton className='h-2 w-16' />
        </div>
      </div>
    </section>
  );
}
