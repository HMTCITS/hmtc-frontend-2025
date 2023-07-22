import Image from 'next/image';
import React from 'react';

import Typography from '@/components/typography/Typography';

const Profile = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-x-14 gap-y-6 py-10 md:py-24 lg:flex-row'>
      <div className='flex w-full items-center lg:w-1/2'>
        <Image
          src='/images/example-vid.png'
          alt=''
          width={610}
          height={369}
          priority
        />
      </div>
      <div className='w-full space-y-6 text-black-main lg:w-1/2'>
        <Typography variant='k1' className='w-full font-primary lg:w-3/4'>
          Lihat vron nyanyi di sini!
        </Typography>
        <Typography className='font-secondary'>
          Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit
          ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar
          placerat vestibulum faucibus. A dignissim in neque integer maecenas
          sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum
          ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar{' '}
        </Typography>
      </div>
    </section>
  );
};

export default Profile;
