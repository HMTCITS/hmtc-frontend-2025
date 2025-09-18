'use client';
import React from 'react';

import Providers from '@/app/providers'; 
import { HeaderBar } from '@/layouts/header-bar';
import { SidebarNav } from '@/layouts/sidebar-nav';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
}

type DashboardLayoutProps = {
  children: React.ReactNode;
  user: User;
  navItems: NavItem[];
  onLogout: () => void;
  className?: string;
}

export default function DashboardLayout({ 
  children,
  user, 
  navItems, 
  onLogout
 }: DashboardLayoutProps) {
  return (
    <Providers>
      <div className='min-h-screen bg-[#EDFAFF]'>
        {/* Header */}
        <HeaderBar user={user} onLogout={onLogout} />

        {/* Main Content */}
        <SidebarNav items={navItems} />
        <main>
          <div>{children}</div>
        </main>
      </div>
    </Providers>
  );
}