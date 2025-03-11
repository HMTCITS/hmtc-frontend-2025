import Link from 'next/link';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export default function ComingSoon() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center text-center max-sm:px-10 py-10 bg-[#201F1F] text-white'>
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
          className='font-bold bg-blue-gradient bg-clip-text text-transparent italic text-6xl sm:text-[80px] md:text-[100px] lg:text-[150px] leading-normal md:leading-normal'
        >
          Coming Soon
        </Typography>

        <Typography
          as='p'
          variant='b1'
          font='adelphe'
          className='text-xl  md:text-2xl max-lg:mt-2 lg:text-4xl'
        >
          This page is still under development. Stay tune!
        </Typography>

        <Link
          href='/'
          className='transition-colors duration-150 hover:text-gray-400 text-sm md:text-base lg:text-xl font-satoshi font-medium border-b-white border-b-[1.5px] mt-3 lg:mt-4'
        >
          &larr; Go back
        </Link>
      </div>
    </main>
  );
}
