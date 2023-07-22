import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import BaseLink from '@/components/links/BaseLink';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import { NAVBAR_LINKS } from '@/constants/layout';
import clsxm from '@/lib/clsxm';

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
  const router = useRouter();
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
    <header className={clsxm('fixed top-0 z-[100] w-full')}>
      <div
        className={clsxm(
          'flex flex-row-reverse items-center justify-between bg-transparent min-[800px]:flex-row',
          'px-6 py-4 min-[800px]:px-24',
          isShift && [
            'bg-white bg-opacity-50 shadow-sm backdrop-blur transition-colors duration-150',
          ]
        )}
      >
        <BaseLink href='/' className='p-2.5 min-[800px]:p-0'>
          <Typography
            variant='h2'
            className='font-secondary font-black uppercase'
          >
            hmtc
          </Typography>
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
              className={clsxm(
                'group p-2.5 font-secondary text-base-nav transition-colors duration-75 hover:text-black-main',
                router.asPath.split('/')[1] === '' &&
                  href === '#home' && ['!text-black-main'],
                router.asPath.split('/')[1] === href && ['!text-black-main']
              )}
            >
              <Typography className='font-medium'>{name}</Typography>
            </BaseLink>
          ))}
        </nav>
      </div>

      <nav
        className={clsxm(
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
            <Image src='/images/logohmtc.png' alt='' width={563} height={592} />
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
                  <Typography as='h6' className='font-medium'>
                    {name}
                  </Typography>
                </BaseLink>
              ))}
            </div>
          </div>

          <ButtonLink href='' size='large'>
            Masuk
          </ButtonLink>
        </div>

        <div className='flex flex-col items-center justify-end gap-8'>
          <Button
            size='large'
            icon={FaArrowLeftLong}
            className='z-10 rounded-md bg-white text-xl font-bold text-black-main hover:bg-gray-200'
            onClick={closeSidebar}
          />

          <div className='relative h-1/2'></div>

          <Image
            src='/images/bungaa.png'
            alt='Decoration'
            width={1935}
            height={2009}
            className='absolute -bottom-32 -left-32 z-0 w-full max-w-[25rem] opacity-10'
          />
          <Image
            src='/images/bungaa.png'
            alt='Decoration'
            width={1935}
            height={2009}
            className='absolute -bottom-40 -right-40 z-0 w-full max-w-[20rem] opacity-10'
          />
        </div>
      </nav>
    </header>
  );
}
