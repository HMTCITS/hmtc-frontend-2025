import Image from 'next/image';
import React from 'react';

const Quotes: React.FC = () => {
  return (
    <div className='relative isolate flex h-auto w-full flex-col items-center justify-center gap-[10px] p-[20px] lg:h-[546px] lg:w-[1512px] lg:flex-row lg:p-[100px]'>
      {/* Background Gradient */}
      <div className='absolute h-full w-full'></div>

      <div className='z-10 flex h-auto w-full flex-col items-center justify-between gap-[20px] lg:h-[346px] lg:w-[1312px] lg:flex-row lg:gap-[75px]'>
        {/* Kontainer Teks dan Info */}
        <div className='flex h-auto w-full flex-col items-start gap-[20px] lg:h-[208px] lg:w-[480px] lg:gap-[60px]'>
          {/* Paragraf Utama */}
          <div className='mb-[20px] flex h-[102px] w-full items-center justify-center lg:mb-0 lg:h-[102px] lg:w-[480px]'>
            <p className='font-satoshi text-base italic leading-[20px] text-white md:leading-[28px] lg:text-2xl lg:leading-[34px]'>
              &quot;HMTC pada awalnya bertujuan menjadi wadah aspirasi dan
              kreativitas mahasiswa TC baik dalam akademis maupun non
              akademis&quot;
            </p>
          </div>

          {/* Info Penulis */}
          <div className='mb-[50px] flex h-auto w-full flex-row items-center gap-[16px] lg:mb-0 lg:h-[56px] lg:w-[230px]'>
            <div className='relative h-[56px] w-[56px] overflow-hidden rounded-full bg-[#784747]'>
              <Image
                src='/images/Quotes/fotoQuotes.png'
                alt='Quote Image'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className='flex h-[52px] w-[158px] flex-col items-start gap-[2px]'>
              <p className='font-libre-caslon-condensed text-[14px] font-[700] italic leading-[18px] text-white md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[28px]'>
                - Tri Saksono Adi
              </p>
              <p className='font-helvetica-neue text-[12px] text-base font-[400] leading-[16px] text-[#FFFFFFAA] md:text-base md:leading-[20px] lg:text-[16px] lg:leading-[22px]'>
                Ketua HMTC Pertama
              </p>
            </div>
          </div>
        </div>

        {/* Gambar Besar dengan Teks di Atasnya */}
        <div className='relative flex h-[200px] w-full items-center justify-center md:h-[300px] lg:h-[346px] lg:w-[646px]'>
          <Image
            src='/images/Quotes/Quotes.png'
            alt='Quotes Background'
            layout='fill'
            objectFit='cover'
            className='rounded-none'
          />
          {/* Kontainer Teks di Atas Gambar */}
          <div className=' absolute left-0 top-[-50px] flex h-[200px] w-full flex-col justify-between p-[15px] md:h-[300px] lg:top-[-50px] lg:h-[346px] lg:w-[646px]'>
            <div className='flex h-[20px] w-full flex-row items-center justify-between lg:ml-[15px]'>
              <div className='  font-satoshi-regular ml-[-15px] whitespace-nowrap text-sm leading-[18px] text-white md:text-sm md:leading-[20px] lg:ml-[-30px]'>
                HMTC INCREMENTAL
              </div>
              <div className='flex flex-row items-center'>
                <div className='h-[1px] w-[80px] border lg:w-[130px] lg:border'></div>
                <p className='font-satoshi-regular ml-[5px] mr-[-15px] whitespace-nowrap text-sm leading-[18px] text-white md:text-sm md:leading-[20px] lg:ml-[10px] lg:mr-0'>
                  29 06 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
