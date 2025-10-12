import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect } from 'react';

export default function TitleAnimation() {
  useEffect(() => {
    // Set initial states
    const tl = gsap.timeline();

    // Slide in logo first
    tl.fromTo(
      '#logo',
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      },
    )

      // Slide in magang
      .fromTo(
        '#magang',
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          delay: -0.5,
        },
      )

      // slide in hmtc
      .fromTo(
        '#hmtc',
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          delay: -0.7,
        },
      );
  }, []);

  return (
    <div>
      <Image
        id='logo'
        src='/images/logo-hmtc2025-navbar.png'
        alt='Logo HMTC Suar Peradaban'
        width={100}
        height={100}
      />
      <div className='flex flex-col gap-y-2'>
        <h1 id='magang' className='font-satoshi text-5xl font-bold text-white'>
          Magang
        </h1>
        <h1 id='hmtc' className='font-satoshi text-5xl font-bold text-white'>
          HMTC 2025
        </h1>
      </div>
    </div>
  );
}
