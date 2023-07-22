import Image from 'next/image';
import * as React from 'react';
import {
  FaInstagram,
  FaLine,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import SocialCard from '@/components/layouts/components/Social';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

const SocialMedia = [
  {
    icon: FaTwitter,
    href: '',
  },
  {
    icon: FaInstagram,
    href: '',
  },
  {
    icon: FaYoutube,
    href: '',
  },
  {
    icon: FaLinkedinIn,
    href: '',
  },
  {
    icon: FaTiktok,
    href: '',
  },
  {
    icon: FaLine,
    href: '',
  },
];

const ApaIni = [
  {
    label: 'Tentang kami',
    href: '',
  },
  {
    label: 'Kepengurusan',
    href: '',
  },
  {
    label: 'MBKM',
    href: '',
  },
];

const Akademik = [
  {
    label: 'Bank Soal',
    href: '',
  },
  {
    label: 'Silabus',
    href: '',
  },
  {
    label: 'MBKM',
    href: '',
  },
  {
    label: 'Kalender Akademik',
    href: '',
  },
];

export default function Footer() {
  return (
    <footer
      className={clsxm(
        'bg-blue-1000 w-full px-6 py-12 md:px-24',
        'flex flex-col items-center gap-6 bg-base-dark text-white md:gap-6'
      )}
    >
      <div
        className={clsxm(
          'flex w-full flex-col items-center gap-x-4 gap-y-12',
          'md:min-h-[240px] md:flex-row md:items-start md:justify-between'
        )}
      >
        <BaseLink href='/' className='flex items-center gap-x-4'>
          <div className='w-16'>
            <Image
              src='/images/logohmtc.png'
              alt='Logo'
              width={1440}
              height={1440}
              className='w-20 md:w-44'
              priority
            />
          </div>
          <div>
            <Typography
              variant='h1'
              className='flex flex-col font-primary text-xl font-extrabold'
            >
              <span>Himpunan Mahasiswa</span>
              <span className='text-blue-light-2'>
                Teknik Computer-Informatika
              </span>
            </Typography>
          </div>
        </BaseLink>

        <div className='grid grid-cols-2 gap-x-6 font-secondary'>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <Typography variant='s2' className='uppercase'>
              apa ini?
            </Typography>
            {ApaIni.map(({ label, href }, index) => (
              <BaseLink
                key={index}
                href={href}
                className='text-sm text-base-icon md:text-base'
              >
                {label}
              </BaseLink>
            ))}
          </div>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <Typography variant='s2' className='uppercase'>
              akademik
            </Typography>
            {Akademik.map(({ label, href }, index) => (
              <BaseLink
                key={index}
                href={href}
                className='text-sm text-base-icon md:text-base'
              >
                {label}
              </BaseLink>
            ))}
          </div>
        </div>

        {/* <div className='flex flex-col items-center gap-3 md:items-start'>
          <div className='flex items-center gap-2' onClick={toggleDivisiUkm}>
            <Typography variant='b1' className='text-base-white font-semibold'>
              Divisi UKM
            </Typography>
            <FaChevronDown
              className={clsxm(
                'text-base-white md:hidden',
                'transition-transform duration-200 ease-in-out',
                isDivisiUkmOpen && 'rotate-180'
              )}
            />
          </div>

          <div
            className={clsxm(
              'flex flex-col items-center gap-3 md:items-start',
              'overflow-y-hidden transition-all duration-300 ease-in-out',
              isDivisiUkmOpen
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
            )}
          >
            {NAVBAR_LINKS.map(({ id, name, href }) => (
              <BaseLink key={id} href={href}>
                <Typography variant='b1' className='text-base-icon'>
                  {name}
                </Typography>
              </BaseLink>
            ))}
          </div>
        </div> */}

        {/* <div className='flex flex-col items-center gap-3 md:items-start'>
          <Typography variant='b1' className='text-base-white font-semibold'>
            Our Social Media
          </Typography>

          <div className='flex items-center gap-6'>
            {NAVBAR_LINKS.map(({ id, ...rest }) => (
              <ButtonLink
                key={id}
                target='_blank'
                variant='unstyled'
                className='h-6 w-6 p-0'
                iconClassName='text-base-icon'
                {...rest}
              />
            ))}
          </div>
        </div> */}
      </div>
      <div className='h-1 w-full border-t border-black-main'></div>
      <div className='flex w-full flex-col items-center justify-center gap-y-6 md:flex-row md:justify-between'>
        <Typography
          variant='s2'
          className='order-2 font-secondary text-sm uppercase text-base-icon md:order-1 md:text-center'
        >
          &copy; HMTC ITS 2023
        </Typography>
        <div className='order-1 flex items-center gap-x-4 md:order-2'>
          {SocialMedia.map(({ icon: Icon, href }, index) => (
            <SocialCard key={index} href={href} icon={Icon} />
          ))}
        </div>
      </div>
    </footer>
  );
}
