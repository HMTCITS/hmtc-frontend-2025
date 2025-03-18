'use client';
import React from 'react';

import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

const Quotes: React.FC = () => {
  return (
    <div className='relative isolate flex h-auto w-full flex-col items-center justify-center gap-[10px] p-[20px] md:px-20'>
      <div className='z-10 flex h-auto w-full flex-col items-center justify-center gap-[20px] lg:h-[346px] lg:flex-row lg:gap-[90px]'>
        {/* Kontainer Teks dan Info */}
        <div className='flex h-auto w-full flex-col items-start gap-[20px] lg:h-[208px] lg:w-[480px] lg:gap-[60px]'>
          {/* Paragraf Utama */}
          <div className='mb-[20px] flex h-[102px] w-full items-center justify-center lg:mb-0 lg:h-[102px] lg:w-[480px]'>
            <Typography
              as='p'
              variant='b2'
              font='satoshi'
              weight='medium'
              className='leading-[20px] text-white italic md:leading-[28px] lg:text-2xl lg:leading-[34px]'
            >
              &quot;HMTC pada awalnya bertujuan menjadi wadah aspirasi dan
              kreativitas mahasiswa TC baik dalam akademis maupun non
              akademis&quot;
            </Typography>
          </div>

          {/* Info Penulis */}
          <div className='mb-[50px] flex h-auto w-full flex-row items-center gap-[16px] lg:mb-0 lg:h-[56px] lg:w-[230px]'>
            <div className='relative h-[56px] w-[56px] overflow-hidden rounded-full bg-[#784747]'>
              <NextImage
                src='Quotes/fotoQuotes.png'
                alt='Quote Image'
                className='h-full object-cover'
                width={56}
                height={56}
              />
            </div>
            <div className='flex h-[52px] w-[158px] flex-col items-start gap-[2px]'>
              <Typography
                as='p'
                variant='b2'
                font='adelphe'
                weight='bold'
                className='text-[14px] leading-[18px] text-white italic md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[28px]'
              >
                - Tri Saksono Adi
              </Typography>
              <Typography
                as='p'
                variant='b2'
                font='poppins'
                weight='regular'
                className='text-base text-[12px] leading-[16px] font-[100] text-[#FFFFFFAA] md:text-base md:leading-[20px] lg:text-[16px] lg:leading-[22px]'
              >
                Ketua HMTC Pertama
              </Typography>
            </div>
          </div>
        </div>

        {/* Gambar Besar dengan Teks di Atasnya */}
        <div className='relative flex h-[200px] w-full flex-col items-center justify-center md:h-[300px] lg:h-[346px] lg:w-[646px]'>
          {/* Baris Atas: "HMTC INCREMENTAL" dan Tanggal */}
          <div className='mt-[-25px] flex w-full flex-row items-center justify-between px-0 md:mt-[-5%]'>
            {/* Judul */}
            <Typography
              as='p'
              variant='b2'
              font='satoshi'
              weight='regular'
              className='text-xs text-white lg:text-sm'
            >
              HMTC INCREMENTAL
            </Typography>

            {/* Garis + Tanggal */}
            <div className='flex flex-row items-center'>
              <div className='h-[1px] w-[80px] border border-white md:w-[120px]'></div>
              <Typography
                as='p'
                variant='b2'
                font='satoshi'
                weight='regular'
                className='ml-2 text-sm text-white lg:text-sm'
              >
                29 06 2024
              </Typography>
            </div>
          </div>
          <NextImage
            src='/Quotes/Quotes.png'
            alt='Quotes Background'
            className='h-full w-full rounded-none'
            imgClassName='object-cover'
            width={646}
            height={311}
          />

          {/* Teks di Atas Gambar */}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
