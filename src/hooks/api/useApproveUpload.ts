import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { approveUpload } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';
import type { ApproveUploadPayload } from '@/types/upload';

/**
 * Hook to approve an upload (Admin only)
 * @returns Mutation hook for approving an upload
 */
export function useApproveUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload?: ApproveUploadPayload;
    }) => {
      const response = await approveUpload(id, payload);
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

      toast.success('Upload approved successfully!');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to approve upload. Please try again.'
      );
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseApproveUploadResult = ReturnType<typeof useApproveUpload>;
