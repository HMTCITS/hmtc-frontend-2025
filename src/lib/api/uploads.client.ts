import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type {
  ApproveUploadPayload,
  CreateUploadPayload,
  RejectUploadPayload,
  UploadDetail,
  UploadFilters,
  UploadItem,
} from '@/types/upload';

/**
 * Get all uploads with optional filters
 * GET /uploads
 */
export async function getUploads(
  filters?: UploadFilters,
): Promise<ApiResponse<UploadItem[]>> {
  const params = new URLSearchParams();

  if (filters?.status) {
    params.append('status', filters.status);
  }
  if (filters?.uploadType) {
    params.append('uploadType', filters.uploadType);
  }
  if (filters?.search) {
    params.append('search', filters.search);
  }
  if (filters?.userId) {
    params.append('userId', filters.userId);
  }
  if (filters?.page) {
    params.append('page', filters.page.toString());
  }
  if (filters?.pageSize) {
    params.append('pageSize', filters.pageSize.toString());
  }
  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters?.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }

  const queryString = params.toString();
  const url = queryString ? `/uploads?${queryString}` : '/uploads';

  const response = await api.get<ApiResponse<UploadItem[]>>(url);
  return response.data;
}

/**
 * Get upload detail by ID
 * GET /uploads/:id
 */
export async function getUploadById(
  id: string,
): Promise<ApiResponse<UploadDetail>> {
  const response = await api.get<ApiResponse<UploadDetail>>(`/uploads/${id}`);
  return response.data;
}

/**
 * Create a new upload
 * POST /uploads
 */
export async function createUpload(
  payload: CreateUploadPayload,
): Promise<ApiResponse<UploadDetail>> {
  const response = await api.post<ApiResponse<UploadDetail>>(
    '/uploads',
    payload,
  );
  return response.data;
}

/**
 * Approve an upload (Admin only)
 * POST /uploads/:id/approve
 */
export async function approveUpload(
  id: string,
  payload?: ApproveUploadPayload,
): Promise<ApiResponse<UploadDetail>> {
  const response = await api.post<ApiResponse<UploadDetail>>(
    `/uploads/${id}/approve`,
    payload,
  );
  return response.data;
}

/**
 * Reject an upload (Admin only)
 * POST /uploads/:id/reject
 */
export async function rejectUpload(
  id: string,
  payload: RejectUploadPayload,
): Promise<ApiResponse<UploadDetail>> {
  const response = await api.post<ApiResponse<UploadDetail>>(
    `/uploads/${id}/reject`,
    payload,
  );
  return response.data;
}

/**
 * Delete an upload (Admin only or upload owner)
 * DELETE /uploads/:id
 */
export async function deleteUpload(id: string): Promise<ApiResponse<void>> {
  const response = await api.delete<ApiResponse<void>>(`/uploads/${id}`);
  return response.data;
}