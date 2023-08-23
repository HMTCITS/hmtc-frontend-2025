import Image from 'next/image';
import React from 'react';

import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';

const Akademik = () => {
  return (
    <section className='relative flex h-fit w-full justify-center overflow-hidden bg-blue-main px-6 font-primary text-white'>
      <main className='z-10 w-full justify-center space-y-8 py-10 md:w-4/5 md:space-y-10 md:py-20'>
        <div className='w-full'>
          <Typography variant='k1'>Akademik.</Typography>
        </div>
        <div className='grid grid-cols-1 font-secondary md:grid-cols-2'>
          <BaseLink
            href='https://intip.in/BankIlmuKesmaHMTC'
            openNewTab={true}
            className='group space-y-1 p-4 transition-all duration-150 hover:!cursor-pointer hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'
          >
            <Typography variant='h2' className='group-hover:underline'>
              Bank Soal
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Kumpulan soal-soal dan sumber pembelajaran buat teman-teman HMTC!
            </Typography>
          </BaseLink>
          <BaseLink
            href='https://www.its.ac.id/informatika/id/akademik/kurikulum-silabus-s1/#1621313980849-d5e14193-9cf5'
            openNewTab={true}
            className='group space-y-1 p-4 transition-all duration-150 hover:!cursor-pointer hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'
          >
            <Typography variant='h2' className='group-hover:underline'>
              Silabus
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Download file PDF silabus mata kuliah Teknik Informatika
            </Typography>
          </BaseLink>
          <BaseLink
            href='https://its.id/BerkasAkademikDanKemahasiswaanIF'
            openNewTab={true}
            className='group space-y-1 p-4 transition-all duration-150 hover:!cursor-pointer hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'
          >
            <Typography variant='h2' className='group-hover:underline'>
              MBKM
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Informasi mengenai Merdeka Belajar Kampus Merdeka (MBKM)
            </Typography>
          </BaseLink>
          <BaseLink
            href='https://www.its.ac.id/pendidikan/2023/02/02/kalender-akademik-its-tahun-akademik-2023-2024/'
            openNewTab={true}
            className='group space-y-1 p-4 transition-all duration-150 hover:!cursor-pointer hover:bg-white hover:bg-opacity-10 md:space-y-4 md:p-6'
          >
            <Typography variant='h2' className='group-hover:underline'>
              Kalender Akademik
            </Typography>
            <Typography className='line-clamp-2 text-blue-200'>
              Download file PDF Kalender Akademik 2022/2023
            </Typography>
          </BaseLink>
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
