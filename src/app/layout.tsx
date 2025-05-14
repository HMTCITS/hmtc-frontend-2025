import '@/styles/globals.css';
import '@/styles/embla.css';

import type { Metadata } from 'next';

import Providers from '@/app/providers';
import {
  adelphe,
  inter,
  libreCaslon,
  playfairDisplay,
  poppins,
  satoshi,
} from '@/lib/font';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://hmtc-its.com'),

  title: {
    default: 'HMTC ITS',
    template: '%s | HMTC ITS',
  },

  description:
    'HMTC ITS • Organisasi Mahasiswa Teknologi dan Kreativitas di ITS—workshop, galeri, blog, dan komunitas mahasiswa.',

  applicationName: 'HMTC ITS',

  keywords: [
    // versi capital
    'HMTC',
    'HMTC ITS',
    'Himpunan Mahasiswa Teknik Komputer',
    'Himpunan Mahasiswa Teknik Komputer ITS',
    'Institut Teknologi Sepuluh Nopember',
    'ITS',

    // versi lowercase
    'hmtc',
    'hmtc its',
    'himpunan mahasiswa teknik komputer',
    'himpunan mahasiswa teknik komputer its',
    'institut teknologi sepuluh nopember',
    'its',

    // long-tail & variasi bahasa Indonesia
    'hmtc its website resmi',
    'komunitas mahasiswa teknik komputer its',
    'kegiatan hmtc its',
    'agenda hmtc its',
    'acara hmtc its',
    'blog hmtc its',
    'berita hmtc its',
    'profil hmtc its',
    'struktur organisasi hmtc its',
    'visi misi hmtc its',
    'kontak hmtc its',
    'pengumuman hmtc its',
    'pengurus hmtc its',
    'galeri hmtc its',
    'dokumentasi hmtc its',

    // long-tail & variasi bahasa Inggris
    'computer engineering student association its',
    'hmtc student community its',
    'hmTC ITS events',
    'hmTC workshop its',
    'hmTC competition its',
    'technical computer student association its',

    // tech & domain-specific
    'hmtc-its.com',
    'sitemap hmtc its',
    'favicon hmtc its',
    'seo nextjs hmtc its',
    'nextjs metadata hmtc its',
  ],

  authors: [
    {
      name: 'HMTC ITS',
      url: 'https://arek.its.ac.id/hmtc/',
    },
  ],

  publisher: 'Institut Teknologi Sepuluh Nopember',

  alternates: {
    canonical: 'https://hmtc-its.com',
  },

  icons: {
    icon: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    other: [{ rel: 'mask-icon', url: '/favicon.ico?v=2', color: '#ff6600' }],
  },

  openGraph: {
    title: 'HMTC ITS',
    description:
      'Organisasi Mahasiswa Teknologi dan Kreativitas di ITS—workshop, galeri, blog, komunitas.',
    url: 'https://hmtc-its.com',
    siteName: 'HMTC ITS',
    images: [
      {
        url: 'https://hmtc-its.com/images/halamandepan.png',
        width: 1440,
        height: 935,
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },

  other: {
    instagram: ['https://www.instagram.com/hmtc_its/'],
    'university-profile': ['https://arek.its.ac.id/hmtc/'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <body
        className={cn(
          playfairDisplay.variable,
          poppins.variable,
          adelphe.variable,
          inter.variable,
          satoshi.variable,
          libreCaslon.variable,
          'scroll-smooth',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
