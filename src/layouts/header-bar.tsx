import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UserMenu } from '@/layouts/user-menu';
import { cn } from '@/lib/utils';

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
};

type HeaderBarProps = {
  user: User;
  onLogout: () => void;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  className?: string;
};

export function HeaderBar({
  user,
  onLogout,
  className,
  onMenuClick,
  showMenuButton = false,
}: HeaderBarProps) {
  return (
    <header className={cn('fixed top-0 z-[5] w-full', className)}>
      <div className='flex items-center justify-between bg-white px-[100px] py-3 max-md:px-[50px]'>
        {/* Left - Logo Homepage + Burger Menu */}
        <div className='flex items-center gap-4'>
          {/* Burger Menu */}
          {showMenuButton && onMenuClick && (
            <Button
              variant='ghost'
              onClick={onMenuClick}
              className='w-auto lg:hidden'
            >
              <Menu size={32} />
            </Button>
          )}
          <Link
            href='/'
            className='flex items-center gap-3'
            aria-label='Homepage'
          >
            <Image
              width={26}
              height={72}
              src='/images/header/logo-hmtc2025-black.png'
              alt='Logo HMTC Suar Peradaban'
            />
            <div className='flex flex-col items-start font-adelphe text-2xl max-md:text-xl font-bold'>
              HMTC <br /> Suar Peradaban
            </div>
          </Link>
        </div>
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
