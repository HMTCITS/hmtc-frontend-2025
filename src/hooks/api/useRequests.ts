import { useQuery } from '@tanstack/react-query';

import { getRequests } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';
import type { RequestFilters } from '@/types/request';

/**
 * Hook to fetch all requests with optional filters
 * @param filters - Optional filters for requests (status, search, pagination, etc.)
 * @returns React Query result with requests data
 */
export function useRequests(filters?: RequestFilters) {
  return useQuery({
    queryKey: requestKeys.list(filters),
    queryFn: async () => {
      const response = await getRequests(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Type for the hook return value
 */
export type UseRequestsResult = ReturnType<typeof useRequests>;
