'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeUserRole as changeUserRoleApi } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { ChangeRoleRequest, UserDetail } from '@/types/profile';

interface ChangeUserRoleVariables {
  userId: string;
  data: ChangeRoleRequest;
}

/**
 * Hook to change user role
 * @param options - Optional callbacks for success and error
 * @returns Mutation object
 */
export function useChangeUserRole(options?: {
  onSuccess?: (data: UserDetail) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<UserDetail, Error, ChangeUserRoleVariables>({
    mutationFn: async ({ userId, data }) => {
      const response = await changeUserRoleApi(userId, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch user detail
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.userId),
      });
      
      // Invalidate users list
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      // Invalidate user requests as role change might affect them
      queryClient.invalidateQueries({
        queryKey: userKeys.requests(variables.userId),
      });

      // Call optional success callback
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      // Call optional error callback
      options?.onError?.(error);
    },
  });
}
