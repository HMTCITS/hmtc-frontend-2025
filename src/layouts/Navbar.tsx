'use client';

import { Menu, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { NAVBAR_LINKS } from '@/contents/layout';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isShift, setIsShift] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    const shouldShift = window.scrollY >= 10;
    setIsShift((prev) => (prev !== shouldShift ? shouldShift : prev));
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openSidebar: () => void = () => setIsSidebarOpen(true);
  const closeSidebar: () => void = () => setIsSidebarOpen(false);

  return (
    <header className='fixed top-0 z-[100] w-full'>
      <div
        className={cn(
          'flex items-center justify-between px-6 py-5.5 min-lg:px-24',
          'transition-colors duration-150',
          isShift && 'bg-black shadow-sm backdrop-blur',
        )}
      >
        <ScrollLink
          to='home'
          smooth
          duration={500}
          aria-label='Kembali ke beranda HMTC ITS'
          className='relative h-7 w-28 cursor-pointer'
        >
          <NextImage
            src='logohmtc2024.png'
            alt='Logo HMTC ITS 2024'
            width={112}
            height={28}
            priority
            quality={80}
            className='h-full w-full'
          />
        </ScrollLink>

        <Button
          icon={Menu}
          aria-label='Buka navigasi'
          className='ml-auto min-lg:hidden'
          onClick={openSidebar}
        />

        <nav className='hidden items-center gap-6 min-lg:flex'>
          {NAVBAR_LINKS.map(({ id, name, href, offset }) =>
            href.startsWith('#') ? (
              <ScrollLink
                key={id}
                to={href.replace('#', '')}
                smooth={true}
                duration={500}
                offset={offset}
                aria-label={`Scroll to ${name}`}
                className='font-secondary hover:text-base-nav cursor-pointer p-2.5 text-white-main transition-colors duration-75'
              >
                <Typography font='satoshi'>{name}</Typography>
              </ScrollLink>
            ) : (
              <Link
                key={id}
                href={href}
                aria-label={`Navigate to ${name}`}
                className='font-secondary hover:text-base-nav cursor-pointer p-2.5 text-white-main transition-colors duration-75'
              >
                <Typography font='satoshi'>{name}</Typography>
              </Link>
            ),
          )}
        </nav>
      </div>

      {/* Sidebar mobile */}
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
          <ScrollLink
            to='home'
            smooth
            duration={500}
            aria-label='Kembali ke beranda HMTC ITS'
            className='w-32'
            onClick={closeSidebar}
          >
            <NextImage
              src='logohmtc2024.png'
              alt='Logo HMTC ITS 2024'
              width={128}
              height={34}
              priority
              quality={80}
              className='h-full w-full'
            />
          </ScrollLink>

          <div className='flex flex-col items-center gap-8'>
            {NAVBAR_LINKS.map(({ id, name, href }) =>
              href.startsWith('#') ? (
                <ScrollLink
                  aria-label='Scroll to section'
                  key={id}
                  to={href.replace('#', '')}
                  smooth={true}
                  duration={500}
                  className='text-base-white cursor-pointer'
                  onClick={closeSidebar}
                >
                  <Typography as='h6' font='satoshi'>
                    {name}
                  </Typography>
                </ScrollLink>
              ) : (
                <Link
                  key={id}
                  href={href}
                  className='text-base-white cursor-pointer'
                  onClick={closeSidebar}
                >
                  <Typography as='h6' font='satoshi'>
                    {name}
                  </Typography>
                </Link>
              ),
            )}
          </div>
        </div>

        <div className='flex flex-col items-center justify-end gap-0'>
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
