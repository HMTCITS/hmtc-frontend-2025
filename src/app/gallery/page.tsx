import { Metadata } from 'next';

import GalleryPage from '@/app/gallery/container/galleryPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Galeri Foto & Dokumentasi Kegiatan HMTC ITS Surabaya',
    template: '%s | HMTC ITS',
  },
  description:
    'Lihat galeri foto, video, dan dokumentasi resmi HMTC ITS. Temukan momen workshop, seminar, gathering, lomba, dan aktivitas mahasiswa Teknik Komputer ITS (Institut Teknologi Sepuluh Nopember, Surabaya).',
  keywords: [
    'galeri HMTC ITS',
    'foto kegiatan HMTC',
    'dokumentasi HMTC',
    'HMTC ITS Surabaya',
    'galeri foto teknik komputer ITS',
    'workshop HMTC',
    'gathering HMTC',
    'acara mahasiswa ITS',
    'kegiatan himpunan mahasiswa teknik komputer ITS',
    'gallery HMTC ITS',
    'event HMTC',
    'foto HMTC ITS',
  ],
  alternates: {
    canonical: 'https://hmtc-its.com/gallery',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        title='Gallery HMTC ITS'
        description='Kumpulan foto dan momen HMTC ITS - dari workshop hingga gathering.'
      />
      <GalleryPage />
    </>
  );
}
