'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Atom,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) return null; // UI-only hide, NOT auth logic

  const role = session.user.role;

  const menuItems = [
    {
      href: role === 'admin' ? '/dashboard/admin' : '/dashboard/student',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    { href: '/tutorials', label: 'Tutorials', icon: Atom },
    { href: '/mock-tests', label: 'Mock Tests', icon: FileText },
    { href: '/doubts', label: 'Doubts', icon: MessageCircle },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-3 py-2 text-lg font-bold">JEEPrep</div>
      </SidebarHeader>

      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton isActive={pathname.startsWith(item.href)}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter>
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {session.user.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div>{session.user.email}</div>
              <div className="text-xs capitalize opacity-70">
                {session.user.role}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
