'use client';

import { Edit } from 'lucide-react';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { UserMe } from '@/types/profile';

interface UserPersonalDataViewProps {
  user: UserMe;
  onEdit?: () => void;
}

export default function UserPersonalDataView({
  user,
  onEdit,
}: UserPersonalDataViewProps) {
  return (
    <Card className='w-full border-t-4 border-t-blue-500'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle>
          <Typography
            as='h2'
            variant='h2'
            font='satoshi'
            weight='semibold'
            className='text-[24px] text-black'
          >
            Personal Data
          </Typography>
        </CardTitle>
        <Button
          variant='default'
          onClick={onEdit}
          className='flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-satoshi text-[14px] font-medium text-white hover:bg-blue-500'
        >
          <Typography
            as='span'
            variant='s3'
            font='satoshi'
            className='text-white'
          >
            Change Profile
          </Typography>
          <Edit size={16} className='text-white' />
        </Button>
      </CardHeader>

      <CardContent className='pt-0'>
        <Separator className='mb-5' />
        {/* Grid Layout for label-value pairs */}
        <div className='grid grid-cols-[200px_1fr] gap-x-8 gap-y-6'>
          {/* Full Name */}
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='regular'
            className='text-[16px] text-gray-500'
          >
            Full Name
          </Typography>
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='medium'
            className='text-[16px] text-black'
          >
            {user.fullName}
          </Typography>

          {/* NRP */}
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='regular'
            className='text-[16px] text-gray-500'
          >
            NRP
          </Typography>
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='medium'
            className='text-[16px] text-black'
          >
            {user.nrp || '-'}
          </Typography>

          {/* Email */}
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='regular'
            className='text-[16px] text-gray-500'
          >
            Email
          </Typography>
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='medium'
            className='text-[16px] text-black'
          >
            {user.email}
          </Typography>

          {/* Angkatan */}
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='regular'
            className='text-[16px] text-gray-500'
          >
            Angkatan
          </Typography>
          <Typography
            as='span'
            variant='b2'
            font='satoshi'
            weight='medium'
            className='text-[16px] text-black'
          >
            {user.angkatan || '-'}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
