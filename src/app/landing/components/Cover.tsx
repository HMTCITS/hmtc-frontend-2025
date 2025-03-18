import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export default function Cover() {
  return (
    <div
      id='home'
      className='relative min-h-screen overflow-hidden bg-black text-white'
    >
      <div className='h-full min-h-screen overflow-hidden'>
        <NextImage
          src='halamandepan.png'
          alt='Background'
          className='z-0 h-full min-h-screen w-full'
          imgClassName='min-h-screen object-cover object-center'
          width={1512}
          height={982}
        />
        <div className='absolute inset-0 z-10 h-full w-full bg-black opacity-75'></div>
      </div>

      <div className='absolute top-0 z-20 mx-4 flex h-full w-full flex-col items-start justify-center p-6 pb-20 sm:mx-3 sm:pt-16 md:mx-3 md:p-12 lg:pt-20 lg:pb-24'>
        <div className='mt-20 w-full max-lg:flex max-lg:h-[90%] max-lg:flex-col max-lg:justify-between sm:mt-12 md:mt-20 lg:mt-20'>
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
          </div>
          <div className='flex flex-row justify-end py-12 md:py-16 lg:justify-end'>
            <Typography
              as='h1'
              font='libre'
              variant='j1'
              weight='bold'
              className='italic max-md:translate-x-4 max-md:pr-6 sm:text-5xl md:text-6xl lg:-translate-x-14 lg:text-8xl'
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
          </div>
        </div>
      </div>
    </div>
  );
}
