'use client';

import Image from 'next/image';
import { useState } from 'react';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Role } from '@/types/profile';

interface ChangeRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRole: Role;
  onSubmit: (newRole: Role) => void;
  isLoading?: boolean;
}

const ROLES: { value: Role; label: string }[] = [
  { value: 'admin_repository', label: 'Admin Repository' },
  { value: 'admin_gallery', label: 'Admin Gallery' },
  { value: 'user', label: 'User' },
];

export default function ChangeRoleModal({
  open,
  onOpenChange,
  currentRole,
  onSubmit,
  isLoading = false,
}: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(currentRole);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = () => {
    if (selectedRole && selectedRole !== currentRole) {
      setConfirmOpen(true);
    }
  };

  const handleConfirmChange = () => {
    setConfirmOpen(false);
    onSubmit(selectedRole);
  };

  const handleCancel = () => {
    setSelectedRole(currentRole);
    onOpenChange(false);
  };

  return (
    <>
      {/* Change Role Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        variant={'danger'}
        size={'md'}
        title={'Please confirm that you want to change this user role'}
        illustration={
          <Image
            src='/images/illustrations/delete-confirm.png'
            alt='Change Role Confirmation'
            width={300}
            height={300}
          />
        }
        actions={[
          {
            id: 'no',
            label: 'No',
            variant: 'outline',
            onClick: () => setConfirmOpen(false),
          },
          {
            id: 'yes',
            label: 'Yes',
            variant: 'default',
            onClick: handleConfirmChange,
          },
        ]}
      />

      {/* Change Role Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[440px]'>
          <DialogHeader>
            <DialogTitle>
              <Typography
                variant='h2'
                font='satoshi'
                weight='bold'
                className='text-[24px] text-black'
              >
                Change user role
              </Typography>
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-6 py-4'>
            {/* Role Select */}
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as Role)}
              disabled={isLoading}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select new role' />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem
                    key={role.value}
                    value={role.value}
                    className='font-satoshi'
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={isLoading}
                className='flex-1 font-satoshi text-[14px] font-medium'
              >
                <Typography
                  as='span'
                  variant='s3'
                  font='satoshi'
                  className='text-[14px] font-medium'
                >
                  Cancel
                </Typography>
              </Button>

              <Button
                type='button'
                onClick={handleSubmit}
                disabled={isLoading || selectedRole === currentRole}
                className='flex-1 bg-blue-600 font-satoshi text-[14px] font-medium hover:bg-blue-700'
              >
                <Typography
                  as='span'
                  variant='s3'
                  font='satoshi'
                  className='text-[14px] font-medium text-white'
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Typography>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
