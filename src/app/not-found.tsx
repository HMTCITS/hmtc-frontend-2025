import Link from 'next/link';

import Typography from '@/components/Typography';

export default function NotFound() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-[#201F1F] py-10 text-center text-white max-sm:px-5'>
      {/* Teks "ERROR" di atas 404 */}
      <Typography
        as='p'
        variant='i2'
        weight='medium'
        className='mb-2 tracking-wide text-gray-300'
      >
        ERROR
      </Typography>

      {/* Angka 404 berwarna biru */}
      <Typography
        as='h1'
        variant='k0'
        font='adelphe'
        className='bg-blue-gradient bg-clip-text text-[160px] leading-none font-bold text-transparent italic md:text-[200px] md:leading-none lg:text-[300px]'
      >
        404
      </Typography>

      {/* Teks keterangan di bawah 404 */}
      <Typography
        as='p'
        variant='b1'
        font='adelphe'
        className='mt-4 text-2xl md:text-3xl lg:text-[40px]'
      >
        The page you&apos;re looking for does not exist.
      </Typography>

      {/* Tautan untuk kembali ke halaman sebelumnya atau utama */}
      <Link
        href='/'
        aria-label='Back to home'
        className='border-b-[1.5px] border-b-white font-satoshi text-xl font-medium transition-colors duration-150 hover:text-gray-400 md:text-xl lg:text-2xl'
      >
        &larr; Go back
      </Link>
    </main>
  );
}
