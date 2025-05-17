'use client';
import React from 'react';

export default function AboutSkeleton() {
  return (
    <div className='animate-pulse bg-white px-12 pt-16 pb-8'>
      <div className='flex flex-col items-center gap-8 xl:flex-row xl:gap-20'>
        <div className='h-[400px] w-full max-w-[615px] rounded-lg bg-gray-200' />

        <div className='mt-8 w-full max-w-[615px] space-y-4'>
          <div className='h-8 w-1/3 rounded bg-gray-200' />
          <div className='h-10 w-2/3 rounded bg-gray-200' />
          <div className='h-4 w-full rounded bg-gray-200' />
          <div className='h-4 w-full rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
}
