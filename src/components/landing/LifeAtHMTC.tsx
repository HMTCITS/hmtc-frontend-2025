'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const LifeAtHMTC: React.FC = () => {
  const [options, setOptions] = useState({
    slidesToScroll: 3,
    dragFree: false,
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setOptions({
      slidesToScroll: isMobile ? 1 : 3,
      dragFree: isMobile,
    });
  }, []);

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    ...options,
  });

  const posts = [
    {
      image: '/images/lifeathmtc/life-1.png',
      link: 'https://www.instagram.com/p/C596sMVrDvM/?img_index=1',
    },
    {
      image: '/images/lifeathmtc/life-2.png',
      link: 'https://www.instagram.com/p/C6-V7L4R-ko/?img_index=1',
    },
    {
      image: '/images/lifeathmtc/life-3.png',
      link: 'https://www.instagram.com/p/C8ZRD8goAMg/?img_index=1',
    },
    {
      image: '/images/lifeathmtc/life-2.png',
      link: 'https://www.instagram.com/p/C6-V7L4R-ko/?img_index=1',
    },
    // Add more posts as needed
  ];

  return (
    <section className='flex flex-col items-center justify-center bg-white p-4 pt-28 font-sans'>
      <div className='w-full max-w-[90%] text-center lg:max-w-[65%]'>
        <h2 className='text-gradient font-satoshi text-lg font-medium'>
          LIFE AT HMTC
        </h2>
        <h1 className='font-adelphe mb-5 mt-5 text-3xl font-bold lg:text-5xl'>
          All The Things We Do
        </h1>
        <p className='font-satoshi text-base mb-14 text-gray-600'>
          Setiap kegiatan yang kami lakukan merupakan wujud nyata dari semangat
          kebersamaan dan dedikasi kami untuk menuju perubahan, mulai dari
          Banabung (Bagi Nasi Bungkus) yang membawa kepedulian sosial, Welcome
          Party HMTC 2024 yang mempererat solidaritas, hingga HMTC Incremental
          yang menjadi langkah strategis dalam membangun organisasi yang lebih
          progresif.
        </p>
      </div>
      <div className='w-full max-w-7xl md:px-12'>
        <div className='embla' ref={emblaRef}>
          <div className='embla__container'>
            {posts.map((post, index) => (
              <div className='embla__slide' key={index}>
                <a href={post.link} target='_blank' rel='noopener noreferrer'>
                  <Image
                    width={200}
                    height={200}
                    src={post.image}
                    alt={`Post ${index + 1}`}
                    className='h-full w-full object-cover'
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeAtHMTC;
