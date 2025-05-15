import { Metadata } from 'next';

import GalleryPage from '@/app/gallery/container/galleryPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Galeri Foto & Dokumentasi | HMTC ITS',
    template: '%s | HMTC ITS',
  },
  description:
    'Kumpulan foto, video, dan dokumentasi kegiatan HMTC ITS - workshop, gathering, dan acara mahasiswa teknik komputer Institut Teknologi Sepuluh Nopember.',
  alternates: { canonical: 'https://hmtc-its.com/gallery' },
  robots: { index: true, follow: true },
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
