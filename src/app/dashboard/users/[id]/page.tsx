'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { navItem } from '@/app/dashboard/sidebar-link';
import ChangeRoleModal from '@/components/profile/ChangeRoleModal';
import RequestHistoryTable from '@/components/profile/RequestHistoryTable';
import UserPersonalDataForm from '@/components/profile/UserPersonalDataForm';
import UserPersonalDataView from '@/components/profile/UserPersonalDataView';
import UserProfileHeaderCard from '@/components/profile/UserProfileHeaderCard';
import Typography from '@/components/Typography';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { UserMe } from '@/types/profile';
import type { User as UserType } from '@/types/sidebar';

export default function UserDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Confirm Modal States
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Change Role Modal State
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);

  // Dummy Admin User Data - for DashboardLayout
  const adminUser: UserType = {
    name: 'Jane Smith',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Dummy User Detail Data - temporary until backend is implemented
  const userDetail: UserMe = {
    id: 'usr_002',
    fullName: 'John Doe',
    name: 'John Doe', // For compatibility
    email: 'john.doe@example.com',
    nrp: 5025221001,
    angkatan: '2022',
    role: 'user',
    avatarUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
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
      // setUserDetail(updatedUser);

      setIsEditing(false);
      setIsDirty(false);
      toast.success('User profile updated successfully!');
    } catch {
      toast.error('Failed to update user profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirtyChange = (dirty: boolean) => {
    setIsDirty(dirty);
  };

  // Handle change role modal
  const handleOpenChangeRole = () => {
    setChangeRoleOpen(true);
  };

  const handleSubmitChangeRole = async () => {
    setIsChangingRole(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // TODO: Update user data with new role
      // setUserDetail({ ...userDetail, role: newRole });

      setChangeRoleOpen(false);
      toast.success('User role changed successfully!');
    } catch {
      toast.error('Failed to change user role. Please try again.');
    } finally {
      setIsChangingRole(false);
    }
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
      user={adminUser}
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

        {/* Change Role Modal */}
        <ChangeRoleModal
          open={changeRoleOpen}
          onOpenChange={setChangeRoleOpen}
          currentRole={userDetail.role}
          onSubmit={handleSubmitChangeRole}
          isLoading={isChangingRole}
        />

        {/* Header */}
        <Typography
          as='h1'
          variant='k2'
          className='font-adelphe font-bold md:text-[32px]'
        >
          User Detail
        </Typography>

        {/* Profile Header Card */}
        <UserProfileHeaderCard
          {...userDetail}
          onChangeRole={handleOpenChangeRole}
        />

        {/* Personal Data Card - Conditional Rendering */}
        {isEditing ? (
          <UserPersonalDataForm
            user={userDetail}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onDirtyChange={handleDirtyChange}
            isLoading={isLoading}
          />
        ) : (
          <UserPersonalDataView user={userDetail} onEdit={handleEdit} />
        )}

        {/* Request History Table */}
        <RequestHistoryTable userId={userDetail.id} />
      </div>
    </DashboardLayout>
  );
}
