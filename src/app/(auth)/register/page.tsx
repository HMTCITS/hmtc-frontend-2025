import { Metadata } from 'next';

import RegisterForm from '@/app/(auth)/register/container/registerForm';

export const metadata: Metadata = {
  title: 'Registrasi • HMTC ITS',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RegisterForm />;
}
