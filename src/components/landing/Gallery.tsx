import Image from 'next/image';
import React from 'react';

const Gallery = () => {
  return (
    <div className='shadow-m w-full space-y-6 bg-[#212121] p-12 font-secondary text-white md:p-32'>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='relative h-[600px]'>
          <Image
            src='/images/gallery/Wisuda3.JPG'
            alt='gallery-1'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 400px'
            priority
          />
        </div>
        <div className='relative col-span-2 h-[500px]'>
          <Image
            src='/images/gallery/2.png'
            alt='gallery-2'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 500px'
          />
        </div>
      </div>

      <div className='relative h-[600px] w-full'>
        <Image
          src='/images/gallery/Wisuda.JPG'
          alt='gallery-3'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 600px'
        />
      </div>

      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='relative col-span-2 h-[500px]'>
          <Image
            src='/images/gallery/HGTC.JPG'
            alt='gallery-4'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 500px'
          />
        </div>
        <div className='relative h-[500px]'>
          <Image
            src='/images/gallery/5.png'
            alt='gallery-5'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 300px'
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
