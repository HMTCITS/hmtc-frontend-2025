'use client'

import { UserRound, UsersRound } from "lucide-react";

import { SidebarNav } from "@/layouts/sidebar-nav";

const items = [
  {
    href: "/profile",
    label: "Profile",
    icon: () => <UserRound />,
  },
  {
    label: 'User',
    href: '/users',
    icon: () => <UsersRound />
  },
  {
    label: 'Repository',
    href: '/repositories',
    icon: () => <UsersRound />
  },
  {
    label: 'User Request',
    href: '/user-requests',
    icon: () => <UsersRound />
  },
  {
    label: 'User Upload',
    href: '/user-uploads',
    icon: () => <UsersRound />
  },
  {
    label: 'Test Page',
    href: '/sandbox/test',
    icon: () => <UsersRound />
  }
];

export default function TestPage() {
  return (
    <div className="flex">
      <SidebarNav items={items} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Test Page</h1>
      </main>
    </div>
  );
}