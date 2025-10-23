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
      const diff = Math.max(0, start - n);
      return diff;
    } catch {
      return null;
    }
  }, [scheduleData?.start, now]);

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
        'relative top-0 right-0 left-0 z-[110] flex items-center justify-center px-4 py-3 transition-all duration-300 ease-in-out',
        ANNOUNCEMENT_CONFIG.backgroundColor,
        ANNOUNCEMENT_CONFIG.textColor,
        'translate-y-0 opacity-100',
      )}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-center gap-3'>
        <div className='flex items-center gap-3'>
          <div>
            <Typography font='satoshi' className='text-center font-medium'>
              {/* show explicit status text depending on schedule, or loading */}
              {isLoading
                ? `${ANNOUNCEMENT_CONFIG.message} — Memuat...`
                : scheduleActive
                  ? `${ANNOUNCEMENT_CONFIG.message} — Sudah dibuka`
                  : `${ANNOUNCEMENT_CONFIG.message} — Masih ditutup`}
            </Typography>
          </div>

          {/* action: show countdown if schedule inactive, otherwise CTA */}
          {!scheduleActive ? (
            <div className='flex items-center gap-2'>
              <div
                className='rounded bg-white/10 px-3 py-1 font-mono text-sm'
                role='status'
                aria-live='polite'
              >
                {isLoading
                  ? 'Memuat...'
                  : timeUntilStart != null
                    ? formatRemaining(timeUntilStart)
                    : '--:--:--'}
              </div>
            </div>
          ) : (
            !isLoading &&
            ANNOUNCEMENT_CONFIG.actionText &&
            ANNOUNCEMENT_CONFIG.actionUrl && (
              <Link
                href={ANNOUNCEMENT_CONFIG.actionUrl}
                className='inline-flex items-center text-sm font-semibold underline transition-all duration-200 hover:no-underline'
              >
                <Button
                  className='bg-transparent px-0 py-0 hover:bg-transparent'
                  onClick={() => {}}
                >
                  {ANNOUNCEMENT_CONFIG.actionText}
                </Button>
              </Link>
            )
          )}

          {ANNOUNCEMENT_CONFIG.dismissible && (
            <Button
              icon={X}
              onClick={dismissAnnouncement}
              className='ml-2 h-6 w-6 border-none bg-transparent p-0 text-current hover:bg-white/20'
              aria-label='Tutup pengumuman'
            />
          )}
        </div>
      </div>
    </div>
  );
}
