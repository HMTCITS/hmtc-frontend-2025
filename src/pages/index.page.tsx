import Image from 'next/image';

import Akademik from '@/components/landing/Akademik';
import Everblue from '@/components/landing/Everblue';
import Profile from '@/components/landing/Profile';
import Promotion from '@/components/landing/Promotion';
import VisiMisi from '@/components/landing/VisiMisi';

export default function Home() {
  return (
    <section className='h-full w-full'>
      <div className='mx-auto mb-40 h-full w-4/5'>
        <div className='font-primary text-6xl font-extrabold leading-tight'>
          <h3 className='w-full lg:w-3/5'>
            Selamat datang di Himpunan Mahasiswa{' '}
          </h3>
          <h3 className='text-blue-main'>Teknik Computer-Informatika.</h3>
        </div>
      </div>
      <div className='mx-auto h-full w-4/5'>
        <div className='mb-10 flex w-full items-center justify-between font-primary'>
          <h3 className='text-6xl font-extrabold'>Tentang Kami.</h3>
          <a className='text-xl font-semibold text-blue-main' href='#'>
            Baca Selengkapnya
          </a>
        </div>
        <div className='mb-40 font-secondary text-xl'>
          <p className='mb-10'>
            Organisasi ini bernama Himpunan Mahasiswa Teknik Computer –
            Informatika yang selanjutnya disebut HMTC.
          </p>
          <p className='mb-20'>
            Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam rangka
            membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan Yang Maha
            Esa, memiliki sikap kecendekiawanan, integritas, kepekaan sosial,
            serta mampu menguasai dan mengembangkan Ilmu Pengetahuan dan
            Teknologi Informatika dan Komputer.
          </p>
          <div className='mb-20 w-full border-2 border-dotted'></div>
          <div className='w-full'>
            <div className='flex items-center justify-center gap-x-8'>
              <Image
                src='/images/logohmtc.png'
                alt='Logo'
                width={180}
                height={200}
              />
              <div className='w-[470px]'>
                <h3 className='break-all font-primary text-8xl font-bold'>
                  Sansargya Abhijaya
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='min-h-[808px] w-full'>
          <Image
            src='/images/fotohmtc.svg'
            alt='fotohmtc'
            width={2000}
            height={800}
            className='object-cover'
          />
        </div>
        <div className='flex h-full w-full items-center justify-center bg-[#212121] py-24'>
          <div className='flex w-4/5 justify-between gap-x-6'>
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
      <div className='h-full w-full'>
        <Promotion
          text1='Barangkali perlu promosi, taruh sini'
          text2='Metus in sit mollis vulputate. Mollis ac amet nec malesuada. Nunc elit ac placerat dictum ornare purus aenean aliquam fermentum. Non pulvinar placerat vestibulum faucibus. A dignissim in neque integer maecenas sed. Vulputate phasellus placerat id nulla felis. Bibendum condimentum ipsum sed mauris tincidunt risus. Sed sagittis donec tellus pulvinar '
          href='adfasd.com'
        />
      </div>
      <div className='mx-auto h-full w-4/5'>
        <Profile />
        <Everblue />
      </div>
      <div className='h-full w-full'>
        <Akademik />
      </div>
    </section>
  );
}
