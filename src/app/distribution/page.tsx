'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Share2, Lock, Unlock, Building2, Users, User,
  ArrowRight, Save, RotateCcw, Pencil,
} from 'lucide-react';
import {
  creditAllocations, creditPools, organizations, teams, users,
  formatCredits, getOrgById, getTeamById, getUserById,
} from '@/data/mock-data';
import { CreditAllocation } from '@/types';

function AllocationRow({ alloc, onEdit }: { alloc: CreditAllocation; onEdit: () => void }) {
  const pct = (alloc.used / alloc.amount) * 100;
  const pool = creditPools.find(p => p.id === alloc.poolId);
  const target =
    alloc.targetType === 'org' ? getOrgById(alloc.targetId) :
    alloc.targetType === 'team' ? getTeamById(alloc.targetId) :
    getUserById(alloc.targetId);
  const targetName = target ? (target as { name: string }).name : alloc.targetId;
  const Icon = alloc.targetType === 'org' ? Building2 : alloc.targetType === 'team' ? Users : User;

  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800 hover:border-violet-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${alloc.isProtected ? 'bg-amber-100 dark:bg-amber-900' : 'bg-gray-100 dark:bg-gray-900'}`}>
            <Icon className={`h-5 w-5 ${alloc.isProtected ? 'text-amber-600' : 'text-gray-500'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{targetName}</p>
              <Badge variant="outline" className="text-xs">{alloc.targetType}</Badge>
              {alloc.isProtected && (
                <Badge className="bg-amber-100 text-amber-800 text-xs">
                  <Lock className="mr-1 h-3 w-3" />Protected
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Pool: {pool?.name} · Period: {alloc.period}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-3 w-3 mr-1" />Edit
        </Button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Usage</span>
          <span className="font-medium">{formatCredits(alloc.used)} / {formatCredits(alloc.amount)}</span>
        </div>
        <Progress value={pct} className={`h-2 ${pct > 90 ? '[&>div]:bg-red-500' : pct > 75 ? '[&>div]:bg-amber-500' : '[&>div]:bg-violet-500'}`} />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatCredits(alloc.amount - alloc.used)} remaining</span>
          <span>{pct.toFixed(0)}% used</span>
        </div>
      </div>
    </div>
  );
}

export default function DistributionPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState(0);
  const [editProtected, setEditProtected] = useState(false);

  const enterpriseAllocs = creditAllocations.filter(a => {
    const pool = creditPools.find(p => p.id === a.poolId);
    return pool?.type === 'enterprise';
  });
  const supplementalAllocs = creditAllocations.filter(a => {
    const pool = creditPools.find(p => p.id === a.poolId);
    return pool?.type === 'supplemental';
  });
  const reservedAllocs = creditAllocations.filter(a => {
    const pool = creditPools.find(p => p.id === a.poolId);
    return pool?.type === 'reserved';
  });

  function startEdit(alloc: CreditAllocation) {
    setEditingId(alloc.id);
    setEditAmount(alloc.amount);
    setEditProtected(alloc.isProtected);
  }

  const totalAllocated = creditAllocations.reduce((s, a) => s + a.amount, 0);
  const totalUsed = creditAllocations.reduce((s, a) => s + a.used, 0);
  const protectedCount = creditAllocations.filter(a => a.isProtected).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Credit Distribution</h1>
          <p className="text-sm text-gray-500">Allocate and manage credits across organizations, teams, and individuals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-violet-500" />
              <div>
                <p className="text-xs text-gray-500">Total Allocated</p>
                <p className="text-xl font-bold">{formatCredits(totalAllocated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Total Used</p>
                <p className="text-xl font-bold">{formatCredits(totalUsed)} <span className="text-sm text-gray-400">({((totalUsed / totalAllocated) * 100).toFixed(0)}%)</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-gray-500">Protected Allocations</p>
                <p className="text-xl font-bold">{protectedCount} of {creditAllocations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {editingId && (
        <Card className="border-violet-200">
          <CardHeader>
            <CardTitle className="text-base">Edit Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Credit Amount</Label>
              <Input type="number" value={editAmount} onChange={(e) => setEditAmount(Number(e.target.value))} className="mt-1" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={editProtected} onCheckedChange={setEditProtected} />
              <div>
                <Label>Protected Allocation</Label>
                <p className="text-xs text-gray-500">Protected credits cannot be consumed by the enterprise pool</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-violet-600 text-white"><Save className="mr-1 h-3 w-3" />Save Changes</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-violet-500" />
            Enterprise Pool Allocations
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {enterpriseAllocs.map(a => (
              <AllocationRow key={a.id} alloc={a} onEdit={() => startEdit(a)} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Supplemental Allocations
            <Badge variant="outline" className="text-xs">Protected from enterprise pool</Badge>
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {supplementalAllocs.map(a => (
              <AllocationRow key={a.id} alloc={a} onEdit={() => startEdit(a)} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <User className="h-5 w-5 text-amber-500" />
            Reserved Allocations
            <Badge variant="outline" className="text-xs">Individual guarantees</Badge>
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {reservedAllocs.map(a => (
              <AllocationRow key={a.id} alloc={a} onEdit={() => startEdit(a)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
