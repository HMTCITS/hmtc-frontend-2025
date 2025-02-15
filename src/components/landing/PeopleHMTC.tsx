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
    <section className='flex flex-col items-center justify-center bg-white font-sans md:px-[8%] md:py-24'>
      <div
        id='peoplebehindhmtc'
        className='flex flex-col items-center justify-center bg-white py-6'
      ></div>
      <div className='flex w-full max-w-[95%] flex-col items-center pt-4 lg:flex-row'>
        <div className='w-full px-6 lg:w-[65%] lg:px-0'>
          <h1 className='text-gradient font-sans text-lg font-medium'>
            HMTC 2024 KUNCI TRANSFORMASI
          </h1>
          <h2 className='adelphe-fructidor mt-3 text-3xl font-bold leading-tight lg:text-5xl lg:leading-[52.80px]'>
            The People Behind HMTC
          </h2>
          <p className='mt-6 max-w-[90%] text-gray-600'>
            Di balik setiap langkah besar, ada individu-individu hebat yang
            bekerja dengan penuh dedikasi. Setiap anggota memiliki peran penting
            dalam mewujudkan visi transformasi HMTC dari merancang inovasi,
            membangun kolaborasi, hingga menciptakan lingkungan yang lebih
            dinamis dan berdampak.
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
                  9 departemen HMTC yang saling berkolaborasi dalam menjalankan
                  berbagai terobosan program HMTC Kunci Transformasi.
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
                  Ratusan pengurus HMTC dengan semangat dan dedikasi tinggi
                  untuk terus membawa HMTC ke level yang lebih baik.
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
                  Dengan lebih dari 20 program kerja unggulan, HMTC 2024
                  berfokus untuk memberikan kontribusi nyata bagi mahasiswa dan
                  KM ITS
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
