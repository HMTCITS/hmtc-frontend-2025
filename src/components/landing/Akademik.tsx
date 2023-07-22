import Image from 'next/image';
import React from 'react';

import Typography from '@/components/typography/Typography';

const Akademik = () => {
  return (
    <section className='relative flex h-fit w-full justify-center overflow-hidden bg-blue-main px-6 font-primary text-white'>
      <main className='z-10 w-full justify-center space-y-8 py-10 md:w-4/5 md:space-y-10 md:py-20'>
        <div className='w-full'>
          <Typography variant='k1'>Akademik.</Typography>
        </div>
        <div className='grid grid-cols-1 font-secondary md:grid-cols-2'>
          <div className='group space-y-1 p-4 transition-all duration-150 hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'>
            <Typography variant='h2' className='group-hover:underline'>
              Bank Soal
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </Typography>
          </div>
          <div className='group space-y-1 p-4 transition-all duration-150 hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'>
            <Typography variant='h2' className='group-hover:underline'>
              Silabus
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </Typography>
          </div>
          <div className='group space-y-1 p-4 transition-all duration-150 hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'>
            <Typography variant='h2' className='group-hover:underline'>
              MBKM
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </Typography>
          </div>
          <div className='group space-y-1 p-4 transition-all duration-150 hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'>
            <Typography variant='h2' className='group-hover:underline'>
              Kalender Akademik
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </Typography>
          </div>
        </div>
      </main>
      <div className='absolute right-0 top-0 z-0 -translate-y-[60%] opacity-10'>
        <Image src='/images/bungaa.png' width={680} height={200} alt='bunga' />
      </div>
      <div className='absolute bottom-0 left-0 -translate-x-[60%] translate-y-[50%] opacity-10'>
        <Image src='/images/bungaa.png' width={580} height={200} alt='bunga' />
      </div>
    </section>
  );
};

export default Akademik;
