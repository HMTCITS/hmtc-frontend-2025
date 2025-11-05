import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createUpload } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';
import type { CreateUploadPayload } from '@/types/upload';

/**
 * Hook to create a new upload
 * @returns Mutation hook for creating an upload
 */
export function useCreateUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUploadPayload) => {
      const response = await createUpload(payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate uploads list
      queryClient.invalidateQueries({ queryKey: uploadKeys.lists() });

      toast.success('Upload created successfully!');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to create upload. Please try again.'
      );
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseCreateUploadResult = ReturnType<typeof useCreateUpload>;
