'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard, Building2, Users, User, ArrowRight, ArrowLeft,
  CheckCircle2, AlertTriangle, Shield, Clock, DollarSign, Info,
} from 'lucide-react';
import {
  costCenters, organizations, teams, creditPurchases, creditPools,
  formatCredits, formatCurrency, getCostCenterById, getOrgById, getUserById,
} from '@/data/mock-data';

type WizardStep = 'type' | 'source' | 'target' | 'amount' | 'review' | 'complete';

export default function PurchasePage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState<WizardStep>('type');
  const [purchaseType, setPurchaseType] = useState<'supplemental' | 'reserved'>('supplemental');
  const [costCenterId, setCostCenterId] = useState('');
  const [targetType, setTargetType] = useState<'org' | 'team'>('org');
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState(25000);
  const [isProtected, setIsProtected] = useState(true);

  const unitPrice = purchaseType === 'supplemental' ? 0.10 : 0.12;
  const totalCost = amount * unitPrice;
  const selectedCC = getCostCenterById(costCenterId);

  function resetWizard() {
    setStep('type');
    setPurchaseType('supplemental');
    setCostCenterId('');
    setTargetType('org');
    setTargetId('');
    setAmount(25000);
    setIsProtected(true);
    setWizardOpen(false);
  }

  const steps: WizardStep[] = ['type', 'source', 'target', 'amount', 'review', 'complete'];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Purchase & Billing</h1>
          <p className="text-sm text-gray-500">Buy supplemental or reserved AI credits for your team</p>
        </div>
        {!wizardOpen && (
          <Button onClick={() => setWizardOpen(true)} className="bg-violet-600 text-white hover:bg-violet-700">
            <CreditCard className="mr-2 h-4 w-4" />New Purchase
          </Button>
        )}
      </div>

      {wizardOpen && (
        <Card className="border-violet-200 dark:border-violet-900">
          <CardHeader className="bg-violet-50 dark:bg-violet-950/30">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-violet-600" />
              Purchase AI Credits
            </CardTitle>
            <CardDescription>Step {stepIndex + 1} of {steps.length}</CardDescription>
            <div className="flex gap-1 mt-2">
              {steps.map((s, i) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? 'bg-violet-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {step === 'type' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What type of credits?</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <button
                    onClick={() => { setPurchaseType('supplemental'); setStep('source'); }}
                    className={`rounded-lg border-2 p-4 text-left transition-all hover:border-violet-400 ${purchaseType === 'supplemental' ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                        <Users className="h-5 w-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Supplemental Credits</p>
                        <p className="text-xs text-gray-500">${unitPrice.toFixed(2)} per credit</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Additional credits for your team/org. <strong>Not drawn from the enterprise pool.</strong> Billed to your cost center.
                    </p>
                  </button>
                  <button
                    onClick={() => { setPurchaseType('reserved'); setStep('source'); }}
                    className={`rounded-lg border-2 p-4 text-left transition-all hover:border-amber-400 ${purchaseType === 'reserved' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                        <Shield className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Reserved Credits</p>
                        <p className="text-xs text-gray-500">$0.12 per credit</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Earmarked for specific individuals. <strong>Guaranteed availability</strong>, cannot be consumed by others.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {step === 'source' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select billing source</h3>
                <p className="text-sm text-gray-500">Choose which Azure subscription / cost center to bill this purchase to.</p>
                <div className="space-y-2">
                  {costCenters.map(cc => (
                    <button
                      key={cc.id}
                      onClick={() => { setCostCenterId(cc.id); setStep('target'); }}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-violet-400 ${costCenterId === cc.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-semibold">{cc.name}</p>
                            <p className="text-xs text-gray-500">
                              {cc.code} · Azure: {cc.azureSubscriptionId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatCurrency(cc.monthlyBudget - cc.currentSpend)} remaining</p>
                          <p className="text-xs text-gray-400">
                            {formatCurrency(cc.currentSpend)} of {formatCurrency(cc.monthlyBudget)} used
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => setStep('type')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
              </div>
            )}

            {step === 'target' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assign credits to</h3>
                <div className="flex gap-2 mb-4">
                  <Button variant={targetType === 'org' ? 'default' : 'outline'} size="sm" onClick={() => setTargetType('org')}>Organization</Button>
                  <Button variant={targetType === 'team' ? 'default' : 'outline'} size="sm" onClick={() => setTargetType('team')}>Team</Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {targetType === 'org' ? (
                    organizations.map(org => (
                      <button
                        key={org.id}
                        onClick={() => { setTargetId(org.id); setStep('amount'); }}
                        className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-violet-400 ${targetId === org.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{org.name}</span>
                            <Badge variant="outline" className="text-xs">{org.memberCount} members</Badge>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    teams.map(team => {
                      const org = getOrgById(team.orgId);
                      return (
                        <button
                          key={team.id}
                          onClick={() => { setTargetId(team.id); setStep('amount'); }}
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-violet-400 ${targetId === team.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200'}`}
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{team.name}</span>
                            <span className="text-xs text-gray-400">{org?.name}</span>
                            <Badge variant="outline" className="text-xs">{team.memberCount}</Badge>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
                <Button variant="ghost" onClick={() => setStep('source')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
              </div>
            )}

            {step === 'amount' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Credit amount</h3>
                <div>
                  <Label htmlFor="amount">Number of credits</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={1000}
                    step={1000}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10000, 25000, 50000, 100000].map(a => (
                    <Button key={a} variant={amount === a ? 'default' : 'outline'} size="sm" onClick={() => setAmount(a)}>
                      {formatCredits(a)}
                    </Button>
                  ))}
                </div>
                <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                  <div className="flex justify-between text-sm">
                    <span>{amount.toLocaleString()} credits × ${unitPrice.toFixed(2)}</span>
                    <span className="font-bold">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3 dark:bg-blue-950/30">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-semibold">Protected allocation</p>
                    <p className="text-xs">These credits will be scoped to your selected target and <strong>will NOT be consumed by the enterprise pool</strong>. Your cost center budget will reflect this purchase as a supplemental line item, not an overage.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep('target')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
                  <Button onClick={() => setStep('review')} className="bg-violet-600 text-white hover:bg-violet-700">
                    Review Purchase <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review purchase</h3>
                <div className="rounded-lg border border-gray-200 divide-y divide-gray-200 dark:border-gray-800 dark:divide-gray-800">
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-gray-500">Type</span>
                    <Badge>{purchaseType}</Badge>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-gray-500">Billing Source</span>
                    <span className="text-sm font-medium">{selectedCC?.name} ({selectedCC?.code})</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-gray-500">Azure Subscription</span>
                    <span className="text-sm font-mono">{selectedCC?.azureSubscriptionId}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-gray-500">Target</span>
                    <span className="text-sm font-medium">
                      {targetType === 'org' ? getOrgById(targetId)?.name : teams.find(t => t.id === targetId)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-sm text-gray-500">Credits</span>
                    <span className="text-sm font-bold">{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900">
                    <span className="text-sm font-semibold">Total Cost</span>
                    <span className="text-lg font-bold text-violet-600">{formatCurrency(totalCost)}</span>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-3 dark:bg-green-950/30">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800 dark:text-green-200">Budget Impact</span>
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <p>✓ This purchase bills to <strong>{selectedCC?.name}</strong> as a supplemental line item</p>
                    <p>✓ <strong>Does NOT register as an enterprise overage</strong></p>
                    <p>✓ Credits are protected and scoped to your target</p>
                    <p>✓ Enterprise pool balance is unaffected</p>
                  </div>
                </div>

                {totalCost > 3000 && (
                  <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-950/30">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-800 dark:text-amber-200">
                        Purchases over $3,000 require enterprise admin approval
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep('amount')}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
                  <Button onClick={() => setStep('complete')} className="bg-green-600 text-white hover:bg-green-700">
                    {totalCost > 3000 ? 'Submit for Approval' : 'Confirm Purchase'}
                  </Button>
                </div>
              </div>
            )}

            {step === 'complete' && (
              <div className="text-center space-y-4 py-8">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-700">
                  {totalCost > 3000 ? 'Purchase Submitted for Approval' : 'Purchase Complete!'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {totalCost > 3000
                    ? `Your request for ${amount.toLocaleString()} ${purchaseType} credits (${formatCurrency(totalCost)}) has been submitted to the enterprise admin for approval.`
                    : `${amount.toLocaleString()} ${purchaseType} credits have been added and are available immediately.`
                  }
                </p>
                <div className="rounded-md bg-gray-50 p-4 max-w-sm mx-auto dark:bg-gray-900">
                  <p className="text-xs text-gray-500 mb-1">Reference ID</p>
                  <p className="font-mono text-sm">PURCH-{Date.now().toString(36).toUpperCase()}</p>
                </div>
                <Button onClick={resetWizard} variant="outline">Done</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>All credit purchases and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 pr-4 text-left font-medium text-gray-500">Date</th>
                  <th className="py-3 pr-4 text-left font-medium text-gray-500">Requested By</th>
                  <th className="py-3 pr-4 text-left font-medium text-gray-500">Type</th>
                  <th className="py-3 pr-4 text-left font-medium text-gray-500">Cost Center</th>
                  <th className="py-3 pr-4 text-right font-medium text-gray-500">Credits</th>
                  <th className="py-3 pr-4 text-right font-medium text-gray-500">Cost</th>
                  <th className="py-3 pr-4 text-left font-medium text-gray-500">Status</th>
                  <th className="py-3 text-left font-medium text-gray-500">Overage?</th>
                </tr>
              </thead>
              <tbody>
                {creditPurchases.map(p => {
                  const cc = getCostCenterById(p.costCenterId);
                  const user = p.requestedBy === 'system' ? null : getUserById(p.requestedBy);
                  return (
                    <tr key={p.id} className="border-b border-gray-100 dark:border-gray-900">
                      <td className="py-3 pr-4 text-gray-600">{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-3 pr-4">
                        {user ? (
                          <span className="font-medium">{user.name}</span>
                        ) : (
                          <Badge variant="outline" className="text-xs">System (Auto)</Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={p.poolType === 'supplemental' ? 'secondary' : 'outline'}>{p.poolType}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{cc?.name}</td>
                      <td className="py-3 pr-4 text-right font-medium">{formatCredits(p.amount)}</td>
                      <td className="py-3 pr-4 text-right font-medium">{formatCurrency(p.totalCost)}</td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={p.status === 'completed' ? 'default' : p.status === 'pending' ? 'secondary' : 'destructive'}
                          className={p.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {p.status === 'completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {p.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant={p.isOverage ? 'destructive' : 'outline'} className={!p.isOverage ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                          {p.isOverage ? 'Yes' : 'No'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
