import Image from 'next/image';
import React from 'react';

const Gallery = () => {
  return (
    <div className='shadow-m w-full space-y-6 bg-[#212121] p-12 font-secondary text-white md:p-32'>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='h-full'>
          <Image
            src='/images/gallery/Wisuda3.jpg'
            alt='gallery-1'
            width={4000}
            height={6000}
            className='h-full object-cover'
          />
        </div>
        <div className='col-span-2'>
          <Image
            src='/images/gallery/2.png'
            alt='gallery-2'
            width={2460}
            height={1581}
            className='h-full object-cover'
          />
        </div>
      </div>
      <div className='w-full'>
        <div>
          <Image
            src='/images/gallery/Wisuda.jpg'
            alt='gallery-3'
            width={6000}
            height={4000}
            className='h-full object-cover'
          />
        </div>
      </div>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='col-span-2'>
          <Image
            src='/images/gallery/HGTC.jpg'
            alt='gallery-4'
            width={5184}
            height={3456}
            className='h-full object-cover'
          />
        </div>
        <div>
          <Image
            src='/images/gallery/5.png'
            alt='gallery-4'
            width={800}
            height={1054}
            className='h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
