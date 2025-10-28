import type { User as UserType } from '@/types/sidebar';

export type Role = 'superadmin' | 'admin' | 'user' | 'admin_repository' | 'admin_gallery';

export interface UserMe extends UserType {
  id: string;
  fullName: string;
  nrp?: number;
  email: string;
  angkatan?: string; // "2023"
  role: Role;
  avatarUrl?: string;
}

// User Detail type alias (same as UserMe for now, can be extended later)
export type UserDetail = UserMe;

// API Request/Response Types
export interface UpdateProfileRequest {
  fullName?: string;
  nrp?: number;
  email?: string;
  angkatan?: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  nrp?: number;
  email?: string;
  angkatan?: string;
  role?: Role;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeRoleRequest {
  role: Role;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}

// User Request Types
export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type TrackType = 'request_repository' | 'upload_repository';

export interface UserRequest {
  id: string;
  title: string;
  requestDate: string;
  trackType: TrackType;
  status: RequestStatus;
}

export interface UserRequestsResponse {
  data: UserRequest[];
  total: number;
}

