import { StaticImageData } from 'next/legacy/image';

import NextImage from '@/components/NextImage';
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
        <NextImage
          src={image as StaticImageData}
          alt='Foto Anggota'
          layout='fill'
          className='object-contain object-bottom'
        />
      </div>
    </div>
  );
}
