'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Layers,
  CreditCard,
  Share2,
  RefreshCw,
  Shield,
  BarChart3,
  ScrollText,
  Sparkles,
  Building2,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pools', label: 'Credit Pools', icon: Layers },
  { href: '/purchase', label: 'Purchase', icon: CreditCard },
  { href: '/distribution', label: 'Distribution', icon: Share2 },
  { href: '/auto-topup', label: 'Auto Top-Up', icon: RefreshCw },
  { href: '/policies', label: 'Policies', icon: Shield },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/audit', label: 'Audit Log', icon: ScrollText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      {/* Header */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-5 dark:border-gray-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">AI Credits</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Enterprise Management</p>
        </div>
      </div>

      {/* Enterprise Selector */}
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <Building2 className="h-4 w-4 text-gray-400" />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">ACME Corporation</p>
            <p className="text-xs text-gray-500">2,500 seats · Enterprise Cloud</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-violet-600 dark:text-violet-400' : '')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 px-4 py-3 dark:border-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Serenity Now™ · v0.1.0
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          🧘 Enterprise AI Credits
        </p>
      </div>
    </aside>
  );
}
