import Image from 'next/image';

import { DataAnggota } from '@/constants/anggota';
import clsxm from '@/lib/clsxm';

type AnggotaCardProps = {
  index: number;
};

export default function AnggotaCard({
  nama,
  jabatan,
  image,
  index,
}: DataAnggota & AnggotaCardProps) {
  return (
    <div
      className={clsxm(
        'mx-auto h-full w-full max-w-[25rem] space-y-6',
        (index === 0 || index === 19) && 'max-w-none'
      )}
    >
      <div className='h-[25rem] bg-base-gray pt-6'>
        <Image
          {...image}
          alt=''
          className='h-full w-full object-contain object-bottom'
        />
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
