import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Playfair_Display, Poppins } from 'next/font/google';

import clsxm from '@/lib/clsxm';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={clsxm(
        playfair_display.variable,
        poppins.variable,
        'scroll-smooth'
      )}
    >
      <Component {...pageProps} />
    </main>
  );
}
