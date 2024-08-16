import React from 'react';

type EmblaCardProps = {
  imageIndex: number;
};

const EmblaCard: React.FC<EmblaCardProps> = ({ imageIndex }) => {
  const names = [
    "Ahmad Guntar", "Galih Hari Wibowo", "Fahrudi Yusuf", 
    "Aris Sofyan Lutfianto", "Deden Ade Nurdeni", "Agung Rizkianto", "Yoga Amersya Fitra"
  ];
  const years = [
    "1999 - 2000", "2004 - 2005", "2005 - 2006", 
    "2006 - 2007", "2007 - 2008", "2008 - 2009", "2009 - 2010"
  ];

  return (
    <div className="flex flex-col justify-center items-start p-0 w-[194.5px] h-[272.67px]">
      <div className="relative box-border w-[194.5px] h-[209.67px] border-[10px] border-white border-b-0">
        <div 
          className="absolute inset-0 bg-[url('/images/texturetastic-gray.png')] mix-blend-hard-light" 
        />
        <img
          src={`/images/ketua/ketua${imageIndex}.png`}
          alt={`Ketua ${imageIndex + 1}`}
          className="absolute inset-0 object-cover w-full h-full"
          style={{
            objectFit: 'cover', 
            objectPosition: 'center', 
          }}
        />
      </div>
      <div className="flex flex-col items-center py-[8px] px-[35px] gap-[2px] w-[194.5px] h-[63px] bg-white">
        <div 
          className="w-[160px] font-['Libre_Caslon_Condensed'] italic font-bold text-[17px] leading-[20px] text-center text-[#121212]"
        >
          {names[imageIndex]}
        </div>
        <div 
          className="w-[96px] font-['Inter'] font-normal text-[16px] leading-[19px] text-center text-[#687083]"
        >
          {years[imageIndex]}
        </div>
      </div>
    </div>
  );
};

export default EmblaCard;
