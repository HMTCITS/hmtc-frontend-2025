'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { useSchedule } from '@/hooks/api/useSchedule';

export default function ComingSoon() {
  const search = useSearchParams();
  const router = useRouter();
  const page = search?.get('page');

  const showCountdown = page === 'ayomeludaftarmagang';

  const {
    data: scheduleData,
    now,
    loading,
  } = useSchedule('/ayomeludaftarmagang', 7000);

  const timeUntilStart = (() => {
    if (!scheduleData?.start) return null;
    try {
      const start = new Date(scheduleData.start).getTime();
      const n = now.getTime();
      return Math.max(0, start - n);
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (scheduleData?.active || timeUntilStart === 0) {
      router.replace('/ayomeludaftarmagang');
    }
  }, [scheduleData?.active, timeUntilStart, router]);

  const breakdownTime = (ms: number | null) => {
    if (ms == null) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const total = Math.floor(ms / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = breakdownTime(timeUntilStart);

  if (!showCountdown) {
    // === OLD UI (default coming soon page) ===
    return (
      <main className='flex min-h-screen w-full flex-col items-center justify-center bg-[#201F1F] py-10 text-center text-white max-sm:px-10'>
        <NextImage
          src='/coming-soon/Logo.svg'
          alt='background coming soon'
          width={280}
          height={355}
          className='absolute'
        />
        <div className='flex flex-col items-center'>
          <Typography
            as='h1'
            variant='k0'
            font='libre'
            className='bg-blue-gradient bg-clip-text text-6xl leading-normal font-bold text-transparent italic sm:text-[80px] md:text-[100px] md:leading-normal lg:text-[150px]'
          >
            Coming Soon
          </Typography>

          <Typography
            as='p'
            variant='b1'
            font='adelphe'
            className='text-xl max-lg:mt-2 md:text-2xl lg:text-4xl'
          >
            This page is still under development. Stay tune!
          </Typography>

          <Link
            href='/'
            aria-label='Back to home'
            className='mt-3 border-b-[1.5px] border-b-white font-satoshi text-sm font-medium transition-colors duration-150 hover:text-gray-400 md:text-base lg:mt-4 lg:text-xl'
          >
            &larr; Go back
          </Link>
        </div>
      </main>
    );
  }

  // === NEW UI (page=ayomeludaftarmagang) ===
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e0e10] via-[#16161a] to-[#1e1e22] px-6 py-10 text-white'>
      {/* background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-[180px]' />
      </div>

      <NextImage
        src='/coming-soon/Logo.svg'
        alt='HMTC Logo'
        width={260}
        height={260}
        className='mb-8 opacity-90'
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='text-center'
      >
        <Typography
          as='h1'
          variant='k0'
          font='libre'
          className='bg-gradient-to-r from-[#33ccff] via-[#66ffcc] to-[#3399ff] bg-clip-text text-5xl font-bold text-transparent italic drop-shadow-[0_0_20px_rgba(51,204,255,0.25)] sm:text-7xl md:text-8xl lg:text-[120px]'
        >
          Sek Yo Rek...
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-8 flex flex-col items-center gap-6'
        >
          <Typography
            as='p'
            variant='b2'
            font='satoshi'
            className='text-lg text-gray-300'
          >
            {loading ? 'Memuat jadwal...' : 'Pendaftaran akan dibuka dalam:'}
          </Typography>

          <div
            role='status'
            aria-live='polite'
            className='flex items-center justify-center gap-4 text-center'
          >
            {['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => {
              const values = [days, hours, minutes, seconds];
              return (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className='flex min-w-[75px] flex-col items-center rounded-xl bg-white/10 px-4 py-3 shadow-lg backdrop-blur-sm'
                >
                  <span className='font-mono text-3xl font-bold'>
                    {loading ? '--' : String(values[i]).padStart(2, '0')}
                  </span>
                  <span className='mt-1 text-xs tracking-wider text-gray-400 uppercase'>
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
