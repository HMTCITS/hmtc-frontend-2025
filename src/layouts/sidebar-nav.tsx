import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type SidebarNavProps = {
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
};

export function SidebarNav({ items, className, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <aside className={cn('w-64 shrink-0 py-8 pr-3', className)}>
      <nav role='navigation' aria-label='Main' className='flex flex-col gap-4'>
        {items.map((it) => {
          // Check if pathname exactly matches or starts with href followed by '/'
          const active =
            pathname === it.href || pathname.startsWith(it.href + '/');
          const ItemIcon = it.icon;

          return (
            <Link
              onClick={handleNavClick}
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
              <ItemIcon className={cn('h-8 w-8', active && 'text-primary')} />
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
