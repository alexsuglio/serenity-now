'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  RefreshCw, Zap, TrendingUp, Calendar, DollarSign,
  CheckCircle2, Clock, AlertTriangle, Settings, Plus,
} from 'lucide-react';
import {
  autoTopUpRules, creditPools, costCenters,
  getConsumptionByOrg, formatCredits, formatCurrency, getCostCenterById,
} from '@/data/mock-data';

export default function AutoTopUpPage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  // Generate projected consumption data for the data science pool
  const projectionData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const baseConsumption = 2000 + Math.random() * 800;
    const trend = i * 30; // growing trend
    return {
      date: date.toISOString().split('T')[0],
      projected: Math.round(baseConsumption + trend),
      threshold: 12000, // 20% of 60K remaining
    };
  });

  // Cumulative for pool exhaustion
  let cumulative = 0;
  const exhaustionData = projectionData.map(d => {
    cumulative += d.projected;
    return {
      ...d,
      cumulative,
      poolRemaining: Math.max(0, 60000 - cumulative),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Auto Top-Up</h1>
          <p className="text-sm text-gray-500">Automated credit replenishment based on consumption trends</p>
        </div>
        <Button className="bg-violet-600 text-white hover:bg-violet-700">
          <Plus className="mr-2 h-4 w-4" />New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-violet-500" />
              <div>
                <p className="text-xs text-gray-500">Active Rules</p>
                <p className="text-xl font-bold">{autoTopUpRules.filter(r => r.enabled).length} of {autoTopUpRules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Total Auto-Spend (All Time)</p>
                <p className="text-xl font-bold">{formatCurrency(autoTopUpRules.reduce((s, r) => s + r.totalAutoSpend, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Next Scheduled</p>
                <p className="text-xl font-bold">May 18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Consumption Forecast — Data Science Pool</CardTitle>
          <CardDescription>30-day projection based on current trends. Auto top-up triggers when pool drops below 20%.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={exhaustionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatCredits(v)} />
              <Tooltip formatter={(value) => formatCredits(Number(value))} />
              <ReferenceLine y={12000} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Auto Top-Up Threshold (20%)', position: 'right', fontSize: 11 }} />
              <Area type="monotone" dataKey="poolRemaining" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} name="Pool Remaining" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Auto Top-Up Rules</h2>
        {autoTopUpRules.map(rule => {
          const pool = creditPools.find(p => p.id === rule.poolId);
          const cc = getCostCenterById(rule.costCenterId);
          const isSelected = selectedRule === rule.id;
          
          return (
            <Card key={rule.id} className={`transition-all ${isSelected ? 'border-violet-300 ring-1 ring-violet-200' : ''} ${!rule.enabled ? 'opacity-60' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${rule.enabled ? 'bg-violet-100 dark:bg-violet-900' : 'bg-gray-100 dark:bg-gray-900'}`}>
                      <RefreshCw className={`h-6 w-6 ${rule.enabled ? 'text-violet-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{pool?.name}</h3>
                        <Badge variant={rule.enabled ? 'default' : 'secondary'} className={rule.enabled ? 'bg-green-100 text-green-800' : ''}>
                          {rule.enabled ? 'Active' : 'Disabled'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Trigger: {rule.trigger === 'percentage_remaining' ? `${rule.triggerValue}% remaining` : rule.trigger === 'projected_exhaustion' ? `${rule.triggerValue} days before exhaustion` : `Day ${rule.triggerValue} of month`}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Amount: {formatCredits(rule.topUpAmount)} credits
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Max: {formatCurrency(rule.maxMonthlySpend)}/mo
                        </span>
                        <span className="flex items-center gap-1">
                          {rule.requiresApproval ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                          {rule.requiresApproval ? `Approval required above ${formatCurrency(rule.approvalThreshold)}` : 'Auto-approved'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.enabled} />
                    <Button variant="ghost" size="sm" onClick={() => setSelectedRule(isSelected ? null : rule.id)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-4 gap-4 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                  <div>
                    <p className="text-xs text-gray-500">Billing</p>
                    <p className="text-sm font-medium">{cc?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Auto-Spend</p>
                    <p className="text-sm font-medium">{formatCurrency(rule.totalAutoSpend)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Triggered</p>
                    <p className="text-sm font-medium">{rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Never'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Scheduled</p>
                    <p className="text-sm font-medium">{rule.nextScheduled ? new Date(rule.nextScheduled).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'On trigger'}</p>
                  </div>
                </div>

                {/* Expanded config */}
                {isSelected && (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Top-Up Amount</Label>
                        <Input type="number" defaultValue={rule.topUpAmount} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Max Monthly Spend ($)</Label>
                        <Input type="number" defaultValue={rule.maxMonthlySpend} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Trigger Value</Label>
                        <Input type="number" defaultValue={rule.triggerValue} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Approval Threshold ($)</Label>
                        <Input type="number" defaultValue={rule.approvalThreshold} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={rule.requiresApproval} />
                      <Label>Require approval above threshold</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-violet-600 text-white">Save Changes</Button>
                      <Button size="sm" variant="outline">Test Rule</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Auto Top-Up History */}
      <Card>
        <CardHeader>
          <CardTitle>Auto Top-Up History</CardTitle>
          <CardDescription>Recent automated purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Apr 28, 2026', pool: 'Data Science Supplemental', amount: 20000, cost: 2000, trigger: 'Pool at 15% remaining', status: 'completed' },
              { date: 'Apr 15, 2026', pool: 'Platform Engineering Supplemental', amount: 15000, cost: 1500, trigger: 'Projected exhaustion in 5 days', status: 'pending_approval' },
              { date: 'Mar 25, 2026', pool: 'Data Science Supplemental', amount: 20000, cost: 2000, trigger: 'Pool at 18% remaining', status: 'completed' },
            ].map((entry, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-gray-200 p-3 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {entry.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{entry.pool}</p>
                    <p className="text-xs text-gray-500">{entry.trigger}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCredits(entry.amount)} credits · {formatCurrency(entry.cost)}</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
