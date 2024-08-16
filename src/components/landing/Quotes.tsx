import Image from 'next/image';
import React from 'react';

const Quotes: React.FC = () => {
  return (
    <div className="relative w-full lg:w-[1512px] h-auto lg:h-[546px] flex flex-col lg:flex-row justify-center items-center p-[20px] lg:p-[100px] gap-[10px] isolate">
      {/* Background Gradient */}
      <div className="absolute w-full h-full"></div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-[20px] lg:gap-[75px] w-full lg:w-[1312px] h-auto lg:h-[346px] z-10">
        {/* Kontainer Teks dan Info */}
        <div className="flex flex-col items-start gap-[20px] lg:gap-[60px] w-full lg:w-[480px] h-auto lg:h-[208px]">
          
          {/* Paragraf Utama */}
          <div className="flex items-center justify-center w-full lg:w-[480px] h-[102px] lg:h-[102px] mb-[20px] lg:mb-0">
            <p className="text-white text-base text-2xl lg:text-2xl leading-[20px] md:leading-[28px] lg:leading-[34px] italic font-satoshi">
              "HMTC pada awalnya bertujuan menjadi wadah aspirasi dan kreativitas mahasiswa TC baik dalam akademis maupun non akademis"
            </p>
          </div>

          {/* Info Penulis */}
          <div className="flex flex-row items-center gap-[16px] w-full lg:w-[230px] h-auto lg:h-[56px] mb-[50px] lg:mb-0">
            <div className="w-[56px] h-[56px] bg-[#784747] rounded-full relative overflow-hidden">
              <Image
                src="/images/Quotes/fotoQuotes.png"
                alt="Quote Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-start gap-[2px] w-[158px] h-[52px]">
              <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] leading-[18px] md:leading-[22px] lg:leading-[28px] font-[700] italic font-libre-caslon-condensed">
                - Tri Saksono Adi
              </p>
              <p className="text-[#FFFFFFAA] text-[12px] md:text-base text-base lg:text-[16px] leading-[16px] md:leading-[20px] lg:leading-[22px] font-[400] font-helvetica-neue">
                Ketua HMTC Pertama
              </p>
            </div>
          </div>
        </div>

        {/* Gambar Besar dengan Teks di Atasnya */}
        <div className="relative w-full lg:w-[646px] h-[200px] md:h-[300px] lg:h-[346px] flex items-center justify-center">
          <Image
            src="/images/Quotes/Quotes.png"
            alt="Quotes Background"
            layout="fill"
            objectFit="cover"
            className="rounded-none"
          />
          {/* Kontainer Teks di Atas Gambar */}
          <div className=" absolute lg:top-[-50px] top-[-50px] left-0 flex flex-col justify-between w-full lg:w-[646px] h-[200px] md:h-[300px] lg:h-[346px] p-[15px]">
            <div className="lg:ml-[15px] flex flex-row items-center justify-between w-full h-[20px]">
              <div className="  lg:ml-[-30px] ml-[-15px] text-white text-sm md:text-sm leading-[18px] md:leading-[20px] font-satoshi-regular whitespace-nowrap">
                HMTC INCREMENTAL
              </div>
              <div className="flex flex-row items-center">
                <div className="lg:w-[130px] w-[80px] h-[1px] lg:border border"></div>
                <p className="lg:mr-0 mr-[-15px] lg:ml-[10px] ml-[5px] text-white text-sm md:text-sm leading-[18px] md:leading-[20px] font-satoshi-regular whitespace-nowrap">
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
