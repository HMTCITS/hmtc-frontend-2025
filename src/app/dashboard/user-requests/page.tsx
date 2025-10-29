'use client';

import { navItem } from '@/app/dashboard/sidebar-link';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { User as UserType } from '@/types/sidebar';

export default function UserRequestPage() {

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  }
  return (
    <DashboardLayout
      user={user}
      navItems={navItem}
      onLogout={() => {}}
    >
      <div>
        <Typography
          as='h1'
          variant='h2'
          className='font-adelphe font-bold md:text-[32px]'
        >
          Track Request
        </Typography>
      </div>
    </DashboardLayout>
  )
}