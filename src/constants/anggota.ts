import Image from 'next/image';

import { ExtractProps } from '@/types/helper';

export type DataAnggota = {
  nama?: string;
  jabatan?: string;
  image: ExtractProps<typeof Image>;
};

export const Anggota: DataAnggota[] = [
  {
    nama: 'Mohammad Fany Faizul Akbar',
    jabatan: 'Ketua 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Zunia Aswaroh',
    jabatan: 'Sekretaris 1',
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    nama: 'Meyroja Jovancha Firoos',
    jabatan: 'Sekretaris 2',
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
    nama: 'Clarissa Luna Maheswari',
    jabatan: 'Bendahara 2',
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

export const Asset: DataAnggota[] = [
  {
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    image: {
      src: '/images/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
];
