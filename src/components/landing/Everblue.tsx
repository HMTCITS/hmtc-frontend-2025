import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';

const Everblue = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 gap-y-6 py-10 md:py-24 lg:flex-row'>
      <div className='order-2 w-full space-y-6 text-black-main lg:order-1'>
        <Typography variant='k1' className='font-primary'>
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
          <ButtonLink href='#' size='large' variant='primary'>
            Baca di sini
          </ButtonLink>
        </div>
      </div>

      <div className='order-1 w-full lg:order-2 lg:w-fit'>
        <div className='h-[450px] w-full max-w-[400px] space-y-2 border-r-8 border-blue-main bg-black-dark-3 p-14 font-primary text-white'>
          <Typography variant='k2' className='text-5xl'>
            Everblue
          </Typography>
          <Typography variant='j2'>vol.81</Typography>
        </div>
      </div>
    </section>
  );
};

export default Everblue;
