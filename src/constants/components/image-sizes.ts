// Shared image size presets (server-safe). Do NOT import from client-only component files in RSC.
export const ImageSizes = {
  Square: {
    sm: { width: 64, height: 64 },
    md: { width: 128, height: 128 },
    lg: { width: 256, height: 256 },
    xl: { width: 512, height: 512 },
  },
  Widescreen: {
    sm: { width: 256, height: 144 },
    md: { width: 640, height: 360 },
    lg: { width: 1280, height: 720 },
    xl: { width: 1920, height: 1080 },
  },
  Standard: {
    sm: { width: 256, height: 192 },
    md: { width: 640, height: 480 },
    lg: { width: 1024, height: 768 },
    xl: { width: 1600, height: 1200 },
  },
} as const;

export type ImageSizeCategory = keyof typeof ImageSizes;
export type ImageSizeKey<C extends ImageSizeCategory> =
  keyof (typeof ImageSizes)[C];
