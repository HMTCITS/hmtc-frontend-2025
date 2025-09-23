'use client';

import { cn } from '@/lib/utils';
import type { StatusBadgeProps } from '@/types/data-table';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  'in-review': {
    label: 'In Review',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const config = statusConfig[status];

  if (!config) {
    return <span className='text-sm'>Unknown</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium',
        config.className,
        variant === 'outline' && 'bg-transparent',
      )}
    >
      {config.label}
    </span>
  );
}
