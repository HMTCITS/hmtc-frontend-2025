import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import Button from '@/components/buttons/Button';
import AnggotaCard from '@/components/cards/AnggotaCard';
import { Anggota } from '@/constants/anggota';
import clsxm from '@/lib/clsxm';

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <div className='absolute -right-1 top-1/2 z-10 flex h-full -translate-y-1/2 items-center bg-white pl-4 text-xl sm:right-0'>
      <Button onClick={onClick} icon={FiChevronRight} variant='netral' />
    </div>
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <div className='absolute -left-1 top-1/2 z-10 flex h-full -translate-y-1/2 items-center bg-white pr-4 text-xl sm:left-0'>
      <Button onClick={onClick} icon={FiChevronLeft} variant='netral' />
    </div>
  );
}

const settings: Settings = {
  autoplay: true,
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '50px',
  slidesPerRow: 2,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        slidesPerRow: 2,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
      },
    },
  ],
};

type BannerProps = React.ComponentPropsWithoutRef<'div'>;

export default function AnggotaCarousel({ className, ...rest }: BannerProps) {
  return (
    <div
      className={clsxm(
        'bg-primary-100 z-30 flex items-center',
        'h-full w-full',
        className
      )}
      {...rest}
    >
      <div className='h-full max-w-full'>
        <Slider {...settings}>
          {Anggota.map(({ ...props }, index) => {
            return (
              <div key={index} className='h-fit'>
                <AnggotaCard {...props} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
