'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Plus, Shield, ArrowUpRight, TrendingUp, RotateCcw, Lock } from 'lucide-react';
import {
  creditPools, creditAllocations, organizations, teams, users,
  formatCredits, formatCurrency, getOrgById, getTeamById, getUserById,
} from '@/data/mock-data';
import Link from 'next/link';

function PoolCard({ pool }: { pool: typeof creditPools[0] }) {
  const pct = (pool.usedCredits / pool.totalCredits) * 100;
  const allocations = creditAllocations.filter(a => a.poolId === pool.id);
  const org = pool.orgId ? getOrgById(pool.orgId) : null;

  return (
    <Card className="relative overflow-hidden">
      {pool.type === 'supplemental' && (
        <div className="absolute right-0 top-0 h-16 w-16">
          <div className="absolute right-[-20px] top-[8px] w-[80px] rotate-45 bg-violet-500 py-0.5 text-center text-[9px] font-bold text-white">
            SUPPLEMENTAL
          </div>
        </div>
      )}
      {pool.type === 'reserved' && (
        <div className="absolute right-0 top-0 h-16 w-16">
          <div className="absolute right-[-20px] top-[8px] w-[80px] rotate-45 bg-amber-500 py-0.5 text-center text-[9px] font-bold text-white">
            RESERVED
          </div>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{pool.name}</CardTitle>
            <CardDescription>
              {org ? org.name : 'Enterprise-wide'} · Created {new Date(pool.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </CardDescription>
          </div>
          <Badge variant={pool.type === 'enterprise' ? 'default' : pool.type === 'supplemental' ? 'secondary' : 'outline'}>
            {pool.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-gray-500">Credits Used</span>
            <span className="font-medium">{formatCredits(pool.usedCredits)} / {formatCredits(pool.totalCredits)}</span>
          </div>
          <Progress value={pct} className={`h-3 ${pct > 90 ? '[&>div]:bg-red-500' : pct > 75 ? '[&>div]:bg-amber-500' : '[&>div]:bg-violet-500'}`} />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>{formatCredits(pool.totalCredits - pool.usedCredits)} remaining</span>
            <span>{pct.toFixed(1)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
          <div className="text-center">
            <p className="text-xs text-gray-500">Monthly</p>
            <p className="text-sm font-semibold">{formatCredits(pool.monthlyAllocation)}</p>
          </div>
          <div className="text-center border-x border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500">Reserved</p>
            <p className="text-sm font-semibold">{formatCredits(pool.reservedCredits)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Rollover</p>
            <p className="text-sm font-semibold flex items-center justify-center gap-1">
              {pool.rolloverCredits > 0 && <RotateCcw className="h-3 w-3 text-blue-500" />}
              {formatCredits(pool.rolloverCredits)}
            </p>
          </div>
        </div>

        {allocations.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500 uppercase">Allocations</p>
            <div className="space-y-2">
              {allocations.map(alloc => {
                const target = alloc.targetType === 'org' ? getOrgById(alloc.targetId)?.name :
                  alloc.targetType === 'team' ? getTeamById(alloc.targetId)?.name :
                  getUserById(alloc.targetId)?.name || alloc.targetId;
                const allocPct = (alloc.used / alloc.amount) * 100;
                return (
                  <div key={alloc.id} className="flex items-center gap-2">
                    {alloc.isProtected && <Lock className="h-3 w-3 text-amber-500 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="truncate font-medium">{target}</span>
                        <span className="text-gray-400">{formatCredits(alloc.used)}/{formatCredits(alloc.amount)}</span>
                      </div>
                      <div className="mt-0.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800">
                        <div className="h-1.5 rounded-full bg-violet-400" style={{ width: `${Math.min(allocPct, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function PoolsPage() {
  const enterprisePools = creditPools.filter(p => p.type === 'enterprise');
  const supplementalPools = creditPools.filter(p => p.type === 'supplemental');
  const reservedPools = creditPools.filter(p => p.type === 'reserved');

  const totalAll = creditPools.reduce((s, p) => s + p.totalCredits, 0);
  const usedAll = creditPools.reduce((s, p) => s + p.usedCredits, 0);
  const totalSupp = supplementalPools.reduce((s, p) => s + p.totalCredits, 0);
  const totalRes = reservedPools.reduce((s, p) => s + p.totalCredits, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Credit Pools</h1>
          <p className="text-sm text-gray-500">Manage enterprise, supplemental, and reserved credit pools</p>
        </div>
        <div className="flex gap-2">
          <Link href="/purchase">
            <Button className="bg-violet-600 text-white hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" />New Supplemental Pool
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-violet-500" />
              <div>
                <p className="text-xs text-gray-500">Total Credits</p>
                <p className="text-xl font-bold">{formatCredits(totalAll)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Used</p>
                <p className="text-xl font-bold">{formatCredits(usedAll)} <span className="text-sm font-normal text-gray-400">({((usedAll / totalAll) * 100).toFixed(0)}%)</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Supplemental</p>
                <p className="text-xl font-bold">{formatCredits(totalSupp)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-gray-500">Reserved</p>
                <p className="text-xl font-bold">{formatCredits(totalRes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Pools ({creditPools.length})</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise ({enterprisePools.length})</TabsTrigger>
          <TabsTrigger value="supplemental">Supplemental ({supplementalPools.length})</TabsTrigger>
          <TabsTrigger value="reserved">Reserved ({reservedPools.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {creditPools.map(pool => <PoolCard key={pool.id} pool={pool} />)}
          </div>
        </TabsContent>
        <TabsContent value="enterprise" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {enterprisePools.map(pool => <PoolCard key={pool.id} pool={pool} />)}
          </div>
        </TabsContent>
        <TabsContent value="supplemental" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {supplementalPools.map(pool => <PoolCard key={pool.id} pool={pool} />)}
          </div>
        </TabsContent>
        <TabsContent value="reserved" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reservedPools.map(pool => <PoolCard key={pool.id} pool={pool} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
