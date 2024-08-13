import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const HMTCBlog: React.FC = () => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const posts = [
    {
      image: '/images/bloghmtc/blog-1.png',
      title: 'Melukiskan Hikmah, Kembali Fitrah',
      excerpt: 'Bulan Ramadhan buat aku adalah waktu yang spesial. Bukan cuma soal puasa, tapi juga tentang gimana orang-orang di lin...',
      link: 'https://www.instagram.com/p/C5j83s6yKTE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/images/bloghmtc/blog-2.png',
      title: 'Kartini: Simbol Perjuangan Perempuan Indonesia',
      excerpt: 'Cras pellentesque ullamcorper tincidunt in diam lectus sem. Sit in quam aliquet enim consequat aliquam. Nulla eget.',
      link: 'https://www.instagram.com/p/C6AM32Rycy8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/images/bloghmtc/blog-3.png',
      title: 'Bisnis Bagi Anak Muda di Era Digital',
      excerpt: 'Sit at elit aliquet auctor quam ac. Vel diam suspendisse tempus eu vulputate scelerisque velit sapien quis. Viverra ac.',
      link: 'https://www.instagram.com/p/C7Dmkdtx9iD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/images/bloghmtc/blog-4.png',
      title: 'Idul Adha di Perantauan, Ngapain ya?',
      excerpt: 'Viverra eu vitae tempus id. Diam amet turpis nunc bibendum purus sapien non elementum. Eleifend gravida commodo.',
      link: 'https://www.instagram.com/p/C8TQi0rC4OU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      image: '/images/bloghmtc/blog-1.png',
      title: 'Melukiskan Hikmah, Kembali Fitrah',
      excerpt: 'Bulan Ramadhan buat aku adalah waktu yang spesial. Bukan cuma soal puasa, tapi juga tentang gimana orang-orang di lin...',
      link: 'https://www.instagram.com/p/C5j83s6yKTE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
  ];

  const scrollTo = useCallback((index: number) => {
    if (embla) embla.scrollTo(index);
  }, [embla]);

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
    <section className='md:pt-20 pt-24 pb-24 bg-white'>
      <div className='container mx-auto p-4 lg:p-0'>
        <h2 className='text-gradient font-medium font-satoshi text-lg'
        style={{
          background: 'linear-gradient(263.67deg, #00AAE7 -8.55%, #0076C0 97.16%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        >HMTC BLOG</h2>
        <h1 className='font-adelphe mt-3 mb-6 text-3xl lg:text-5xl font-bold lg:leading-[52.80px] w-full lg:w-[65%]'>Delving into Stories, Insights, and the Latest Trends from HMTC</h1>
        
        <div className='w-full max-w-7xl'>
          <div className='embla' ref={emblaRef}>
            <div className='embla__container'>
              {posts.map((post, index) => (
                <div className='embla__slide-blog' key={index}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <div className='relative w-full h-[314px]'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className='pt-4 px-1 lg:p-4'>
                      <h3 className='font-bold  text-xl mb-3'>{post.title}</h3>
                      <p className='text-gray-600 text-sm'>{post.excerpt}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === selectedIndex ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HMTCBlog;
