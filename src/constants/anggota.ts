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
      src: '/images/kepengurusan/Kahima.svg',
      alt: 'tes',
      width: 1021,
      height: 823,
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
      src: '/images/kepengurusan/Sosmas1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Naily Khairiya',
    jabatan: 'Wakadep Sosmas',
    image: {
      src: '/images/kepengurusan/Sosmas2.svg',
      alt: 'tes',
      width: 440,
      height: 598,
    },
  },
  {
    nama: 'Aaliyah Farah Adibah',
    jabatan: 'Kadep Hublu',
    image: {
      src: '/images/kepengurusan/Hublu1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'M Daffa Aldriantama',
    jabatan: 'Wakadep Hublu',
    image: {
      src: '/images/kepengurusan/Hublu2.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Kadek Ari Dharmika',
    jabatan: 'Kadep Medfo',
    image: {
      src: '/images/kepengurusan/Medfo1.svg',
      alt: 'tes',
      width: 515,
      height: 585,
    },
  },
  {
    nama: 'Rahel Cecilia Purba',
    jabatan: 'Wakadep Medfo',
    image: {
      src: '/images/kepengurusan/Medfo2.svg',
      alt: 'tes',
      width: 515,
      height: 585,
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
      width: 515,
      height: 585,
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
      width: 515,
      height: 585,
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
      width: 515,
      height: 585,
    },
  },
];

export const Asset: DataAnggota[] = [
  {
    image: {
      src: '/images/kepengurusan/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    image: {
      src: '/images/kepengurusan/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
  {
    image: {
      src: '/images/kepengurusan/example-img.png',
      alt: 'tes',
      width: 340,
      height: 400,
    },
  },
];
