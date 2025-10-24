'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { useSchedule } from '@/hooks/api/useSchedule';

/**
 * Improvements in this rewrite:
 * - Prevent repeated image refetches/re-mounts by isolating the logo image into
 *   a memoized component (LogoGraphic). The logo receives stable props so React
 *   won't remount it when the parent re-renders due to schedule polling.
 * - Keep the same UX and logic:
 *   * For `ayomeludaftarmagang` and `hidden-page-cf` show the countdown/status UI
 *   * Titles and subtitles follow the requested wording for upcoming/open/closed
 *   * When schedule becomes active, wait 2.5 seconds before redirect so the user
 *     can see the "coming soon" UI first
 * - Structured and small responsibilities (single-responsibility): UI pieces are
 *   separated and memoized to reduce unnecessary re-renders.
 */

/* -------------------------
   Constants / Types
   ------------------------- */

type PageKey = 'ayomeludaftarmagang' | 'hidden-page-cf' | string;
const COUNT_LABELS = ['Hari', 'Jam', 'Menit', 'Detik'] as const;

/* -------------------------
   Memoized static logo
   ------------------------- */

// Keep logo props stable and memoize component so it does not remount on parent updates.
// This prevents NextImage from being torn down/recreated (which can trigger re-fetch).
const LOGO_PROPS = {
  src: '/logo-hmtc2025-footer.png',
  alt: 'HMTC Logo',
  width: 171,
  height: 492,
  // className intentionally separate when used so we can place it in markup without changing props
} as const;

const LogoGraphic = React.memo(function LogoGraphic({
  className,
}: {
  className?: string;
}) {
  return (
    <NextImage
      {...LOGO_PROPS}
      className={className}
      // Note: if your NextImage implementation supports `priority` for preloading,
      // you can add priority={true} here to load it once early. Avoid toggling props.
    />
  );
});
LogoGraphic.displayName = 'LogoGraphic';

/* -------------------------
   Utilities
   ------------------------- */

function breakdownTime(ms: number | null) {
  if (ms == null) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

/* -------------------------
   Component
   ------------------------- */

export default function ComingSoon() {
  const search = useSearchParams();
  const router = useRouter();
  const page = (search?.get('page') || '') as PageKey;
  const showCountdown =
    page === 'ayomeludaftarmagang' || page === 'hidden-page-cf';

  // pick schedule API path based on `page` query param
  const schedulePath = useMemo(
    () =>
      page === 'hidden-page-cf' ? '/hidden-page-cf' : '/ayomeludaftarmagang',
    [page],
  );

  // poll schedule; `useSchedule` is expected to return { data, now, loading }
  const { data: scheduleData, now, loading } = useSchedule(schedulePath, 7000);

  // compute ms until start / end (null if unknown)
  const timeUntilStart = useMemo(() => {
    if (!scheduleData?.start) return null;
    try {
      const start = new Date(scheduleData.start).getTime();
      const n = now.getTime();
      return Math.max(0, start - n);
    } catch {
      return null;
    }
  }, [scheduleData?.start, now]);

  const _timeUntilEnd = useMemo(() => {
    if (!scheduleData?.end) return null;
    try {
      const end = new Date(scheduleData.end).getTime();
      const n = now.getTime();
      return Math.max(0, end - n);
    } catch {
      return null;
    }
  }, [scheduleData?.end, now]);

  // determine page status: upcoming / open / closed / unknown
  const pageStatus = useMemo<'upcoming' | 'open' | 'closed' | 'unknown'>(() => {
    if (!showCountdown) return 'unknown';
    try {
      const startMs = scheduleData?.start
        ? new Date(scheduleData.start).getTime()
        : null;
      const endMs = scheduleData?.end
        ? new Date(scheduleData.end).getTime()
        : null;
      const nowMs = now?.getTime();

      if (endMs !== null && nowMs !== undefined && nowMs > endMs) {
        return 'closed';
      }

      if (
        (startMs !== null &&
          endMs !== null &&
          nowMs !== undefined &&
          nowMs >= startMs &&
          nowMs <= endMs) ||
        scheduleData?.active === true
      ) {
        return 'open';
      }

      if (startMs !== null && nowMs !== undefined && nowMs < startMs) {
        return 'upcoming';
      }

      return 'unknown';
    } catch {
      return 'unknown';
    }
  }, [scheduleData, now, showCountdown]);

  // when schedule becomes active, wait 5s so users see the coming-soon UI briefly,
  // then redirect. cleanup timer if state changes.
  useEffect(() => {
    if (!showCountdown) return;
    // start redirect timer only when active or the start time is reached
    if (scheduleData?.active || timeUntilStart === 0) {
      const id = window.setTimeout(() => {
        // re-check to avoid racing
        if (scheduleData?.active || timeUntilStart === 0) {
          if (page === 'hidden-page-cf') router.replace('/hidden-page-cf');
          else router.replace('/ayomeludaftarmagang');
        }
      }, 2500);
      return () => window.clearTimeout(id);
    }
    // nothing to cleanup
  }, [scheduleData?.active, timeUntilStart, page, router, showCountdown]);

  // prepare countdown breakdown only once per relevant change
  const { days, hours, minutes, seconds } = useMemo(
    () => breakdownTime(timeUntilStart),
    [timeUntilStart],
  );

  // title & subtitle based on status (for the two gated pages)
  const { titleText, subtitleText } = useMemo(() => {
    if (!showCountdown) {
      return {
        titleText: 'Coming Soon',
        subtitleText: 'This page is still under development. Stay tuned!',
      };
    }

    switch (pageStatus) {
      case 'upcoming':
        return {
          titleText: 'Sek Yo Rek . . .',
          subtitleText: 'Pendaftaran akan dibuka dalam:',
        };
      case 'open':
        return {
          titleText: 'Wes dibuka rek',
          subtitleText: 'Pendaftaran telah dibuka',
        };
      case 'closed':
        return {
          titleText: 'Wes ditutup rek',
          subtitleText: 'Pendaftaran telah ditutup',
        };
      default:
        return {
          titleText: 'Sek Yo Rek . . .',
          subtitleText: 'Pendaftaran akan dibuka dalam:',
        };
    }
  }, [pageStatus, showCountdown]);

  // === Default "non-countdown" UI ===
  if (!showCountdown) {
    return (
      <main className='flex min-h-screen w-full flex-col items-center justify-center bg-[#201F1F] px-6 py-10 text-center text-white sm:px-8 md:px-12 lg:px-16'>
        {/* Memoized logo — stable, won't trigger image re-fetch on schedule polling */}
        <LogoGraphic className='absolute opacity-30' />
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

  // === Countdown / schedule UI (for gated pages) ===
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e0e10] via-[#16161a] to-[#1e1e22] px-4 py-10 text-white sm:px-6 md:px-10 lg:px-14 xl:px-20'>
      {/* Background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-[140px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px]' />
      </div>

      {/* Memoized logo instance — stable across re-renders */}
      <LogoGraphic className='mb-6 opacity-30 sm:mb-8 sm:w-[130px]' />

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
          {titleText}
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
            {loading ? 'Memuat jadwal...' : subtitleText}
          </Typography>

          <div
            role='status'
            aria-live='polite'
            className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6'
          >
            {COUNT_LABELS.map((label, i) => {
              const values = [days, hours, minutes, seconds];
              const displayValue = loading
                ? '--'
                : pageStatus === 'upcoming'
                  ? String(values[i]).padStart(2, '0')
                  : '00';
              return (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className='flex min-w-[70px] flex-col items-center rounded-xl bg-white/10 px-3 py-2 shadow-md backdrop-blur-sm sm:min-w-[80px] sm:px-4 sm:py-3 md:min-w-[90px] lg:min-w-[100px]'
                >
                  <span className='font-mono text-2xl font-bold sm:text-3xl md:text-4xl'>
                    {displayValue}
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
