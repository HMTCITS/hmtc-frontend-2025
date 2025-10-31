// Request Status Type
export type RequestStatus = 'in_review' | 'approved' | 'rejected';

// Request Item - for list view
export interface RequestItem {
  id: string;
  name: string; // Nama mahasiswa yang request
  nrp: number; // NRP mahasiswa
  email: string; // Email mahasiswa
  reason: string; // Alasan meminta akses
  repositoryTitle: string; // Judul repository/karya yang diminta
  writer: string; // Penulis/pemilik repository (kakak tingkat)
  requestDate: string; // ISO date string
  status: RequestStatus;
}

// Request Detail - for detail view with more information
export interface RequestDetail extends RequestItem {
  // Additional fields for detail view if needed
  repositoryId?: string;
  angkatan?: string; // Angkatan mahasiswa yang request
  writerAngkatan?: string; // Angkatan pemilik repository
  reviewedBy?: string; // Admin yang mereview
  reviewedAt?: string; // ISO date string
  notes?: string; // Catatan dari admin
}

// API Request Types
export interface CreateRequestPayload {
  repositoryId: string;
  reason: string;
}

export interface ApproveRequestPayload {
  notes?: string;
}

export interface RejectRequestPayload {
  notes?: string;
  reason?: string;
}

// API Response Types
export interface RequestsResponse {
  data: RequestItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface RequestDetailResponse {
  data: RequestDetail;
}

// Filter/Query params
export interface RequestFilters extends Record<string, unknown> {
  status?: RequestStatus;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'requestDate' | 'name' | 'status';
  sortOrder?: 'asc' | 'desc';
}
