'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { navItem } from '@/app/dashboard/sidebar-link';
import PersonalDataForm from '@/components/profile/PersonalDataForm';
import PersonalDataView from '@/components/profile/PersonalDataView';
import ProfileHeaderCard from '@/components/profile/ProfileHeaderCard';
import Typography from '@/components/Typography';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { UserMe } from '@/types/profile';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Confirm Modal States
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Dummy User Data - temporary until backend is implemented
  const user: UserMe = {
    id: 'usr_001',
    fullName: 'Sumira',
    name: 'Sumira', // For DashboardLayout compatibility
    email: 'sumira8ra@gmail.com',
    nrp: 5025221113,
    angkatan: '2023',
    role: 'user',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108755-2616b612b98c?w=400&h=400&fit=crop&crop=face',
  };

  // Handle navigation guard when form is dirty
  const handleUnsavedChanges = (action: () => void) => {
    if (isDirty) {
      setPendingAction(() => action);
      setConfirmOpen(true);
    } else {
      action();
    }
  };

  // Handle confirm modal actions
  const handleConfirmDiscard = () => {
    setConfirmOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setIsDirty(false);
  };

  const handleCancelDiscard = () => {
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const cancelAction = () => {
      setIsEditing(false);
      setIsDirty(false);
    };

    handleUnsavedChanges(cancelAction);
  };

  const handleSubmit = async (_data: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // TODO: Update user data with response
      // setUser(updatedUser);

      setIsEditing(false);
      setIsDirty(false);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirtyChange = (dirty: boolean) => {
    setIsDirty(dirty);
  };

  // Browser navigation guard
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <DashboardLayout
      navItems={navItem}
      user={user}
      onLogout={() => {
        // Handle logout logic here
        // TODO: Implement logout functionality
      }}
    >
      <div className='container mx-auto space-y-6 px-4 py-8'>
        {/* Unsaved Changes Confirmation Modal */}
        <ConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          variant={'danger'}
          size={'md'}
          title={'You have unsaved changes'}
          illustration={
            <Image
              src='/images/illustrations/delete-confirm.png'
              alt='Unsaved Changes Warning'
              width={300}
              height={300}
            />
          }
          actions={[
            {
              id: 'keep-editing',
              label: 'Keep Editing',
              variant: 'outline',
              onClick: handleCancelDiscard,
            },
            {
              id: 'discard',
              label: 'Discard Changes',
              variant: 'destructive',
              onClick: handleConfirmDiscard,
            },
          ]}
        />

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

        {/* Personal Data Card - Conditional Rendering */}
        {isEditing ? (
          <PersonalDataForm
            user={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onDirtyChange={handleDirtyChange}
            isLoading={isLoading}
          />
        ) : (
          <PersonalDataView user={user} onEdit={handleEdit} />
        )}
      </div>
    </DashboardLayout>
  );
}
