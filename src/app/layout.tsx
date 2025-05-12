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
    'HMTC',
    'HMTC ITS',
    'Himpunan Mahasiswa Teknik Komputer',
    'Institut Teknologi Sepuluh Nopember',
    'ITS',
    'Himpunan Mahasiswa Teknik Komputer ITS',
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
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
    other: [{ rel: 'mask-icon', url: '/favicon.ico', color: '#ff6600' }],
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
