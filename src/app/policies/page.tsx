'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Shield, DollarSign, Gauge, Lock, Bell, Users,
  CheckCircle2, Plus, Settings, ChevronDown, ChevronRight,
} from 'lucide-react';
import { policies, getUserById, formatCurrency } from '@/data/mock-data';

const policyTypeIcons: Record<string, typeof Shield> = {
  spending_limit: DollarSign,
  rate_limit: Gauge,
  model_access: Lock,
  approval_required: CheckCircle2,
  alert_threshold: Bell,
};

const policyTypeLabels: Record<string, string> = {
  spending_limit: 'Spending Limit',
  rate_limit: 'Rate Limit',
  model_access: 'Model Access',
  approval_required: 'Approval Required',
  alert_threshold: 'Alert Threshold',
};

export default function PoliciesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Policies</h1>
          <p className="text-sm text-gray-500">Governance controls for AI credit spending, access, and alerts</p>
        </div>
        <Button className="bg-violet-600 text-white hover:bg-violet-700">
          <Plus className="mr-2 h-4 w-4" />New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {Object.entries(policyTypeLabels).map(([type, label]) => {
          const count = policies.filter(p => p.type === type).length;
          const active = policies.filter(p => p.type === type && p.enabled).length;
          const Icon = policyTypeIcons[type];
          return (
            <Card key={type}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-violet-500" />
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-xl font-bold">{active}<span className="text-sm font-normal text-gray-400"> / {count}</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-3">
        {policies.map(policy => {
          const Icon = policyTypeIcons[policy.type] || Shield;
          const creator = getUserById(policy.createdBy);
          const isExpanded = expandedId === policy.id;
          const config = policy.config as Record<string, unknown>;

          return (
            <Card key={policy.id} className={`transition-all ${isExpanded ? 'border-violet-300 ring-1 ring-violet-200' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-start gap-3 cursor-pointer flex-1"
                    onClick={() => setExpandedId(isExpanded ? null : policy.id)}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${policy.enabled ? 'bg-violet-100 dark:bg-violet-900' : 'bg-gray-100 dark:bg-gray-900'}`}>
                      <Icon className={`h-5 w-5 ${policy.enabled ? 'text-violet-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                        <h3 className="font-semibold">{policy.name}</h3>
                        <Badge variant={policy.enabled ? 'default' : 'secondary'} className={policy.enabled ? 'bg-green-100 text-green-800' : ''}>
                          {policy.enabled ? 'Active' : 'Disabled'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{policyTypeLabels[policy.type]}</Badge>
                        <Badge variant="outline" className="text-xs">{policy.scope}: {policy.scope === 'enterprise' ? 'All' : policy.scopeId}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">{policy.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={policy.enabled} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 ml-[52px] border-t pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Configuration</p>
                        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {JSON.stringify(config, null, 2)}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Details</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Created by</span>
                            <span className="font-medium">{creator?.name || policy.createdBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Created</span>
                            <span>{new Date(policy.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last updated</span>
                            <span>{new Date(policy.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Scope</span>
                            <span>{policy.scope}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Settings className="mr-1 h-3 w-3" />Edit Policy</Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">Delete</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
