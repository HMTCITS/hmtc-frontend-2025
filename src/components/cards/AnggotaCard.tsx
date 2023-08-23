import Image from 'next/image';

import { DataAnggota } from '@/constants/anggota';

export default function AnggotaCard({ nama, jabatan, image }: DataAnggota) {
  return (
    <div className='mx-auto h-full w-fit space-y-6'>
      <div className='h-[30rem] bg-base-gray pt-6'>
        <Image {...image} alt='' className='h-full w-full object-cover' />
      </div>
      <div className='flex h-fit justify-center'>
        <div className='text-center font-semibold'>
          <p className='text-[20px] text-black-main'>{nama}</p>
          <p className='uppercase tracking-wider text-orange-light-5'>
            {jabatan}
          </p>
        </div>
      </div>
    </div>
  );
}
