import { Metadata } from 'next';

import LandingPage from '@/app/landing/LandingPage';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';

export const metadata: Metadata = {
  title: { default: 'Beranda', template: '%s • HMTC ITS' },
  description:
    'Selamat datang di Himpunan Mahasiswa Teknik Komputer (HMTC) ITS — workshop, galeri, blog, dan komunitas mahasiswa.',
  alternates: { canonical: 'https://hmtc-its.com' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
}
