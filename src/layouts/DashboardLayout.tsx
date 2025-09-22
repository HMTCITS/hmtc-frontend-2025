'use client';
import React, { useState } from 'react';

import Providers from '@/app/providers';
import { HeaderBar } from '@/layouts/header-bar';
import { SidebarNav } from '@/layouts/sidebar-nav';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type User = {
  name: string;
  role: string;
  avatarUrl?: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  user: User;
  navItems: NavItem[];
  onLogout: () => void;
  className?: string;
};

export default function DashboardLayout({
  children,
  user,
  navItems,
  onLogout,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Providers>
      <div className='min-h-screen bg-[#EDFAFF]'>
        {/* Header */}
        <HeaderBar
          user={user}
          onLogout={onLogout}
          onMenuClick={toggleSidebar} // Pass toggle function ke header
          showMenuButton={true} // Show burger menu di mobile
        />

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 z-40 bg-black/50 lg:hidden'
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <div className='flex h-screen overflow-hidden pt-[98px]'>
          {/* Sidebar */}
          <SidebarNav
            items={navItems}
            className={`/* Desktop - Always */ /* Mobile - Hidden by default, slide in when open */ visible sticky z-50 h-screen flex-shrink-0 overflow-y-auto lg:relative lg:block lg:translate-x-0 ${sidebarOpen ? 'block' : 'hidden'} lg:${sidebarOpen ? 'block' : 'block'} /* Mobile positioning */ fixed top-[86px] left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:w-auto lg:bg-transparent lg:shadow-none ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
            } `}
            onNavigate={closeSidebar} // Close sidebar saat navigate di mobile
          />

          {/* Main Content */}
          <main className='flex-1 overflow-y-auto'>
            <div className='p-4'>{children}</div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
