'use client';

import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { UserMe } from '@/types/profile';

interface PersonalDataViewProps {
  user: UserMe;
  onEdit?: () => void;
}

export default function PersonalDataView({
  user,
  onEdit,
}: PersonalDataViewProps) {
  return (
    <Card className='w-full border-t-4 border-t-blue-500'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='font-satoshi text-[24px] font-semibold text-black'>
          Personal Data
        </CardTitle>
        <Button
          variant='default'
          onClick={onEdit}
          className='flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-satoshi text-[14px] font-medium text-white hover:bg-blue-500'
        >
          Change Profile
          <Edit size={16} className='text-white' />
        </Button>
      </CardHeader>

      <CardContent className='pt-0'>
        <Separator className='mb-5' />
        {/* Grid Layout for label-value pairs */}
        <div className='grid grid-cols-[200px_1fr] gap-x-8 gap-y-6'>
          {/* Full Name */}
          <span className='font-satoshi text-[16px] font-normal text-gray-500'>
            Full Name
          </span>
          <span className='font-satoshi text-[16px] font-medium text-black'>
            {user.fullName}
          </span>

          {/* NRP */}
          <span className='font-satoshi text-[16px] font-normal text-gray-500'>
            NRP
          </span>
          <span className='font-satoshi text-[16px] font-medium text-black'>
            {user.nrp || '-'}
          </span>

          {/* Email */}
          <span className='font-satoshi text-[16px] font-normal text-gray-500'>
            Email
          </span>
          <span className='font-satoshi text-[16px] font-medium text-black'>
            {user.email}
          </span>

          {/* Angkatan */}
          <span className='font-satoshi text-[16px] font-normal text-gray-500'>
            Angkatan
          </span>
          <span className='font-satoshi text-[16px] font-medium text-black'>
            {user.angkatan || '-'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
