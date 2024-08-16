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

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll(autoScrollOptions)]);
  const [isPlaying, setIsPlaying] = useState(true);
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
    <div className="relative w-full lg:w-[1512px] flex flex-col items-center p-[20px] lg:p-[40px] gap-[10px] isolate mb-[20px] lg:mb-0">
      <div className="flex flex-col items-start gap-[20px] lg:gap-[80px] w-full lg:w-[1312px] z-10">
        <div className="flex flex-col items-start gap-[16px] lg:gap-[32px] w-full lg:w-[1062px]">
          <h2 className="text-[#FFFFFF] text-base uppercase font-satoshi-medium">
            History of HMTC
          </h2>
          <h1 className="text-[#FFFFFF] text-4xl lg:text-5xl leading-[40px] lg:leading-[53px] font-adelph-fructidor font-bold w-full lg:w-[617px]">
            Get to Know The Chairman of HMTC
          </h1>
          
          <p className="text-[#FFFFFF] text-sm lg:text-lg leading-[20px] lg:leading-[25px] font-satoshi-regular">
            Ultricies lorem massa sagittis sit sed morbi in facilisis ullamcorper. Ut vel ornare placerat sapien magnis lectus eget volutpat aliquet. Proin sed viverra vitae magna justo ipsum. Porttitor risus morbi laoreet purus eget consectetur in semper nisl. Tincidunt blandit adipiscing nulla ipsum cursus tristique dui. Morbi sagittis elit vitae pulvinar. A ultrices id mi amet facilisis potenti. Velit tincidunt sit sed dolor mi commodo. Egestas sodales id at tempus non vivamus convallis posuere.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden w-full lg:w-[1312px] h-[272.67px] mt-10 lg:mt-20" ref={carouselRef}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="flex">
            {slides.map((index) => (
              <div className="embla__slide flex-shrink-0 w-[150px] lg:w-[194.5px] h-[200px] lg:h-[272.67px] mx-3" key={index}>
                <KetuaCard imageIndex={index} /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
