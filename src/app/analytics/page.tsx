'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  BarChart3, TrendingUp, Users, DollarSign, Download, Cpu,
} from 'lucide-react';
import {
  organizations, teams, consumptionData, costCenters,
  getDailyTotals, getConsumptionByModel, getTopConsumers,
  formatCredits, formatCurrency,
} from '@/data/mock-data';

const COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626', '#8b5cf6', '#0891b2', '#be185d'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState(30);

  const dailyTotals = getDailyTotals(timeRange);
  const modelBreakdown = getConsumptionByModel(timeRange);
  const topConsumers = getTopConsumers(timeRange);

  // Cost per developer per org
  const costPerDev = organizations.map(org => {
    const orgConsumption = consumptionData
      .filter(r => r.orgId === org.id)
      .reduce((s, r) => s + r.creditsUsed, 0);
    const costPerCredit = 0.10;
    return {
      org: org.name.replace('ACME ', ''),
      totalCredits: orgConsumption,
      totalCost: orgConsumption * costPerCredit,
      members: org.memberCount,
      costPerDev: (orgConsumption * costPerCredit) / org.memberCount,
      creditsPerDev: orgConsumption / org.memberCount,
    };
  }).sort((a, b) => b.costPerDev - a.costPerDev);

  // Daily by org
  const dailyByOrg = new Map<string, Map<string, number>>();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - timeRange);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  for (const r of consumptionData) {
    if (r.date >= cutoffStr) {
      if (!dailyByOrg.has(r.date)) dailyByOrg.set(r.date, new Map());
      const dayMap = dailyByOrg.get(r.date)!;
      dayMap.set(r.orgId, (dayMap.get(r.orgId) || 0) + r.creditsUsed);
    }
  }
  const stackedData = Array.from(dailyByOrg.entries())
    .map(([date, orgMap]) => ({
      date,
      ...Object.fromEntries(organizations.map(o => [o.slug, orgMap.get(o.id) || 0])),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // ROI metrics (mock)
  const roiMetrics = {
    avgSuggestionsAccepted: 68,
    avgPRCycleReduction: 23,
    estimatedDevHoursSaved: 1840,
    estimatedCostSaved: 184000,
    creditsPerAcceptedSuggestion: 2.3,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p className="text-sm text-gray-500">Deep dive into AI credit consumption and ROI metrics</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-md border border-gray-200 dark:border-gray-800">
            {[7, 30, 60, 90].map(d => (
              <button
                key={d}
                onClick={() => setTimeRange(d)}
                className={`px-3 py-1.5 text-xs font-medium ${timeRange === d ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {d}d
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />Export
          </Button>
        </div>
      </div>

      {/* ROI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Suggestions Accepted</p>
            <p className="text-2xl font-bold">{roiMetrics.avgSuggestionsAccepted}%</p>
            <p className="text-xs text-green-600">↑ 5% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">PR Cycle Reduction</p>
            <p className="text-2xl font-bold">{roiMetrics.avgPRCycleReduction}%</p>
            <p className="text-xs text-green-600">↑ 3% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Dev Hours Saved</p>
            <p className="text-2xl font-bold">{roiMetrics.estimatedDevHoursSaved.toLocaleString()}</p>
            <p className="text-xs text-gray-400">~46 devs × month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Estimated Cost Savings</p>
            <p className="text-2xl font-bold">{formatCurrency(roiMetrics.estimatedCostSaved)}</p>
            <p className="text-xs text-green-600">5.2x ROI on AI spend</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500">Credits/Accepted Suggestion</p>
            <p className="text-2xl font-bold">{roiMetrics.creditsPerAcceptedSuggestion}</p>
            <p className="text-xs text-gray-400">Efficiency metric</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consumption">
        <TabsList>
          <TabsTrigger value="consumption">Consumption Breakdown</TabsTrigger>
          <TabsTrigger value="models">By Model</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Consumption by Organization</CardTitle>
              <CardDescription>Stacked area chart showing credit usage per org</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={stackedData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatCredits(v)} />
                  <Tooltip formatter={(value) => formatCredits(Number(value))} />
                  <Legend />
                  {organizations.map((org, i) => (
                    <Area key={org.id} type="monotone" dataKey={org.slug} stackId="1" stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.6} name={org.name.replace('ACME ', '')} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Credit Usage by AI Model</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={modelBreakdown} cx="50%" cy="50%" outerRadius={120} dataKey="total" nameKey="model" label={({ name, percent }: { name?: string; percent?: number }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}>
                      {modelBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCredits(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Model Usage Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modelBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => formatCredits(v)} />
                    <Tooltip formatter={(value) => formatCredits(Number(value))} />
                    <Bar dataKey="total" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Per Developer by Organization</CardTitle>
              <CardDescription>Monthly AI spend per developer across organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costPerDev}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="org" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `$${v.toFixed(0)}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="costPerDev" fill="#7c3aed" name="Cost/Developer" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Center Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costCenters.map(cc => {
                  const pct = (cc.currentSpend / cc.monthlyBudget) * 100;
                  return (
                    <div key={cc.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{cc.name} ({cc.code})</span>
                        <span>{formatCurrency(cc.currentSpend)} / {formatCurrency(cc.monthlyBudget)}</span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          className={`h-3 rounded-full ${pct > 95 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-violet-500'}`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatCurrency(cc.monthlyBudget - cc.currentSpend)} remaining</span>
                        <span>{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Consumption Forecast</CardTitle>
              <CardDescription>Projected credit usage based on {timeRange}-day trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={[
                  ...dailyTotals.slice(-14).map(d => ({ ...d, type: 'actual' })),
                  ...Array.from({ length: 14 }, (_, i) => {
                    const last = dailyTotals[dailyTotals.length - 1];
                    const trend = (dailyTotals[dailyTotals.length - 1].total - dailyTotals[dailyTotals.length - 14].total) / 14;
                    const date = new Date(last.date);
                    date.setDate(date.getDate() + i + 1);
                    return {
                      date: date.toISOString().split('T')[0],
                      total: undefined,
                      forecast: Math.round(last.total + trend * (i + 1) + (Math.random() - 0.5) * 1000),
                      type: 'forecast',
                    };
                  }),
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis tickFormatter={(v) => formatCredits(v)} />
                  <Tooltip formatter={(value) => formatCredits(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={2} dot={false} name="Actual" />
                  <Line type="monotone" dataKey="forecast" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Forecast" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
