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
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/kahima.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'jibi',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/wakahima.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'jibi',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/sekretaris.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'jibi',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/bendahara.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/medfo.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/sosmas.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/kwu.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/hublu.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/lingpus.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/kesma.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/psdm.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'ari rahel',
    jabatan: 'Ketua Himpunan',
    image: {
      src: '/images/kepengurusan1/profkil.png  ',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
];
