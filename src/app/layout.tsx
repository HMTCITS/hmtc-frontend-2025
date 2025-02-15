"use client"

import '@/styles/globals.css';
import '@/styles/embla.css';

import { Playfair_Display, Poppins } from 'next/font/google';
import cn from '@/lib/clsxm';

import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { useState } from 'react';

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-fairplay-display',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <html lang='id'>
      <body
        className={cn(
          playfair_display.variable,
          poppins.variable,
          'scroll-smooth'
        )}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          openSidebar={() => setIsSidebarOpen(true)}
          closeSidebar={() => setIsSidebarOpen(false)}
        />{' '}
        {}
        <main>{children}</main>
        <Footer /> {}
      </body>
    </html>
  );
}
