'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ScrollText, Search, Download, Filter, User, Bot, RefreshCw,
  CreditCard, Settings, AlertTriangle, Shield, Users, ChevronDown,
} from 'lucide-react';
import { auditLog, getUserById, formatDateTime } from '@/data/mock-data';
import { AuditAction } from '@/types';

const actionIcons: Record<AuditAction, typeof CreditCard> = {
  credit_purchase: CreditCard,
  credit_allocation: Users,
  pool_created: CreditCard,
  pool_modified: Settings,
  policy_created: Shield,
  policy_modified: Settings,
  auto_topup_triggered: RefreshCw,
  auto_topup_configured: Settings,
  budget_alert: AlertTriangle,
  overage_warning: AlertTriangle,
  allocation_protected: Shield,
  user_throttled: AlertTriangle,
};

const actionColors: Record<string, string> = {
  credit_purchase: 'bg-blue-100 text-blue-800',
  credit_allocation: 'bg-green-100 text-green-800',
  pool_created: 'bg-violet-100 text-violet-800',
  pool_modified: 'bg-violet-100 text-violet-800',
  policy_created: 'bg-indigo-100 text-indigo-800',
  policy_modified: 'bg-indigo-100 text-indigo-800',
  auto_topup_triggered: 'bg-amber-100 text-amber-800',
  auto_topup_configured: 'bg-amber-100 text-amber-800',
  budget_alert: 'bg-red-100 text-red-800',
  overage_warning: 'bg-red-100 text-red-800',
  allocation_protected: 'bg-green-100 text-green-800',
  user_throttled: 'bg-red-100 text-red-800',
};

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterActor, setFilterActor] = useState<string>('all');

  const filteredLog = auditLog.filter(entry => {
    if (search && !entry.details.toLowerCase().includes(search.toLowerCase()) && !entry.actor.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterAction !== 'all' && entry.action !== filterAction) return false;
    if (filterActor !== 'all' && entry.actorType !== filterActor) return false;
    return true;
  });

  const uniqueActions = [...new Set(auditLog.map(e => e.action))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Audit Log</h1>
          <p className="text-sm text-gray-500">Complete record of all credit transactions, policy changes, and system events</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search audit log..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(a => (
                  <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>
                ))}
              </select>
              <select
                value={filterActor}
                onChange={(e) => setFilterActor(e.target.value)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <option value="all">All Actors</option>
                <option value="user">Users</option>
                <option value="system">System</option>
                <option value="auto_topup">Auto Top-Up</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Total Events</p>
            <p className="text-xl font-bold">{auditLog.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">User Actions</p>
            <p className="text-xl font-bold">{auditLog.filter(e => e.actorType === 'user').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">System Events</p>
            <p className="text-xl font-bold">{auditLog.filter(e => e.actorType === 'system').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Auto Top-Ups</p>
            <p className="text-xl font-bold">{auditLog.filter(e => e.actorType === 'auto_topup').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Log Entries */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-900">
            {filteredLog.map(entry => {
              const Icon = actionIcons[entry.action] || ScrollText;
              const user = entry.actorType === 'user' ? getUserById(entry.actor) : null;
              const colorClass = actionColors[entry.action] || 'bg-gray-100 text-gray-800';

              return (
                <div key={entry.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-950/50">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0 ${entry.actorType === 'system' ? 'bg-gray-100' : entry.actorType === 'auto_topup' ? 'bg-amber-100' : 'bg-violet-100'}`}>
                    {entry.actorType === 'user' ? (
                      <User className="h-4 w-4 text-violet-600" />
                    ) : entry.actorType === 'auto_topup' ? (
                      <RefreshCw className="h-4 w-4 text-amber-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-sm">
                        {user ? user.name : entry.actorType === 'auto_topup' ? 'Auto Top-Up' : 'System'}
                      </span>
                      <Badge className={`text-xs ${colorClass}`}>
                        {entry.action.replace(/_/g, ' ')}
                      </Badge>
                      <span className="text-xs text-gray-400">{entry.targetType}: {entry.targetId}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.details}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">{formatDateTime(entry.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
