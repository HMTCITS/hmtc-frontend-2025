'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser as updateUserApi } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { UpdateUserRequest, UserDetail } from '@/types/profile';

interface UpdateUserVariables {
  userId: string;
  data: UpdateUserRequest;
}

/**
 * Hook to update user information
 * @param options - Optional callbacks for success and error
 * @returns Mutation object
 */
export function useUpdateUser(options?: {
  onSuccess?: (data: UserDetail) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<UserDetail, Error, UpdateUserVariables>({
    mutationFn: async ({ userId, data }) => {
      const response = await updateUserApi(userId, data);
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

      // Call optional success callback
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      // Call optional error callback
      options?.onError?.(error);
    },
  });
}
