import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Maps typography variant keys to Tailwind CSS classes.
 *
 * ## Variant Documentation (px → rem, weight in integer)
 *
 * ### k0
 * - Base Size: `text-4xl` ≈ 36px ≈ 2.25rem
 * - Weight: **bold** (700)
 * - Leading: **leading-none** (line-height: 1)
 * - md: `text-[80px]` = 80px = 5rem
 *
 * ### k1
 * - Base Size: `text-[2rem]` = 32px = 2rem
 * - Weight: **extrabold** (800)
 * - Leading: **leading-tight** (≈1.25)
 * - md: `text-[3.25rem]` ≈ 52px ≈ 3.25rem
 *
 * ### k2
 * - Base Size: `text-4xl` ≈ 36px ≈ 2.25rem
 * - Weight: **bold** (700)
 * - md: `text-[3.25rem]` ≈ 52px ≈ 3.25rem
 *
 * ### j0
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - md: `text-5xl` ≈ 48px = 3rem
 * - Weight: **bold** (700)
 *
 * ### j1
 * - Base Size: `text-4xl` ≈ 36px ≈ 2.25rem
 * - Weight: **bold** (700)
 *
 * ### j2
 * - Base Size: `text-3xl` ≈ 30px ≈ 1.875rem
 * - Weight: **bold** (700)
 *
 * ### i1
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - md: `text-2xl` ≈ 24px ≈ 1.5rem
 * - Weight: **bold** (700)
 *
 * ### i2
 * - Base Size: `text-xl` ≈ 20px ≈ 1.25rem
 * - Weight: **bold** (700)
 *
 * ### h1
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - md: `text-2xl` ≈ 24px ≈ 1.5rem
 * - Weight: **semibold** (600)
 *
 * ### h2
 * - Base Size: `text-lg` ≈ 18px ≈ 1.125rem
 * - Weight: **semibold** (600)
 * - md: `text-xl` ≈ 20px ≈ 1.25rem
 *
 * ### h3
 * - Base Size: `text-lg` ≈ 18px ≈ 1.125rem
 * - Weight: **semibold** (600)
 *
 * ### h4
 * - Base Size: `text-base` ≈ 16px = 1rem
 * - Weight: **semibold** (600)
 *
 * ### h5
 * - Base Size: `text-sm` ≈ 14px = 0.875rem
 * - Weight: **semibold** (600)
 *
 * ### s0
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - Weight: **medium** (500)
 * - md: `text-xl` ≈ 20px ≈ 1.25rem
 *
 * ### s1
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - Weight: **medium** (500)
 * - md: `text-lg` ≈ 18px ≈ 1.125rem
 *
 * ### s2
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - Weight: **medium** (500)
 * - md: `text-base` (tetap 16px = 1rem, tidak berubah secara signifikan)
 *
 * ### s3
 * - Base Size: `text-sm` ≈ 14px = 0.875rem
 * - Weight: **medium** (500)
 *
 * ### s4
 * - Base Size: `text-xs` ≈ 12px = 0.75rem
 * - Weight: **medium** (500)
 *
 * ### b1
 * - Base Size: (default `text-base` ≈ 16px = 1rem)
 * - Weight: **normal** (400)
 * - md: `text-lg` ≈ 18px ≈ 1.125rem
 *
 * ### b2
 * - Base Size: `text-base` ≈ 16px = 1rem
 * - Weight: **normal** (400)
 *
 * ### b3
 * - Base Size: `text-base` ≈ 16px = 1rem
 * - Weight: **light** (300)
 *
 * ### b4
 * - Base Size: `text-sm` ≈ 14px = 0.875rem
 * - Weight: **normal** (400)
 *
 * ### b5
 * - Base Size: `text-sm` ≈ 14px = 0.875rem
 * - Weight: **light** (300)
 *
 * ### c0
 * - Base Size: `text-xs` ≈ 12px = 0.75rem
 * - Weight: **normal** (400)
 *
 * ### c1
 * - Base Size: `text-xs` ≈ 12px = 0.75rem
 * - Weight: **light** (300)
 *
 * ### c2
 * - Base Size: `text-[11px]` = 11px ≈ 0.6875rem
 * - Leading: `leading-[14px]` ≈ 0.875rem line-height
 * - Weight: **normal** (400) by default
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
   * Font weight. Acceptable values: 'thin', 'extralight', 'light', 'regular',
   * 'medium', 'semibold', 'bold', 'extrabold', 'black'.
   * @default 'regular'
   */
  weight?: FontWeight;
  /**
   * Font family. Acceptable values: 'poppins', 'satoshi', 'adelphe', 'libre',
   * 'inter', 'playfair'.
   * @default 'poppins'
   */
  font?: FontFamily;
  /**
   * Typography variant determines the text size and style.
   * Acceptable values are defined in {@link TYPOGRAPHY_VARIANT_CLASSES}.
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
