import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import required modules
import {
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import AnggotaCard from '@/components/cards/AnggotaCard';
import { Anggota } from '@/constants/anggota';
import { cn } from '@/lib/utils';

export default function Kepengurusan() {
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={false}
      slidesPerGroupSkip={1}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        800: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Autoplay, Keyboard, Scrollbar, Navigation, Pagination]}
    >
      <button className='swiper-button-next ring-base-dark !h-12 !w-12 rounded-full bg-white p-2.5 ring-2 hover:bg-gray-100'>
        <FiChevronRight className='text-base-dark !text-xs' />
      </button>
      <button className='swiper-button-prev ring-base-dark !h-12 !w-12 rounded-full bg-white p-2.5 ring-2 hover:bg-gray-100'>
        <FiChevronLeft className='text-base-dark !text-xs' />
      </button>
      {Anggota.map(({ ...props }, index) => (
        <SwiperSlide
          key={index}
          className={cn(
            index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20',
            index === Anggota.length - 1 && 'lg:pr-20 lg:pl-0',
            index === Anggota.length - 2 && 'lg:pr-0 lg:pl-20',
          )}
        >
          <AnggotaCard {...props} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
