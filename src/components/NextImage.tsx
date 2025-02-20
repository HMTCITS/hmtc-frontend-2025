'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Props for the NextImage component.
 *
 * When using `layout="fill"`, the `height` prop becomes optional.
 */
export type NextImageProps = {
  /**
   * Enable a skeleton loading effect (with a pulse animation).
   * Avoid using for images with transparent backgrounds.
   *
   * @default false
   */
  useSkeleton?: boolean;
  /**
   * Additional className for the underlying image element.
   */
  imgClassName?: string;
  /**
   * If true, the image source is already a server static path.
   * Otherwise, `/images` will be prepended to the src.
   *
   * @default false
   */
  serverStaticImg?: boolean;
  /**
   * Additional className applied when the image is in a loading (blur) state.
   */
  blurClassName?: string;
  /**
   * Alternative text for the image.
   */
  alt: string;
  /**
   * Width of the image. When a width CSS class (e.g. `w-`) is not provided in `className`,
   * an inline style will be set using this value.
   */
  width: string | number;
} & (
  | { height: string | number; layout?: never }
  | { layout: 'fill'; height?: string | number }
) &
  Omit<ImageProps, 'alt' | 'width' | 'height' | 'layout'>;

/**
 * NextImage is a wrapper around Next.js’ Image component.
 *
 * It optimizes image rendering by optionally displaying a skeleton loading state,
 * and prepending a base path for non-server static images.
 *
 * @param props - NextImageProps
 * @returns A figure element containing a Next.js Image.
 *
 * @example
 * ```tsx
 * // Standard image with skeleton
 * <NextImage
 *   src="/example.jpg"
 *   alt="Example image"
 *   width={400}
 *   height={300}
 *   useSkeleton
 * />
 *
 * @example
 * // Image using layout fill (height is optional)
 * <div className="relative h-64 w-full">
 *   <NextImage
 *     src="/banner.jpg"
 *     alt="Banner image"
 *     layout="fill"
 *     objectFit="cover"
 *   />
 * </div>
 * ```
 */
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
  layout,
  ...rest
}: NextImageProps) {
  // Set initial status to 'loading' if skeleton is enabled; otherwise complete.
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete',
  );

  // If a width CSS class is not provided in className, set inline style.
  const widthIsSet = className?.includes('w-') ?? false;
  const figureStyle = !widthIsSet
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  // Prepend base path to the image src if necessary.
  const imageSrc = serverStaticImg ? src : `/images${src}`;

  // Convert width and height to numbers.
  const resolvedWidth: number =
    typeof width === 'string' ? parseInt(width, 10) : width;
  const resolvedHeight: number | undefined =
    height != null
      ? typeof height === 'string'
        ? parseInt(height, 10)
        : height
      : undefined;

  return (
    <figure style={figureStyle} className={className}>
      <Image
        className={cn(
          imgClassName,
          status === 'loading' && cn('animate-pulse bg-red-50', blurClassName),
        )}
        src={imageSrc}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={alt}
        layout={layout}
        onLoadingComplete={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
}
