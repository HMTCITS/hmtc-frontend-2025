import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layouts/Layout';
import Typography from '@/components/typography/Typography';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Layout withFooter={false} withNavbar={false}>
      <main className='h-screen md:flex'>
        <section className='relative w-0 overflow-clip bg-gradient-to-br from-blue-600 to-blue-400 md:w-1/2'>
          <Image
            src='/images/bungaa.png'
            width={1935}
            height={2009}
            alt='bunga'
            className='absolute right-0 top-0 w-[40rem] -translate-y-[45%] translate-x-[45%] opacity-20'
          />
          <Image
            src='/images/bungaa.png'
            width={1935}
            height={2009}
            alt='bunga'
            className='absolute bottom-0 left-0 w-[40rem] -translate-x-[45%] translate-y-[45%] opacity-20'
          />
          {/* <Image
            src='/images/ornament.png'
            width={810}
            height={1095}
            alt='bunga'
            className='absolute left-0 w-[20rem] -translate-x-[45%] translate-y-[45%]'
          /> */}
        </section>
        <section className='relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-y-auto overflow-x-clip px-8 md:w-1/2'>
          <Image
            src='/images/bungablue.png'
            width={543}
            height={581}
            alt='bunga'
            className='fixed left-0 top-0 w-[20rem] -translate-x-[45%] -translate-y-[45%] opacity-20 md:hidden'
          />
          <Image
            src='/images/bungablue.png'
            width={543}
            height={581}
            alt='bunga'
            className='fixed bottom-0 right-0 w-[20rem] translate-x-[45%] translate-y-[45%] opacity-20 md:hidden'
          />
          <div className='flex w-full -translate-y-full items-center justify-end lg:w-8/12'>
            <Typography
              variant='j2'
              className='font-secondary text-xl font-black md:text-2xl'
            >
              HMTC
            </Typography>
            <Image
              src='/images/logohmtc.png'
              alt='logo'
              width={563}
              height={592}
              className='w-8'
            />
          </div>
          <div className='w-full space-y-8 lg:w-8/12'>{children}</div>
        </section>
      </main>
    </Layout>
  );
}
