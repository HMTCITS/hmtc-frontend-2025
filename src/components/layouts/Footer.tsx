import Image from 'next/image';
import * as React from 'react';
import {
  FaChevronDown,
  FaInstagram,
  FaLine,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import SocialCard from '@/components/layouts/components/Social';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';
import cn from '@/lib/clsxm';

//footer links
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

//footer hmtc
const ApaIni = [
  {
    label: 'Tentang kami',
    href: '#about',
  },
  {
    label: 'Kepengurusan',
    href: '#kepengurusan',
  },
  {
    label: 'Informasi',
    href: '#akademik',
  },
];

//footer akademik
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
        'flex flex-col items-center gap-6 bg-base-dark text-white md:gap-6'
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center gap-x-4 gap-y-12 pb-6',
          'md:min-h-[240px] md:flex-row md:items-start md:justify-between'
        )}
      >
        <BaseLink href='/' className='flex items-center gap-x-4'>
          <div className='w-12'>
            <Image
              src='/images/logohmtc1.png'
              alt='Logo'
              width={1440}
              height={1440}
              style={{ width: '48.62px', height: '55.09px' }}
              priority
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

        <div className='grid grid-cols-2 gap-x-6 font-secondary'>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <div onClick={toggleApaIni} className='flex items-center gap-2'>
              <Typography
                variant='s2'
                className='cursor-pointer font-secondary uppercase'
              >
                hmtc
              </Typography>
              <FaChevronDown
                className={cn(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isApaIniOpen && 'rotate-180'
                )}
              />
            </div>
            <div
              className={cn(
                'flex flex-col items-center gap-3 md:items-start',
                'overflow-y-hidden transition-all duration-300 ease-in-out',
                isApaIniOpen
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
              )}
            >
              {ApaIni.map(({ label, href }, index) => (
                <BaseLink
                  key={index}
                  href={href}
                  className='text-sm text-base-icon hover:text-white md:text-base'
                >
                  {label}
                </BaseLink>
              ))}
            </div>
          </div>
          <div className='flex w-full flex-col items-center gap-y-2.5 md:w-[187px] md:items-start'>
            <div onClick={toggleAkademik} className='flex items-center gap-2'>
              <Typography
                variant='s2'
                className='cursor-pointer font-secondary uppercase'
              >
                akademik
              </Typography>
              <FaChevronDown
                className={cn(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isAkademikOpen && 'rotate-180'
                )}
              />
            </div>
            <div
              className={cn(
                'flex flex-col items-center gap-3 md:items-start',
                'overflow-y-hidden transition-all duration-300 ease-in-out',
                isAkademikOpen
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
              )}
            >
              {Akademik.map(({ label, href }, index) => (
                <BaseLink
                  key={index}
                  href={href}
                  className='text-sm text-base-icon hover:text-white md:text-base'
                >
                  {label}
                </BaseLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='h-1 w-full border-t border-black-main'></div>
      <div className='flex w-full flex-col items-center justify-center gap-y-6 md:flex-row md:justify-between'>
        <Typography
          variant='s2'
          className='order-2 font-secondary text-sm uppercase text-base-icon md:order-1 md:text-center'
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
