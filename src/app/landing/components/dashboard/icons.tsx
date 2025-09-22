import Image from 'next/image';
import React from 'react';

interface CustomIconProps {
  src: string;
  size?: number;
  className?: string;
}

function CustomIcon({ src, size = 32, className, ...props }: CustomIconProps) {
  return (
    <Image
      src={src}
      alt='Icon'
      width={size}
      height={size}
      className={`${className}`}
      {...props}
    />
  );
}

function createCustomIcon(iconPath: string, alt?: string) {
  return function CustomIconComponent(props: React.SVGProps<SVGElement>) {
    return (
      <CustomIcon
        src={iconPath}
        size={32}
        className='object-contain'
        aria-label={alt || 'Icon'}
        {...props}
      />
    );
  };
}

// Custom Icons for Dashboard - From Figma
const Profile = createCustomIcon('/icons/dashboard/profile.svg', 'Profile');
const User = createCustomIcon('/icons/dashboard/user.svg', 'User');
const Repository = createCustomIcon(
  '/icons/dashboard/repository.svg',
  'Repository',
);
const Requests = createCustomIcon(
  '/icons/dashboard/user-request.svg',
  'Requests',
);
const Upload = createCustomIcon('/icons/dashboard/user-upload.svg', 'Upload');
const Gallery = createCustomIcon('/icons/dashboard/gallery.svg', 'Gallery');

export { Gallery, Profile, Repository, Requests, Upload, User };
