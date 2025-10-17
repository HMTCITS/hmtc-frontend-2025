'use client';

import { useQuery } from '@tanstack/react-query';

/**
 * Client hook to check whether the recruitment schedule is active.
 * Uses the Next.js internal API `/api/schedule` and caches the boolean result.
 */
export function useIsScheduleActive() {
  return useQuery<boolean, Error, boolean>({
    queryKey: ['schedule', 'active'],
    queryFn: async () => {
      const origin =
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const url = new URL('/api/schedule', origin);
      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (!res || !res.ok) throw new Error('Failed to fetch schedule');
      const j = await res.json();
      return !!j.active;
    },
    staleTime: 30_000,
  });
}
