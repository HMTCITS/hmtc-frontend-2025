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
import clsxm from '@/lib/clsxm';

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
      className={clsxm(
        'bg-blue-1000 w-full px-6 py-12 md:px-24',
        'flex flex-col items-center gap-6 bg-base-dark text-white md:gap-6'
      )}
    >
      <div
        className={clsxm(
          'flex w-full flex-col items-center gap-x-4 gap-y-12 pb-6',
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
            <div onClick={toggleApaIni} className='flex items-center gap-2'>
              <Typography
                variant='s2'
                className='cursor-pointer font-secondary uppercase'
              >
                hmtc
              </Typography>
              <FaChevronDown
                className={clsxm(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isApaIniOpen && 'rotate-180'
                )}
              />
            </div>
            <div
              className={clsxm(
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
                className={clsxm(
                  'text-white md:hidden',
                  'transition-transform duration-200 ease-in-out',
                  isAkademikOpen && 'rotate-180'
                )}
              />
            </div>
            <div
              className={clsxm(
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
