import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Github, Twitter, Shield } from 'lucide-react';
import Link from 'next/link';

const essentialLinks = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Help', href: '/help' },
];

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Brand & Description */}
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span className="font-semibold">TempMail</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure temporary email service
            </p>
          </div>
          
          {/* Links & Social */}
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-6">
            {/* Essential Links */}
            <div className="flex flex-wrap gap-4 text-sm">
              {essentialLinks.map((item) => (
                <Button key={item.name} variant="link" className="h-auto p-0 text-sm text-muted-foreground" asChild>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((item) => (
                <Button key={item.name} variant="ghost" size="sm" asChild>
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
            
            {/* Security Badge */}
            <div className="flex items-center space-x-1 rounded-md border px-2 py-1">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="text-xs text-muted-foreground">SSL</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Copyright */}
        <div className="flex flex-col items-center justify-between space-y-2 text-center md:flex-row md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © 2024 TempMail. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Next.js 15 • Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}