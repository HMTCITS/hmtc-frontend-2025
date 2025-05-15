'use client';

import React from 'react';
import {
  FaChevronDown,
  FaInstagram,
  FaLine,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

import BaseLink from '@/components/links/BaseLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { NAVBAR_LINKS as ApaIni } from '@/constants/layout';
import SocialCard from '@/layouts/components/Social';
import { cn } from '@/lib/utils';

// Footer links
const SocialMedia = [
  {
    icon: FaTwitter,
    href: 'https://twitter.com/hmtc_its',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/hmtc_its/',
  },
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/@bluepresshmtc',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/himpunan-mahasiswa-teknik-computer-informatika/',
  },
  {
    icon: FaLine,
    href: 'https://tr.ee/T1xoSC0squ',
  },
];

// Footer Akademik
const Akademik = [
  {
    label: 'Bank Soal',
    href: '#akademik',
  },
  {
    label: 'Silabus',
    href: '#akademik',
  },
  {
    label: 'MBKM',
    href: '#akademik',
  },
  {
    label: 'Kalender Akademik',
    href: '#akademik',
  },
];

export default function Footer() {
  const [isApaIniOpen, setIsApaIniOpen] = React.useState(false);
  const [isAkademikOpen, setIsAkademikOpen] = React.useState(false);
  const toggleApaIni = () => setIsApaIniOpen((prev) => !prev);
  const toggleAkademik = () => setIsAkademikOpen((prev) => !prev);
  return (
    <footer
      className={cn(
        'bg-blue-1000 w-full px-6 py-12 md:px-24',
        'bg-base-dark flex flex-col items-center gap-6 text-white md:gap-6',
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center gap-x-4 gap-y-12 pb-6',
          'md:min-h-[240px] md:flex-row md:items-start md:justify-between',
        )}
      >
        <BaseLink href='/' className='flex items-center gap-x-4'>
          <div className='w-12'>
            <NextImage
              src='/logohmtc1.png'
              alt='Logo'
              width={1440}
              height={1440}
              priority
              className='h-[55.09px] w-[48.62px]'
            />
          </div>
          <div>
            <Typography
              variant='h2'
              className='flex flex-col font-inter text-sm'
            >
              <span>Kunci</span>
              <span>Transformasi.</span>
            </Typography>
          </div>
        </BaseLink>

        <div className='font-secondary grid grid-cols-2 gap-x-6'>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <div onClick={toggleApaIni} className='flex items-center gap-2'>
              <Typography
                variant='s2'
                className='font-secondary cursor-pointer uppercase'
              >
                hmtc
              </Typography>
              <FaChevronDown
                className={cn(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isApaIniOpen && 'rotate-180',
                )}
              />
            </div>
            <div
              className={cn(
                'flex flex-col items-center gap-3 md:items-start',
                'overflow-y-hidden transition-all duration-300 ease-in-out',
                isApaIniOpen
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100',
              )}
            >
              {ApaIni.map(({ name, href, offset }, index) => (
                <ScrollLink
                  key={index}
                  to={href.replace('#', '')}
                  smooth={true}
                  duration={500}
                  offset={offset}
                  className='font-secondary hover:text-base-nav cursor-pointer text-white-main transition-colors duration-75'
                >
                  <Typography
                    font='poppins'
                    className='text-base-icon text-sm hover:text-white md:text-base'
                  >
                    {name}
                  </Typography>
                </ScrollLink>
              ))}
            </div>
          </div>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <div onClick={toggleAkademik} className='flex items-center gap-2'>
              <Typography
                variant='s2'
                className='font-secondary cursor-pointer uppercase'
              >
                akademik
              </Typography>
              <FaChevronDown
                className={cn(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isAkademikOpen && 'rotate-180',
                )}
              />
            </div>
            <div
              className={cn(
                'flex flex-col items-center gap-3 md:items-start',
                'overflow-y-hidden transition-all duration-300 ease-in-out',
                isAkademikOpen
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100',
              )}
            >
              {Akademik.map(({ label, href }, index) => (
                <ScrollLink
                  key={index}
                  to={href.replace('#', '')}
                  smooth={true}
                  duration={500}
                  className='font-secondary hover:text-base-nav cursor-pointer text-white-main transition-colors duration-75'
                >
                  <Typography
                    font='poppins'
                    className='text-base-icon text-sm hover:text-white md:text-base'
                  >
                    {label}
                  </Typography>
                </ScrollLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='h-1 w-full border-t border-black-main'></div>
      <div className='flex w-full flex-col items-center justify-center gap-y-6 md:flex-row md:justify-between'>
        <Typography
          variant='s2'
          className='font-secondary text-base-icon order-2 text-sm uppercase md:order-1 md:text-center'
        >
          &copy; HMTC ITS 2024 | KUNCI TRANSFORMASI
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
