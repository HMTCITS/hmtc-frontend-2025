'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

import {
  useGallery,
  useUpdateQuery,
} from '@/app/dashboard/gallery/hooks/gallery';
import { navItem } from '@/app/dashboard/sidebar-link';
import { GalleryForm } from '@/components/gallery/GalleryForm';
import DashboardLayout from '@/layouts/DashboardLayout';
import { uploadThumbnail } from '@/lib/api/gallery.client';
import type { GalleryFormData } from '@/lib/validation/gallery';
import type { User as UserType } from '@/types/sidebar';

export default function EditGalleryPagePath() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : NaN;
  const pathname = usePathname();

  // Prefer params id; pathname is available as a fallback when needed
  // Temporary: when working with dummy data set this to true to avoid
  // calling the backend (prevents Axios 404 while UI is still mocked).
  // TODO: remove this flag when API is ready / backend available.
  const USE_DUMMY = true;

  // Always call the hook but disable it when using dummy data to satisfy rules-of-hooks
  const galleryQuery = useGallery(Number(id), !USE_DUMMY && !!id);
  const updateMutation = useUpdateQuery();

  const [initialData, setInitialData] = React.useState<
    Partial<GalleryFormData> | undefined
  >(undefined);

  React.useEffect(() => {
    if (USE_DUMMY) {
      // Provide mock initial data while backend is not used.
      const mock = {
        title: 'Welcome Party HMTC Suar Peradaban 2025',
        // ISO date format expected by the form
        date: new Date('2025-03-10').toISOString().split('T')[0],
        link: 'https://its.id/m/welparhmtc2025',
      } as Partial<GalleryFormData>;

      setInitialData(mock);
      return;
    }

    if (!galleryQuery || !galleryQuery.data) return;
    // axios response shape: response.data.data
    const respAny: any = galleryQuery.data;
    const serverData = respAny?.data?.data ?? respAny?.data ?? respAny;

    if (serverData) {
      const parseDateToIso = (v: any) => {
        try {
          const d = new Date(v);
          if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
        } catch (e) {
          void e;
        }
        return undefined;
      };

      setInitialData({
        title: serverData.title,
        date: parseDateToIso(serverData.date) ?? undefined,
        link: serverData.link,
      });
    }
  }, [USE_DUMMY, galleryQuery]);

  const handleUpdate = async (data: GalleryFormData) => {
    if (!id || Number.isNaN(id)) {
      toast.error('Invalid gallery id');
      return;
    }

    try {
      let payload: any = {
        title: data.title,
        date: data.date,
        link: data.link,
      };

      if (data.thumbnail && data.thumbnail instanceof File) {
        const uploadRes = await uploadThumbnail(data.thumbnail);
        const fileData = uploadRes.data?.data;
        payload = {
          ...payload,
          image: fileData?.imageUrl,
          width: fileData?.width,
          height: fileData?.height,
        };
      }

      await updateMutation.mutateAsync({ id: Number(id), data: payload });
      toast.success('Gallery item updated successfully!');
      router.push('/dashboard/gallery');
    } catch (error) {
      toast.error(`Failed to update gallery item. ${(error as Error).message}`);
    }
  };

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link href={`/dashboard/gallery/${idParam}`}>
              <ArrowLeft className='mr-2 h-6 w-6' />
            </Link>
            <h1 className='text-[32px] font-bold'>Edit Gallery</h1>
          </div>
        </div>

        <GalleryForm
          onSubmit={handleUpdate}
          onCancel={() => {
            // Use the route slug first, fallback to pathname parsing.
            const slug =
              idParam ??
              (() => {
                if (!pathname) return undefined;
                const parts = pathname.split('/').filter(Boolean);
                const idx = parts.indexOf('gallery');
                return idx >= 0 && parts.length > idx + 1
                  ? parts[idx + 1]
                  : undefined;
              })();

            const targetId = slug ? Number(slug) : undefined;
            if (targetId) {
              router.push(`/dashboard/gallery/${targetId}`);
            } else {
              router.push('/dashboard/gallery');
            }
          }}
          initialData={initialData}
          isLoading={updateMutation.isPending}
          mode='edit'
        />
      </div>
    </DashboardLayout>
  );
}
