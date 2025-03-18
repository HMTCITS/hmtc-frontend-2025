'use client';
import Image, { ImageProps, StaticImageData } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

type NextImageProps = {
  /** Enable skeleton loading animation while image loads */
  useSkeleton?: boolean;
  /** Additional className for the image element */
  imgClassName?: string;
  /** If true, uses the src directly without '/images' prefix */
  serverStaticImg?: boolean;
  /** Custom className for the blur placeholder */
  blurClassName?: string;
  /** Alternative text for the image (required for accessibility) */
  alt: string;
  /** Fallback image source if the primary image fails to load */
  onErrorSrc?: string;
  /** Marks the image as a high priority resource for loading */
  priority?: boolean;
  /** Use vector format for SVG images (preserves quality) */
  isVector?: boolean;
  /** Custom placeholder color (Tailwind class without the bg- prefix) */
  placeholderColor?: string;
  /** Optional callback when image successfully loads */
  onLoadingComplete?: () => void;
  /** Enables Next.js image optimization (disabled for SVGs by default) */
  unoptimized?: boolean;
} & (
  | { fill?: false; width: string | number; height: string | number }
  | { fill: true; width?: never; height?: never }
) &
  Omit<ImageProps, 'src' | 'onLoadingComplete'> & {
    src: string | StaticImageData;
  };

export default function NextImage({
  useSkeleton = false,
  serverStaticImg = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  onErrorSrc,
  priority = false,
  isVector = false,
  placeholderColor = 'gray-200',
  onLoadingComplete,
  unoptimized: userUnoptimized,
  fill,
  ...rest
}: NextImageProps) {
  // Tentukan status loading untuk skeleton effect
  const [status, setStatus] = React.useState<'loading' | 'complete' | 'error'>(
    useSkeleton ? 'loading' : 'complete',
  );

  // Cek apakah lebar sudah didefinisikan lewat className
  const widthIsSet = className?.includes('w-') ?? false;

  // Ekstrak source URL dari string atau StaticImageData
  const srcString = typeof src === 'string' ? src : src.src;

  // Cek apakah gambar adalah SVG
  const isSvg = React.useMemo(
    () => srcString?.toLowerCase().endsWith('.svg'),
    [srcString],
  );

  // Tentukan apakah optimasi Next.js harus dimatikan (untuk SVG atau jika diminta)
  const unoptimized = userUnoptimized ?? (isVector || isSvg);

  // Format URL gambar sesuai pengaturan
  const imageSrc = React.useMemo(() => {
    if (typeof src !== 'string') {
      return src;
    }
    if (
      src.startsWith('data:') ||
      src.startsWith('http') ||
      src.startsWith('/icons') ||
      serverStaticImg
    ) {
      return src;
    }
    return `/images${src.startsWith('/') ? src : `/${src}`}`;
  }, [src, serverStaticImg]);

  // Tentukan apakah mode fill aktif
  const isFillLayout = fill === true;

  // Handler saat gambar berhasil dimuat
  const handleImageLoad = () => {
    setStatus('complete');
    onLoadingComplete?.();
  };

  // Handler saat terjadi error saat memuat gambar
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    setStatus('error');
    if (onErrorSrc) {
      const imgElement = e.currentTarget as HTMLImageElement;
      imgElement.src = onErrorSrc;
    }
  };

  // Bangun properti untuk <Image>
  const imageProps: ImageProps = {
    src: imageSrc,
    alt: alt || 'Image',
    priority,
    onLoad: handleImageLoad,
    onError: handleImageError,
    unoptimized,
    loading: priority ? 'eager' : 'lazy',
    className: cn(
      'h-full w-full',
      status === 'loading' &&
        cn('animate-pulse', `bg-${placeholderColor}`, blurClassName),
      isVector && 'drop-shadow-none',
      imgClassName,
    ),
    ...rest,
  };

  if (!isFillLayout) {
    imageProps.width = width;
    imageProps.height = height;
  } else {
    imageProps.fill = true;
    if (!imageProps.sizes) {
      imageProps.sizes = '100vw';
    }
  }

  return (
    <figure
      style={
        !widthIsSet && !isFillLayout && typeof width === 'number'
          ? { width: `${width}px` }
          : undefined
      }
      className={cn('relative', className)}
    >
      <Image {...imageProps} />

      {status === 'error' && !onErrorSrc && (
        <div
          className='absolute inset-0 flex items-center justify-center rounded border border-gray-200 bg-gray-100'
          style={{ width, height }}
        >
          <Image
            src='/icons/ban.svg'
            width={64}
            height={64}
            alt='Error indicator'
            className='h-1/4 w-1/4'
          />
        </div>
      )}
    </figure>
  );
}

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
};
