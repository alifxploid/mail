'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  Home, 
  Inbox, 
  Settings, 
  Mail, 
  Archive, 
  Trash2,
  Activity,
  Database,
  Wrench,
  Bot,
  Zap,
  Shield,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: Inbox,
    badge: '3',
  },
  {
    title: 'Archive',
    url: '/archive',
    icon: Archive,
  },
  {
    title: 'Trash',
    url: '/trash',
    icon: Trash2,
  },
];

const toolsItems = [
  {
    title: 'AI Generator',
    icon: Bot,
    action: () => console.log('AI Generator clicked'),
  },
  {
    title: 'Quick Actions',
    icon: Zap,
    action: () => console.log('Quick Actions clicked'),
  },
  {
    title: 'Security Tools',
    icon: Shield,
    action: () => console.log('Security Tools clicked'),
  },
  {
    title: 'Settings',
    icon: Settings,
    action: () => window.location.href = '/settings',
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <Mail className="h-7 w-7" />
          <span className="font-bold text-lg">TempMail</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-base">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-3 w-full justify-between">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5" />
                        <span className="text-base">Tools</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {toolsItems.map((item) => (
                      <DropdownMenuItem 
                        key={item.title}
                        onClick={item.action}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        

      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 space-y-2">
          <Separator />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Status: Online</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <SidebarTrigger />
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-4 p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}