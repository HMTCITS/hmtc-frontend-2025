'use client';

import { UserIcon } from 'lucide-react';

import DashboardLayout from '@/layouts/DashboardLayout';

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
}

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Page() {

  // --- Navigation Items
  const navItem: NavItem[] = [
    { href: '/profile', label: 'Profile', icon: UserIcon },
    { href: '/user', label: 'User', icon: UserIcon },
    { href: '/repository', label: 'Repository', icon: UserIcon },
    { href: '/user-requests', label: 'User Requests', icon: UserIcon },
    { href: '/user-uploads', label: 'User Upload', icon: UserIcon },
    { href: '/dashboard/gallery', label: 'Gallery Post', icon: UserIcon }
  ]

  // --- Dummy User Data
  const user: User = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: 'https://example.com/avatar.jpg'
  }

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      {/* TO-DO: Add DataTable Components */}
      <div />
    </DashboardLayout>
  )
}