'use client';

import Link from 'next/link';
import * as React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { NAVBAR_LINKS } from '@/contents/layout';
import { cn } from '@/lib/utils';

export default function NavbarGallery() {
  const [isShift, setIsShift] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsShift(window.scrollY >= 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='fixed top-0 z-[100] w-full'>
      {/* Top bar */}
      <div
        className={cn(
          'flex items-center justify-between px-6 py-5.5 min-[800px]:px-24',
          isShift
            ? 'bg-white shadow-sm backdrop-blur transition-colors duration-150'
            : 'bg-transparent',
        )}
      >
        {/* Logo always links home */}
        <Link href='/' scroll={false} className='relative h-7 w-28'>
          <NextImage
            src='logohmtc2024black.png'
            alt='Kunci Transformasi Logo'
            className='h-full w-full'
            width={112}
            height={28}
            priority
          />
        </Link>

        {/* Mobile menu button */}
        <Button
          icon={HiMenu}
          className='ml-auto min-[800px]:hidden'
          onClick={() => setIsSidebarOpen(true)}
        />

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 min-[800px]:flex'>
          {NAVBAR_LINKS.map(({ id, name, href }) => {
            const anchor = href.replace('#', '');
            return (
              <Link
                key={id}
                href={`/#${anchor}`}
                scroll={false}
                className='font-secondary text-white-main hover:text-base-nav p-2.5 transition-colors duration-75'
              >
                <Typography
                  font='satoshi'
                  weight='medium'
                  className={cn(
                    name === 'Gallery' ? 'text-black' : 'text-zinc-600',
                  )}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar */}
      <nav
        className={cn(
          'bg-black-main fixed top-0 left-0 grid h-full w-full grid-rows-2 text-white transition-transform duration-200 ease-in-out min-[800px]:hidden',
          isSidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0',
        )}
      >
        <div className='flex flex-col items-center gap-14 px-4 py-24'>
          {/* Logo in sidebar */}
          <Link
            href='/'
            scroll={false}
            onClick={() => setIsSidebarOpen(false)}
            className='w-32'
          >
            <NextImage
              src='logohmtc2024black.png'
              alt='Logo HMTC 2024'
              className='h-full w-full'
              width={700}
              height={730}
              priority
            />
          </Link>

          {/* Sidebar links */}
          <div className='flex flex-col items-center gap-8'>
            {NAVBAR_LINKS.map(({ id, name, href }) => {
              const anchor = href.replace('#', '');
              return (
                <Link
                  key={id}
                  href={`/#${anchor}`}
                  scroll={false}
                  onClick={() => setIsSidebarOpen(false)}
                  className='text-base-white'
                >
                  <Typography
                    as='h6'
                    font='satoshi'
                    weight='medium'
                    className={cn(
                      name === 'Gallery' ? 'text-black' : 'text-zinc-600',
                    )}
                  >
                    {name}
                  </Typography>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Close button */}
        <div className='flex flex-col items-center justify-end pb-10'>
          <Button
            size='large'
            icon={FaArrowLeftLong}
            className='text-black-main rounded-md bg-white text-xl font-bold hover:bg-gray-200'
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
}
