// src/app/page.tsx
import Image from 'next/image';

import KetuaCarousel from '@/components/carousel/KetuaCarousel';
import Divider from '@/components/Divider';
import GalleryHMTC from '@/components/landing/GalleryHMTC';
import HMTCBlog from '@/components/landing/HMTCBlog';
import LifeAtHMTC from '@/components/landing/LifeAtHMTC';
import PeopleHMTC from '@/components/landing/PeopleHMTC';
import Quotes from '@/components/landing/Quotes';
import QuotesKahima from '@/components/landing/QuotesKahima';
import VisiMisi from '@/components/landing/VisiMisi';

export default function Page() {
  const slides = [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6];

  return (
    <main className='relative scroll-smooth'>
      <div id='home' className='relative min-h-screen bg-black text-white'>
        <div className='absolute inset-0 overflow-hidden'>
          <Image
            src='/images/halamandepan.png'
            alt='Background'
            fill
            className='z-0 object-cover object-center'
          />
          <div className='absolute inset-0 z-10 bg-black opacity-75'></div>
        </div>

        <div className='relative z-20 mx-4 flex flex-col items-start p-6 pb-20 lg:pb-40 sm:pt-16 lg:pt-20 sm:mx-3 md:mx-3 md:p-12'>
          <div className='mt-20 sm:mt-12 lg:mt-20 space-y-8 md:mt-20'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <h1 className='font-libre text-3xl italic sm:text-4xl md:mr-auto md:text-5xl lg:text-7xl'>
                Bersama Bersinergi <br />
              </h1>
              <p className='invisible absolute right-16 mt-4 font-satoshi md:mt-0 md:text-lg lg:visible'>
                DUPSE! <br />
                DUPSE! <br />
                DUPSE!
              </p>
            </div>
            <div className='flex py-12 flex-row justify-end lg:justify-between md:py-16 '>
              <p className='max-lg:hidden font-satoshi text-sm sm:text-xl md:text-lg'>
                Jadikan Hari Ini <br />
                Pelajaran Untuk Nanti
              </p>
              <h1 className='start-[45%] font-libre text-4xl italic sm:text-5xl md:text-6xl lg:text-8xl max-md:translate-x-4 lg:-translate-x-14 max-sm:w-fit'>
                Menjadi
              </h1>
            </div>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between lg:mt-20'>
              <h1 className='font-libre text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic'>
                Kunci Transformasi
              </h1>
              <p className='invisible absolute bottom-[155px] right-[236px] mt-2 font-satoshi text-sm sm:invisible md:mt-0 md:pr-8 md:text-lg lg:visible lg:bottom-[140px] lg:right-[10px]'>
                HMTC 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id='aboutus'
        className='flex flex-col items-center justify-center bg-white py-8'
      >
        <div className='flex w-full flex-1 flex-col items-center justify-center px-10 pt-16 md:px-16 lg:px-20 lg:pt-40'>
          <div className='flex w-full flex-col items-center justify-between lg:flex-row'>
            <div className='flex justify-center lg:w-1/2'>
              <Image
                src='/images/fotbarhmtc2024.png'
                alt='HMTC Informatics'
                width={550}
                height={400}
                className='rounded-[15px] object-cover'
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='mt-8 text-left md:pt-8 lg:ml-8 lg:mt-0 lg:w-1/2'>
              <h2 className='font-satoshi text-xl text-blue-600'>About Us</h2>
              <h1 className='mt-2 font-adelphe text-4xl font-bold leading-[50px]'>
                Dedication to Excellence in Education and Technology
              </h1>
              <p className='mt-6 text-justify font-satoshi font-normal text-gray-700'>
                Organisasi ini bernama Himpunan Mahasiswa Teknik Computer —
                Informatika yang selanjutnya disebut HMTC.
              </p>
              <p className='mt-6 text-justify font-satoshi font-normal text-gray-700'>
                Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam
                rangka membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan
                Yang Maha Esa, memiliki sikap kecendekiawanan, integritas,
                kepekaan sosial, serta mampu menguasai dan mengembangkan Ilmu
                Pengetahuan dan Teknologi Informatika dan Komputer.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-gray-100'>
        <div className='relative h-screen w-full'>
          <Image
            src='/images/fotohmtc2024.png'
            alt='fotohmtc'
            fill
            className='object-cover'
            priority
            style={{ objectFit: 'cover' }} // Untuk kompatibilitas lebih baik
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
        <div className='flex h-full w-full  bg-[#121212] py-10 md:py-24'>
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

      <div className='relative mx-auto w-full'>
        <PeopleHMTC />
        <LifeAtHMTC />
        <GalleryHMTC />
        <HMTCBlog />
        <QuotesKahima />
      </div>
    </main>
  );
}
