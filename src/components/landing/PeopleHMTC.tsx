import Image from 'next/image';
import React, { useState } from 'react';

const PeopleHMTC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/images/BPI01.png',
    '/images/peoplehmtc/people-1.jpg',
    '/images/peoplehmtc/people-2.jpg',
    '/images/peoplehmtc/people-3.jpg',
    '/images/peoplehmtc/people-4.jpg',
    '/images/peoplehmtc/people-5.jpg',
    '/images/peoplehmtc/people-6.jpg',
    '/images/peoplehmtc/people-7.jpg',
    '/images/peoplehmtc/people-8.jpg',
  ];

  const totalSlides = images.length;

  const scrollPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const scrollNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-white font-sans'>
      <div className='flex w-full max-w-7xl flex-col items-center pt-20 lg:flex-row'>
        <div className='w-full px-4 lg:w-[65%] lg:px-0'>
          <h1 className='text-gradient font-sans text-lg font-medium'>
            HMTC 2024 KUNCI TRANSFORMASI
          </h1>
          <h2 className='adelphe-fructidor mt-3 text-3xl font-bold leading-tight lg:text-5xl lg:leading-[52.80px]'>
            The People Behind HMTC
          </h2>
          <p className='mt-6 text-gray-600'>
            Sed eu volutpat eget elementum. Enim aliquam pellentesque sit
            pretium ut. Tristique non tincidunt ullamcorper libero massa
            aliquam. In suspendisse sed bibendum lectus blandit. Aenean
            elementum bibendum convallis.
          </p>
          <div className='mt-10 w-full space-y-4'>
            <div className='flex items-center'>
              <div className=''>
                <Image
                  width={200}
                  height={200}
                  src='/icons/Frame.svg'
                  alt='Departments Icon'
                  className='h-6 w-6'
                />
              </div>
              <div className='ml-4 h-auto w-full md:w-[438px]'>
                <p className='font-bold text-gray-800'>9 Departments</p>
                <p className='text-gray-600'>
                  Quam a hac gravida adipiscing donec urna condimentum. Vitae
                  tincidunt facilisis eu proin mauris pretium sed.
                </p>
              </div>
            </div>
            <div className='flex w-full items-center border-t border-gray-300 pt-4 lg:w-[438px]'>
              <div className=''>
                <Image
                  width={200}
                  height={200}
                  src='/icons/Frame (1).svg'
                  alt='People Icon'
                  className='h-6 w-6'
                />
              </div>
              <div className='ml-4 h-auto w-full md:w-[438px]'>
                <p className='font-bold text-gray-800'>100+ People</p>
                <p className='text-gray-600'>
                  Lectus dolor proin vitae pharetra sagittis nulla. Urna
                  pellentesque dictum morbi elementum sem volutpat.
                </p>
              </div>
            </div>
            <div className='flex w-full items-center border-t border-gray-300 pt-4 lg:w-[438px]'>
              <div className=''>
                <Image
                  width={200}
                  height={200}
                  src='/icons/Frame (2).svg'
                  alt='Proker Icon'
                  className='h-6 w-6'
                />
              </div>
              <div className='ml-4 w-full md:w-[438px]'>
                <p className='font-bold text-gray-800'>20+ Proker</p>
                <p className='text-gray-600'>
                  Porta volutpat dignissim ut ipsum scelerisque. Luctus lobortis
                  aliquam elementum velit quis aliquam sem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative mt-8 w-full px-4 lg:mt-0 lg:w-[35%] lg:px-0'>
          <div className='carousel'>
            {images.map((src, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === currentIndex ? 'active' : ''
                }`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <Image
                  width={200}
                  height={200}
                  src={src}
                  alt={`Profile image ${index + 1}`}
                  className='h-full w-full object-cover'
                />
              </div>
            ))}
          </div>
          <div className='absolute -bottom-8 left-4 text-black lg:left-0'>
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(totalSlides).padStart(2, '0')}
          </div>
          <div className='absolute -bottom-10 right-4 flex space-x-2 lg:right-0 lg:space-x-1'>
            <button
              onClick={scrollPrev}
              className='px-1 py-2 text-xl text-gray-500 hover:text-black'
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className='px-1 py-2 text-xl text-black hover:text-gray-500'
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleHMTC;
