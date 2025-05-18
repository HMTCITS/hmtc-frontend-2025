import { Metadata } from 'next';

import InfoPage from '@/app/info/containerr/infoPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Info Kontak & Media Sosial HMTC ITS',
  description:
    'Temukan semua link penting HMTC ITS: Media Partner, Instagram, WhatsApp, Line OA, Twitter, Facebook, YouTube, Issuu, dan Website resmi HMTC ITS (Himpunan Mahasiswa Teknik Komputer-Informatika ITS Surabaya).',
  keywords: [
    'HMTC ITS',
    'Himpunan Mahasiswa Teknik Komputer',
    'Info Kontak HMTC',
    'Media Sosial HMTC',
    'Instagram HMTC ITS',
    'WhatsApp HMTC',
    'Twitter HMTC',
    'Facebook HMTC',
    'YouTube HMTC',
    'Issuu HMTC',
    'Website HMTC',
    'ITS Surabaya',
  ],
  alternates: {
    canonical: 'https://hmtc-its.com/info',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Info Kontak & Media Sosial HMTC ITS',
    description:
      'Temukan semua link penting HMTC ITS: Media Partner, Instagram, WhatsApp, Line OA, Twitter, Facebook, YouTube, Issuu, dan Website resmi HMTC ITS (Himpunan Mahasiswa Teknik Komputer-Informatika ITS Surabaya).',
    url: 'https://hmtc-its.com/info',
    siteName: 'HMTC ITS',
    images: [
      {
        url: 'https://hmtc-its.com/images/logo-hmtc-info.jpg',
        width: 512,
        height: 512,
        alt: 'Logo HMTC ITS',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary',
    title: 'Info Kontak & Media Sosial HMTC ITS',
    description:
      'Link resmi media sosial, WhatsApp, Line, dan kontak HMTC ITS (Himpunan Mahasiswa Teknik Komputer-Informatika ITS Surabaya).',
    images: ['https://hmtc-its.com/images/logo-hmtc-info.jpg'],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        title='Info Kontak & Media Sosial HMTC ITS'
        description='Temukan semua link penting HMTC ITS: Media Partner, Instagram, WhatsApp, Line OA, Twitter, Facebook, YouTube, Issuu, dan Website resmi HMTC ITS (Himpunan Mahasiswa Teknik Komputer-Informatika ITS Surabaya).'
      />
      <InfoPage />
    </>
  );
}
