import React from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

interface TextComponentProps {
  text1: string;
  text2: string;
  href: string;
}

const VisiMisi: React.FC<TextComponentProps> = ({ text1, text2 }) => {
  return (
    <section className='font-primary relative flex h-fit w-full justify-center overflow-hidden bg-orange-main text-white'>
      <div className='flex w-full flex-col justify-between gap-y-6 px-6 py-10 md:w-4/5 md:flex-row md:px-0 md:py-20'>
        <div className='w-full space-y-8'>
          <Typography as='h1' variant='k1' className='max-w-xl'>
            {text1}
          </Typography>
          <Typography
            as='p'
            variant='b2'
            className='font-secondary text-orange-100'
          >
            {text2}
          </Typography>
        </div>
        {/*
        <div className="flex w-full items-center justify-start md:w-1/3 md:justify-end">
          <ButtonLink
            href="#"
            className="text bg-white"
            variant="secondary"
            size="large"
          >
            Klik di sini!
          </ButtonLink>
        </div>
        */}
      </div>
      <div className='absolute top-0 left-0 -translate-x-[5%] -translate-y-[51%] opacity-10'>
        <NextImage src='/bungaa.png' width={680} height={200} alt='bunga' />
      </div>
    </section>
  );
};

export default VisiMisi;
