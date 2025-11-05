/**
 * Upload Types
 * Types for user uploads feature
 */

/**
 * Upload status enum
 */
export type UploadStatus = 'in_review' | 'approved' | 'rejected';

/**
 * Upload item for list view
 */
export interface UploadItem {
  id: string;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadType: 'file' | 'link';
  status: UploadStatus;
  uploadedBy: {
    id: string;
    name: string;
    email: string;
  };
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: {
    id: string;
    name: string;
  };
}

/**
 * Upload detail for single view
 */
export interface UploadDetail extends UploadItem {
  rejectionReason?: string;
  approvalNotes?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Upload filters for list queries
 */
export interface UploadFilters {
  status?: UploadStatus;
  uploadType?: 'file' | 'link';
  search?: string;
  userId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'uploadedAt' | 'title' | 'status';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Payload for creating a new upload
 */
export interface CreateUploadPayload {
  title: string;
  description?: string;
  uploadType: 'file' | 'link';
  file?: File;
  fileUrl?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Payload for approving an upload
 */
export interface ApproveUploadPayload {
  notes?: string;
}

/**
 * Payload for rejecting an upload
 */
export interface RejectUploadPayload {
  reason: string;
  notes?: string;
}