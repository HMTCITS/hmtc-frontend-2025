import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <aside className='w-64 shrink-0 py-8 pr-3'>
      <nav role='navigation' aria-label='Main' className='flex flex-col gap-4'>
        {items.map((it) => {
          const active = pathname.startsWith(it.href);
          const ItemIcon = it.icon;

          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-6 rounded-tr-2xl rounded-br-2xl px-8 py-3 transition-colors',
                active
                  ? 'bg-[#E6E9EC] text-primary'
                  : 'text-slate-700 hover:bg-slate-100',
              )}
            >
              <ItemIcon className={cn('h-5 w-5', active && 'text-primary')} />
              <span className='font-satoshi font-bold text-black'>
                {it.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
