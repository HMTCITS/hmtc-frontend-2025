'use client';

import { cn } from '@/lib/utils';

export type TrackType = 'request_repository' | 'upload_repository';

interface TrackTypeBadgeProps {
  trackType: TrackType;
  className?: string;
}

const TRACK_TYPE_CONFIG: Record<
  TrackType,
  {
    label: string;
    className: string;
    ariaLabel: string;
  }
> = {
  request_repository: {
    label: 'Request Repository',
    className:
      'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
    ariaLabel:
      'Request Type: Request Repository - Request to access or create a repository',
  },
  upload_repository: {
    label: 'Upload Repository',
    className:
      'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
    ariaLabel:
      'Request Type: Upload Repository - Request to upload content to repository',
  },
};

export default function TrackTypeBadge({
  trackType,
  className,
}: TrackTypeBadgeProps) {
  const config = TRACK_TYPE_CONFIG[trackType];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        config.className,
        className,
      )}
      role='note'
      aria-label={config.ariaLabel}
    >
      {config.label}
    </span>
  );
}
