import Image, { StaticImageData } from 'next/image';

import { DataAnggota } from '@/constants/anggota';
import { cn } from '@/lib/utils';

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
      <div className='relative h-[25rem] pt-6'>
        <Image
          src={image as StaticImageData}
          alt='Foto Anggota'
          fill
          className='object-contain object-bottom'
        />
      </div>
    </div>
  );
}
