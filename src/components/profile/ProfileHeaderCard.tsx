'use client';
import { Camera, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import type { UserMe } from '@/types/profile';

export default function ProfileHeaderCard(user: UserMe) {
  return (
    <Card className='flex items-center border-t-5 border-t-blue-500 p-6'>
      <div className='relative w-fit'>
        {/* Profile Picture */}
        <Avatar className='h-[130px] w-[130px] rounded-full'>
          <AvatarImage src={user.avatarUrl} alt={user.fullName} />
          <AvatarFallback>
            <UserRound size='60' className='text-gray-400' />
          </AvatarFallback>
        </Avatar>

        {/* Profile Picture - Edit Photo Button */}
        <Button
          variant='outline'
          size='icon'
          className='absolute right-0 bottom-0 h-9 w-9 rounded-full bg-black-500 hover:bg-black-500 opacity-50 hover:opacity-100'
        >
          <Camera size='32' className='text-white' />
        </Button>
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
    </Card>
  );
}
