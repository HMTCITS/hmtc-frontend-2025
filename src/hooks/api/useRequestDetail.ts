import { useQuery } from '@tanstack/react-query';

import { getRequestById } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';

/**
 * Hook to fetch request detail by ID
 * @param id - The request ID
 * @param enabled - Whether the query should run (default: true)
 * @returns React Query result with request detail data
 */
export function useRequestDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: requestKeys.detail(id),
    queryFn: async () => {
      const response = await getRequestById(id);
      return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Type for the hook return value
 */
export type UseRequestDetailResult = ReturnType<typeof useRequestDetail>;
