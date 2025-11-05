import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { rejectUpload } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';
import type { RejectUploadPayload } from '@/types/upload';

/**
 * Hook to reject an upload (Admin only)
 * @returns Mutation hook for rejecting an upload
 */
export function useRejectUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: RejectUploadPayload;
    }) => {
      const response = await rejectUpload(id, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate the specific upload detail
      queryClient.invalidateQueries({
        queryKey: uploadKeys.detail(variables.id),
      });

      // Invalidate all upload lists to refetch with updated status
      queryClient.invalidateQueries({
        queryKey: uploadKeys.lists(),
      });

      toast.success('Upload rejected successfully!');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to reject upload. Please try again.'
      );
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseRejectUploadResult = ReturnType<typeof useRejectUpload>;
