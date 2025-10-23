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

export default function HeaderAnnouncement() {
  const { isAnnouncementVisible, dismissAnnouncement } = useAnnouncementState();

  // Don't render if not visible
  if (!isAnnouncementVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-[110] flex items-center justify-center px-4 py-3 transition-all duration-300 ease-in-out',
        ANNOUNCEMENT_CONFIG.backgroundColor,
        ANNOUNCEMENT_CONFIG.textColor,
        'translate-y-0 opacity-100',
      )}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-center gap-3'>
        <Typography font='satoshi' className='text-center font-medium'>
          {ANNOUNCEMENT_CONFIG.message}
        </Typography>

        {ANNOUNCEMENT_CONFIG.actionText && ANNOUNCEMENT_CONFIG.actionUrl && (
          <Link
            href={ANNOUNCEMENT_CONFIG.actionUrl}
            className='inline-flex items-center text-sm font-semibold underline transition-all duration-200 hover:no-underline'
          >
            <Typography font='satoshi' className='font-semibold'>
              {ANNOUNCEMENT_CONFIG.actionText} →
            </Typography>
          </Link>
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
  );
}
