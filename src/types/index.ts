// Core type definitions for the AI Credits Management system

export interface Enterprise {
  id: string;
  name: string;
  slug: string;
  plan: string;
  totalSeats: number;
  azureSubscriptionId: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  enterpriseId: string;
  costCenterId: string;
  memberCount: number;
  avatarUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  orgId: string;
  memberCount: number;
  leadId: string;
}

export interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  orgId: string;
  teamIds: string[];
  role: 'admin' | 'budget_owner' | 'team_lead' | 'developer';
  avatarUrl?: string;
}

export interface CostCenter {
  id: string;
  name: string;
  code: string;
  azureSubscriptionId: string;
  budgetOwnerId: string;
  monthlyBudget: number;
  currentSpend: number;
}

export type CreditPoolType = 'enterprise' | 'supplemental' | 'reserved';

export interface CreditPool {
  id: string;
  name: string;
  type: CreditPoolType;
  enterpriseId: string;
  costCenterId?: string;
  orgId?: string;
  teamId?: string;
  totalCredits: number;
  usedCredits: number;
  reservedCredits: number;
  rolloverCredits: number;
  monthlyAllocation: number;
  createdAt: string;
  expiresAt?: string;
}

export interface CreditAllocation {
  id: string;
  poolId: string;
  targetType: 'org' | 'team' | 'user';
  targetId: string;
  amount: number;
  used: number;
  isProtected: boolean; // Can't be consumed by enterprise pool
  period: string; // e.g., "2026-05"
}

export type PurchaseStatus = 'pending' | 'approved' | 'completed' | 'rejected' | 'cancelled';

export interface CreditPurchase {
  id: string;
  costCenterId: string;
  requestedBy: string;
  approvedBy?: string;
  amount: number;
  unitPrice: number;
  totalCost: number;
  currency: string;
  poolType: 'supplemental' | 'reserved';
  targetPoolId?: string;
  targetOrgId?: string;
  targetTeamId?: string;
  status: PurchaseStatus;
  isOverage: boolean;
  azureInvoiceId?: string;
  createdAt: string;
  completedAt?: string;
  note?: string;
}

export type AutoTopUpTrigger = 'percentage_remaining' | 'projected_exhaustion' | 'fixed_schedule';

export interface AutoTopUpRule {
  id: string;
  poolId: string;
  enabled: boolean;
  trigger: AutoTopUpTrigger;
  triggerValue: number; // percentage, days, or day-of-month
  topUpAmount: number;
  maxMonthlySpend: number;
  requiresApproval: boolean;
  approvalThreshold: number; // auto-approve below this amount
  costCenterId: string;
  createdBy: string;
  lastTriggered?: string;
  nextScheduled?: string;
  totalAutoSpend: number;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  type: 'spending_limit' | 'rate_limit' | 'model_access' | 'approval_required' | 'alert_threshold';
  scope: 'enterprise' | 'org' | 'team' | 'user';
  scopeId: string;
  enabled: boolean;
  config: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ModelType = 'copilot' | 'gpt-4' | 'gpt-4o' | 'o1' | 'embeddings' | 'copilot-workspace';

export interface ConsumptionRecord {
  date: string;
  orgId: string;
  teamId?: string;
  userId?: string;
  modelType: ModelType;
  creditsUsed: number;
  requestCount: number;
}

export type AuditAction =
  | 'credit_purchase'
  | 'credit_allocation'
  | 'pool_created'
  | 'pool_modified'
  | 'policy_created'
  | 'policy_modified'
  | 'auto_topup_triggered'
  | 'auto_topup_configured'
  | 'budget_alert'
  | 'overage_warning'
  | 'allocation_protected'
  | 'user_throttled';

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'user' | 'system' | 'auto_topup';
  action: AuditAction;
  targetType: string;
  targetId: string;
  details: string;
  metadata?: Record<string, unknown>;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  actionUrl?: string;
}

export interface BudgetSummary {
  costCenterId: string;
  monthlyBudget: number;
  enterpriseAllocation: number;
  supplementalPurchases: number;
  totalSpend: number;
  remaining: number;
  isOverage: boolean;
  overageAmount: number;
  projectedMonthEnd: number;
}
