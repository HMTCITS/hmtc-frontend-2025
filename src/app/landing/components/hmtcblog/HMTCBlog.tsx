'use client';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

const HMTCBlog: React.FC = () => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const posts = [
    {
      image: '/bloghmtc/blog-1.png',
      title: 'Melukiskan Hikmah, Kembali Fitrah',
      excerpt:
        'Bulan Ramadhan buat aku adalah waktu yang spesial. Bukan cuma soal puasa, tapi juga tentang gimana orang-orang di lin..',
      link: 'https://www.instagram.com/p/C5j83s6yKTE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/bloghmtc/blog-2.png',
      title: 'Kartini: Simbol Perjuangan Perempuan Indonesia',
      excerpt:
        'Kartini bukan sekadar nama, dia adalah simbol perjuangan bagi semua perempuan di Indonesia. Melalui..',
      link: 'https://www.instagram.com/p/C6AM32Rycy8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/bloghmtc/blog-3.png',
      title: 'Bisnis Bagi Anak Muda di Era Digital',
      excerpt:
        'Menggali Peluang Bisnis di Era Digital! Anak muda punya potensi besar untuk menciptakan inovasi di dunia digital..',
      link: 'https://www.instagram.com/p/C7Dmkdtx9iD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/bloghmtc/blog-4.png',
      title: 'Idul Adha di Perantauan, Ngapain ya?',
      excerpt:
        'Idul Adha di Perantaun, Ngapain ya? Hari Raya Idul Adha selalu jadi momen yang ditunggu-tunggu umat Muslim di seluruh..',
      link: 'https://www.instagram.com/p/C8TQi0rC4OU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/bloghmtc/blog-1.png',
      title: 'Melukiskan Hikmah, Kembali Fitrah',
      excerpt:
        'Bulan Ramadhan buat aku adalah waktu yang spesial. Bukan cuma soal puasa, tapi juga tentang gimana orang-orang di lin...',
      link: 'https://www.instagram.com/p/C5j83s6yKTE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
  ];

  const scrollTo = useCallback(
    (index: number) => {
      if (embla) embla.scrollTo(index);
    },
    [embla],
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    onSelect();
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <section className='bg-white px-4 pt-10 pb-24 md:px-[10%] md:pt-24'>
      <div className='container mx-auto p-6 lg:p-0'>
        <Typography
          as='h2'
          variant='h2'
          weight='medium'
          className='text-gradient text-lg'
          style={{
            background:
              'linear-gradient(263.67deg, #00AAE7 -8.55%, #0076C0 97.16%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          HMTC BLOG
        </Typography>
        <Typography
          as='h1'
          variant='j1'
          font='adelphe'
          weight='bold'
          className='mt-3 mb-6 w-full text-3xl md:w-[80%] md:text-5xl md:leading-[52.80px]'
        >
          Delving into Stories, Insights, and the Latest Trends from HMTC
        </Typography>

        <div className='flex w-full flex-col items-center justify-center'>
          <div className='w-full max-w-7xl'>
            <div className='embla' ref={emblaRef}>
              <div className='embla__container'>
                {posts.map((post, index) => (
                  <div className='embla__slide-blog' key={index}>
                    <a
                      aria-label='Open blog post'
                      href={post.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <NextImage
                        src={post.image}
                        alt={post.title}
                        className='relative h-[314px] w-full'
                        imgClassName='object-cover'
                        width={240}
                        height={315}
                      />
                      <div className='px-1 pt-4 lg:pt-4'>
                        <Typography
                          as='h3'
                          variant='h3'
                          font='adelphe'
                          weight='bold'
                          className='mb-3 text-xl'
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          as='p'
                          variant='b4'
                          weight='regular'
                          className='text-sm text-gray-600'
                        >
                          {post.excerpt}
                        </Typography>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-8 flex justify-center'>
            {scrollSnaps.map((_, index) => (
              <button
                aria-label='Scroll to slide'
                key={index}
                className={`mx-1 h-2 w-2 rounded-full ${
                  index === selectedIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HMTCBlog;
