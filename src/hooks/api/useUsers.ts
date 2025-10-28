'use client';

import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { UserDetail } from '@/types/profile';

interface UseUsersParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}

interface UsersResponse {
  users: UserDetail[];
  total: number;
}

/**
 * Hook to fetch all users (for admin)
 * @param params - Optional query parameters for filtering and pagination
 * @param options - Optional query options
 * @returns Query result with users list
 */
export function useUsers(
  params?: UseUsersParams,
  options?: {
    enabled?: boolean;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  },
) {
  return useQuery<UsersResponse, Error>({
    queryKey: userKeys.list(params || {}),
    queryFn: async () => {
      const response = await getAllUsers(params);
      return response.data;
    },
    enabled: options?.enabled !== false,
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
