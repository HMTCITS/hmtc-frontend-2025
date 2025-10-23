import type { User as UserType } from '@/types/sidebar';

export type Role = 'superadmin' | 'admin' | 'user';

export interface UserMe extends UserType {
  id: string;
  fullName: string;
  nrp?: number;
  email: string;
  angkatan?: string; // "2023"
  role: Role;
  avatarUrl?: string;
}

// API Request/Response Types
export interface UpdateProfileRequest {
  fullName?: string;
  nrp?: number;
  email?: string;
  angkatan?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}
