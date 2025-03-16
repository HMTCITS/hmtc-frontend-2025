import React from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

const GalleryHMTC: React.FC = () => {
  return (
    <section className='flex flex-col bg-white p-8 pt-0 font-sans md:py-10 md:pt-[100px] lg:px-0'>
      <Typography
        as='h1'
        variant='j1'
        className='font-adelphe left-0 w-full max-md:pt-20 max-md:text-center text-left text-3xl font-bold md:px-[10%] md:text-3xl lg:max-w-[70%] lg:text-5xl lg:leading-[1.2] pb-[50px] md:pb-[40px] lg:pb-[70px]'
        id='gallery'
      >
        From Capturing Moments to Sharing Memories
      </Typography>

      <div className='relative lg:h-[510px]'>
        <div className='lg:absolute flex h-auto w-full flex-wrap max-md:flex-col max-md:items-center justify-center lg:h-[600px] lg:max-w-[1440px] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/5 lg:overflow-hidden'>
          {/* Gambar 1 */}
          <NextImage
            src='/gallery/gallery-1.jpg'
            alt='Gallery image 1'
            className='relative mb-6 w-[320px] md:w-[500px] lg:absolute lg:-left-[20%] lg:top-[45%] lg:w-[500px] lg:h-[335px]'
            imgClassName='object-cover relative h-full'
            width={500}
            height={335}
          />

          {/* Gambar 2 */}
          <NextImage
            src='/gallery/gallery-2.jpg'
            alt='Gallery image 2'
            className='mb-6 h-[375px] w-[320px] md:w-[500px] lg:absolute lg:left-[19%] lg:top-[30%] lg:h-[375px] lg:w-[325px]'
            imgClassName='object-cover relative h-full'
            width={325}
            height={375}
          />

          {/* Gambar 3 */}
          <NextImage
            src='/gallery/gallery-3.jpg'
            alt='Gallery image 3'
            className='mb-6 h-[214px] w-[320px] md:w-[500px] md:h-auto lg:absolute lg:left-[44%] lg:top-[40%] lg:h-[370px] lg:w-[455px]'
            imgClassName='object-cover relative h-full'
            width={455}
            height={370}
          />

          {/* Gambar 4 */}
          <NextImage
            src='/gallery/gallery-4.jpg'
            alt='Gallery image 4'
            className='mb-6 h-[214px] w-[320px] md:w-[500px] md:h-auto lg:absolute lg:-right-[4%] lg:top-0 lg:h-[360px] lg:w-[355px]'
            imgClassName='object-cover h-full relative'
            width={355}
            height={360}
          />
        </div>
      </div>

      <div className='flex justify-center mr-4 mt-4 w-full md:mr-10 md:mt-6'>
        <Typography
          as='a'
          href='/gallery'
          variant='b2'
          className='font-satoshi font-medium text-black underline underline-offset-4 max-w-7xl w-full text-right'
        >
          Explore Gallery HMTC &rarr;
        </Typography>
      </div>
    </section>
  );
};

export default GalleryHMTC;
