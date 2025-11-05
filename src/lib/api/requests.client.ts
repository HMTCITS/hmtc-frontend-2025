import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type {
  ApproveRequestPayload,
  CreateRequestPayload,
  RejectRequestPayload,
  RequestDetail,
  RequestFilters,
  RequestItem,
} from '@/types/request';

/**
 * Get all requests with optional filters
 * GET /requests
 */
export async function getRequests(
  filters?: RequestFilters,
): Promise<ApiResponse<RequestItem[]>> {
  const params = new URLSearchParams();

  if (filters?.status) {
    params.append('status', filters.status);
  }
  if (filters?.search) {
    params.append('search', filters.search);
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
  const url = queryString ? `/requests?${queryString}` : '/requests';

  const response = await api.get<ApiResponse<RequestItem[]>>(url);
  return response.data;
}

/**
 * Get request detail by ID
 * GET /requests/:id
 */
export async function getRequestById(
  id: string,
): Promise<ApiResponse<RequestDetail>> {
  const response = await api.get<ApiResponse<RequestDetail>>(`/requests/${id}`);
  return response.data;
}

/**
 * Create a new request (for students to request repository access)
 * POST /requests
 */
export async function createRequest(
  payload: CreateRequestPayload,
): Promise<ApiResponse<RequestDetail>> {
  const response = await api.post<ApiResponse<RequestDetail>>(
    '/requests',
    payload,
  );
  return response.data;
}

/**
 * Approve a request (Admin Repository only)
 * POST /requests/:id/approve
 */
export async function approveRequest(
  id: string,
  payload?: ApproveRequestPayload,
): Promise<ApiResponse<RequestDetail>> {
  const response = await api.post<ApiResponse<RequestDetail>>(
    `/requests/${id}/approve`,
    payload,
  );
  return response.data;
}

/**
 * Reject a request (Admin Repository only)
 * POST /requests/:id/reject
 */
export async function rejectRequest(
  id: string,
  payload?: RejectRequestPayload,
): Promise<ApiResponse<RequestDetail>> {
  const response = await api.post<ApiResponse<RequestDetail>>(
    `/requests/${id}/reject`,
    payload,
  );
  return response.data;
}

/**
 * Delete a request (Admin only or request owner)
 * DELETE /requests/:id
 */
export async function deleteRequest(id: string): Promise<ApiResponse<void>> {
  const response = await api.delete<ApiResponse<void>>(`/requests/${id}`);
  return response.data;
}
