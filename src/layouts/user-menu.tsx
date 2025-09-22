import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
};

export function UserMenu({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          suppressHydrationWarning
          className='flex items-center gap-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-2 py-2 text-white'
          aria-label='User menu'
        >
          <Avatar className='h-[43px] w-[43px]'>
            <AvatarImage src={user.avatarUrl} alt={`${user.name} avatar`} />
            <AvatarFallback>{user.name?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>

          <span className='hidden font-satoshi font-medium sm:inline'>
            {user.role} - {user.name}
          </span>

          <ChevronDown className='h-5 w-5' aria-hidden='true' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56 font-satoshi'>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href='/profile'>View Profile</Link>
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem asChild>
          <Link href='/settings'>Account Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem onClick={onLogout} className='text-red-600'>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
