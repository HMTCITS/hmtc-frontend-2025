import Image from 'next/image';

import AnggotaCarousel from '@/components/carousel/AnggotaCarousel';
import Akademik from '@/components/landing/Akademik';
import Everblue from '@/components/landing/Everblue';
import Profile from '@/components/landing/Profile';
import Promotion from '@/components/landing/Promotion';
import VisiMisi from '@/components/landing/VisiMisi';

export default function Home() {
  return (
    <main>
      <div className='mx-auto flex min-h-screen w-4/5 items-center'>
        <div className='font-primary text-4xl font-extrabold md:text-6xl'>
          <h3 className='flex w-full flex-col leading-tight'>
            <span className=' w-full lg:w-3/5'>Selamat datang di</span>{' '}
            <span>Himpunan Mahasiswa </span>
            <span className='text-blue-main'>Teknik Computer-Informatika.</span>
          </h3>
        </div>
      </div>
      <div className='mx-auto h-full w-4/5 space-y-8 py-24'>
        <div className='flex w-full flex-col items-center justify-between gap-y-4 font-primary lg:flex-row'>
          <h3 className='text-4xl font-extrabold md:text-6xl'>Tentang Kami.</h3>
          <a
            className='font-secondary text-base font-semibold text-blue-main md:text-xl'
            href='#'
          >
            Baca Selengkapnya
          </a>
        </div>
        <div className='space-y-6 border-b-2 border-dotted pb-28 font-secondary text-lg'>
          <p>
            Organisasi ini bernama Himpunan Mahasiswa Teknik Computer –
            Informatika yang selanjutnya disebut HMTC.
          </p>
          <p>
            Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam rangka
            membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan Yang Maha
            Esa, memiliki sikap kecendekiawanan, integritas, kepekaan sosial,
            serta mampu menguasai dan mengembangkan Ilmu Pengetahuan dan
            Teknologi Informatika dan Komputer.
          </p>
        </div>
      </div>
      <div className='mb-32 w-full pt-9'>
        <div className='flex flex-col items-center justify-center gap-x-8 md:flex-row'>
          <Image
            src='/images/logohmtc.png'
            alt='Logo'
            width={180}
            height={200}
          />
          <div className='w-full md:w-[470px]'>
            <h3 className='break-words text-center font-primary text-5xl font-bold text-black-main md:text-left md:text-8xl'>
              Sansargya Abhijaya
            </h3>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='relative min-h-[808px] w-full'>
          <div className='absolute -top-4 h-52 w-full bg-gradient-to-b from-white from-20% to-transparent'></div>
          <Image
            src='/images/fotohmtc.svg'
            alt='fotohmtc'
            width={2000}
            height={800}
            className='object-cover'
          />
          <div className='absolute bottom-0 h-52 w-full bg-gradient-to-t from-base-dark from-10% to-transparent'></div>
        </div>
        <div className='flex h-full w-full items-center justify-center bg-base-dark py-24'>
          <div className='flex w-4/5 flex-col justify-between gap-x-6 gap-y-6 lg:flex-row'>
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
      </div>
      <div className='mx-auto w-4/5 space-y-14 py-24'>
        <div className='flex w-full flex-col items-center justify-between gap-y-6 font-primary lg:flex-row'>
          <h3 className='text-4xl font-extrabold text-black-main md:text-6xl'>
            Kepengurusan.
          </h3>
          <a
            className='font-secondary text-xl font-semibold text-blue-main'
            href='#'
          >
            Baca Selengkapnya
          </a>
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
      <div className='mx-auto w-4/5'>
        <Profile />
        <Everblue />
      </div>
      <div className=''>
        <Akademik />
      </div>
    </main>
  );
}
