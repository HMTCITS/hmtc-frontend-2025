import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import cn from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'secondary',
  'warning',
  'netral',
  'unstyled',
  'light',
}

enum ButtonSize {
  'small',
  'base',
  'large',
}

export type ButtonProps = {
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  isLoading?: boolean;
  icon?: IconType;
  leftIcon?: IconType;
  rightIcon?: IconType;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          'flex items-center justify-center',
          'focus:outline-none focus-visible:outline',
          'font-semibold transition-colors duration-75',
          'disabled:cursor-not-allowed',
          [
            size === 'small' && [
              'min-h-[1.75rem] md:min-h-[2rem]',
              'gap-1 px-4 py-1.5 text-xs md:text-sm',
              LeftIcon && 'pl-2.5',
              RightIcon && 'pr-2.5',
              Icon &&
                'min-w-[1.75rem] rounded-full p-0 text-sm md:min-w-[2rem] md:text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] md:min-h-[2.5rem]',
              'gap-2 px-5 py-2 text-sm md:text-base',
              LeftIcon && 'pl-3',
              RightIcon && 'pr-3',
              Icon &&
                'min-w-[2.25rem] rounded-full p-0 text-base md:min-w-[2.5rem] md:text-lg',
            ],
            size === 'large' && [
              'min-h-[2.75rem] md:min-h-[3rem]',
              'gap-3 px-6 py-2.5 text-base',
              LeftIcon && 'pl-3.5',
              RightIcon && 'pr-3.5',
              Icon &&
                'min-w-[2.75rem] rounded-full p-0 text-[19px] md:min-w-[3rem] md:text-[22px]',
            ],
          ],
          [
            variant === 'primary' && [
              'bg-blue-main text-white',
              'hover:bg-blue-dark-1 disabled:bg-blue-dark-2',
            ],
            variant === 'secondary' && [
              'bg-white text-orange-main',
              'hover:bg-zinc-100 disabled:bg-zinc-200',
            ],
            variant === 'netral' && [
              'bg-white text-base-dark',
              'ring-2 ring-black-main',
              'hover:bg-zinc-100 disabled:bg-zinc-200',
            ],
            variant === 'light' && [
              'bg-white text-base-dark',
              'hover:bg-base-subtle hover:text-white disabled:bg-zinc-200',
            ],
          ],
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              variant === 'primary' && 'text-white',
              variant === 'secondary' && 'text-orange-main',
              variant === 'netral' && 'text-base-dark'
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {Icon && <Icon className={cn(iconClassName)} />}
        {LeftIcon && !Icon && <LeftIcon className={cn(leftIconClassName)} />}
        {!Icon && (
          <p className={cn('font-secondary', textClassName)}>{children}</p>
        )}
        {RightIcon && !Icon && <RightIcon className={cn(rightIconClassName)} />}
      </button>
    );
  }
);

export default Button;
