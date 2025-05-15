import React from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

import RestrictedModal from './nrpModal';

const GalleryHMTC: React.FC = () => {
  return (
    <section className='flex flex-col bg-white p-8 pt-0 font-sans md:py-10 md:pt-[100px] lg:px-0'>
      <Typography
        as='h1'
        variant='j1'
        className='left-0 w-full pb-[50px] text-left font-adelphe text-3xl font-bold max-md:pt-20 max-md:text-center md:px-[10%] md:pb-[40px] md:text-3xl lg:max-w-[70%] lg:pb-[70px] lg:text-5xl lg:leading-[1.2]'
        id='gallery'
      >
        From Capturing Moments to Sharing Memories
      </Typography>

      <div className='relative lg:h-[510px]'>
        <div className='flex h-auto w-full flex-wrap justify-center max-md:flex-col max-md:items-center lg:absolute lg:left-1/2 lg:h-[600px] lg:max-w-[1440px] lg:-translate-x-1/2 lg:-translate-y-1/5 lg:overflow-hidden'>
          {/* Gambar 1 */}
          <NextImage
            src='/gallery/gallery-1.jpg'
            alt='Foto Wisuda TC 2024'
            className='relative mb-6 w-[320px] md:w-[500px] lg:absolute lg:top-[45%] lg:-left-[20%] lg:h-[335px] lg:w-[500px]'
            imgClassName='relative h-full object-cover'
            width={500}
            height={335}
          />

          {/* Gambar 2 */}
          <NextImage
            src='/gallery/gallery-2.jpg'
            alt='Foto Wisuda TC 2024'
            className='mb-6 h-[375px] w-[320px] md:w-[500px] lg:absolute lg:top-[30%] lg:left-[19%] lg:h-[375px] lg:w-[325px]'
            imgClassName='relative h-full object-cover'
            width={325}
            height={375}
          />

          {/* Gambar 3 */}
          <NextImage
            src='/gallery/gallery-3.jpg'
            alt='Foto Wisuda TC 2024'
            className='mb-6 h-[214px] w-[320px] md:h-auto md:w-[500px] lg:absolute lg:top-[40%] lg:left-[44%] lg:h-[370px] lg:w-[455px]'
            imgClassName='relative h-full object-cover'
            width={455}
            height={370}
          />

          {/* Gambar 4 */}
          <NextImage
            src='/gallery/gallery-4.jpg'
            alt='Foto Wisuda TC 2024'
            className='mb-6 h-[214px] w-[320px] md:h-auto md:w-[500px] lg:absolute lg:top-0 lg:-right-[4%] lg:h-[360px] lg:w-[355px]'
            imgClassName='relative h-full object-cover'
            width={355}
            height={360}
          />
        </div>
      </div>

      <div className='mt-4 mr-4 flex w-full justify-center md:mt-6 md:mr-10'>
        <RestrictedModal isLandingPage={true} initialOpen={false} />
      </div>
    </section>
  );
};

export default GalleryHMTC;
