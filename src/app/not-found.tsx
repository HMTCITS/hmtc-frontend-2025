import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { MdWbTwilight } from 'react-icons/md';

import Typography from '@/components/typography/Typography';

export default function NotFound() {
  return (
    <main>
      <section className='relative h-screen overflow-clip'>
        <Image
          src='/images/bungablack.png'
          width={1935}
          height={2009}
          alt='bunga'
          className='absolute right-0 top-0 w-[40rem] -translate-y-[45%] translate-x-[45%] opacity-20'
          style={{ objectFit: 'cover' }}
        />
        <Image
          src='/images/bungablack.png'
          width={1935}
          height={2009}
          alt='bunga'
          className='absolute bottom-0 left-0 w-[40rem] -translate-x-[45%] translate-y-[45%] opacity-20'
          style={{ objectFit: 'cover' }}
        />
        <div className='flex h-full w-full -translate-y-6 flex-col items-center justify-center gap-y-4'>
          <MdWbTwilight
            size={70}
            className='drop-shadow-glow animate-pulse text-blue-500'
          />
          <Typography
            variant='k0'
            className='font-primary text-5xl text-gray-700 md:text-8xl'
          >
            404
          </Typography>
          <div className='mt-4 flex items-center'>
            <Link
              href='/'
              className='font-primary text-lg underline decoration-white underline-offset-2 transition-colors duration-150 hover:decoration-gray-600'
            >
              Kembali ke halaman utama
            </Link>
            <FiChevronRight size={22} />
          </div>
        </div>
      </section>
    </main>
  );
}
