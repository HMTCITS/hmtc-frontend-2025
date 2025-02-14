import React, { useEffect, useState } from 'react';

import Typography from '@/components/typography/Typography';

const Akademik = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className='relative flex h-fit w-full justify-center overflow-hidden bg-blue-main px-6 text-white'
      style={{
        background:
          'linear-gradient(263.67deg, #00AAE7 -8.55%, #0076C0 97.16%)',
      }}
    >
      <main className='z-10 w-full flex flex-col items-center justify-center space-y-4 py-10 text-center md:w-4/5 md:space-y-6 md:py-20'>
        <Typography variant='h1' className='text-2xl md:text-3xl lg:text-4xl'>
          <span className='font-satoshi font-light text-3xl md:text-4xl lg:text-5xl'>
            “
          </span>
          <span className='font-satoshi font-light text-2xl md:text-3xl lg:text-4xl'>
            35 tahun menjadi wadah aspirasi, kreativitas,
          </span>
          <div className='font-satoshi font-light text-2xl md:text-3xl lg:text-4xl'>
            pengembangan potensi hingga simbol
          </div>
          <div className='font-satoshi font-light text-2xl md:text-3xl lg:text-4xl'>
            pemersatu, dan tetap saja di balik itu semua,
          </div>
        </Typography>

        <Typography
          variant='h2'
          className='font-bold font-adelphe text-3xl md:text-4xl lg:text-5xl'
          style={{ marginTop: 15, lineHeight: '1.2' }}
        >
          HMTC adalah tentang dirimu.
          <span className='font-adelphe font-light text-3xl md:text-4xl lg:text-5xl'>
            ”
          </span>
        </Typography>

        <Typography
          variant='h3'
          className='text-sm md:text-xl lg:text-2xl mt-6 font-libre'
          style={{
            marginBottom: 0,
            marginTop: 100,
            lineHeight: '1.2',
          }} /* Atur margin dan line-height */
        >
          Farrela Ranku Mahhisa
        </Typography>
        <Typography
          variant='h4'
          className='font-light font-satoshi text-xs md:text-sm lg:text-base'
          style={{
            marginTop: 6,
            lineHeight: '1.2',
            opacity: 0.68,
          }} /* Atur margin dan line-height */
        >
          Ketua HMTC 2024
        </Typography>
      </main>
    </section>
  );
};

export default Akademik;
