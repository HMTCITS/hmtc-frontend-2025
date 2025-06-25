import { Metadata } from 'next';

import ChangePasswordForm from '@/app/(auth)/change-password/container/changePasswordForm';

export const metadata: Metadata = {
  title: 'Ubah Password • HMTC ITS',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ChangePasswordForm />;
}
