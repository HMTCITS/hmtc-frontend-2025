import React from 'react';
import Typography from '@/components/Typography';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
  maxButtons?: number;
  className?: string;
};

export function Pagination({
  page,
  totalPages,
  onChange,
  maxButtons = 3,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  // Always show first page
  pages.push(1);

  if (totalPages <= maxButtons + 2) {
    // show all pages (1 .. totalPages)
    for (let i = 2; i <= totalPages; i++) pages.push(i);
  } else {
    const half = Math.floor(maxButtons / 2);
    let start = page - half;
    let end = page + half;

    if (start <= 2) {
      start = 2;
      end = start + maxButtons - 1;
    } else if (end >= totalPages - 1) {
      end = totalPages - 1;
      start = end - maxButtons + 1;
    }

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push('...');

    pages.push(totalPages);
  }

  // Helper renderers/styles to match the visual:
  // - arrows: subtle outline/ghost (just like the design)
  // - normal page: small text button
  // - current page: circular filled badge
  const ArrowBtn = ({ children, onClick, disabled, ariaLabel }: any) => (
    <Button
      size='sm'
      variant='ghost'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'mb-0 flex cursor-pointer items-center justify-center rounded-md p-0',
      )}
    >
      <Typography
        as='span'
        font='adelphe'
        weight='medium'
        variant='s3'
        className='mb-0 text-navy-500'
      >
        {children}
      </Typography>
    </Button>
  );

  return (
    <nav
      className={cn('flex items-center gap-6', className)}
      aria-label='Pagination'
    >
      <div className='flex items-center gap-3'>
        <ArrowBtn
          onClick={() => onChange(1)}
          disabled={page === 1}
          ariaLabel='First page'
        >
          <ChevronsLeft strokeWidth={2.5} width={24} className='mb-0' />
        </ArrowBtn>

        <ArrowBtn
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          ariaLabel='Previous page'
        >
          <ChevronLeft strokeWidth={2.5} width={24} className='mb-0' />
        </ArrowBtn>
      </div>

      <div className='flex items-center gap-2'>
        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            p === page ? (
              // current page: circular filled badge
              <button
                key={idx}
                onClick={() => onChange(p)}
                aria-current='page'
                aria-label={`Page ${p}`}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-navy-500 shadow-sm'
              >
                <Typography
                  as='span'
                  font='adelphe'
                  weight='bold'
                  variant='s3'
                  className='mb-0 translate-y-0.25 !leading-none text-white'
                >
                  {p}
                </Typography>
              </button>
            ) : (
              // normal page button
              <button
                key={idx}
                onClick={() => onChange(p)}
                aria-label={`Page ${p}`}
                className='translate-y-0.25 cursor-pointer rounded-md px-2.5 hover:bg-gray-100'
              >
                <Typography
                  as='span'
                  font='adelphe'
                  weight='bold'
                  variant='s3'
                  className='translate-y-0.25 !leading-none text-navy-500'
                >
                  {p}
                </Typography>
              </button>
            )
          ) : (
            // ellipsis
            <Typography
              as='span'
              font='adelphe'
              weight='medium'
              variant='s3'
              className='px-2 !leading-none text-muted-foreground select-none'
              key={idx}
            >
              {p}
            </Typography>
          ),
        )}
      </div>
      <div className='flex items-center gap-3'>
        <ArrowBtn
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          ariaLabel='Next page'
        >
          <ChevronRight strokeWidth={2.5} width={24} />
        </ArrowBtn>

        <ArrowBtn
          onClick={() => onChange(totalPages)}
          disabled={page === totalPages}
          ariaLabel='Last page'
        >
          <ChevronsRight strokeWidth={2.5} width={24} />
        </ArrowBtn>
      </div>
    </nav>
  );
}
