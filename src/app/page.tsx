import { Metadata } from 'next';

import LandingPage from '@/app/landing/LandingPage';
import JsonLd from '@/components/JsonLd';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'HMTC ITS | Organisasi Mahasiswa Teknik Komputer ITS',
    template: '%s | HMTC ITS',
  },
  description:
    'Selamat datang di Himpunan Mahasiswa Teknik Komputer (HMTC) ITS — workshop, galeri, blog, dan komunitas mahasiswa teknik komputer terkemuka.',
  alternates: { canonical: 'https://hmtc-its.com' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <JsonLd
        title='HMTC ITS'
        description='Selamat datang di Himpunan Mahasiswa Teknik Komputer (HMTC) ITS — workshop, galeri, blog, dan komunitas mahasiswa teknik komputer terkemuka.'
      />
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
}
