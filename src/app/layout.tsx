import '@/styles/globals.css';
import '@/styles/embla.css';

import Providers from '@/app/providers';
import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
import {
  adelphe,
  inter,
  libreCaslon,
  playfairDisplay,
  poppins,
  satoshi,
} from '@/lib/font';
import { cn } from '@/lib/utils';

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
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
