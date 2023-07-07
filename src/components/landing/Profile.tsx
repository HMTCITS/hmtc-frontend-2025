import Image from 'next/image';
import React from 'react';

const Profile = () => {
  return (
    <main className='flex w-full items-center justify-center gap-x-6 py-10'>
      <div className='w-1/2 border-2 border-solid'>
        <Image src='/images/bungaa.png' alt='' width={400} height={400} />
      </div>
      <div className='w-1/2 space-y-4 '>
        <h2 className='font-primary text-6xl font-extrabold'>
          Lihat vron nyanyi di sini!
        </h2>
        <p className='font-secondary text-lg'>
          Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit
          ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar
          placerat vestibulum faucibus. A dignissim in neque integer maecenas
          sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum
          ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar{' '}
        </p>
      </div>
    </main>
  );
};

export default Profile;
