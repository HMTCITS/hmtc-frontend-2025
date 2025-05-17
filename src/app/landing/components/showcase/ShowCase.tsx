import Quotes from '@/app/landing/components/cover/Quotes';
import VisiMisi from '@/app/landing/components/cover/VisiMisi';
import KetuaCarousel from '@/components/carousel/KetuaCarousel';
import NextImage from '@/components/NextImage';

export default function ShowCase() {
  return (
    <div className='relative bg-gray-100'>
      <NextImage
        src='/fotohmtc2024.png'
        alt='Foto HMTC 2024'
        className='relative h-screen w-full object-cover'
        style={{ objectFit: 'cover' }}
        width={1512}
        height={735}
      />
      <div className='flex w-full items-center justify-center bg-[#121212] px-12 py-18 sm:p-18 md:p-24'>
        <div className='flex w-full flex-col justify-between gap-x-6 gap-y-12 md:px-0 lg:flex-row lg:gap-x-27'>
          <div className='max-w-[335px]'>
            <VisiMisi
              text1='Vision'
              text2='Transformasi HMTC sebagai Pionir Utama Elemen Teknik Informatika Demi Mewujudkan Organisasi Yang Berdampak dan Berkualitas'
            />
          </div>

          <div className='max-w-[870px]'>
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
      <div className='flex w-full bg-[#121212] px-12 py-18 sm:p-18 md:p-24'>
        <Quotes />
      </div>
      <div className='relative flex w-full items-center bg-[#121212] px-12 py-18 sm:p-18 md:p-24 lg:px-[8%]'>
        <KetuaCarousel options={{ loop: true }} />
      </div>
    </div>
  );
}
