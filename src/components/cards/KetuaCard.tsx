import Image from 'next/image';
import React from 'react';

type EmblaCardProps = {
  imageIndex: number;
};

const EmblaCard: React.FC<EmblaCardProps> = ({ imageIndex }) => {
  const names = [
    'Ahmad Guntar',
    'Galih Hari Wibowo',
    'Fahrudi Yusuf',
    'Aris Sofyan Lutfianto',
    'Deden Ade Nurdeni',
    'Agung Rizkianto',
    'Yoga Amersya Fitra',
  ];
  const years = [
    '1999 - 2000',
    '2004 - 2005',
    '2005 - 2006',
    '2006 - 2007',
    '2007 - 2008',
    '2008 - 2009',
    '2009 - 2010',
  ];

  return (
    <div className='flex h-[272.67px] w-[194.5px] flex-col items-start justify-center p-0'>
      <div className='relative box-border h-[209.67px] w-[194.5px] border-[10px] border-b-0 border-white'>
        <div className="absolute inset-0 bg-[url('/images/texturetastic-gray.png')] mix-blend-hard-light" />
        <Image
          src={`/images/ketua/ketua${imageIndex}.png`}
          alt={`Ketua ${imageIndex + 1}`}
          className='absolute inset-0 h-full w-full object-cover'
          width={500}
          height={500}
          objectFit='cover'
          objectPosition='center'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div className='flex h-[63px] w-[194.5px] flex-col items-center gap-[2px] bg-white px-[35px] py-[8px]'>
        <div className="w-[160px] text-center font-['Libre_Caslon_Condensed'] text-[17px] font-bold italic leading-[20px] text-[#121212]">
          {names[imageIndex]}
        </div>
        <div className="w-[96px] text-center font-['Inter'] text-[16px] font-normal leading-[19px] text-[#687083]">
          {years[imageIndex]}
        </div>
      </div>
    </div>
  );
};

export default EmblaCard;
