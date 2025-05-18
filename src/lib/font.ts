import localFont from 'next/font/local';

/**
 * Font configuration for the Adelphe Family.
 * Ensure these files are located at: public/fonts/adelphe/
 */
export const adelphe = localFont({
  src: [
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealBoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealSemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealSemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-adelphe',
});

/**
 * Font configuration for the Satoshi Family.
 * Files should be located in: public/fonts/satoshi/
 */
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/satoshi/Satoshi-Variable.woff2',
    //   weight: 'variable',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/satoshi/Satoshi-VariableItalic.woff2',
    //   weight: 'variable',
    //   style: 'italic',
    // },
  ],
  variable: '--font-satoshi',
});
