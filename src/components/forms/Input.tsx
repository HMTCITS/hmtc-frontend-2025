import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import { cn } from '@/lib/utils';

export type InputProps = {
  label: string | null;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
  readOnly?: boolean;
  // disabling error msg not error validation
  hideError?: boolean;
  validation?: RegisterOptions;
  leftIcon?: IconType | string;
  inputWithLeftIconClassName?: string;
  rightNode?: React.ReactNode;
  addon?: string;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  id,
  placeholder = '',
  helperText,
  type = 'text',
  disabled,
  readOnly = false,
  hideError = false,
  validation,
  leftIcon: LeftIcon,
  inputWithLeftIconClassName,
  addon,
  rightNode,
  containerClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={containerClassName}>
      {withLabel && (
        <label className='text-typo-main font-medium' htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative',
          withLabel && 'mt-1',
          addon && 'flex rounded-lg shadow-sm',
          'text-mid md:text-mid',
        )}
      >
        {addon && (
          <div
            className={cn(
              'pointer-events-auto flex min-h-full items-center rounded-l-lg px-3.5',
              'bg-stone-100 text-stone-600',
              'border border-r-0 border-gray-300',
            )}
          >
            <p>{addon}</p>
          </div>
        )}
        {LeftIcon && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5'>
            {typeof LeftIcon === 'string' ? (
              <p className='text-typo-main'>{LeftIcon}</p>
            ) : (
              <LeftIcon size='1em' className='text-xl text-stone-500' />
            )}
          </div>
        )}
        <input
          {...register(id, validation)}
          {...rest}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          name={id}
          id={id}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={cn(
            'flex w-full rounded-md shadow-sm',
            'min-h-[2.25rem] md:min-h-[2.5rem]',
            'text-typo-dark border border-gray-300 px-3.5 py-0 caret-stone-600',
            'ring-stone-400 focus:outline-none focus:ring-2 focus:ring-offset-2',
            (readOnly || disabled) && [
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            ],
            error &&
              'border-red-500 caret-red-600 focus:border-red-500 focus:ring-red-500',
            LeftIcon && ['pl-10', inputWithLeftIconClassName],
            rightNode && 'pr-10',
            addon && 'rounded-l-none shadow-none',
          )}
          aria-describedby={id}
        />

        {type === 'password' && (
          <button
            type='button'
            onClick={togglePassword}
            className={cn(
              'absolute right-0 top-1/2 mr-3 -translate-y-1/2',
              'flex h-6 w-6 items-center justify-center rounded-md',
              'focus:outline-none focus:ring focus:ring-stone-500',
              'text-lg text-stone-400 hover:text-stone-500',
            )}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        )}
        {rightNode && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {rightNode}
          </div>
        )}
      </div>
      {helperText && (
        <p className='mt-1.5 text-xs text-stone-500'>{helperText}</p>
      )}
      {!hideError && error && (
        <p className='mt-1.5 text-xs text-red-500'>
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}
