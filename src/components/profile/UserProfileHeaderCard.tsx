'use client';
import { Shield, UserRound } from 'lucide-react';

import Typography from '@/components/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import type { UserMe } from '@/types/profile';

interface UserProfileHeaderCardProps extends UserMe {
  onChangeRole?: () => void;
}

export default function UserProfileHeaderCard({
  fullName,
  role,
  avatarUrl,
  onChangeRole,
}: UserProfileHeaderCardProps) {
  return (
    <Card className='flex items-end justify-between border-t-5 border-t-blue-500 p-6'>
      <div className='flex items-end'>
        <div className='relative w-fit'>
          {/* Profile Picture */}
          <Avatar className='h-[130px] w-[130px] rounded-full'>
            <AvatarImage
              src={avatarUrl}
              alt={`Profile picture of ${fullName}`}
            />
            <AvatarFallback>
              <UserRound
                size='60'
                className='text-gray-400'
                aria-hidden='true'
              />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content */}
        <div>
          <CardHeader className='gap-2'>
            <Typography
              as='h2'
              variant='i2'
              font='satoshi'
              weight='bold'
              className='m-0 text-[32px]'
            >
              {fullName}
            </Typography>
            <Typography
              as='p'
              variant='s0'
              font='satoshi'
              weight='medium'
              className='text-[20px] capitalize opacity-50'
              role='note'
              aria-label={`User role: ${role}`}
            >
              {role}
            </Typography>
          </CardHeader>
        </div>
      </div>

      <Button
        variant='outline'
        onClick={onChangeRole}
        className='rounded-8 h-10 border px-6 font-satoshi text-[16px] font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        aria-label={`Change role for ${fullName}`}
      >
        <Typography
          as='span'
          variant='s2'
          font='satoshi'
          weight='bold'
          className='text-accent-foreground'
          aria-hidden='true'
        >
          Change Role
        </Typography>
        <Shield
          size={16}
          className='text-accent-foreground'
          strokeWidth={3}
          aria-hidden='true'
        />
      </Button>
    </Card>
  );
}
