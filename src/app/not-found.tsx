import Link from 'next/link';

import Typography from '@/components/Typography';

export default function NotFound() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center text-white text-center gap-5 max-sm:px-5 py-10 bg-[#201F1F]'>
      {/* Teks "ERROR" di atas 404 */}
      <Typography
        as='p'
        variant='i2'
        font='satoshi'
        weight='medium'
        className='mb-2 tracking-wide text-gray-300'
      >
        ERROR
      </Typography>

      {/* Angka 404 berwarna biru */}
      <Typography
        as='h1'
        variant='k0'
        font='libre'
        className='font-bold bg-blue-gradient bg-clip-text text-transparent italic text-[160px] md:text-[200px] lg:text-[300px] leading-none md:leading-none'
      >
        404
      </Typography>

      {/* Teks keterangan di bawah 404 */}
      <Typography
        as='p'
        variant='b1'
        font='adelphe'
        className='mt-4 text-2xl  md:text-3xl lg:text-[40px]'
      >
        The page you&apos;re looking for does not exist.
      </Typography>

      {/* Tautan untuk kembali ke halaman sebelumnya atau utama */}
      <Link
        href='/'
        className='transition-colors duration-150 hover:text-gray-400 text-xl md:text-xl lg:text-2xl font-satoshi font-medium border-b-white border-b-[1.5px]'
      >
        &larr; Go back
      </Link>
    </main>
  );
}
