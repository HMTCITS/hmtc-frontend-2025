'use client';

import { Menu, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { NAVBAR_LINKS } from '@/contents/layout';
import { cn } from '@/lib/utils';

function scrollToId(id: string, offset = 0) {
  const target = document.getElementById(id);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  window.scrollTo({
    top: rect.top + scrollTop + offset,
    behavior: 'smooth',
  });
}

export default function Navbar() {
  const [isShift, setIsShift] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleScroll = React.useCallback(function handleNavbarScroll() {
    const shouldShift = window.scrollY >= 10;
    setIsShift((prev) => (prev !== shouldShift ? shouldShift : prev));
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function openSidebar() {
    setIsSidebarOpen(true);
  }
  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const handleAnchorClick = (
    e: React.MouseEvent,
    target: string,
    offset?: number,
  ) => {
    e.preventDefault();
    closeSidebar();
    scrollToId(target, offset);
  };

  return (
    <header className='fixed top-0 z-[100] w-full'>
      <div
        className={cn(
          'flex items-center justify-between px-6 py-5.5 min-lg:px-24',
          'transition-colors duration-150',
          isShift && 'bg-black shadow-sm backdrop-blur',
        )}
      >
        <a
          href='#home'
          aria-label='Kembali ke beranda HMTC ITS'
          className='relative h-13 w-28 cursor-pointer'
          tabIndex={0}
          onClick={(e) => handleAnchorClick(e, 'home', 0)}
        >
          <NextImage
            src='logo-hmtc2025-navbar.png'
            alt='Logo HMTC ITS 2025'
            width={100}
            height={20}
            priority
            quality={80}
            className='w-full'
          />
        </a>

        <Button
          icon={Menu}
          aria-label='Buka navigasi'
          className='ml-auto min-lg:hidden'
          onClick={openSidebar}
        />

        <nav className='hidden items-center gap-6 min-lg:flex'>
          {NAVBAR_LINKS.map(({ id, name, href, offset }) =>
            href.startsWith('#') ? (
              <a
                key={id}
                href={href}
                aria-label={`Scroll ke ${name}`}
                className='font-secondary hover:text-base-nav cursor-pointer p-2.5 text-white-main transition-colors duration-75'
                tabIndex={0}
                onClick={(e) =>
                  handleAnchorClick(e, href.replace('#', ''), offset)
                }
              >
                <Typography>{name}</Typography>
              </a>
            ) : (
              <Link
                key={id}
                href={href}
                aria-label={`Menuju halaman ${name}`}
                className='font-secondary hover:text-base-nav cursor-pointer p-2.5 text-white-main transition-colors duration-75'
              >
                <Typography>{name}</Typography>
              </Link>
            ),
          )}
        </nav>
      </div>

      <nav
        aria-label='Navigasi seluler'
        className={cn(
          'fixed inset-0 grid h-full w-full grid-rows-2 bg-black-main text-white transition-transform duration-200 ease-in-out min-lg:hidden',
          isSidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0',
        )}
      >
        <div className='z-10 flex flex-col items-center gap-14 px-4 py-24'>
          <a
            href='#home'
            aria-label='Kembali ke beranda HMTC ITS'
            className='w-32'
            onClick={(e) => handleAnchorClick(e, 'home')}
            tabIndex={0}
          >
            <NextImage
              src='logo-hmtc2025-navbar.png'
              alt='Logo HMTC ITS 2025'
              width={128}
              height={34}
              priority
              quality={80}
              className='h-full w-full'
            />
          </a>

          <div className='flex flex-col items-center gap-8'>
            {NAVBAR_LINKS.map(({ id, name, href, offset }) =>
              href.startsWith('#') ? (
                <a
                  key={id}
                  href={href}
                  aria-label={`Scroll ke ${name}`}
                  className='text-base-white cursor-pointer'
                  onClick={(e) =>
                    handleAnchorClick(e, href.replace('#', ''), offset)
                  }
                  tabIndex={0}
                >
                  <Typography as='h6'>{name}</Typography>
                </a>
              ) : (
                <Link
                  key={id}
                  href={href}
                  className='text-base-white cursor-pointer'
                  aria-label={`Menuju halaman ${name}`}
                  onClick={closeSidebar}
                >
                  <Typography as='h6'>{name}</Typography>
                </Link>
              ),
            )}
          </div>
        </div>

        <div className='flex flex-col items-center justify-end gap-0 pt-32'>
          <Button
            size='large'
            icon={MoveLeft}
            aria-label='Tutup navigasi'
            className='z-10 rounded-md bg-white text-xl font-bold text-black-main transition-colors hover:bg-gray-200'
            onClick={closeSidebar}
          />
          <div className='relative h-1/2' />
        </div>
      </nav>
    </header>
  );
}
