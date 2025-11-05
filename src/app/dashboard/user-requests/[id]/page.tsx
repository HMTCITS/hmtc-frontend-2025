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
import { useApproveRequest, useRejectRequest } from '@/hooks/api/requests';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { RequestDetail } from '@/types/request';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Mock Data --------------------------- */
function getMockRequestDetail(id: string): RequestDetail {
  // Simulate different statuses based on ID for demo
  const statusMap: Record<string, RequestDetail['status']> = {
    'REQ-0001': 'in_review',
    'REQ-0002': 'approved',
    'REQ-0003': 'rejected',
  };

  const status = statusMap[id] || 'in_review';
  const isDecided = status !== 'in_review';

  return {
    id,
    name: 'Budi Santoso',
    nrp: 5025221001,
    email: 'budi.santoso@student.its.ac.id',
    reason:
      'Saya membutuhkan referensi untuk tugas akhir saya yang membahas topik serupa mengenai implementasi machine learning dalam prediksi cuaca. Penelitian kakak tingkat ini sangat relevan dengan metodologi yang akan saya gunakan.',
    repositoryTitle:
      'Implementasi Machine Learning untuk Prediksi Cuaca berbasis Data Historis',
    writer: 'Ahmad Rizki Pratama',
    requestDate: '2025-01-20T10:30:00Z',
    status,
    angkatan: '2022',
    writerAngkatan: '2020',
    repositoryId: 'R-001',
    // Add review details if already decided
    ...(isDecided && {
      reviewedBy: 'John Doe (Administrator)',
      reviewedAt: '2025-01-21T14:00:00Z',
      notes:
        status === 'approved'
          ? 'Request approved. Repository access has been granted.'
          : 'Request rejected. Please provide more specific reasons for access.',
    }),
  };
}

/* --------------------------- Main Page Component --------------------------- */
export default function UserRequestDetailPage() {
  const params = useParams();
  const requestId = params.id as string;

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Mock Data - In production, use: const { data: requestDetail, isLoading } = useRequestDetail(requestId);
  const requestDetail = getMockRequestDetail(requestId);

  // Mutation hooks
  const approveRequest = useApproveRequest();
  const rejectRequest = useRejectRequest();

  // Modal states
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  // Check if request is still pending review
  const isInReview = requestDetail.status === 'in_review';
  const isDecided =
    requestDetail.status === 'approved' || requestDetail.status === 'rejected';

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
      await approveRequest.mutateAsync({
        id: requestId,
        payload: {
          notes: 'Request approved by admin',
        },
      });
      setApproveModalOpen(false);
      // Optionally redirect to list page
      // router.push('/dashboard/user-requests');
    } catch {
      // Error already handled by the hook
    }
  };

  const handleConfirmReject = async () => {
    try {
      await rejectRequest.mutateAsync({
        id: requestId,
        payload: {
          notes: 'Request rejected by admin',
        },
      });
      setRejectModalOpen(false);
      // Optionally redirect to list page
      // router.push('/dashboard/user-requests');
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
          title={'Are you sure you want to approve this request?'}
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
          title={'Are you sure you want to reject this request?'}
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
            href='/dashboard/user-requests'
            aria-label='Back to user requests list'
            className='rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <ArrowLeft className='mr-2 h-6 w-6' aria-hidden='true' />
          </Link>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            Request Repository
          </Typography>
        </div>

        {/* Detail Card */}
        <Card
          className={`space-y-1.5 border-t-5 font-satoshi ${
            requestDetail.status === 'approved'
              ? 'border-t-green-500'
              : requestDetail.status === 'rejected'
                ? 'border-t-red-500'
                : 'border-t-blue-500'
          }`}
          role='article'
          aria-labelledby='request-title'
        >
          <CardHeader className='mb-0'>
            <CardTitle className='p-0'>
              <Typography
                as='h2'
                variant='i2'
                className='leading-relaxed font-medium'
                id='request-title'
              >
                {requestDetail.repositoryTitle}
              </Typography>
              <Typography
                as='p'
                variant='b4'
                font='satoshi'
                weight='regular'
                className='mt-2 text-[14px] leading-[140%] text-[var(--Foundation-Black-black-200,#8A8A8A)]'
              >
                Dibuat pada {formatDate(requestDetail.requestDate)}
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
                id='request-info-heading'
              >
                Request Information
              </Typography>

              {/* Name */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-name'>
                    Name
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-name'
                  >
                    {requestDetail.name}
                  </Typography>
                </div>
              </div>

              {/* NRP */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-nrp'>
                    NRP
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-nrp'
                  >
                    {requestDetail.nrp}
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
                    {requestDetail.email}
                  </Typography>
                </div>
              </div>

              {/* Repository Title */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-start gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-repo-title'>
                    Repository Title
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-repo-title'
                  >
                    {requestDetail.repositoryTitle}
                  </Typography>
                </div>
              </div>

              {/* Writer */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-writer'>
                    Writer
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-writer'
                  >
                    {requestDetail.writer}
                  </Typography>
                </div>
              </div>

              {/* Request Date */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-request-date'>
                    Request Date
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='text-gray-900'
                    aria-labelledby='label-request-date'
                  >
                    {formatDate(requestDetail.requestDate)}
                  </Typography>
                </div>
              </div>

              {/* Reason */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='flex items-start gap-2 text-black-200 md:col-span-1'>
                  <Typography as='span' variant='s3' id='label-reason'>
                    Reason
                  </Typography>
                </div>
                <div className='md:col-span-3'>
                  <Typography
                    as='p'
                    variant='b2'
                    className='leading-relaxed text-gray-900'
                    aria-labelledby='label-reason'
                  >
                    {requestDetail.reason}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Status Bar - Show only if decided */}
          {isDecided && requestDetail.reviewedAt && (
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
                    requestDetail.status === 'approved'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                  aria-label={`Request ${requestDetail.status} at ${formatStatusDate(requestDetail.reviewedAt)}`}
                >
                  {requestDetail.status === 'approved'
                    ? 'Approved'
                    : 'Rejected'}{' '}
                  at {formatStatusDate(requestDetail.reviewedAt)}
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
                  disabled={rejectRequest.isPending || approveRequest.isPending}
                  aria-label={
                    rejectRequest.isPending
                      ? 'Rejecting request, please wait'
                      : 'Reject this request'
                  }
                  aria-busy={rejectRequest.isPending}
                >
                  <Typography as='span' variant='s3' className='font-medium'>
                    {rejectRequest.isPending ? 'Rejecting...' : 'Reject'}
                  </Typography>
                </Button>
                <Button
                  size='lg'
                  className='bg-blue-600 px-6 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'
                  onClick={handleApprove}
                  disabled={approveRequest.isPending || rejectRequest.isPending}
                  aria-label={
                    approveRequest.isPending
                      ? 'Approving request, please wait'
                      : 'Approve this request'
                  }
                  aria-busy={approveRequest.isPending}
                >
                  <Typography as='span' variant='s3' className='font-medium'>
                    {approveRequest.isPending ? 'Approving...' : 'Approve'}
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
