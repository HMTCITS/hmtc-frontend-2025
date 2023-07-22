import * as React from 'react';

import clsxm from '@/lib/clsxm';

export enum TypographyVariant {
  'k0',
  'k1',
  'k2',
  'j0',
  'j1',
  'j2',
  'i1',
  'i2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  's0',
  's1',
  's2',
  's3',
  's4',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'c0',
  'c1',
  'c2',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType = 'p'>({
  as,
  children,
  className,
  variant = 'b2',
  ...rest
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === 'k0' && [
            'text-4xl font-bold leading-none md:text-[80px]',
          ],
          variant === 'k1' && [
            'text-[2rem] font-extrabold leading-tight md:text-[3.25rem]',
          ],
          variant === 'k2' && ['text-4xl font-bold md:text-[3.25rem]'],
          variant === 'j0' && ['text-5xl font-bold'],
          variant === 'j1' && ['text-4xl font-bold'],
          variant === 'j2' && ['text-3xl font-bold'],
          variant === 'i1' && ['font-bold md:text-2xl'],
          variant === 'i2' && ['text-xl font-bold'],
          variant === 'h1' && ['font-semibold md:text-2xl'],
          variant === 'h2' && ['text-lg font-semibold md:text-xl'],
          variant === 'h3' && ['text-lg font-semibold'],
          variant === 'h4' && ['text-base font-semibold'],
          variant === 'h5' && ['text-sm font-semibold'],
          variant === 's0' && ['font-medium md:text-xl'],
          variant === 's1' && ['font-medium md:text-lg'],
          variant === 's2' && ['font-medium md:text-base'],
          variant === 's3' && ['text-sm font-medium'],
          variant === 's4' && ['text-xs font-medium'],
          variant === 'b1' && ['font-normal md:text-lg'],
          variant === 'b2' && ['text-base font-normal'],
          variant === 'b3' && ['text-base font-light'],
          variant === 'b4' && ['text-sm font-normal'],
          variant === 'b5' && ['text-sm font-light'],
          variant === 'c0' && ['text-xs font-normal'],
          variant === 'c1' && ['text-xs font-light'],
          variant === 'c2' && ['text-[11px] leading-[14px]'],
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
