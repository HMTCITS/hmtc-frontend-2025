import Image from 'next/image';
import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';

interface TextComponentProps {
  text1: string;
  text2: string;
  href: string;
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <section className='relative flex h-fit w-full justify-center overflow-hidden bg-orange-main font-primary text-white'>
      <div className='flex w-full flex-col justify-between gap-y-6 px-6 py-10 md:w-4/5 md:flex-row md:px-0 md:py-20'>
        <div className='w-full space-y-8'>
          <Typography variant='k1' className='max-w-xl'>
            {text1}
          </Typography>
          <Typography className='font-secondary text-orange-100'>
            {text2}
          </Typography>
        </div>
        <div className='flex w-full items-center justify-start md:w-1/3 md:justify-end'>
          <ButtonLink
            href='#'
            className='text bg-white'
            variant='secondary'
            size='large'
          >
            Klik di sini!
          </ButtonLink>
        </div>
      </div>
      <div className='absolute left-0 top-0 -translate-x-[5%] -translate-y-[51%] opacity-10'>
        <Image src='/images/bungaa.png' width={680} height={200} alt='bunga' />
      </div>
    </section>
  );
};

export default VisiMisi;
