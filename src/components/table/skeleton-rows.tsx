'use client';

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SkeletonRowsProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

function SkeletonCell({ width = 'w-full' }: { width?: string }) {
  return <div className={`h-4 animate-pulse rounded bg-muted ${width}`} />;
}

export function SkeletonRows({
  rows = 5,
  columns = 4,
  showHeader = true,
}: SkeletonRowsProps) {
  return (
    <>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <SkeletonCell width={i === 0 ? 'w-16' : 'w-24'} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
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
        ))}
      </TableBody>
    </>
  );
}
