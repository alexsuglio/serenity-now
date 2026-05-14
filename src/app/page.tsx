'use client';

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp, TrendingDown, AlertTriangle, Zap, DollarSign,
  ArrowRight, CheckCircle2, XCircle, Clock,
} from 'lucide-react';
import {
  enterprise, creditPools, alerts as allAlerts,
  getDailyTotals, getConsumptionByModel, getTopConsumers,
  formatCredits, formatCurrency, costCenters,
} from '@/data/mock-data';
import Link from 'next/link';

const COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626', '#8b5cf6'];

export default function DashboardPage() {
  const totalCredits = creditPools.reduce((s, p) => s + p.totalCredits, 0);
  const usedCredits = creditPools.reduce((s, p) => s + p.usedCredits, 0);
  const remainingCredits = totalCredits - usedCredits;
  const utilizationPct = ((usedCredits / totalCredits) * 100).toFixed(1);

  const enterprisePool = creditPools.find(p => p.type === 'enterprise')!;
  const supplementalTotal = creditPools.filter(p => p.type === 'supplemental').reduce((s, p) => s + p.totalCredits, 0);

  const totalBudget = costCenters.reduce((s, cc) => s + cc.monthlyBudget, 0);
  const totalSpend = costCenters.reduce((s, cc) => s + cc.currentSpend, 0);

  const dailyTotals = getDailyTotals(30);
  const modelBreakdown = getConsumptionByModel(30);
  const topConsumers = getTopConsumers(30);

  const activeAlerts = allAlerts.filter(a => !a.acknowledged);
  const burnRate = dailyTotals.length > 0 ? dailyTotals[dailyTotals.length - 1].total : 0;
  const avgBurnRate = dailyTotals.reduce((s, d) => s + d.total, 0) / dailyTotals.length;
  const daysRemaining = Math.round(remainingCredits / avgBurnRate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Credits Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {enterprise.name} · {enterprise.plan} · {enterprise.totalSeats.toLocaleString()} seats
          </p>
        </div>
        <Link href="/purchase">
          <Button className="bg-violet-600 text-white hover:bg-violet-700">
            <Zap className="mr-2 h-4 w-4" />Purchase Credits
          </Button>
        </Link>
      </div>

      {activeAlerts.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              {activeAlerts.length} active alert{activeAlerts.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-1">
            {activeAlerts.slice(0, 3).map(alert => (
              <div key={alert.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={alert.type === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                    {alert.type}
                  </Badge>
                  <span className="text-sm text-amber-900 dark:text-amber-100">{alert.title}</span>
                </div>
                {alert.actionUrl && (
                  <Link href={alert.actionUrl}>
                    <Button variant="ghost" size="sm" className="text-amber-700">View <ArrowRight className="ml-1 h-3 w-3" /></Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Credits</CardTitle>
            <Zap className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCredits(totalCredits)}</div>
            <p className="text-xs text-gray-500">
              {formatCredits(enterprisePool.totalCredits)} enterprise + {formatCredits(supplementalTotal)} supplemental
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Utilization</CardTitle>
            <TrendingUp className={`h-4 w-4 ${Number(utilizationPct) > 85 ? 'text-red-500' : 'text-green-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationPct}%</div>
            <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className={`h-2 rounded-full ${Number(utilizationPct) > 85 ? 'bg-red-500' : Number(utilizationPct) > 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${utilizationPct}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {formatCredits(remainingCredits)} remaining · ~{daysRemaining} days left
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpend)}</div>
            <p className="text-xs text-gray-500">
              of {formatCurrency(totalBudget)} budget ({((totalSpend / totalBudget) * 100).toFixed(0)}%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Burn Rate</CardTitle>
            {burnRate > avgBurnRate * 1.2 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCredits(burnRate)}/day</div>
            <p className="text-xs text-gray-500">
              Avg: {formatCredits(Math.round(avgBurnRate))}/day
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Credit Consumption Trend</CardTitle>
            <CardDescription>Daily credit usage over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyTotals}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCredits(v)} />
                <Tooltip
                  formatter={(value) => [Number(value).toLocaleString() + ' credits', 'Usage']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                />
                <Area type="monotone" dataKey="total" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By AI Model</CardTitle>
            <CardDescription>30-day consumption by model type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={modelBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="total" nameKey="model">
                  {modelBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCredits(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {modelBreakdown.map((item, i) => (
                <div key={item.model} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-gray-600 dark:text-gray-400">{item.model}</span>
                  </div>
                  <span className="font-medium">{formatCredits(item.total)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Consuming Organizations</CardTitle>
            <CardDescription>30-day credit usage by organization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topConsumers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => formatCredits(v)} />
                <YAxis type="category" dataKey="orgName" tick={{ fontSize: 12 }} width={120} />
                <Tooltip formatter={(value) => [Number(value).toLocaleString() + ' credits', 'Usage']} />
                <Bar dataKey="total" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Pool Status</CardTitle>
            <CardDescription>All active pools and their utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditPools.map(pool => {
                const pct = ((pool.usedCredits / pool.totalCredits) * 100).toFixed(0);
                const pctNum = Number(pct);
                return (
                  <div key={pool.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{pool.name}</span>
                        <Badge variant="outline" className="text-xs">{pool.type}</Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatCredits(pool.usedCredits)} / {formatCredits(pool.totalCredits)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          className={`h-2 rounded-full ${pctNum > 90 ? 'bg-red-500' : pctNum > 75 ? 'bg-amber-500' : 'bg-violet-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium min-w-[3rem] text-right ${pctNum > 90 ? 'text-red-600' : pctNum > 75 ? 'text-amber-600' : 'text-gray-600'}`}>
                        {pct}%
                      </span>
                    </div>
                    {pool.rolloverCredits > 0 && (
                      <p className="text-xs text-gray-400">Includes {formatCredits(pool.rolloverCredits)} rollover credits</p>
                    )}
                  </div>
                );
              })}
            </div>
            <Link href="/pools">
              <Button variant="ghost" className="mt-4 w-full text-violet-600">View All Pools <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest purchases and system events</CardDescription>
            </div>
            <Link href="/audit">
              <Button variant="outline" size="sm">View Audit Log <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, text: 'Enterprise pool projected to exhaust May 28', time: 'Today' },
              { icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, text: 'Marcus Johnson requested 50K supplemental credits — pending approval', time: '2 days ago' },
              { icon: <XCircle className="h-4 w-4 text-red-500" />, text: 'Tyler Nguyen unauthorized purchase blocked by policy', time: '4 days ago' },
              { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, text: 'Auto top-up: 20K credits for Data Science ($2,000)', time: 'Apr 28' },
              { icon: <Clock className="h-4 w-4 text-violet-500" />, text: 'SRE supplemental allocation increased to 12K (post-incident)', time: 'May 5' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                {item.icon}
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
