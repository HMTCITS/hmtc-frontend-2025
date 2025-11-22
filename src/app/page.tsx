import { Metadata } from 'next';

import LandingPage from '@/app/landing/LandingPage';
import JsonLd from '@/components/JsonLd';
import Footer from '@/layouts/Footer';

export const metadata: Metadata = {
  title: {
    default: 'HMTC ITS | Himpunan Mahasiswa Teknik Computer-Informatika ITS',
    template: '%s | HMTC ITS',
  },
  description:
    'Selamat datang di Himpunan Mahasiswa Teknik Computer (HMTC) ITS — workshop, galeri, blog, dan komunitas mahasiswa Teknik Computer terkemuka.',
  alternates: { canonical: 'https://hmtc-its.com' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <JsonLd
        title='HMTC ITS'
        description='Selamat datang di Himpunan Mahasiswa Teknik Computer (HMTC) ITS — workshop, galeri, blog, dan komunitas mahasiswa Teknik Computer terkemuka.'
      />
      <LandingPage />
      <Footer />
    </>
  );
}
