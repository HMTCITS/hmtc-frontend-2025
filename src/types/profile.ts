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