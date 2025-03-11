import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

export default function Everblue() {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 gap-y-6 py-10 md:py-24 lg:flex-col'>
      <div className='order-2 w-full space-y-6 text-black-main lg:order-1'>
        <Typography
          as='h1'
          variant='k1'
          className='w-full font-primary text-[2rem] !leading-tight md:text-[2.75rem] xl:text-5xl'
        >
          Baca Everblue dong!
        </Typography>
        <Typography as='p' className='font-secondary md:text-macro'>
          <Typography as='span' weight='semibold' className='text-blue-main'>
            Everblue
          </Typography>{' '}
          merupakan majalah yang menghadirkan informasi Topik teknologi,
          Pengalaman Civitas Akademik. Kabar terbaru seputar TC, atau apapun
          yang berkaitan dengan Teknik Informatika ITS.
        </Typography>
        <Typography as='p' className='font-secondary md:text-macro'>
          Melalui media majalah ini,{' '}
          <Typography as='span' weight='semibold' className='text-blue-main'>
            Everblue
          </Typography>{' '}
          diharapkan dapat menjadi sumber informasi bagi mahasiswa departemen
          Teknik Informatika terkait perkembangan dan inovasi dalam dunia IT
          serta saluran yang efektif dan efisien dalam penyebaran informasi dan
          dokumentasi HMTC kepada seluruh anggota dan masyarakat luas.
        </Typography>
        <div className='py-6'>
          <ButtonLink
            href='https://online.fliphtml5.com/ougyq/milj/'
            target='_blank'
            size='large'
            variant='primary'
          >
            Baca di sini
          </ButtonLink>
        </div>
      </div>
      <iframe
        src='https://online.fliphtml5.com/ougyq/milj'
        width='100%'
        height='750px'
        loading='lazy'
        seamless
        allowFullScreen
      ></iframe>
    </section>
  );
}
