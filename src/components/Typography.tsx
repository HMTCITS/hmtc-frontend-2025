import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Maps typography variant keys to Tailwind CSS classes.
 */
const TYPOGRAPHY_VARIANT_CLASSES = {
  k0: 'text-4xl font-bold leading-none md:text-[80px]',
  k1: 'text-[2rem] font-extrabold leading-tight md:text-[3.25rem]',
  k2: 'text-4xl font-bold md:text-[3.25rem]',
  j0: 'font-bold md:text-5xl',
  j1: 'text-4xl font-bold',
  j2: 'text-3xl font-bold',
  i1: 'font-bold md:text-2xl',
  i2: 'text-xl font-bold',
  h1: 'font-semibold md:text-2xl',
  h2: 'text-lg font-semibold md:text-xl',
  h3: 'text-lg font-semibold',
  h4: 'text-base font-semibold',
  h5: 'text-sm font-semibold',
  s0: 'font-medium md:text-xl',
  s1: 'font-medium md:text-lg',
  s2: 'font-medium md:text-base',
  s3: 'text-sm font-medium',
  s4: 'text-xs font-medium',
  b1: 'font-normal md:text-lg',
  b2: 'text-base font-normal',
  b3: 'text-base font-light',
  b4: 'text-sm font-normal',
  b5: 'text-sm font-light',
  c0: 'text-xs font-normal',
  c1: 'text-xs font-light',
  c2: 'text-[11px] leading-[14px]',
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANT_CLASSES;

/**
 * Maps font family keys to Tailwind CSS classes.
 */
const FONT_FAMILY_CLASSES = {
  poppins: 'font-poppins',
  satoshi: 'font-satoshi',
  adelphe: 'font-adelphe',
  libre: 'font-libre',
  inter: 'font-inter',
  playfair: 'font-playfairDisplay',
} as const;

export type FontFamily = keyof typeof FONT_FAMILY_CLASSES;

/**
 * Maps font weight keys to Tailwind CSS classes.
 */
const FONT_WEIGHT_CLASSES = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
} as const;

export type FontWeight = keyof typeof FONT_WEIGHT_CLASSES;

///////////////////////////////////////////////////////////////////////////////

/**
 * Props for the Typography component.
 *
 * @template T - The HTML element type.
 */
export type TypographyProps<T extends React.ElementType> = {
  /**
   * The HTML tag or component to render.
   * @default 'p'
   */
  as?: T;
  /**
   * The content to display.
   */
  children: React.ReactNode;
  /**
   * Font weight. Acceptable values: 'thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'.
   * @default 'regular'
   */
  weight?: FontWeight;
  /**
   * Font family. Acceptable values: 'poppins', 'satoshi', 'adelphe', 'libre', 'inter', 'playfair'.
   * @default 'poppins'
   */
  font?: FontFamily;
  /**
   * Typography variant determines the text size and style.
   * Acceptable values are defined in TypographyVariant.
   * @default 'b2'
   */
  variant?: TypographyVariant;
  /**
   * Additional CSS classes.
   */
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  'as' | 'children' | 'weight' | 'font' | 'variant' | 'className'
>;

///////////////////////////////////////////////////////////////////////////////

/**
 * Typography component for consistent text styling.
 *
 * @example
 * <Typography as="h1" weight="bold" font="poppins" variant="k1" className="mb-4">
 *   Hello World!
 * </Typography>
 */
export default function Typography<T extends React.ElementType = 'p'>({
  as,
  children,
  weight = 'regular',
  font = 'poppins',
  variant = 'b2',
  className,
  ...rest
}: TypographyProps<T>) {
  const Component = as || 'p';

  // Compose the final className from the variant, font family, font weight, and any additional classes.
  const classes = cn(
    TYPOGRAPHY_VARIANT_CLASSES[variant],
    FONT_FAMILY_CLASSES[font],
    FONT_WEIGHT_CLASSES[weight],
    className,
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
