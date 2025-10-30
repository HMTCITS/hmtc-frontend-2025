'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserRequests } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { UserRequestsResponse } from '@/types/profile';

interface UseUserRequestsParams extends Record<string, unknown> {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}

/**
 * Hook to fetch user requests (role changes, data updates, etc.)
 * @param userId - The ID of the user
 * @param params - Optional query parameters
 * @param options - Optional query options
 * @returns Query result with user requests
 */
export function useUserRequests(
  userId: string,
  params?: UseUserRequestsParams,
  options?: {
    enabled?: boolean;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  },
) {
  return useQuery<UserRequestsResponse, Error>({
    queryKey: userKeys.requestsList(userId, params || {}),
    queryFn: async () => {
      const response = await getUserRequests(userId, params);
      return response.data;
    },
    enabled: options?.enabled !== false && !!userId,
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
