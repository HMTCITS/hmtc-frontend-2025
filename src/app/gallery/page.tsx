import { Metadata } from 'next';

import GalleryPage from '@/app/gallery/container/galleryPage';

export const metadata: Metadata = {
  title: { default: 'Gallery HMTC', template: '%s • HMTC ITS' },
  description:
    'Kumpulan foto dan momen HMTC ITS - dari workshop hingga gathering.',
  alternates: { canonical: 'https://hmtc-its.com/gallery' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <GalleryPage />;
}
