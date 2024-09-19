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
    <section className='flex min-h-screen flex-col items-center justify-center bg-white p-4 font-sans'>
      <div className='w-full pt-24 text-center lg:max-w-[65%] lg:pt-14'>
        <h2 className='text-gradient font-sans text-lg font-medium'>
          LIFE AT HMTC
        </h2>
        <h1 className='adelphe-fructidor mb-5 mt-5 text-3xl font-bold lg:text-5xl'>
          All The Things We Do
        </h1>
        <p className='mb-14 text-base text-gray-600'>
          Sed eu volutpat eget elementum. Enim aliquam pellentesque sit pretium
          ut. Tristique non tincidunt ullamcorper libero massa aliquam. In
          suspendisse sed bibendum lectus blandit. Aenean elementum bibendum
          convallis suspendisse vel massa ullamcorper. Diam et molestie massa
          facilisi turpis id nunc.
        </p>
      </div>
      <div className='w-full max-w-7xl'>
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
