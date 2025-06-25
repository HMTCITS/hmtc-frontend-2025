import { Metadata } from 'next';

import ForgotPasswordForm from '@/app/(auth)/forgot-password/container/forgotPassswordForm';

export const metadata: Metadata = {
  title: 'Lupa Password • HMTC ITS',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForgotPasswordForm />;
}
