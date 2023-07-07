import Image from 'next/image';
import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';

interface TextComponentProps {
  text1: string;
  text2: string;
  href: string;
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <section className='relative flex h-fit w-full justify-center overflow-hidden bg-orange-main font-primary text-white'>
      <main className='flex w-4/5 justify-between py-20'>
        <div className='w-full space-y-8'>
          <h1 className='text-6xl font-extrabold'>{text1}</h1>
          <p className='text-lg font-medium'>{text2}</p>
        </div>
        <div className='flex w-1/3 items-center justify-center'>
          <ButtonLink
            href='#'
            className='text bg-white'
            variant='secondary'
            size='large'
          >
            Klik di sini!
          </ButtonLink>
        </div>
      </main>
      <div className='absolute left-0 top-0 -translate-x-[5%] -translate-y-[51%] opacity-10'>
        <Image src='/images/bungaa.png' width={680} height={200} alt='bunga' />
      </div>
    </section>
  );
};

export default VisiMisi;
