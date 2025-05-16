'use client';

import { Menu, MoveLeft } from 'lucide-react';
import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { NAVBAR_LINKS } from '@/constants/layout';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isShift, setIsShift] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setIsShift(window.scrollY >= 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <header className={cn('fixed top-0 z-[100] w-full')}>
      <div
        className={cn(
          'flex items-center justify-between bg-transparent min-[800px]:flex-row',
          'px-6 py-5.5 min-[800px]:px-24',
          isShift && [
            'bg-black shadow-sm backdrop-blur transition-colors duration-150',
          ],
        )}
      >
        <ScrollLink
          to='home'
          smooth={true}
          duration={500}
          className='relative h-7 w-28 cursor-pointer'
        >
          <NextImage
            src='logohmtc2024.png'
            alt='Logo HMTC ITS 2024'
            width={112}
            height={28}
            className='h-full w-full'
            quality={80}
            priority
          />
        </ScrollLink>

        <Button
          icon={Menu}
          className='ml-auto min-[800px]:hidden'
          onClick={openSidebar}
        />

        <nav className='hidden items-center gap-6 min-[800px]:flex'>
          {NAVBAR_LINKS.map(({ id, name, href, offset }) => (
            <ScrollLink
              key={id}
              to={href.replace('#', '')}
              smooth={true}
              duration={500}
              offset={offset}
              className='font-secondary hover:text-base-nav cursor-pointer p-2.5 text-white-main transition-colors duration-75'
            >
              <Typography font='satoshi'>{name}</Typography>
            </ScrollLink>
          ))}
        </nav>
      </div>

      <nav
        className={cn(
          'fixed top-0 left-0 h-full w-full bg-black-main text-white',
          'transition duration-200 ease-in-out',
          'grid grid-rows-2 min-[800px]:hidden',
          isSidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0',
        )}
      >
        <div className='z-10 flex flex-col items-center gap-14 px-4 py-24'>
          <ScrollLink to='home' smooth={true} duration={500} className='w-32'>
            <NextImage
              src='logohmtc2024.png'
              alt='Logo HMTC ITS 2024'
              width={700}
              height={730}
              className='h-full w-full'
              quality={80}
              priority
            />
          </ScrollLink>

          <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-8'>
              {NAVBAR_LINKS.map(({ id, name, href }) => (
                <ScrollLink
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
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-end gap-0'>
          <Button
            size='large'
            icon={MoveLeft}
            className='z-10 rounded-md bg-white text-xl font-bold text-black-main hover:bg-gray-200'
            onClick={closeSidebar}
          />
          <div className='relative h-1/2'></div>
        </div>
      </nav>
    </header>
  );
}
