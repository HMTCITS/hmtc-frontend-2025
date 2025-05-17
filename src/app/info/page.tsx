'use client';

import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Request Media Partner', url: 'http://intip.in/FormMedparHMTC2025' },
  { label: 'Instagram', url: 'https://www.instagram.com/hmtc_its' },
  { label: 'WhatsApp OA', url: 'http://wa.me/6285124014965' },
  { label: 'Line OA', url: 'https://liff.line.me/1645278921-kWRPP32q/?accountId=ycp2851v' },
  { label: 'Twitter', url: 'https://twitter.com/hmtc_its' },
  { label: 'Facebook', url: 'https://www.facebook.com/HMTCFTEIC' },
  { label: 'Youtube', url: 'https://www.youtube.com/c/bluepresshmtc' },
  { label: 'Issuu', url: 'https://issuu.com/medfohmtc' },
  { label: 'Website', url: 'https://hmtc-its.com' },
];

export default function InfoPage() {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-b from-cyan-500 to-blue-900 px-4 py-20'>
      {/* Logo */}
      <div className='mb-4'>
        <Image
          src='/images/logo-hmtc-info.jpg'
          alt='HMTC ITS Logo'
          width={90}
          height={90}
          className='rounded-full'
        />
      </div>

      {/* Judul */}
      <h1 className='mb-1 text-center text-2xl font-bold text-white'>
        HMTC ITS
      </h1>
      <p className='mb-6 text-center text-sm font-normal text-white'>
        Himpunan Mahasiswa Teknik Computer-Informatika ITS
      </p>

      {/* Link Buttons */}
      <div className='w-full max-w-md space-y-4'>
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className='block w-full rounded-full border border-white/50 py-4 text-center text-base font-normal text-white transition-all duration-200 hover:bg-white hover:text-blue-900'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
