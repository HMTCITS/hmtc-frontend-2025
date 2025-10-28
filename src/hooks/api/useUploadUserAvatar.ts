'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadUserAvatar as uploadUserAvatarApi } from '@/lib/api/users.client';
import { userKeys } from '@/lib/query-keys';
import type { AvatarUploadResponse } from '@/types/profile';

interface UploadUserAvatarVariables {
  userId: string;
  file: File;
}

/**
 * Hook to upload user avatar
 * @param options - Optional callbacks for success and error
 * @returns Mutation object
 */
export function useUploadUserAvatar(options?: {
  onSuccess?: (data: AvatarUploadResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AvatarUploadResponse, Error, UploadUserAvatarVariables>({
    mutationFn: async ({ userId, file }) => {
      const response = await uploadUserAvatarApi(userId, file);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch user detail to get updated avatar URL
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
