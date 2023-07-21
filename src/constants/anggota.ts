import Image from 'next/image';

import { ExtractProps } from '@/types/helper';

export type DataAnggota = {
  nama: string;
  jabatan: string;
  image: ExtractProps<typeof Image>;
};

export const Anggota: DataAnggota[] = [
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
];
