'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  message?: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  message = 'No data available',
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-12 text-center ${className || ''}`}
    >
      {icon && <div className='mb-4 text-muted-foreground'>{icon}</div>}
      <h3 className='mb-2 text-lg font-medium text-foreground'>{message}</h3>
      {description && (
        <p className='mb-4 max-w-sm text-sm text-muted-foreground'>
          {description}
        </p>
      )}
      {action && action}
    </div>
  );
}
