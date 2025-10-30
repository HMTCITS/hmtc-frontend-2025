'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { UserDetail } from '@/types/profile';

/**
 * Hook to fetch user detail by ID
 * @param userId - The ID of the user to fetch
 * @param options - Optional query options
 * @returns Query result with user detail
 */
export function useUserDetail(
  userId: string,
  options?: {
    enabled?: boolean;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  },
) {
  return useQuery<UserDetail, Error>({
    queryKey: userKeys.detail(userId),
    queryFn: async () => {
      const response = await getUserById(userId);
      return response.data;
    },
    enabled: options?.enabled !== false && !!userId,
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
