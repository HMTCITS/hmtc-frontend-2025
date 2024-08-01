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

          <div className="relative z-20 flex flex-col items-start p-6 mx-11 md:p-12">
            <div className="mt-28 space-y-8">
              <div className="flex md:flex-row md:justify-between md:items-center">
                <h1 className="text-6xl font-libre leading-tight md:text-8xl md:mr-auto">
                  Bersama Bersinergi <br />
                </h1>
                <p className="mt-4 pl-44 ml-96 text-sm font-satoshi md:text-base md:mt-0">
                  Elementum mantis <br />vulputate faucibus.
                </p>
              </div>
              <div className="flex flex-col pt-20 pb-20 md:flex-row md:justify-center">
                <p className="mt-4 text-sm font-satoshi md:text-base md:mr-auto">
                  Justo aliquet aliquet <br />nulla ultrices etiam.
                </p>
                <h1 className="text-6xl font-libre leading-tight pl-40 md:text-8xl md:mr-auto">
                  Menjadi
                </h1>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-6xl font-libre leading-tight md:text-8xl">
                  <span className="italic font-libre">Kunci Transformasi</span>
                </h1>
                <span className="italic font-libre text-6xl md:text-8xl"></span>
                <p className="mt-2 pr-96 text-sm font-satoshi md:text-base md:mt-0">
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


        <div
          id='home'
          className='relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-6 md:w-4/5 md:px-0'
        >
          <div className='w-full font-primary'>
            <Typography
              variant='k1'
              className='flex w-full flex-col text-center text-black-main md:text-left'
            >
              <span className=' w-full lg:w-3/5'>Selamat datang di</span>{' '}
              <span>Himpunan Mahasiswa </span>
              <span className='text-blue-main'>
                Teknik Computer-Informatika.
              </span>
            </Typography>
          </div>
          <Divider id='about' />
        </div>
        <div className='absolute right-0 top-0 -translate-y-[10%] translate-x-[55%] opacity-10'>
          <Image
            src='/images/bungablack.png'
            width={480}
            height={200}
            alt='bunga'
          />
        </div>
        <div className='absolute left-0 top-20 -translate-x-[55%] translate-y-[80%] opacity-10'>
          <Image
            src='/images/bungablack.png'
            width={480}
            height={200}
            alt='bunga'
          />
        </div>
        <div className='mx-auto h-full w-full space-y-9 px-6 py-10 md:w-4/5 md:px-0 md:py-24'>
          <div className='flex w-full flex-col justify-between gap-y-4 font-primary lg:flex-row lg:items-center'>
            <Typography variant='k1' className='text-black-main'>
              Tentang Kami
            </Typography>
          </div>
          <div className='space-y-6 border-b-2 border-dotted pb-16 font-secondary text-lg md:pb-28'>
            <Typography variant='b1' className='text-base'>
              Organisasi ini bernama Himpunan Mahasiswa Teknik Computer –
              Informatika yang selanjutnya disebut HMTC.
            </Typography>
            <Typography variant='b1' className='text-base'>
              Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam
              rangka membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan Yang
              Maha Esa, memiliki sikap kecendekiawanan, integritas, kepekaan
              sosial, serta mampu menguasai dan mengembangkan Ilmu Pengetahuan
              dan Teknologi Informatika dan Komputer.
            </Typography>
            <Typography variant='b1' className='text-base'>
              Saat dilahirkan jurusan Teknik Komputer dulu (saat ini Teknik
              Informatika) dibidani oleh team dari jurusan Teknik Elektro dengan
              bidang studi komputer. Secara organisasi dan operasional, termasuk
              aktivitas akademis dan kemahasiswaan, Teknik Komputer berada
              dibawah naungan teknik elektro yang saat itu memiliki banyak
              prestasi.
            </Typography>
            <Typography variant='b1' className='text-base'>
              Tidak ingin berlama-lama di bawah bayang-bayang kebesaran Teknik
              Elektro, maka sejak tahun 1987, Teknik Komputer sudah mulai
              membentuk organisasi kemahasiswaan. Awalnya hanya sekedar
              menunjukkan eksistensi dengan kegiatan-kegiatan internal. Begitu
              seterusnya dan secara pasti Teknik Komputer mulai menyusun draft
              bentuk organisasi Himpunan Mahasiswa Teknik Computer (sengaja
              tidak menggunakan huruf &apos;k&apos;, karena sudah digunakan oleh
              Teknik Kimia)/HMTC.
            </Typography>
            <Typography variant='b1' className='text-base'>
              Kurun waktu 1987-1989 merupakan masa-masa yang penuh perjuangan
              untuk mematangkan bentuk organisasi dan eksistensi HMTC. Pada
              tahun 1989 HMTC sudah menjadi organisasi kemahasiswaan yang
              mandiri dan lepas dari Teknik Elektro.
            </Typography>
          </div>
        </div>
        <div className='mx-auto mb-10 w-full px-6 pt-4 md:mb-32 md:w-full md:px-0 md:pt-9'>
          <div className='flex items-center justify-center gap-x-2 md:gap-x-8'>
            <div className='w-[90px] md:w-fit'>
              <Image
                src='/images/logohmtc.png'
                alt='Logo'
                width={180}
                height={200}
                className='w-full'
                priority
              />
            </div>
            <div className='w-fit md:w-[470px]'>
              <Typography
                variant='k0'
                className='font-primary text-black-main drop-shadow'
              >
                Sansargya
              </Typography>
              <Typography
                variant='k0'
                className='font-primary text-black-main drop-shadow'
              >
                Abhijaya
              </Typography>
            </div>
          </div>
        </div>
        <div className='relative w-full'>
          <div className='relative h-fit w-full md:min-h-[808px]'>
            <div className='absolute -top-4 h-24 w-full bg-gradient-to-b from-white from-20% to-transparent md:h-52'></div>
            <Image
              src='/images/fotohmtc.svg'
              alt='fotohmtc'
              width={2000}
              height={800}
              className='object-cover'
              priority
            />
            <div className='absolute bottom-0 h-24 w-full bg-gradient-to-t from-base-dark from-10% to-transparent md:h-52'></div>
          </div>
          <div className='flex h-full w-full items-center justify-center bg-base-dark py-10 md:py-24'>
            <div className='flex w-full flex-col justify-between gap-x-6 gap-y-6 px-6 md:w-4/5 md:px-0 lg:flex-row'>
              <VisiMisi
                text1='Visi'
                text2='Semangat kekeluargaan HMTC demi  terwujudnya lingkungan yang responsif, kolaboratif, dan inovatif.'
              />
              <VisiMisi
                text1='Misi'
                text2={[
                  'Membina kekeluargaan dengan menjaga keharmonisan dan kebersamaan di lingkup internal Teknik Informatika ITS berlandaskan asas keterbukaan dan saling menghargai.',
                  'Membentuk perilaku yang responsif serta membudayakan umpan balik yang efektif.',
                  'Menciptakan dan memperkuat hubungan dengan stakeholder demi meningkatkan perkembangan HMTC ITS.',
                  'Optimasi pengembangan potensi mahasiswa Teknik Informatika.',
                ]}
              />
            </div>
          </div>
          <Divider id='kepengurusan' />
        </div>
        <div className='mx-auto w-full space-y-14 px-6 py-10 md:w-4/5 md:px-0 md:py-24'>
          <div className='flex w-full flex-col justify-between gap-y-4 font-primary lg:flex-row lg:items-center lg:gap-y-6'>
            <Typography variant='k1' className='text-black-main'>
              Kepengurusan.
            </Typography>
          </div>
          <div>
            <Kepengurusan />
          </div>
        </div>
        <div>
          <Promotion
            text1='Gallery HMTC'
            text2='Merambah dunia teknologi melalui rangkaian acara HMTC. Mulai dari diskusi teknologi menarik bersama para pemimpin industri hingga workshop praktis yang mengupas tuntas rahasia pemrograman dan inovasi, rangkaian acara yang dirancang untuk memberdayakan dan menginspirasi.'
            href='adfasd.com'
          />
        </div>
        <div>
          <Gallery />
        </div>
        <div className='relative mx-auto w-full px-6 md:w-4/5 md:px-0'>
          <Profile />
          <Everblue />
          <Divider id='akademik' />
        </div>
        <div>
          <Akademik />
        </div>
      </main>
    </Layout>
  );
}
