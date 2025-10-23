'use client';

import { Camera } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useUploadAvatar } from '@/lib/hooks/useProfile';

interface AvatarUploadButtonProps {
  className?: string;
}

export default function AvatarUploadButton({
  className,
}: AvatarUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarMutation = useUploadAvatar();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    // Upload the file
    uploadAvatarMutation.mutate(file);

    // Reset input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const inputId = 'avatar-upload-input';

  return (
    <>
      <Button
        variant='outline'
        size='icon'
        onClick={handleButtonClick}
        disabled={uploadAvatarMutation.isPending}
        className={className}
        aria-label={
          uploadAvatarMutation.isPending
            ? 'Uploading avatar image...'
            : 'Change profile picture'
        }
        aria-describedby={`${inputId}-description`}
      >
        <Camera size='32' className='text-white' />
      </Button>

      <input
        ref={fileInputRef}
        id={inputId}
        type='file'
        accept='image/jpeg,image/jpg,image/png,image/webp'
        onChange={handleFileSelect}
        className='sr-only'
        aria-label='Upload avatar image file'
        aria-describedby={`${inputId}-description`}
      />

      {/* Hidden description for screen readers */}
      <div id={`${inputId}-description`} className='sr-only'>
        Upload a new avatar image. Supported formats: JPEG, PNG, WebP. Maximum
        file size: 5MB.
      </div>
    </>
  );
}
