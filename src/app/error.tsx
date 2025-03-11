'use client';
import Link from 'next/link';

import Typography from '@/components/Typography';

export default function Error() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center text-center gap-5 max-sm:px-5 py-10 bg-white'>
      {/* Teks "ERROR" di atas 500 */}
      <Typography
        as='p'
        variant='i2'
        font='satoshi'
        weight='medium'
        className='mb-2 tracking-wide text-gray-600'
      >
        ERROR
      </Typography>

      {/* Angka 500 berwarna biru */}
      <Typography
        as='h1'
        variant='k0'
        font='libre'
        className='font-bold bg-blue-gradient bg-clip-text text-transparent italic text-[160px] md:text-[200px] lg:text-[300px] leading-none'
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
        className='transition-colors duration-150 hover:text-gray-400 text-xl md:text-xl lg:text-2xl font-satoshi font-medium border-b-gray-800 border-b-[1.5px]'
      >
        &larr; Go back
      </Link>
    </main>
  );
}
