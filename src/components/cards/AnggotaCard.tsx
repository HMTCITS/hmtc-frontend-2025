import Image from 'next/image';

import { DataAnggota } from '@/constants/anggota';
import cn from '@/lib/clsxm';

type AnggotaCardProps = {
  index: number;
};

export default function AnggotaCard({
  image,
  index,
}: DataAnggota & AnggotaCardProps) {
  return (
    <div
      className={cn(
        'mx-auto h-full w-full max-w-[25rem] space-y-6',
        (index === 0 || index === 19) && 'max-w-none',
      )}
    >
      <div className='h-[25rem]  pt-6'>
        <Image
          {...image}
          alt=''
          className='h-full w-full object-contain object-bottom'
        />
      </div>
    </div>
  );
}
