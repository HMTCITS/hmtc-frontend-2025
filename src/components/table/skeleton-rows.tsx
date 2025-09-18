'use client';

import { TableCell, TableRow } from '@/components/ui/table';

interface SkeletonRowsProps {
  rows?: number;
  columns?: number;
  // showHeader removed (unused)
}

function SkeletonCell({ width = 'w-full' }: { width?: string }) {
  return <div className={`h-4 animate-pulse rounded bg-muted ${width}`} />;
}

export function SkeletonRows({ rows = 5, columns = 4 }: SkeletonRowsProps) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: columns }).map((_, colIndex) => (
        <TableCell key={colIndex}>
          <SkeletonCell
            width={
              colIndex === 0
                ? 'w-8'
                : colIndex === columns - 1
                  ? 'w-20'
                  : 'w-full'
            }
          />
        </TableCell>
      ))}
    </TableRow>
  ));
}
