/**
 * Upload Management Hooks
 *
 * This module exports all React Query hooks for upload operations:
 * - useUploads: Fetch all uploads with filters
 * - useUploadDetail: Fetch single upload detail
 * - useCreateUpload: Create new upload
 * - useApproveUpload: Approve upload (Admin only)
 * - useRejectUpload: Reject upload (Admin only)
 * - useDeleteUpload: Delete upload (Admin/Owner only)
 */

export type { UseApproveUploadResult } from './useApproveUpload';
export { useApproveUpload } from './useApproveUpload';
export type { UseCreateUploadResult } from './useCreateUpload';
export { useCreateUpload } from './useCreateUpload';
export type { UseDeleteUploadResult } from './useDeleteUpload';
export { useDeleteUpload } from './useDeleteUpload';
export type { UseRejectUploadResult } from './useRejectUpload';
export { useRejectUpload } from './useRejectUpload';
export type { UseUploadDetailResult } from './useUploadDetail';
export { useUploadDetail } from './useUploadDetail';
export type { UseUploadsResult } from './useUploads';
export { useUploads } from './useUploads';
