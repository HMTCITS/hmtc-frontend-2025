'use client';
import { LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';

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
            <h2 className='m-0 font-satoshi text-[32px] font-bold'>
              {user.fullName}
            </h2>
            <p className='font-satoshi text-[20px] font-medium capitalize opacity-50'>
              {user.role}
            </p>
          </CardHeader>
        </div>
      </div>

      <Link href='/profile/change-password'>
        <Button
          variant='outline'
          className='rounded-8 h-10 border px-6 font-satoshi text-[16px] font-medium'
        >
          Change Password
          <LockKeyhole size={16} />
        </Button>
      </Link>
    </Card>
  );
}
