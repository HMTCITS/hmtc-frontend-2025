import React from 'react';

import NavbarGallery from '@/app/gallery/components/navbarGallery';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <NavbarGallery />
      <main className='mt-10 px-14 py-18'>
        {/* Bagian header (misalnya navbar / top bar) */}
        <div className='flex w-full flex-col items-center gap-6'>
          {/* Baris atas */}
          <Skeleton className='h-6 w-full max-w-1/7' />
          {/* Baris kedua (misal sub-header) */}
          <Skeleton className='h-8 w-full max-w-[65%]' />
        </div>

        {/* Grid berisi 8 card skeleton */}
        <div className='mt-12 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className='flex w-full max-w-72 min-w-56 flex-col rounded-md border shadow-sm'
            >
              {/* Bagian atas (misalnya gambar) */}
              <Skeleton className='h-36 w-full' />

              <div className='flex flex-col p-4'>
                {/* Judul singkat */}
                <Skeleton className='h-3 w-full max-w-1/3' />

                {/* Deskripsi baris 1 */}
                <Skeleton className='mt-2 h-3 w-full' />

                {/* Deskripsi baris 2 */}
                <Skeleton className='mt-1 h-3 w-full' />

                {/* Deskripsi baris 3 */}
                <div className='mt-2 flex w-full justify-end'>
                  <Skeleton className='mt-2 h-4 w-full max-w-[40%]' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
