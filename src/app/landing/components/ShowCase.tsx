'use client';

import Quotes from '@/app/landing/components/Quotes';
import VisiMisi from '@/app/landing/components/VisiMisi';
import KetuaCarousel from '@/components/carousel/KetuaCarousel';
import Divider from '@/components/Divider';
import NextImage from '@/components/NextImage';

export default function ShowCase() {
  const slides = [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6];

  return (
    <div className='relative bg-gray-100'>
      <div className='relative h-screen w-full'>
        <NextImage
          src='/fotohmtc2024.png'
          alt='Foto HMTC 2024'
          className='h-full w-full object-cover'
          style={{ objectFit: 'cover' }}
          width={1512}
          height={735}
        />
      </div>
      <div className='flex h-full w-full items-center justify-center bg-[#121212] py-10 md:py-24'>
        <div className='flex w-full flex-col justify-between gap-x-6 gap-y-6 px-6 md:w-[90%] md:px-0 lg:flex-row lg:gap-x-32'>
          <div>
            <VisiMisi
              text1='Vision'
              text2='Transformasi HMTC sebagai Pionir Utama Elemen Teknik Informatika Demi Mewujudkan Organisasi Yang Berdampak dan Berkualitas'
            />
          </div>
          <div>
            <VisiMisi
              text1='Mission'
              text2={[
                'Mengimplementasi program transformasi yang inovatif untuk meningkatkan daya saing dan memperbaiki kondisi HMTC sebagai organisasi di Teknik Informatika.',
                'Menginisiasi dan mempelopori seluruh aspek pergerakan mahasiswa Teknik Informatika untuk menciptakan lingkungan yang dinamis dan kolaboratif.',
                'Mengevaluasi dan mengoptimalkan aksi HMTC untuk menciptakan keberdampakan yang signifikan dan berkualitas di seluruh lapisan Teknik Informatika.',
              ]}
            />
          </div>
        </div>
      </div>
      <div className='flex h-full w-full bg-[#121212] py-10 md:py-24'>
        <div className='flex w-full flex-col gap-x-6 gap-y-6 px-6'>
          <Quotes />
        </div>
      </div>
      <div className='flex h-full w-full items-center bg-[#121212] px-4 py-10 md:px-20 md:py-24 lg:px-[8%]'>
        <div className='flex w-full flex-col justify-between'>
          <div className='relative w-full'>
            <KetuaCarousel slides={slides} options={{ loop: true }} />
          </div>
        </div>
      </div>
      <Divider id='kepengurusan' />
    </div>
  );
}
