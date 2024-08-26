import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layouts/Layout';

export default function Home() {
  return (
    <Layout>
      <main className='relative scroll-smooth'>
        <div id='home' className='relative min-h-screen bg-black text-white'>
          <div className='absolute inset-0 overflow-hidden'>
            <Image
              src='/images/halamandepan.png'
              alt='Background'
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              className='z-0'
            />
            <div className='absolute inset-0 z-10 bg-black opacity-75'></div>
          </div>

          <div className='relative z-20 mx-4 flex flex-col items-start p-6 sm:mx-6 md:mx-11 md:p-12'>
            <div className='mt-20 space-y-8 md:mt-28'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                <h1 className='font-libre text-4xl sm:text-8xl md:mr-auto md:text-8xl lg:text-7xl'>
                  Bersama Bersinergi <br />
                </h1>
                <p className='invisible absolute right-16 mt-4 font-satoshi sm:invisible md:invisible md:mt-0 md:text-lg lg:visible'>
                  Elementum mantis <br />
                  vulputate faucibus.
                </p>
              </div>
              <div className='flex flex-col pb-12 pt-12 md:flex-row md:justify-center md:pb-20 md:pt-20'>
                <p className='mt-4 font-satoshi text-sm sm:text-xl md:mr-auto md:text-lg'>
                  Justo aliquet aliquet <br />
                  nulla ultrices etiam.
                </p>
                <h1 className='absolute start-1/2 font-libre text-5xl sm:text-8xl md:mr-auto md:pl-8 md:text-7xl lg:text-8xl'>
                  Menjadi
                </h1>
              </div>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                <h1 className='font-libre text-5xl leading-tight sm:text-8xl md:text-7xl lg:text-8xl'>
                  <span className='font-libre italic'>Kunci Transformasi</span>
                </h1>
                <p className='invisible absolute bottom-[155px] right-[236px] mt-2 font-satoshi text-sm sm:invisible md:mt-0 md:pr-8 md:text-lg lg:visible lg:bottom-[140px] lg:right-[10px]'>
                  HMTC 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id='aboutus'
          className='flex min-h-screen flex-col items-center justify-center bg-white py-2 '
        >
          <div className='flex w-full flex-1 flex-col items-center justify-center px-20'>
            <div className='flex w-full flex-col items-center justify-between md:flex-row'>
              <div className='flex justify-center md:w-1/2'>
                <Image
                  src='/images/fotbarhmtc2024.png'
                  alt='HMTC Informatics'
                  width={550}
                  height={400}
                  className='object-cover'
                />
              </div>
              <div className='mt-8 text-left md:ml-8 md:mt-0 md:w-1/2'>
                <h2 className='font-satoshi text-xl text-blue-600'>About Us</h2>
                <h1 className='mt-2 font-adelphe text-4xl font-bold'>
                  Dedication to Excellence in Education and Technology
                </h1>
                <p className='mt-4 text-gray-700'>
                  Organisasi ini bernama Himpunan Mahasiswa Teknik Computer —
                  Informatika yang selanjutnya disebut HMTC.
                </p>
                <p className='mt-2 text-gray-700'>
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

        <div className='relative flex h-screen items-center justify-center bg-gray-100'>
          <div className='relative h-3/4 w-full md:h-full'>
            <div className='absolute -top-4 h-24 w-full bg-gradient-to-b from-white from-20% to-transparent md:h-52'></div>
            <Image
              src='/images/fotohmtc2024.png'
              alt='fotohmtc'
              layout='fill'
              objectFit='cover'
              priority
            />
            <div className='absolute bottom-0 h-24 w-full bg-gradient-to-t from-base-dark from-10% to-transparent md:h-52'></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
