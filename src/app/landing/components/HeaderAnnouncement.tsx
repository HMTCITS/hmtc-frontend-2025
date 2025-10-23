'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Typography from '@/components/Typography';
import {
  ANNOUNCEMENT_CONFIG,
  isAnnouncementTimeValid,
} from '@/contents/announcement';
import { useSchedule } from '@/hooks/api/useSchedule';
import { cn } from '@/lib/utils';

// Custom hook to manage announcement state globally
export function useAnnouncementState() {
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    // Check if announcement was previously dismissed
    const dismissed = localStorage.getItem('announcement-dismissed') === 'true';
    setIsDismissed(dismissed);
  }, []);

  const dismissAnnouncement = React.useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem('announcement-dismissed', 'true');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('announcement-dismissed'));
  }, []);

  const handleScroll = React.useCallback(() => {
    const shouldHide = window.scrollY >= 80;
    setIsScrolled(shouldHide);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Check if announcement should be visible based on all conditions
  const isTimeValid = isAnnouncementTimeValid();
  const isAnnouncementVisible =
    ANNOUNCEMENT_CONFIG.isActive && isTimeValid && !isDismissed && !isScrolled;

  return {
    isAnnouncementVisible,
    isDismissed,
    isScrolled,
    isTimeValid,
    dismissAnnouncement,
  };
}

type HeaderAnnouncementProps = {
  active?: boolean;
};

export default function HeaderAnnouncement({
  active,
}: HeaderAnnouncementProps) {
  const { dismissAnnouncement } = useAnnouncementState();

  // schedule data for the recruitment page — used to show countdown / CTA
  const {
    data: scheduleData,
    now,
    loading: _scheduleLoading,
  } = useSchedule('/ayomeludaftarmagang', 7000);

  // allow parent to override schedule active state via prop
  const scheduleActive =
    typeof active === 'boolean' ? active : (scheduleData?.active ?? true);

  const isLoading = Boolean(_scheduleLoading);

  // compute remaining time until start if not active
  const timeUntilStart = React.useMemo(() => {
    if (!scheduleData?.start) return null;
    try {
      const start = new Date(scheduleData.start).getTime();
      const n = now.getTime();
      return Math.max(0, start - n);
    } catch {
      return null;
    }
  }, [scheduleData?.start, now]);

  // consider the countdown reaching zero as active so the UI flips immediately
  const isCountdownFinished = timeUntilStart === 0;
  const effectiveActive = scheduleActive || isCountdownFinished;

  const formatRemaining = (ms: number | null) => {
    if (ms == null) return '';
    const total = Math.floor(ms / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    if (days > 0)
      return `${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'relative z-[110] w-full transition-transform duration-300 ease-in-out',
        ANNOUNCEMENT_CONFIG.backgroundColor,
        ANNOUNCEMENT_CONFIG.textColor,
      )}
      role='region'
      aria-label='Pengumuman HMTC'
    >
      <div className='mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-3 sm:px-6 md:px-8'>
        <div className='flex min-w-0 items-center gap-4'>
          <Typography
            as='p'
            font='satoshi'
            className='truncate text-sm leading-snug font-medium sm:text-base'
          >
            {isLoading
              ? `${ANNOUNCEMENT_CONFIG.message} — Memuat...`
              : effectiveActive
                ? `${ANNOUNCEMENT_CONFIG.message} — Sudah dibuka`
                : `${ANNOUNCEMENT_CONFIG.message} — Masih ditutup`}
          </Typography>
        </div>

        <div className='flex items-center gap-3'>
          {/* Countdown box */}
          {!effectiveActive ? (
            <div
              className='flex items-center rounded-md bg-white/8 px-3 py-1 font-mono text-xs sm:text-sm'
              role='status'
              aria-live='polite'
            >
              {isLoading
                ? 'Memuat...'
                : timeUntilStart != null
                  ? formatRemaining(timeUntilStart)
                  : '--:--:--'}
            </div>
          ) : (
            // Action CTA when active
            !isLoading &&
            ANNOUNCEMENT_CONFIG.actionText &&
            ANNOUNCEMENT_CONFIG.actionUrl && (
              <Link
                href={ANNOUNCEMENT_CONFIG.actionUrl}
                aria-label={ANNOUNCEMENT_CONFIG.actionText}
              >
                <Button className='rounded-md bg-white/10 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white/20'>
                  {ANNOUNCEMENT_CONFIG.actionText}
                </Button>
              </Link>
            )
          )}

          {ANNOUNCEMENT_CONFIG.dismissible && (
            <button
              onClick={dismissAnnouncement}
              aria-label='Tutup pengumuman'
              title='Tutup pengumuman'
              className='-mr-1 rounded p-1 text-current hover:bg-white/10 focus:ring-2 focus:ring-white/20 focus:outline-none'
            >
              <X className='h-4 w-4' aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
