'use client';
import { LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';

import Typography from '@/components/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import type { UserMe } from '@/types/profile';

import AvatarUploadButton from './AvatarUploadButton';

export default function ProfileHeaderCard(user: UserMe) {
  return (
    <Card className='flex items-end justify-between border-t-5 border-t-blue-500 p-6'>
      <div className='flex items-end'>
        <div className='relative w-fit'>
          {/* Profile Picture */}
          <Avatar className='h-[130px] w-[130px] rounded-full'>
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback>
              <UserRound size='60' className='text-gray-400' />
            </AvatarFallback>
          </Avatar>

          {/* Profile Picture - Edit Photo Button */}
          <AvatarUploadButton className='absolute right-0 bottom-0 h-9 w-9 rounded-full bg-black-500 opacity-50 hover:bg-black-500 hover:opacity-100' />
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
              {user.fullName}
            </Typography>
            <Typography
              as='p'
              variant='s0'
              font='satoshi'
              weight='medium'
              className='text-[20px] capitalize opacity-50'
            >
              {user.role}
            </Typography>
          </CardHeader>
        </div>
      </div>

      <Link href='/profile/change-password'>
        <Button
          variant='outline'
          className='rounded-8 h-10 border px-6 font-satoshi text-[16px] font-medium'
        >
          <Typography
            as='span'
            variant='s2'
            font='satoshi'
            weight='bold'
            className='text-accent-foreground'
          >
            Change Password
          </Typography>
          <LockKeyhole
            size={16}
            className='text-accent-foreground'
            strokeWidth={3}
          />
        </Button>
      </Link>
    </Card>
  );
}
