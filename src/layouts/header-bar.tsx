import Image from 'next/image';
import Link from 'next/link';

import { UserMenu } from '@/layouts/user-menu';

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
};

export function HeaderBar({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  return (
    <header className='flex items-center justify-between bg-white px-[100px] py-3 max-md:px-[50px]'>
      <Link href='/' className='flex items-center gap-3' aria-label='Homepage'>
        <Image
          width={26}
          height={72}
          src='/images/header/logo-hmtc2025-black.png'
          alt='Logo HMTC Suar Peradaban'
        />
        <div className='flex flex-col items-start font-adelphe'>
          <span className='text-2xl font-bold'>HMTC</span>
          <span className='text-2xl font-bold'>Suar Peradaban</span>
        </div>
      </Link>
      <UserMenu user={user} onLogout={onLogout} />
    </header>
  );
}
