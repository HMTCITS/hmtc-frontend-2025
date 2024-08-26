import Image from 'next/image';
import * as React from 'react';

import Kepengurusan from '@/components/carousel/Kepengurusan';
import Divider from '@/components/Divider';
import Akademik from '@/components/landing/Akademik';
import Everblue from '@/components/landing/Everblue';
import Gallery from '@/components/landing/Gallery';
import Profile from '@/components/landing/Profile';
import Promotion from '@/components/landing/Promotion';
import VisiMisi from '@/components/landing/VisiMisi';
import Layout from '@/components/layouts/Layout';
import Typography from '@/components/typography/Typography';

export default function Home() {
  return (
    <Layout>
      <main className='relative scroll-smooth'>
        <div id='home' className='relative min-h-screen bg-black text-white'>
          <div className='absolute inset-0 overflow-hidden'>
            <Image
              src='/images/halamandepan.png'
              alt="Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="z-0"
            />
            <div className='absolute inset-0 bg-black opacity-75 z-10'></div>
          </div>

          <div className="relative z-20 flex flex-col items-start p-6 mx-4 sm:mx-6 md:mx-11 md:p-12">
            <div className="mt-20 space-y-8 md:mt-28">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="font-libre text-4xl sm:text-8xl md:text-8xl lg:text-7xl md:mr-auto">
                  Bersama Bersinergi <br />
                </h1>
                <p className="absolute right-16 mt-4 invisible font-satoshi sm:invisible md:invisible lg:visible md:text-lg md:mt-0">
                  Elementum mantis <br />vulputate faucibus.
                </p>
              </div>
              <div className="flex flex-col pt-12 pb-12 md:pt-20 md:pb-20 md:flex-row md:justify-center">
                <p className="mt-4 text-sm font-satoshi sm:text-xl md:text-lg md:mr-auto">
                  Justo aliquet aliquet <br />nulla ultrices etiam.
                </p>
                <h1 className="text-5xl font-libre absolute start-1/2 sm:text-8xl md:text-7xl lg:text-8xl md:mr-auto md:pl-8">
                  Menjadi
                </h1>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="font-libre leading-tight text-5xl sm:text-8xl md:text-7xl lg:text-8xl">
                  <span className="italic font-libre">Kunci Transformasi</span>
                </h1>
                <p className="mt-2 invisible text-sm absolute bottom-[155px] right-[236px] font-satoshi sm:invisible md:text-lg lg:visible lg:right-[10px] lg:bottom-[140px] md:mt-0 md:pr-8">
                  HMTC 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id='aboutus' className="flex flex-col items-center justify-center min-h-screen py-2 bg-white ">
          <div className='flex flex-col items-center justify-center w-full flex-1 px-20'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/images/fotbarhmtc2024.png"
                  alt="HMTC Informatics"
                  width={550}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8 text-left">
                <h2 className="text-blue-600 font-satoshi text-xl">About Us</h2>
                <h1 className="font-adelphe text-4xl font-bold mt-2">
                  Dedication to Excellence in Education and Technology
                </h1>
                <p className="mt-4 text-gray-700">
                  Organisasi ini bernama Himpunan Mahasiswa Teknik Computer — Informatika yang selanjutnya disebut HMTC.
                </p>
                <p className="mt-2 text-gray-700">
                  Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam rangka membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan Yang Maha Esa, memiliki sikap kecendekiawanan, integritas, kepekaan sosial, serta mampu menguasai dan mengembangkan Ilmu Pengetahuan dan Teknologi Informatika dan Komputer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-screen bg-gray-100">
          <div className="relative w-full h-3/4 md:h-full">
            <div className="absolute -top-4 h-24 w-full bg-gradient-to-b from-white from-20% to-transparent md:h-52"></div>
            <Image
              src="/images/fotohmtc2024.png"
              alt="fotohmtc"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-base-dark from-10% to-transparent md:h-52"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
