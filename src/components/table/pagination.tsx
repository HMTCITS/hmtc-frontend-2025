'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaginationProps } from '@/types/data-table';

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='outline'
        size='sm'
        onClick={() => onChange(page - 1)}
        disabled={!canGoPrevious}
        aria-label='Go to previous page'
      >
        Previous
      </Button>

      {visiblePages.map((pageNum, index) =>
        typeof pageNum === 'number' ? (
          <Button
            key={pageNum}
            variant={page === pageNum ? 'default' : 'outline'}
            size='sm'
            onClick={() => onChange(pageNum)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={page === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </Button>
        ) : (
          <span key={index} className='px-2 text-sm text-muted-foreground'>
            {pageNum}
          </span>
        ),
      )}

      <Button
        variant='outline'
        size='sm'
        onClick={() => onChange(page + 1)}
        disabled={!canGoNext}
        aria-label='Go to next page'
      >
        Next
      </Button>
    </div>
  );
}
