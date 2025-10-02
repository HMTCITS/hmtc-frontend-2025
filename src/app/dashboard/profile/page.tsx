'use client';
import { navItem } from '@/app/dashboard/sidebar-link';
import ProfileHeaderCard from '@/components/profile/ProfileHeaderCard';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { UserMe } from '@/types/profile';

export default function ProfilePage() {
  // const [isEditing, setIsEditing] = useState(false);

  // Dummy User Data
  const user: UserMe = {
    id: '1',
    fullName: 'John Doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    angkatan: '2023',
    role: 'user',
    avatarUrl: '',
  };

  return (
    <DashboardLayout
      navItems={navItem}
      user={user}
      onLogout={() => {
        // Handle logout logic here
      }}
    >
      <div className='container mx-auto gap-3 px-4 py-8'>
        {/* Header */}
        <Typography
          as='h1'
          variant='k2'
          className='font-adelphe font-bold md:text-[32px]'
        >
          Profile
        </Typography>

        {/* Profile Header Card */}
        <ProfileHeaderCard {...user} />

        {/* Conditional Rendering: Profile view of Edit Form of Profile */}
      </div>
    </DashboardLayout>
  );
}
