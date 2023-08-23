import React from 'react';

import BaseLink from '@/components/links/BaseLink';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';

const Everblue = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 gap-y-6 py-10 md:py-24 lg:flex-row'>
      <div className='order-2 w-full space-y-6 text-black-main lg:order-1'>
        <Typography
          variant='k1'
          className='w-full font-primary text-[2rem] !leading-tight md:text-[2.75rem] xl:text-5xl'
        >
          Baca Everblue dong!
        </Typography>
        <Typography className='font-secondary'>
          Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit
          ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar
          placerat vestibulum faucibus. A dignissim in neque integer maecenas
          sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum
          ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar{' '}
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

      <BaseLink
        href='https://online.fliphtml5.com/ougyq/milj/'
        className='order-1 w-full transition duration-150 hover:!-translate-y-2.5 hover:shadow-2xl lg:order-2 lg:w-fit'
      >
        <div className='h-[450px] w-full max-w-[400px] space-y-2 border-r-8 border-blue-main bg-black-dark-3 p-14 font-primary text-white'>
          <Typography variant='k2' className='text-5xl'>
            Everblue
          </Typography>
          <Typography variant='j2'>vol.81</Typography>
        </div>
      </BaseLink>
    </section>
  );
};

export default Everblue;
