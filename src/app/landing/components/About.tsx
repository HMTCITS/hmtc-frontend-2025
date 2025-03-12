import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export default function About() {
  return (
    <div
      id='aboutus'
      className='flex flex-col items-center justify-center bg-white pb-8 pt-16 lg:pt-24 px-10 md:px-16 lg:px-20'
    >
      <div className='flex w-full flex-1 flex-col items-center justify-center'>
        <div className='flex w-full flex-col items-center justify-between lg:flex-row'>
          <div className='flex justify-center lg:w-1/2'>
            <NextImage
              src='/fotbarhmtc2024.png'
              alt='HMTC Informatics'
              width={550}
              height={400}
              className='rounded-[15px] object-cover max-w-[500px] w-full'
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='mt-8 text-left md:pt-8 lg:ml-8 lg:mt-0 lg:w-1/2'>
            <Typography
              as='h2'
              font='satoshi'
              variant='h2'
              weight='regular'
              className='text-xl text-blue-600'
            >
              About Us
            </Typography>
            <Typography
              as='h1'
              font='adelphe'
              variant='j1'
              weight='bold'
              className='mt-2 leading-[50px]'
            >
              Dedication to Excellence in Education and Technology
            </Typography>
            <Typography
              as='p'
              font='satoshi'
              variant='b2'
              weight='regular'
              className='mt-6 text-justify text-gray-700'
            >
              Organisasi ini bernama Himpunan Mahasiswa Teknik Computer —
              Informatika yang selanjutnya disebut HMTC.
            </Typography>
            <Typography
              as='p'
              font='satoshi'
              variant='b2'
              weight='regular'
              className='mt-6 text-justify text-gray-700'
            >
              Tujuan HMTC adalah tercapainya kesempurnaan pendidikan dalam
              rangka membentuk pribadi mahasiswa yang bertaqwa kepada Tuhan Yang
              Maha Esa, memiliki sikap kecendekiawanan, integritas, kepekaan
              sosial, serta mampu menguasai dan mengembangkan Ilmu Pengetahuan
              dan Teknologi Informatika dan Komputer.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
