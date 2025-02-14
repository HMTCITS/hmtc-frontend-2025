import Image from 'next/image';
import React from 'react';

const GalleryHMTC: React.FC = () => {
  const images = [
    '/images/gallery/gallery-1.jpg',
    '/images/gallery/gallery-2.jpg',
    '/images/gallery/gallery-3.jpg',
    '/images/gallery/gallery-4.jpg',
  ];

  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-white p-4 pt-[100px] font-sans'>
      <div className='pb-[50px] md:pb-[40px] lg:pb-[70px]'>
        <h1 className='adelphe-fructidor left-0 w-full text-left text-3xl font-bold lg:absolute lg:max-w-[50%] lg:text-5xl'>
          From Capturing Moments to Sharing Memories
        </h1>
      </div>

      <div className='relative flex h-auto w-full flex-wrap justify-center lg:h-[550px] lg:w-screen lg:overflow-hidden'>
        {' '}
        {/* Adjust height as needed */}
        <div
          className='relative mb-6 h-[214px] w-[320px] md:w-[500px] 
        lg:absolute lg:-left-[20%] lg:top-[40%] lg:h-[335px] lg:w-[501px]'
        >
          <div className='relative h-full w-full'>
            <Image
              src={images[0]}
              alt='Gallery image 1'
              layout='fill'
              objectFit='cover'
              className='object-cover'
            />
          </div>
        </div>
        <div
          className='relative mb-6 h-[375px] w-[320px] md:w-[500px]
        lg:absolute lg:left-[19%] lg:top-[17%] lg:h-[375px] lg:w-[324px]'
        >
          <div className='relative h-full w-full'>
            <Image
              src={images[1]}
              alt='Gallery image 2'
              layout='fill'
              objectFit='cover'
              className='object-cover'
            />
          </div>
        </div>
        <div
          className='relative mb-6 h-[214px] w-[320px] md:w-[500px]
        lg:absolute lg:left-[44%] lg:top-[31%] lg:h-[372px] lg:w-[456px]'
        >
          <div className='relative h-full w-full'>
            <Image
              src={images[2]}
              alt='Gallery image 3'
              layout='fill'
              objectFit='cover'
              className='object-cover'
            />
          </div>
        </div>
        <div
          className='relative mb-6 h-[214px] w-[320px] md:w-[500px]
        lg:absolute lg:-right-[4%] lg:bottom-[40%] lg:h-[361px] lg:w-[357px]'
        >
          <div className='relative h-full w-full'>
            <Image
              src={images[3]}
              alt='Gallery image 4'
              layout='fill'
              objectFit='cover'
              className='object-cover'
            />
          </div>
        </div>
      </div>
      <div className='mt-12 w-full max-w-7xl text-right md:mt-6'>
        <a
          href='/gallery'
          className='font-medium text-black underline underline-offset-4 '
        >
          Explore Gallery HMTC &rarr;
        </a>
      </div>
    </section>
  );
};

export default GalleryHMTC;
