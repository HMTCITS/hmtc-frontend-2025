/**
 * Request Management Hooks
 * 
 * This module exports all React Query hooks for request operations:
 * - useRequests: Fetch all requests with filters
 * - useRequestDetail: Fetch single request detail
 * - useCreateRequest: Create new request (students)
 * - useApproveRequest: Approve request (Admin Repository)
 * - useRejectRequest: Reject request (Admin Repository)
 * - useDeleteRequest: Delete request (Admin/Owner)
 */

export type { UseApproveRequestResult } from './useApproveRequest';
export { useApproveRequest } from './useApproveRequest';
export type { UseCreateRequestResult } from './useCreateRequest';
export { useCreateRequest } from './useCreateRequest';
export type { UseDeleteRequestResult } from './useDeleteRequest';
export { useDeleteRequest } from './useDeleteRequest';
export type { UseRejectRequestResult } from './useRejectRequest';
export { useRejectRequest } from './useRejectRequest';
export type { UseRequestDetailResult } from './useRequestDetail';
export { useRequestDetail } from './useRequestDetail';
export type { UseRequestsResult } from './useRequests';
export { useRequests } from './useRequests';
