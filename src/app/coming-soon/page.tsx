import Link from 'next/link';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export default function ComingSoon() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center bg-[#201F1F] py-10 text-center text-white max-sm:px-10'>
      <NextImage
        src='/coming-soon/Logo.svg'
        alt='background coming soon'
        width={280}
        height={355}
        className='absolute'
      />
      <div className='flex flex-col items-center'>
        <Typography
          as='h1'
          variant='k0'
          font='libre'
          className='bg-blue-gradient bg-clip-text text-6xl leading-normal font-bold text-transparent italic sm:text-[80px] md:text-[100px] md:leading-normal lg:text-[150px]'
        >
          Coming Soon
        </Typography>

        <Typography
          as='p'
          variant='b1'
          font='adelphe'
          className='text-xl max-lg:mt-2 md:text-2xl lg:text-4xl'
        >
          This page is still under development. Stay tune!
        </Typography>

        <Link
          href='/'
          className='font-satoshi mt-3 border-b-[1.5px] border-b-white text-sm font-medium transition-colors duration-150 hover:text-gray-400 md:text-base lg:mt-4 lg:text-xl'
        >
          &larr; Go back
        </Link>
      </div>
    </main>
  );
}
