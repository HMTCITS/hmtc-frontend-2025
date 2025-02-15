import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useRef, useState } from 'react';

import KetuaCard from '../cards/KetuaCard';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const autoScrollOptions = {
    playOnInit: true,
    delay: 4000,
    duration: 1000,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll(autoScrollOptions),
  ]);
  const [_isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    const handleMouseOver = () => {
      autoScroll.stop();
      setIsPlaying(false);
    };

    const handleMouseLeave = () => {
      autoScroll.play();
      setIsPlaying(true);
    };

    const container = carouselRef.current;
    if (container) {
      container.addEventListener('mouseover', handleMouseOver);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseover', handleMouseOver);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [emblaApi]);

  return (
    <div className='relative isolate mb-[20px] flex w-full flex-col items-center gap-[10px] p-[20px] lg:mb-0'>
      <div
        id='historyofhmtc'
        className='flex flex-col items-center justify-center bg-white py-16'
      ></div>
      <div className='z-10 flex w-full flex-col items-start gap-[20px] '>
        <div className='flex w-full flex-col items-start gap-[16px] '>
          <h2 className='font-satoshi-medium text-base uppercase text-[#FFFFFF]'>
            History of HMTC
          </h2>
          <h1 className='w-full font-adelph-fructidor text-4xl font-bold leading-[40px] text-[#FFFFFF] lg:text-5xl lg:leading-[53px]'>
            Get to Know The Chairman of HMTC
          </h1>

          <p className='font-satoshi-regular text-sm leading-[20px] text-[#FFFFFF] lg:text-lg lg:leading-[25px]'>
            Ultricies lorem massa sagittis sit sed morbi in facilisis
            ullamcorper. Ut vel ornare placerat sapien magnis lectus eget
            volutpat aliquet. Proin sed viverra vitae magna justo ipsum.
            Porttitor risus morbi laoreet purus eget consectetur in semper nisl.
            Tincidunt blandit adipiscing nulla ipsum cursus tristique dui. Morbi
            sagittis elit vitae pulvinar. A ultrices id mi amet facilisis
            potenti. Velit tincidunt sit sed dolor mi commodo. Egestas sodales
            id at tempus non vivamus convallis posuere.
          </p>
        </div>
      </div>

      <div
        className='relative mt-10 h-[272.67px] w-full overflow-hidden lg:mt-20 '
        ref={carouselRef}
      >
        <div className='embla__viewport' ref={emblaRef}>
          <div className='flex'>
            {slides.map((id, index) => (
              <div
                className='embla__slide mx-3 h-[200px] w-[150px] flex-shrink-0 lg:h-[272.67px] lg:w-[194.5px]'
                key={index}
              >
                <KetuaCard imageIndex={id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
