'use client';

import { cn } from '@/lib/utils';

export type RequestStatus = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  RequestStatus,
  {
    label: string;
    variant: 'primary' | 'amber' | 'destructive';
    className: string;
    ariaLabel: string;
  }
> = {
  pending: {
    label: 'In Review',
    variant: 'primary',
    className: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
    ariaLabel: 'Status: In Review - Request is currently being reviewed',
  },
  approved: {
    label: 'Approved',
    variant: 'amber',
    className:
      'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200',
    ariaLabel: 'Status: Approved - Request has been approved',
  },
  rejected: {
    label: 'Rejected',
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
    ariaLabel: 'Status: Rejected - Request has been rejected',
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        config.className,
        className,
      )}
      role='status'
      aria-label={config.ariaLabel}
    >
      {config.label}
    </span>
  );
}
