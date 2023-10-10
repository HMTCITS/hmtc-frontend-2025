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
      src: '/images/kepengurusan/Kahima.svg',
      alt: 'tes',
      width: 640,
      height: 885,
    },
  },
  {
    nama: 'Tio Dwi Ardhana',
    jabatan: 'Internal',
    image: {
      src: '/images/kepengurusan/Internal.svg',
      alt: 'tes',
      width: 435,
      height: 625,
    },
  },
  {
    nama: 'Jabalnur',
    jabatan: 'Eksternal',
    image: {
      src: '/images/kepengurusan/Eksternal.svg',
      alt: 'tes',
      width: 539,
      height: 617,
    },
  },
  {
    nama: 'Zunia Aswaroh',
    jabatan: 'Sekretaris 1',
    image: {
      src: '/images/kepengurusan/Sekretaris1.svg',
      alt: 'tes',
      width: 435,
      height: 625,
    },
  },
  {
    nama: 'Meyroja Jovancha Firoos',
    jabatan: 'Sekretaris 2',
    image: {
      src: '/images/kepengurusan/Sekretaris2.svg',
      alt: 'tes',
      width: 539,
      height: 617,
    },
  },
  {
    nama: 'Aisyah Nurhalimah',
    jabatan: 'Bendahara 1',
    image: {
      src: '/images/kepengurusan/Bendahara1.svg',
      alt: 'tes',
      width: 549,
      height: 645,
    },
  },
  {
    nama: 'Clarissa Luna Maheswari',
    jabatan: 'Bendahara 2',
    image: {
      src: '/images/kepengurusan/Bendahara2.svg',
      alt: 'tes',
      width: 542,
      height: 630,
    },
  },
  {
    nama: 'M Afdal Abdallah',
    jabatan: 'Kadep Kesma',
    image: {
      src: '/images/kepengurusan/Kesma1.svg',
      alt: 'tes',
      width: 520,
      height: 612,
    },
  },
  {
    nama: 'I Putu Bagus Adhi P',
    jabatan: 'Wakadep Kesma',
    image: {
      src: '/images/kepengurusan/Kesma2.svg',
      alt: 'tes',
      width: 476,
      height: 634,
    },
  },
  {
    nama: 'Surya Abdillah',
    jabatan: 'Kadep Sosmas',
    image: {
      src: '/images/kepengurusan/Sosmas-1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Naily Khairiya',
    jabatan: 'Wakadep Sosmas',
    image: {
      src: '/images/kepengurusan/Sosmas-2.svg',
      alt: 'tes',
      width: 440,
      height: 598,
    },
  },
  {
    nama: 'Aaliyah Farah Adibah',
    jabatan: 'Kadep Hublu',
    image: {
      src: '/images/kepengurusan/Hublu-1.svg',
      alt: 'tes',
      width: 670,
      height: 651,
    },
  },
  {
    nama: 'M Daffa Aldriantama',
    jabatan: 'Wakadep Hublu',
    image: {
      src: '/images/kepengurusan/Hublu-2.svg',
      alt: 'tes',
      width: 451,
      height: 635,
    },
  },
  {
    nama: 'Kadek Ari Dharmika',
    jabatan: 'Kadep Medfo',
    image: {
      src: '/images/kepengurusan/Medfo-1.svg',
      alt: 'tes',
      width: 526,
      height: 606,
    },
  },
  {
    nama: 'Rahel Cecilia Purba',
    jabatan: 'Wakadep Medfo',
    image: {
      src: '/images/kepengurusan/Medfo-2.svg',
      alt: 'tes',
      width: 515,
      height: 600,
    },
  },
  {
    nama: 'Andi Muhammad Rafli',
    jabatan: 'Kadep Lingpus',
    image: {
      src: '/images/kepengurusan/Lingpus1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Theresia Nawangsih',
    jabatan: 'Wakadep Lingpus',
    image: {
      src: '/images/kepengurusan/Lingpus2.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Lia Kharisma Putri',
    jabatan: 'Kadep KWU',
    image: {
      src: '/images/kepengurusan/KWU1.svg',
      alt: 'tes',
      width: 488,
      height: 626,
    },
  },
  {
    nama: 'David Fischer Simanjuntak',
    jabatan: 'Wakadep KWU',
    image: {
      src: '/images/kepengurusan/KWU2.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Antonio Taifan Montana',
    jabatan: 'Kadep PSDM',
    image: {
      src: '/images/kepengurusan/PSDM1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Farrela Ranku Mahhisa',
    jabatan: 'Wakadep PSDM',
    image: {
      src: '/images/kepengurusan/PSDM2.svg',
      alt: 'tes',
      width: 476,
      height: 650,
    },
  },
  {
    nama: 'Alfadito Aulia Denova',
    jabatan: 'DPA',
    image: {
      src: '/images/kepengurusan/DPA.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'M Afif Dwi Ardhiansyah',
    jabatan: 'Kadep Profkil',
    image: {
      src: '/images/kepengurusan/Profkil1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'M Labib Alfaraby',
    jabatan: 'Wakadep Profkil',
    image: {
      src: '/images/kepengurusan/Profkil2.svg',
      alt: 'tes',
      width: 580,
      height: 655,
    },
  },
];
