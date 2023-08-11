import Image from 'next/image';
import React from 'react';

const image = [
  '/images/gallery/1.png',
  '/images/gallery/2.png',
  '/images/gallery/3.png',
  '/images/gallery/4.png',
  '/images/gallery/5.png',
];

const Gallery = () => {
  return (
    <div className='shadow-m w-full space-y-6 bg-[#212121] p-28 font-secondary text-white'>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div>
          <Image
            src={image[0]}
            alt=''
            width={1000}
            height={800}
            className='object-cover'
          />
        </div>
        <div className='col-span-2'>
          <Image
            src={image[1]}
            alt=''
            width={2000}
            height={800}
            className='object-cover'
          />
        </div>
      </div>
      <div className='w-full'>
        <div>
          <Image
            src={image[2]}
            alt=''
            width={2000}
            height={800}
            className='object-cover'
          />
        </div>
      </div>
      <div className='grid w-full grid-cols-3 gap-x-8'>
        <div className='col-span-2'>
          <Image
            src={image[3]}
            alt=''
            width={2000}
            height={800}
            className='object-cover'
          />
        </div>
        <div>
          <Image
            src={image[4]}
            alt=''
            width={2000}
            height={800}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
