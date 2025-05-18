'use client';

import React, { useEffect, useState } from 'react';

import Typography from '@/components/Typography';

export default function QuotesKahima() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className='relative flex h-fit w-full justify-center overflow-hidden bg-blue-main px-10 py-16 text-white md:p-6'
      style={{
        background:
          'linear-gradient(263.67deg, #00AAE7 -8.55%, #0076C0 97.16%)',
      }}
    >
      <main className='z-10 flex w-full flex-col items-center justify-center space-y-4 py-10 text-center lg:px-[10%] lg:py-[8%]'>
        <Typography variant='h1' className='text-2xl md:text-3xl lg:text-4xl'>
          <Typography
            as='span'
            className='text-3xl font-light text-inherit md:text-4xl lg:text-5xl'
          >
            “
          </Typography>
          <Typography
            as='span'
            font='adelphe'
            className='text-xl leading-[2.0] font-light text-inherit md:text-2xl md:leading-[2.0] lg:text-3xl lg:leading-[2.0]'
          >
            35 tahun menjadi wadah aspirasi, kreativitas, pengembangan potensi
            hingga simbol pemersatu, dan tetap saja di balik itu semua,
          </Typography>
        </Typography>

        <Typography
          variant='h2'
          font='adelphe'
          className='text-2xl font-bold md:text-3xl lg:text-5xl'
          style={{ marginTop: 35, lineHeight: '1.2' }}
        >
          HMTC adalah tentang dirimu.
          <Typography
            as='span'
            font='adelphe'
            className='text-3xl font-light text-inherit md:text-4xl lg:text-5xl'
          >
            ”
          </Typography>
        </Typography>

        <Typography
          variant='h3'
          font='adelphe'
          className='font-bold italic md:text-xl lg:text-2xl'
          style={{
            marginBottom: 0,
            marginTop: 60,
            lineHeight: '1.2',
          }}
        >
          Farrela Ranku Mahhisa
        </Typography>
        <Typography
          variant='h4'
          className='text-xs font-light md:text-sm lg:text-base'
          style={{
            marginTop: 6,
            lineHeight: '1.2',
            opacity: 0.68,
          }}
        >
          Ketua HMTC 2024
        </Typography>
      </main>
    </section>
  );
}
