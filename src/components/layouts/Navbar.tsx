import Image from 'next/image';
import * as React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';
import { NAVBAR_LINKS } from '@/constants/layout';
import cn from '@/lib/clsxm';

type NavbarProps = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export default function Navbar({
  isSidebarOpen,
  openSidebar,
  closeSidebar,
}: NavbarProps) {
  const [isShift, setIsShift] = React.useState(false);

  const handleScroll = () => {
    setIsShift(window.scrollY >= 10);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn('fixed top-0 z-[100] w-full')}>
      <div
        className={cn(
          'flex flex-row-reverse items-center justify-between bg-transparent min-[800px]:flex-row',
          'px-6 py-1 min-[800px]:px-24',
          isShift && [
            'bg-black shadow-sm backdrop-blur transition-colors duration-150',
          ]
        )}
      >
        <BaseLink className='relative h-20 w-28 md:h-24 md:w-24' href='#home'>
          <Image
            src='/images/logohmtc2024.png'
            alt='Kunci Transformasi Logo'
            layout='fill'
            objectFit='contain'
          />
        </BaseLink>

        <Button
          icon={HiMenu}
          className='min-[800px]:hidden'
          onClick={openSidebar}
        />

        <nav className='hidden items-center gap-6 min-[800px]:flex'>
          {NAVBAR_LINKS.map(({ id, name, href }) => (
            <BaseLink
              key={id}
              href={href}
              className={cn(
                'group p-2.5 font-secondary text-white-main transition-colors duration-75 hover:text-base-nav'
              )}
            >
              <Typography className='font-satoshi'>{name}</Typography>
            </BaseLink>
          ))}
        </nav>
      </div>

      <nav
        className={cn(
          'fixed left-0 top-0 h-full w-full bg-black-main text-white',
          'transition duration-200 ease-in-out',
          'grid grid-rows-2 min-[800px]:hidden',
          isSidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        )}
      >
        <div className='z-10 flex flex-col items-center gap-14 px-4 py-6'>
          <BaseLink href='/' className='w-16'>
            <Image
              src='/images/logohmtc2024.png'
              alt=''
              width={700}
              height={730}
            />
          </BaseLink>

          <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-6'>
              {NAVBAR_LINKS.map(({ id, name, href }) => (
                <BaseLink
                  key={id}
                  href={href}
                  className='text-base-white'
                  onClick={closeSidebar}
                >
                  <Typography as='h6' className='font-satoshi'>
                    {name}
                  </Typography>
                </BaseLink>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-end gap-8'>
          <Button
            size='large'
            icon={FaArrowLeftLong}
            className='z-10 rounded-md bg-white text-xl font-bold text-black-main hover:bg-gray-200'
            onClick={closeSidebar}
          />

          <div className='relative h-1/2'></div>
        </div>
      </nav>
    </header>
  );
}
