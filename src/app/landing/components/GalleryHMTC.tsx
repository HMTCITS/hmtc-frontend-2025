import React from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

const GalleryHMTC: React.FC = () => {
  const images = [
    '/gallery/gallery-1.jpg',
    '/gallery/gallery-2.jpg',
    '/gallery/gallery-3.jpg',
    '/gallery/gallery-4.jpg',
  ];

  return (
    <section className='flex flex-col items-center justify-center bg-white p-8 pt-0 font-sans md:py-10 md:pt-[100px] lg:px-0'>
      <div
        id='gallery'
        className='flex flex-col items-center justify-center bg-white py-16'
      ></div>

      <div className='pb-[50px] md:pb-[40px] lg:pb-[70px]'>
        <Typography
          as='h1'
          variant='j1'
          className='font-adelphe left-0 w-full text-left text-3xl font-bold md:px-[10%] md:text-3xl lg:absolute lg:max-w-[70%] lg:text-5xl lg:leading-[1.2]'
        >
          From Capturing Moments to Sharing Memories
        </Typography>
      </div>

      <div className='relative flex h-auto w-full flex-wrap justify-center lg:h-[550px] lg:max-w-screen lg:overflow-hidden'>
        {/* Gambar 1 */}
        <div className='relative mb-6 h-[214px] w-[320px] md:w-[500px] lg:absolute lg:-left-[20%] lg:top-[40%] lg:h-[335px] lg:w-[501px]'>
          <NextImage
            src={images[0]}
            alt='Gallery image 1'
            layout='fill'
            className='object-cover h-full'
            sizes='(max-width: 768px) 100vw, 500px'
          />
        </div>

        {/* Gambar 2 */}
        <div className='relative mb-6 h-[375px] w-[320px] md:w-[500px] lg:absolute lg:left-[19%] lg:top-[17%] lg:h-[375px] lg:w-[324px]'>
          <NextImage
            src={images[1]}
            alt='Gallery image 2'
            layout='fill'
            className='object-cover h-full'
            sizes='(max-width: 768px) 100vw, 375px'
          />
        </div>

        {/* Gambar 3 */}
        <div className='relative mb-6 h-[214px] w-[320px] md:w-[500px] lg:absolute lg:left-[44%] lg:top-[31%] lg:h-[372px] lg:w-[456px]'>
          <NextImage
            src={images[2]}
            alt='Gallery image 3'
            layout='fill'
            className='object-cover h-full'
            sizes='(max-width: 768px) 100vw, 450px'
          />
        </div>

        {/* Gambar 4 */}
        <div className='relative mb-6 h-[214px] w-[320px] md:w-[500px] lg:absolute lg:-right-[4%] lg:bottom-[40%] lg:h-[361px] lg:w-[357px]'>
          <NextImage
            src={images[3]}
            alt='Gallery image 4'
            layout='fill'
            className='object-cover h-full'
            sizes='(max-width: 768px) 100vw, 350px'
          />
        </div>
      </div>

      <div className='mr-4 mt-4 w-full max-w-7xl text-right md:mr-10 md:mt-6'>
        <Typography
          as='a'
          href='/gallery'
          variant='b2'
          className='font-satoshi font-medium text-black underline underline-offset-4'
        >
          Explore Gallery HMTC &rarr;
        </Typography>
      </div>
    </section>
  );
};

export default GalleryHMTC;
