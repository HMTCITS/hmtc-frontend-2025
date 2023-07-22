import Image from 'next/image';

import AnggotaCarousel from '@/components/carousel/AnggotaCarousel';
import Divider from '@/components/Divider';
import Akademik from '@/components/landing/Akademik';
import Everblue from '@/components/landing/Everblue';
import Profile from '@/components/landing/Profile';
import Promotion from '@/components/landing/Promotion';
import VisiMisi from '@/components/landing/VisiMisi';
import Layout from '@/components/layouts/Layout';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';

export default function Home() {
  return (
    <Layout>
      <main className='scroll-smooth'>
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
        <div className='mx-auto h-full w-full space-y-9 px-6 py-10 md:w-4/5 md:px-0 md:py-24'>
          <div className='flex w-full flex-col justify-between gap-y-4 font-primary lg:flex-row lg:items-center'>
            <Typography variant='k1' className='text-black-main'>
              Tentang Kami
            </Typography>
            <BaseLink
              className='font-secondary font-semibold text-blue-main md:text-lg'
              href='#'
            >
              Baca Selengkapnya
            </BaseLink>
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
                text2='Dui orci odio blandit velit sit ac. Dolor tellus adipiscing proin integer ac leo vitae molestie. In nam ac vel posuere morbi lacus scelerisque congue. Donec duis dolor urna faucibus. Tristique erat et fringilla mauris massa in proin. Amet pretium ut eleifend et ultricies tellus felis. Non suscipit.'
              />
              <VisiMisi
                text1='Misi'
                text2='Dui orci odio blandit velit sit ac. Dolor tellus adipiscing proin integer ac leo vitae molestie. In nam ac vel posuere morbi lacus scelerisque congue. Donec duis dolor urna faucibus. Tristique erat et fringilla mauris massa in proin. Amet pretium ut eleifend et ultricies tellus felis. Non suscipit.'
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
            <BaseLink
              className='font-secondary font-semibold text-blue-main md:text-lg'
              href='#'
            >
              Baca Selengkapnya
            </BaseLink>
          </div>
          <div>
            <AnggotaCarousel />
          </div>
        </div>
        <div>
          <Promotion
            text1='Barangkali perlu promosi, taruh sini'
            text2='Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar placerat vestibulum faucibus. A dignissim in neque integer maecenas sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar '
            href='adfasd.com'
          />
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
