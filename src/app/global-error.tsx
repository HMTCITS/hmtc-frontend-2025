'use client';
import Link from 'next/link';

import Typography from '@/components/Typography';

export default function GlobalError() {
  return (
    <html>
      <body>
        <main className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-white py-10 text-center max-sm:px-5'>
          {/* Teks "ERROR" di atas 500 */}
          <Typography
            as='p'
            variant='i2'
            weight='medium'
            className='mb-2 tracking-wide text-gray-600'
          >
            ERROR
          </Typography>

          {/* Angka 500 berwarna biru */}
          <Typography
            as='h1'
            variant='k0'
            font='adelphe'
            className='bg-blue-gradient bg-clip-text text-[160px] leading-none font-bold text-transparent italic md:text-[200px] lg:text-[300px]'
          >
            500
          </Typography>

          {/* Teks keterangan di bawah 500 */}
          <Typography
            as='p'
            variant='b1'
            font='adelphe'
            className='mt-4 text-2xl text-gray-800 md:text-3xl lg:text-[40px]'
          >
            Internal Server Error. Please try again later.
          </Typography>

          {/* Tautan untuk kembali ke halaman utama */}
          <Link
            href='/'
            aria-label='Back to home'
            className='border-b-[1.5px] border-b-gray-800 font-satoshi text-xl font-medium transition-colors duration-150 hover:text-gray-400 md:text-xl lg:text-2xl'
          >
            &larr; Go back
          </Link>
        </main>
      </body>
    </html>
  );
}
