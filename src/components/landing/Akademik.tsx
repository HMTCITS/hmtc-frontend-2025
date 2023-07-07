import Image from 'next/image';
import React from 'react';

const Akademik = () => {
  return (
    <section className='relative flex h-fit w-full justify-center overflow-hidden bg-blue-main font-primary text-white'>
      <main className='w-4/5 justify-center space-y-10 py-20'>
        <div className='w-full'>
          <h1 className='text-6xl font-extrabold'>Akademik.</h1>
        </div>
        <div className='grid grid-cols-2'>
          <div className='space-y-4 p-6 hover:bg-white hover:bg-opacity-10'>
            <h2 className='text-2xl font-semibold'>Bank Soal</h2>
            <p className='text-lg'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </p>
          </div>
          <div className='space-y-4 p-6 hover:bg-white hover:bg-opacity-10'>
            <h2 className='text-2xl font-semibold'>Silabus</h2>
            <p className='text-lg'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </p>
          </div>
          <div className='space-y-4 p-6 hover:bg-white hover:bg-opacity-10'>
            <h2 className='text-2xl font-semibold'>MBKM</h2>
            <p className='text-lg'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </p>
          </div>
          <div className='space-y-4 p-6 hover:bg-white hover:bg-opacity-10'>
            <h2 className='text-2xl font-semibold'>Kalender Akademik</h2>
            <p className='text-lg'>
              Nec vel senectus condimentum nec tempor amet porta. Consectetur
              tincidunt urna nulla donec est consequat blandit. Commodo dolor
              eu.
            </p>
          </div>
        </div>
      </main>
      <div className='absolute right-0 top-0 -translate-y-[60%] opacity-10'>
        <Image src='/images/bungaa.png' width={680} height={200} alt='bunga' />
      </div>
      <div className='absolute bottom-0 left-0 -translate-x-[60%] translate-y-[50%] opacity-10'>
        <Image src='/images/bungaa.png' width={580} height={200} alt='bunga' />
      </div>
    </section>
  );
};

export default Akademik;
