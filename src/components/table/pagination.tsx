import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    // Show all pages if not enough for ellipsis
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

    // Ellipsis after first page
    if (start > 2) pages.push('...');
    // Middle page numbers
    for (let i = start; i <= end; i++) pages.push(i);
    // Ellipsis before last page
    if (end < totalPages - 1) pages.push('...');
    // Always show last page
    pages.push(totalPages);
  }

  return (
    <nav
      className={cn('flex flex-wrap items-center gap-2', className)}
      aria-label='Pagination'
    >
      <Button
        size='sm'
        variant='outline'
        onClick={() => onChange(1)}
        disabled={page === 1}
      >
        «
      </Button>
      <Button
        size='sm'
        variant='outline'
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ‹
      </Button>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <Button
            key={idx}
            size='sm'
            variant={p === page ? 'default' : 'outline'}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </Button>
        ) : (
          <span
            key={idx}
            className='px-2 text-sm text-muted-foreground select-none'
          >
            {p}
          </span>
        ),
      )}

      <Button
        size='sm'
        variant='outline'
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </Button>
      <Button
        size='sm'
        variant='outline'
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
      >
        »
      </Button>
    </nav>
  );
}
