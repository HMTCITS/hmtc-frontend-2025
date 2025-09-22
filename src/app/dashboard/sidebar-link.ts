import {
  Gallery,
  Profile,
  Repository,
  Requests,
  Upload,
  User,
} from '@/app/landing/components/dashboard/icons';
import { NavItem } from "@/types/sidebar";

export const navItem: NavItem[] = [
    { href: '/profile', label: 'Profile', icon: Profile },
    { href: '/user', label: 'User', icon: User },
    { href: '/repository', label: 'Repository', icon: Repository },
    { href: '/user-requests', label: 'User Requests', icon: Requests },
    { href: '/user-uploads', label: 'User Upload', icon: Upload },
    { href: '/dashboard/gallery', label: 'Gallery Post', icon: Gallery },
];