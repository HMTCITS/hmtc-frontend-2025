'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { navItem } from '@/app/dashboard/sidebar-link';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Separator } from '@/components/ui/separator';
import { useApproveUpload, useRejectUpload } from '@/hooks/api/uploads';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { User as UserType } from '@/types/sidebar';
import type { UploadDetail } from '@/types/upload';

/* --------------------------- Mock Data --------------------------- */
function getMockUploadDetail(id: string): UploadDetail {
  // Simulate different statuses based on ID for demo
  const statusMap: Record<string, UploadDetail['status']> = {
    'UPL-0001': 'in_review',
    'UPL-0002': 'approved',
    'UPL-0003': 'rejected',
  };

  const status = statusMap[id] || 'in_review';
  const isDecided = status !== 'in_review';

  return {
    id,
    title:
      'Implementasi Machine Learning untuk Prediksi Cuaca berbasis Data Historis',
    description:
      'Dokumen repository berisi implementasi lengkap dari penelitian machine learning untuk prediksi cuaca menggunakan data historis.',
    fileName: 'ML-Cuaca-Repository.pdf',
    fileUrl: 'https://example.com/files/ML-Cuaca-Repository.pdf',
    fileSize: 5242880, // 5MB
    fileType: 'application/pdf',
    uploadType: 'file',
    status,
    uploadedBy: {
      id: 'USER-001',
      name: 'Budi Santoso',
      email: 'budi.santoso@student.its.ac.id',
    },
    uploadedAt: '2025-01-20T10:30:00Z',
    // Add review details if already decided
    ...(isDecided && {
      reviewedBy: {
        id: 'ADMIN-001',
        name: 'John Doe',
      },
      reviewedAt: '2025-01-21T14:00:00Z',
      approvalNotes:
        status === 'approved'
          ? 'Upload approved. Document has been published to repository.'
          : undefined,
      rejectionReason:
        status === 'rejected'
          ? 'Document does not meet repository standards. Please revise and resubmit.'
          : undefined,
    }),
  };
}

/* --------------------------- Main Page Component --------------------------- */
export default function UserUploadDetailPage() {
  const params = useParams();
  const uploadId = params.id as string;

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Mock Data - In production, use: const { data: uploadDetail, isLoading } = useUploadDetail(uploadId);
  const uploadDetail = getMockUploadDetail(uploadId);

  // Mutation hooks
  const approveUpload = useApproveUpload();
  const rejectUpload = useRejectUpload();

  // Modal states
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  // Check if upload is still pending review
  const isInReview = uploadDetail.status === 'in_review';
  const isDecided =
    uploadDetail.status === 'approved' || uploadDetail.status === 'rejected';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatStatusDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}.${minutes}`;
  };

  const handleApprove = () => {
    setApproveModalOpen(true);
  };

  const handleReject = () => {
    setRejectModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    try {
      await approveUpload.mutateAsync({
        id: uploadId,
        payload: {
          notes: 'Upload approved by admin',
        },
      });
      setApproveModalOpen(false);
      // Optionally redirect to list page
      // router.push('/dashboard/user-uploads');
    } catch {
      // Error already handled by the hook
    }
  };

  const handleConfirmReject = async () => {
    try {
      await rejectUpload.mutateAsync({
        id: uploadId,
        payload: {
          reason: 'Does not meet repository standards',
          notes: 'Upload rejected by admin',
        },
      });
      setRejectModalOpen(false);
      // Optionally redirect to list page
      // router.push('/dashboard/user-uploads');
    } catch {
      // Error already handled by the hook
    }
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='container mx-auto px-4 py-8'>
        {/* Approve Confirmation Modal */}
        <ConfirmModal
          open={approveModalOpen}
          onOpenChange={setApproveModalOpen}
          variant={'success'}
          size={'md'}
          title={'Are you sure you want to approve this upload?'}
          illustration={
            <Image
              src='/images/illustrations/delete-confirm.png'
              alt='Approve Confirmation'
              width={300}
              height={300}
            />
          }
          actions={[
            {
              id: 'no',
              label: 'No',
              variant: 'outline',
              onClick: () => setApproveModalOpen(false),
            },
            {
              id: 'yes',
              label: 'Yes, Approve',
              variant: 'default',
              onClick: handleConfirmApprove,
            },
          ]}
        />

        {/* Reject Confirmation Modal */}
        <ConfirmModal
          open={rejectModalOpen}
          onOpenChange={setRejectModalOpen}
          variant={'danger'}
          size={'md'}
          title={'Are you sure you want to reject this upload?'}
          illustration={
            <Image
              src='/images/illustrations/delete-confirm.png'
              alt='Reject Confirmation'
              width={300}
              height={300}
            />
          }
          actions={[
            {
              id: 'no',
              label: 'No',
              variant: 'outline',
              onClick: () => setRejectModalOpen(false),
            },
            {
              id: 'yes',
              label: 'Yes, Reject',
              variant: 'destructive',
              onClick: handleConfirmReject,
            },
          ]}
        />

        {/* Header */}
        <div className='mb-8 flex items-center gap-4'>
          <Link
            href='/dashboard/user-uploads'
            aria-label='Back to user uploads list'
            className='rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <ArrowLeft className='mr-2 h-6 w-6' aria-hidden='true' />
          </Link>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            Upload Repository
          </Typography>
        </div>

        {/* Detail Card */}
        <Card
          className={`space-y-1.5 border-t-5 font-satoshi ${
            uploadDetail.status === 'approved'
              ? 'border-t-green-500'
              : uploadDetail.status === 'rejected'
                ? 'border-t-red-500'
                : 'border-t-blue-500'
          }`}
          role='article'
          aria-labelledby='upload-title'
        >
          <CardHeader className='mb-0'>
            <CardTitle className='p-0'>
              <Typography
                as='h2'
                variant='i2'
                className='leading-relaxed font-medium'
                id='upload-title'
              >
                {uploadDetail.title}
              </Typography>
              <Typography
                as='p'
                variant='b4'
                font='satoshi'
                weight='regular'
                className='mt-2 text-[14px] leading-[140%] text-[var(--Foundation-Black-black-200,#8A8A8A)]'
              >
                Uploaded on {formatDate(uploadDetail.uploadedAt)}
              </Typography>
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <div className='space-y-6 py-[10px]'>
              <Typography
                as='h2'
                variant='h2'
                className='text-[20px] text-gray-900'
                id='upload-info-heading'
              >
                Upload Information
              </Typography>

              {/* Uploaded By */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-uploader'>
                    Uploaded By
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-uploader'
                  >
                    {uploadDetail.uploadedBy.name}
                  </Typography>
                </div>
              </div>

              {/* Email */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-email'>
                    Email
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-email'
                  >
                    {uploadDetail.uploadedBy.email}
                  </Typography>
                </div>
              </div>

              {/* File Name */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-filename'>
                    File Name
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-filename'
                  >
                    {uploadDetail.fileName}
                  </Typography>
                </div>
              </div>

              {/* File Type */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-filetype'>
                    File Type
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-filetype'
                  >
                    {uploadDetail.fileType}
                  </Typography>
                </div>
              </div>

              {/* Upload Type */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-uploadtype'>
                    Upload Type
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900 capitalize'
                    aria-labelledby='label-uploadtype'
                  >
                    {uploadDetail.uploadType}
                  </Typography>
                </div>
              </div>

              {/* Upload Date */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-upload-date'>
                    Upload Date
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-upload-date'
                  >
                    {formatDate(uploadDetail.uploadedAt)}
                  </Typography>
                </div>
              </div>

              {/* Description */}
              {uploadDetail.description && (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-start gap-2 text-black-200 md:col-span-1'>
                    <Typography as='span' variant='s3' id='label-description'>
                      Description
                    </Typography>
                  </div>
                  <div className='md:col-span-3'>
                    <Typography
                      as='p'
                      variant='b2'
                      className='leading-relaxed text-gray-900'
                      aria-labelledby='label-description'
                    >
                      {uploadDetail.description}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          {/* Status Bar - Show only if decided */}
          {isDecided && uploadDetail.reviewedAt && (
            <>
              <Separator className='mb-0' aria-hidden='true' />
              <div
                className='flex justify-end px-6 py-4'
                role='status'
                aria-live='polite'
              >
                <Typography
                  as='p'
                  variant='b3'
                  className={`font-medium ${
                    uploadDetail.status === 'approved'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                  aria-label={`Upload ${uploadDetail.status} at ${formatStatusDate(uploadDetail.reviewedAt)}`}
                >
                  {uploadDetail.status === 'approved'
                    ? 'Approved'
                    : 'Rejected'}{' '}
                  at {formatStatusDate(uploadDetail.reviewedAt)}
                </Typography>
              </div>
            </>
          )}

          {/* Action Buttons - Show only if in review */}
          {isInReview && (
            <>
              <Separator className='mb-6' aria-hidden='true' />
              <CardFooter className='flex justify-end gap-3'>
                <Button
                  size='lg'
                  variant='destructive'
                  className='px-6 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none'
                  onClick={handleReject}
                  disabled={rejectUpload.isPending || approveUpload.isPending}
                  aria-label={
                    rejectUpload.isPending
                      ? 'Rejecting upload, please wait'
                      : 'Reject this upload'
                  }
                  aria-busy={rejectUpload.isPending}
                >
                  <Typography as='span' variant='s3' className='font-medium'>
                    {rejectUpload.isPending ? 'Rejecting...' : 'Reject'}
                  </Typography>
                </Button>
                <Button
                  size='lg'
                  className='bg-blue-600 px-6 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'
                  onClick={handleApprove}
                  disabled={approveUpload.isPending || rejectUpload.isPending}
                  aria-label={
                    approveUpload.isPending
                      ? 'Approving upload, please wait'
                      : 'Approve this upload'
                  }
                  aria-busy={approveUpload.isPending}
                >
                  <Typography as='span' variant='s3' className='font-medium'>
                    {approveUpload.isPending ? 'Approving...' : 'Approve'}
                  </Typography>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
