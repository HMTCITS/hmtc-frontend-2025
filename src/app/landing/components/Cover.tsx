import Image from 'next/image';

import Typography from '@/components/Typography';

export default function Cover() {
  return (
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
            <Typography
              as='h1'
              font='libre'
              variant='j2'
              weight='regular'
              className='italic sm:text-4xl md:mr-auto md:text-5xl lg:text-7xl'
            >
              Bersama Bersinergi <br />
            </Typography>
            <Typography
              as='p'
              font='satoshi'
              variant='b2'
              weight='regular'
              className='invisible absolute right-16 mt-4 md:mt-0 md:text-lg lg:visible'
            >
              DUPSE! <br />
              DUPSE! <br />
              DUPSE!
            </Typography>
          </div>
          <div className='flex py-12 flex-row justify-end lg:justify-between md:py-16'>
            <Typography
              as='p'
              font='satoshi'
              variant='b4'
              weight='regular'
              className='max-lg:hidden sm:text-xl md:text-lg'
            >
              Jadikan Hari Ini <br />
              Pelajaran Untuk Nanti
            </Typography>
            <Typography
              as='h1'
              font='libre'
              variant='j1'
              weight='bold'
              className='start-[45%] italic sm:text-5xl md:text-6xl lg:text-8xl max-md:translate-x-4 lg:-translate-x-14 max-sm:w-fit'
            >
              Menjadi
            </Typography>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between lg:mt-20'>
            <Typography
              as='h1'
              font='libre'
              variant='j0'
              weight='bold'
              className='text-5xl leading-tight italic sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl'
            >
              Kunci Transformasi
            </Typography>
            <Typography
              as='p'
              font='satoshi'
              variant='b4'
              weight='regular'
              className='invisible absolute bottom-[155px] right-[236px] mt-2 sm:invisible md:mt-0 md:pr-8 md:text-lg lg:visible lg:bottom-[140px] lg:right-[10px]'
            >
              HMTC 2025
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
