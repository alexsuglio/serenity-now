'use client';

import { Bell, Search, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { alerts } from '@/data/mock-data';

export function Header() {
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 dark:bg-gray-900">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pools, teams, users..."
            className="w-64 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unacknowledgedAlerts > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-[10px] text-white flex items-center justify-center">
              {unacknowledgedAlerts}
            </Badge>
          )}
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Art Vandelay</p>
            <p className="text-xs text-gray-500">Enterprise Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
