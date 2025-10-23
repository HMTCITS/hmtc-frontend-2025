'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
    if (!showCountdown) return; // only auto-redirect when the page param requested the countdown
    if (scheduleData?.active || timeUntilStart === 0) {
      router.replace('/ayomeludaftarmagang');
    }
  }, [scheduleData?.active, timeUntilStart, router, showCountdown]);

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

  // === DEFAULT UI ===
  if (!showCountdown) {
    return (
      <main className='flex min-h-screen w-full flex-col items-center justify-center bg-[#201F1F] px-6 py-10 text-center text-white sm:px-8 md:px-12 lg:px-16'>
        <NextImage
          src='/logo-hmtc2025-footer.png'
          alt='background coming soon'
          width={171}
          height={492}
          className='absolute opacity-30'
        />
        <div className='flex flex-col items-center space-y-4 sm:space-y-6'>
          <Typography
            as='h1'
            variant='k0'
            font='libre'
            className='bg-blue-gradient bg-clip-text text-5xl leading-tight font-bold text-transparent italic sm:text-7xl md:text-[80px] lg:text-[110px] xl:text-[140px]'
          >
            Coming Soon
          </Typography>
          <Typography
            as='p'
            variant='b1'
            font='adelphe'
            className='text-base sm:text-lg md:text-xl lg:text-2xl'
          >
            This page is still under development. Stay tuned!
          </Typography>
          <Link
            href='/'
            aria-label='Back to home'
            className='mt-2 border-b border-b-white font-satoshi text-sm font-medium transition-colors duration-150 hover:text-gray-400 sm:text-base lg:text-lg'
          >
            &larr; Go back
          </Link>
        </div>
      </main>
    );
  }

  // === NEW UI (ayomeludaftarmagang) ===
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e0e10] via-[#16161a] to-[#1e1e22] px-4 py-10 text-white sm:px-6 md:px-10 lg:px-14 xl:px-20'>
      {/* Background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-[140px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px]' />
      </div>

      <NextImage
        src='/logo-hmtc2025-footer.png'
        alt='HMTC Logo'
        width={171}
        height={492}
        className='mb-6 opacity-30 sm:mb-8 sm:w-[130px]'
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='flex flex-col items-center text-center'
      >
        <Typography
          as='h1'
          variant='k0'
          font='libre'
          className='bg-gradient-to-r from-[#33ccff] via-[#66ffcc] to-[#3399ff] bg-clip-text text-5xl font-bold text-transparent italic drop-shadow-[0_0_20px_rgba(51,204,255,0.25)] sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[120px]'
        >
          Sek Yo Rek...
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-8 flex flex-col items-center gap-6 sm:gap-8 md:gap-10'
        >
          <Typography
            as='p'
            variant='b2'
            font='satoshi'
            className='text-base text-gray-300 sm:text-lg md:text-xl'
          >
            {loading ? 'Memuat jadwal...' : 'Pendaftaran akan dibuka dalam:'}
          </Typography>

          <div
            role='status'
            aria-live='polite'
            className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6'
          >
            {['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => {
              const values = [days, hours, minutes, seconds];
              return (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className='flex min-w-[70px] flex-col items-center rounded-xl bg-white/10 px-3 py-2 shadow-md backdrop-blur-sm sm:min-w-[80px] sm:px-4 sm:py-3 md:min-w-[90px] lg:min-w-[100px]'
                >
                  <span className='font-mono text-2xl font-bold sm:text-3xl md:text-4xl'>
                    {loading ? '--' : String(values[i]).padStart(2, '0')}
                  </span>
                  <span className='mt-1 text-[10px] tracking-wider text-gray-400 uppercase sm:text-xs md:text-sm'>
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
