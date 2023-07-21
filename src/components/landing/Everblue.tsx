import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';

const Everblue = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 py-24 lg:flex-row'>
      <div className='w-full space-y-6 text-black-main'>
        <h2 className='font-primary text-6xl font-extrabold'>
          Baca Everblue dong!
        </h2>
        <p className='font-secondary'>
          Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit
          ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar
          placerat vestibulum faucibus. A dignissim in neque integer maecenas
          sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum
          ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar{' '}
        </p>
        <div className='py-6'>
          <ButtonLink href='#' size='large' variant='primary'>
            Baca di sini
          </ButtonLink>
        </div>
      </div>

      <div className='w-full md:w-fit'>
        <div className='h-[495px] w-full space-y-2 border-r-8 border-blue-main bg-black-dark-3 p-14 font-primary font-bold text-white md:w-[400px]'>
          <h3 className='text-5xl md:text-6xl'>Everblue</h3>
          <p className='text-3xl'>vol.81</p>
        </div>
      </div>
    </section>
  );
};

export default Everblue;
