import React from 'react';

import NextImage from '@/components/NextImage';

export default function Gallery() {
  return (
    <div className='shadow-m font-secondary w-full space-y-6 bg-[#212121] p-12 text-white md:p-32'>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='relative h-[600px]'>
          <NextImage
            src='/gallery/Wisuda3.JPG'
            alt='Foto Wisuda TC 2024'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 400px'
          />
        </div>
        <div className='relative col-span-2 h-[500px]'>
          <NextImage
            src='/gallery/2.png'
            alt='Foto Wisuda TC 2024'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 500px'
          />
        </div>
      </div>

      <div className='relative h-[600px] w-full'>
        <NextImage
          src='/gallery/Wisuda.JPG'
          alt='Foto Wisuda TC 2024'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 600px'
        />
      </div>

      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='relative col-span-2 h-[500px]'>
          <NextImage
            src='/gallery/HGTC.JPG'
            alt='Foto Wisuda TC 2024'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 500px'
          />
        </div>
        <div className='relative h-[500px]'>
          <NextImage
            src='/gallery/5.png'
            alt='Foto Wisuda TC 2024'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 300px'
          />
        </div>
      </div>
    </div>
  );
}
