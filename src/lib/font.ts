import localFont from 'next/font/local';

/**
 * Font configuration for the Adelphe Family.
 * Ensure these files are located at: public/fonts/adelphe/
 */
export const adelphe = localFont({
  src: [
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adelphe/Adelphe-FlorealSemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-adelphe',
});

/**
 * Font configuration for the Helvetica Neue Family.
 * Verify that the folder name "helevtica-neue" is intentional.
 */
export const helveticaNeue = localFont({
  src: [
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueBlack.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueBlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueHeavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueHeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueLightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueMediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueThin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueUltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helevtica-neue/HelveticaNeueUltraLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: '--font-helveticaNeue',
});

/**
 * Font configuration for the Libre Caslon Family.
 * Files should be located in: public/fonts/libre-caslon/
 */
export const libreCaslon = localFont({
  src: [
    {
      path: '../../public/fonts/libre-caslon/LibreCaslonText-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/libre-caslon/LibreCaslonText-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/libre-caslon/LibreCaslonText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-libreCaslon',
});

/**
 * Font configuration for the Satoshi Family.
 * Files should be located in: public/fonts/satoshi/
 */
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/satoshi/Satoshi-Variable.ttf',
    //   weight: 'variable',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/satoshi/Satoshi-VariableItalic.ttf',
    //   weight: 'variable',
    //   style: 'italic',
    // },
  ],
  variable: '--font-satoshi',
});

/**
 * Font configuration for the Inter Family.
 * Files should be located in: public/fonts/Inter/
 */
export const inter = localFont({
  src: [
    // Variable fonts
    // {
    //   path: '../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
    //   weight: 'variable',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
    //   weight: 'variable',
    //   style: 'italic',
    // },
    // 18pt variants
    {
      path: '../../public/fonts/Inter/Inter_18pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_18pt-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    // 24pt variants
    {
      path: '../../public/fonts/Inter/Inter_24pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_24pt-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    // 28pt variants
    {
      path: '../../public/fonts/Inter/Inter_28pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter/Inter_28pt-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
});

/**
 * Font configuration for the Playfair Display Family.
 * Files should be located in: public/fonts/playfair-display/
 */
export const playfairDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-PlayfairDisplay',
});

/**
 * Font configuration for the Poppins Family.
 * Files should be located in: public/fonts/poppins/
 */
export const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/poppins/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/poppins/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins/Poppins-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
});
