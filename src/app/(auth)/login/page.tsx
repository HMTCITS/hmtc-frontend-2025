import { Metadata } from 'next';

import LoginForm from '@/app/(auth)/login/container/loginForm';

export const metadata: Metadata = {
  title: 'Masuk • HMTC ITS',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginForm />;
}
