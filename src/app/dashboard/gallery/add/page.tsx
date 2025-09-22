'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Gallery,
  Profile,
  Repository,
  Requests,
  Upload,
  User,
} from '@/app/landing/components/dashboard/icons';
import { GalleryForm } from '@/components/gallery/GalleryForm';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { GalleryFormData } from '@/lib/validation/gallery';
import type { NavItem, User as UserType } from '@/types/sidebar';

import { useCreateGallery } from '../hooks/gallery';

export default function AddGalleryPage() {
  const createMutation = useCreateGallery();
  const router = useRouter();

  const handleCreateGallery = async (data: GalleryFormData) => {
    try {
      if (!data.thumbnail) {
        toast.error('Thumbnail image is required.');
        return;
      }

      await createMutation.mutateAsync(data);
      toast.success('Gallery item created successfully!');

      // Redirect to gallery list after success
      router.push('/dashboard/gallery');
    } catch (error) {
      toast.error(`Failed to create gallery item. ${(error as Error).message}`);
    }
  };
  // Navigation Items
  const navItem: NavItem[] = [
    { href: '/profile', label: 'Profile', icon: Profile },
    { href: '/user', label: 'User', icon: User },
    { href: '/repository', label: 'Repository', icon: Repository },
    { href: '/user-requests', label: 'User Requests', icon: Requests },
    { href: '/user-uploads', label: 'User Upload', icon: Upload },
    { href: '/dashboard/gallery', label: 'Gallery Post', icon: Gallery },
  ];

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link href='/dashboard/gallery'>
              <ArrowLeft className='mr-2 h-6 w-6' />
            </Link>
            <h1 className='text-[32px] font-bold'>Add Gallery</h1>
          </div>
        </div>

        {/* Inline Form */}
        <GalleryForm
          onSubmit={handleCreateGallery}
          onCancel={() => {  }}
          isLoading={createMutation.isPending}
          mode='create'
        />
      </div>
    </DashboardLayout>
  );
}
