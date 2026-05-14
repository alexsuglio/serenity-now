import {
  Enterprise, Organization, Team, User, CostCenter,
  CreditPool, CreditAllocation, CreditPurchase, AutoTopUpRule,
  Policy, ConsumptionRecord, AuditEntry, Alert, ModelType,
} from '@/types';

// ============================================================
// VANDELAY INDUSTRIES ENTERPRISE
// ============================================================

export const enterprise: Enterprise = {
  id: 'ent-acme-001',
  name: 'Vandelay Industries',
  slug: 'vandelay-industries',
  plan: 'GitHub Enterprise Cloud',
  totalSeats: 2500,
  azureSubscriptionId: 'VANDELAY-EA-001',
  createdAt: '2024-01-15T00:00:00Z',
};

// ============================================================
// COST CENTERS
// ============================================================

export const costCenters: CostCenter[] = [
  {
    id: 'cc-platform',
    name: 'Latex Imports',
    code: 'CC-4100',
    azureSubscriptionId: 'VANDELAY-SUB-LATEX-001',
    budgetOwnerId: 'user-george-costanza',
    monthlyBudget: 45000,
    currentSpend: 38200,
  },
  {
    id: 'cc-product',
    name: 'Marine Biology Products',
    code: 'CC-4200',
    azureSubscriptionId: 'VANDELAY-SUB-MARINE-001',
    budgetOwnerId: 'user-elaine-benes',
    monthlyBudget: 55000,
    currentSpend: 52800,
  },
  {
    id: 'cc-data',
    name: 'Human Fund Analytics',
    code: 'CC-4300',
    azureSubscriptionId: 'VANDELAY-SUB-HFUND-001',
    budgetOwnerId: 'user-jerry-seinfeld',
    monthlyBudget: 60000,
    currentSpend: 58900,
  },
  {
    id: 'cc-labs',
    name: 'Peterman Ventures',
    code: 'CC-4400',
    azureSubscriptionId: 'VANDELAY-SUB-PETERMAN-001',
    budgetOwnerId: 'user-cosmo-kramer',
    monthlyBudget: 25000,
    currentSpend: 12400,
  },
  {
    id: 'cc-security',
    name: 'Puffy Shirt Compliance',
    code: 'CC-4500',
    azureSubscriptionId: 'VANDELAY-SUB-PUFFY-001',
    budgetOwnerId: 'user-morty-seinfeld',
    monthlyBudget: 20000,
    currentSpend: 14300,
  },
];

// ============================================================
// ORGANIZATIONS
// ============================================================

export const organizations: Organization[] = [
  {
    id: 'org-platform',
    name: 'Vandelay Latex',
    slug: 'vandelay-latex',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-platform',
    memberCount: 120,
  },
  {
    id: 'org-product',
    name: 'Monk\'s Product Group',
    slug: 'monks-product-group',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-product',
    memberCount: 200,
  },
  {
    id: 'org-data',
    name: 'Human Fund Data',
    slug: 'human-fund-data',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-data',
    memberCount: 80,
  },
  {
    id: 'org-labs',
    name: 'Peterman Labs',
    slug: 'peterman-labs',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-labs',
    memberCount: 30,
  },
  {
    id: 'org-security',
    name: 'Puffy Shirt Security',
    slug: 'puffy-shirt-security',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-security',
    memberCount: 40,
  },
];

// ============================================================
// TEAMS
// ============================================================

export const teams: Team[] = [
  // Platform
  { id: 'team-platform-core', name: 'Importer Core', slug: 'importer-core', orgId: 'org-platform', memberCount: 45, leadId: 'user-george-costanza' },
  { id: 'team-sre', name: 'Marine Ops', slug: 'marine-ops', orgId: 'org-platform', memberCount: 35, leadId: 'user-newman' },
  { id: 'team-devex', name: 'J. Peterman Enablement', slug: 'peterman-enablement', orgId: 'org-platform', memberCount: 40, leadId: 'user-estelle-costanza' },
  // Product
  { id: 'team-frontend', name: 'Festivus UX', slug: 'festivus-ux', orgId: 'org-product', memberCount: 50, leadId: 'user-frank-costanza' },
  { id: 'team-backend', name: 'Soup Pipeline Services', slug: 'soup-pipeline-services', orgId: 'org-product', memberCount: 60, leadId: 'user-j-peterman' },
  { id: 'team-mobile', name: 'Junior Mints Mobile', slug: 'junior-mints-mobile', orgId: 'org-product', memberCount: 45, leadId: 'user-david-puddy' },
  { id: 'team-qa', name: 'Serenity QA', slug: 'serenity-qa', orgId: 'org-product', memberCount: 45, leadId: 'user-susan-ross' },
  // Data
  { id: 'team-ml-infra', name: 'Big Salad ML', slug: 'big-salad-ml', orgId: 'org-data', memberCount: 30, leadId: 'user-jerry-seinfeld' },
  { id: 'team-data-eng', name: 'Bosco Data Engineering', slug: 'bosco-data-engineering', orgId: 'org-data', memberCount: 25, leadId: 'user-uncle-leo' },
  { id: 'team-analytics', name: 'Apartment 5A Analytics', slug: 'apartment-5a-analytics', orgId: 'org-data', memberCount: 25, leadId: 'user-jackie-chiles' },
  // Labs
  { id: 'team-rnd', name: 'Merv Griffin R&D', slug: 'merv-griffin-rnd', orgId: 'org-labs', memberCount: 18, leadId: 'user-cosmo-kramer' },
  { id: 'team-prototyping', name: 'Bro Prototype Studio', slug: 'bro-prototype-studio', orgId: 'org-labs', memberCount: 12, leadId: 'user-crazy-joe-davola' },
  // Security
  { id: 'team-appsec', name: 'Marble Rye Security', slug: 'marble-rye-security', orgId: 'org-security', memberCount: 22, leadId: 'user-morty-seinfeld' },
  { id: 'team-cloudsec', name: 'Urban Sombrero CloudSec', slug: 'urban-sombrero-cloudsec', orgId: 'org-security', memberCount: 18, leadId: 'user-kenny-bania' },
];

// ============================================================
// KEY USERS
// ============================================================

export const users: User[] = [
  // Enterprise Admins
  { id: 'user-art-vandelay', login: 'art-vandelay', name: 'Art Vandelay', email: 'art.vandelay@vandelay.com', orgId: 'org-platform', teamIds: [], role: 'admin' },
  // Budget Owners / Leads
  { id: 'user-george-costanza', login: 'george-costanza', name: 'George Costanza', email: 'george.costanza@vandelay.com', orgId: 'org-platform', teamIds: ['team-platform-core'], role: 'budget_owner' },
  { id: 'user-elaine-benes', login: 'elaine-benes', name: 'Elaine Benes', email: 'elaine.benes@vandelay.com', orgId: 'org-product', teamIds: ['team-backend'], role: 'budget_owner' },
  { id: 'user-jerry-seinfeld', login: 'jerry-seinfeld', name: 'Jerry Seinfeld', email: 'jerry.seinfeld@vandelay.com', orgId: 'org-data', teamIds: ['team-ml-infra'], role: 'budget_owner' },
  { id: 'user-cosmo-kramer', login: 'cosmo-kramer', name: 'Cosmo Kramer', email: 'cosmo.kramer@vandelay.com', orgId: 'org-labs', teamIds: ['team-rnd'], role: 'budget_owner' },
  { id: 'user-morty-seinfeld', login: 'morty-seinfeld', name: 'Morty Seinfeld', email: 'morty.seinfeld@vandelay.com', orgId: 'org-security', teamIds: ['team-appsec'], role: 'budget_owner' },
  // Team Leads
  { id: 'user-newman', login: 'newman', name: 'Newman', email: 'newman@vandelay.com', orgId: 'org-platform', teamIds: ['team-sre'], role: 'team_lead' },
  { id: 'user-estelle-costanza', login: 'estelle-costanza', name: 'Estelle Costanza', email: 'estelle.costanza@vandelay.com', orgId: 'org-platform', teamIds: ['team-devex'], role: 'team_lead' },
  { id: 'user-frank-costanza', login: 'frank-costanza', name: 'Frank Costanza', email: 'frank.costanza@vandelay.com', orgId: 'org-product', teamIds: ['team-frontend'], role: 'team_lead' },
  { id: 'user-j-peterman', login: 'j-peterman', name: 'J. Peterman', email: 'j.peterman@vandelay.com', orgId: 'org-product', teamIds: ['team-backend'], role: 'team_lead' },
  { id: 'user-david-puddy', login: 'david-puddy', name: 'David Puddy', email: 'david.puddy@vandelay.com', orgId: 'org-product', teamIds: ['team-mobile'], role: 'team_lead' },
  { id: 'user-susan-ross', login: 'susan-ross', name: 'Susan Ross', email: 'susan.ross@vandelay.com', orgId: 'org-product', teamIds: ['team-qa'], role: 'team_lead' },
  { id: 'user-uncle-leo', login: 'uncle-leo', name: 'Uncle Leo', email: 'uncle.leo@vandelay.com', orgId: 'org-data', teamIds: ['team-data-eng'], role: 'team_lead' },
  { id: 'user-jackie-chiles', login: 'jackie-chiles', name: 'Jackie Chiles', email: 'jackie.chiles@vandelay.com', orgId: 'org-data', teamIds: ['team-analytics'], role: 'team_lead' },
  { id: 'user-crazy-joe-davola', login: 'crazy-joe-davola', name: 'Crazy Joe Davola', email: 'crazy.joe@vandelay.com', orgId: 'org-labs', teamIds: ['team-prototyping'], role: 'team_lead' },
  { id: 'user-kenny-bania', login: 'kenny-bania', name: 'Kenny Bania', email: 'kenny.bania@vandelay.com', orgId: 'org-security', teamIds: ['team-cloudsec'], role: 'team_lead' },
  // Notable Power Users
  { id: 'user-bob-sacamano', login: 'bob-sacamano', name: 'Bob Sacamano', email: 'bob.sacamano@vandelay.com', orgId: 'org-data', teamIds: ['team-ml-infra'], role: 'developer' },
  { id: 'user-lt-bookman', login: 'lt-bookman', name: 'Lt. Bookman', email: 'lt.bookman@vandelay.com', orgId: 'org-platform', teamIds: ['team-platform-core'], role: 'developer' },
  // Shadow IT user (buying credits outside policy)
  { id: 'user-cedric', login: 'cedric', name: 'Cedric', email: 'cedric@vandelay.com', orgId: 'org-security', teamIds: ['team-appsec'], role: 'developer' },
];

// ============================================================
// CREDIT POOLS
// ============================================================

export const creditPools: CreditPool[] = [
  // Enterprise master pool
  {
    id: 'pool-enterprise',
    name: 'Vandelay Master Credit Pool',
    type: 'enterprise',
    enterpriseId: 'ent-acme-001',
    totalCredits: 500000,
    usedCredits: 387500,
    reservedCredits: 25000,
    rolloverCredits: 12000,
    monthlyAllocation: 500000,
    createdAt: '2024-01-15T00:00:00Z',
  },
  // Supplemental pools
  {
    id: 'pool-supp-platform',
    name: 'Latex Imports Supplemental',
    type: 'supplemental',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-platform',
    orgId: 'org-platform',
    totalCredits: 40000,
    usedCredits: 32000,
    reservedCredits: 0,
    rolloverCredits: 3500,
    monthlyAllocation: 40000,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'pool-supp-data',
    name: 'Human Fund Supplemental',
    type: 'supplemental',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-data',
    orgId: 'org-data',
    totalCredits: 60000,
    usedCredits: 57800,
    reservedCredits: 0,
    rolloverCredits: 0,
    monthlyAllocation: 60000,
    createdAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'pool-supp-labs',
    name: 'Peterman Ventures Supplemental',
    type: 'supplemental',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-labs',
    orgId: 'org-labs',
    totalCredits: 25000,
    usedCredits: 10200,
    reservedCredits: 0,
    rolloverCredits: 8400,
    monthlyAllocation: 25000,
    createdAt: '2025-04-01T00:00:00Z',
  },
  // Reserved pool for ML power users
  {
    id: 'pool-reserved-ml',
    name: 'Big Salad Power Users Reserved',
    type: 'reserved',
    enterpriseId: 'ent-acme-001',
    costCenterId: 'cc-data',
    orgId: 'org-data',
    teamId: 'team-ml-infra',
    totalCredits: 15000,
    usedCredits: 14200,
    reservedCredits: 15000,
    rolloverCredits: 0,
    monthlyAllocation: 15000,
    createdAt: '2025-09-01T00:00:00Z',
  },
];

// ============================================================
// CREDIT ALLOCATIONS
// ============================================================

export const creditAllocations: CreditAllocation[] = [
  // Enterprise pool allocations to orgs
  { id: 'alloc-ent-platform', poolId: 'pool-enterprise', targetType: 'org', targetId: 'org-platform', amount: 80000, used: 72000, isProtected: false, period: '2026-05' },
  { id: 'alloc-ent-product', poolId: 'pool-enterprise', targetType: 'org', targetId: 'org-product', amount: 120000, used: 108500, isProtected: false, period: '2026-05' },
  { id: 'alloc-ent-data', poolId: 'pool-enterprise', targetType: 'org', targetId: 'org-data', amount: 100000, used: 98000, isProtected: false, period: '2026-05' },
  { id: 'alloc-ent-labs', poolId: 'pool-enterprise', targetType: 'org', targetId: 'org-labs', amount: 50000, used: 32000, isProtected: false, period: '2026-05' },
  { id: 'alloc-ent-security', poolId: 'pool-enterprise', targetType: 'org', targetId: 'org-security', amount: 30000, used: 24500, isProtected: false, period: '2026-05' },
  // Supplemental protected allocations
  { id: 'alloc-supp-plat-core', poolId: 'pool-supp-platform', targetType: 'team', targetId: 'team-platform-core', amount: 20000, used: 18500, isProtected: true, period: '2026-05' },
  { id: 'alloc-supp-plat-sre', poolId: 'pool-supp-platform', targetType: 'team', targetId: 'team-sre', amount: 12000, used: 8500, isProtected: true, period: '2026-05' },
  { id: 'alloc-supp-plat-devex', poolId: 'pool-supp-platform', targetType: 'team', targetId: 'team-devex', amount: 8000, used: 5000, isProtected: true, period: '2026-05' },
  // ML reserved - individual allocations
  { id: 'alloc-res-bob', poolId: 'pool-reserved-ml', targetType: 'user', targetId: 'user-bob-sacamano', amount: 8000, used: 7800, isProtected: true, period: '2026-05' },
  { id: 'alloc-res-jerry', poolId: 'pool-reserved-ml', targetType: 'user', targetId: 'user-jerry-seinfeld', amount: 7000, used: 6400, isProtected: true, period: '2026-05' },
];

// ============================================================
// PURCHASE HISTORY
// ============================================================

export const creditPurchases: CreditPurchase[] = [
  {
    id: 'purch-001',
    costCenterId: 'cc-platform',
    requestedBy: 'user-george-costanza',
    approvedBy: 'user-art-vandelay',
    amount: 40000,
    unitPrice: 0.10,
    totalCost: 4000,
    currency: 'USD',
    poolType: 'supplemental',
    targetPoolId: 'pool-supp-platform',
    targetOrgId: 'org-platform',
    status: 'completed',
    isOverage: false,
    azureInvoiceId: 'INV-2025-06-PLAT-001',
    createdAt: '2025-06-01T10:00:00Z',
    completedAt: '2025-06-01T10:05:00Z',
    note: 'Monthly supplemental for Latex Imports',
  },
  {
    id: 'purch-002',
    costCenterId: 'cc-data',
    requestedBy: 'user-jerry-seinfeld',
    approvedBy: 'user-art-vandelay',
    amount: 60000,
    unitPrice: 0.10,
    totalCost: 6000,
    currency: 'USD',
    poolType: 'supplemental',
    targetPoolId: 'pool-supp-data',
    targetOrgId: 'org-data',
    status: 'completed',
    isOverage: false,
    azureInvoiceId: 'INV-2025-03-DATA-001',
    createdAt: '2025-03-01T09:00:00Z',
    completedAt: '2025-03-01T09:03:00Z',
    note: 'Human Fund analytics needs heavy AI usage for forecasting and summarization',
  },
  {
    id: 'purch-003',
    costCenterId: 'cc-data',
    requestedBy: 'user-jerry-seinfeld',
    amount: 15000,
    unitPrice: 0.12,
    totalCost: 1800,
    currency: 'USD',
    poolType: 'reserved',
    targetPoolId: 'pool-reserved-ml',
    targetTeamId: 'team-ml-infra',
    status: 'completed',
    isOverage: false,
    azureInvoiceId: 'INV-2025-09-DATA-002',
    createdAt: '2025-09-15T14:00:00Z',
    completedAt: '2025-09-15T14:02:00Z',
    note: 'Reserved pool for Big Salad ML power users - Bob and Jerry',
  },
  {
    id: 'purch-004',
    costCenterId: 'cc-labs',
    requestedBy: 'user-cosmo-kramer',
    amount: 25000,
    unitPrice: 0.10,
    totalCost: 2500,
    currency: 'USD',
    poolType: 'supplemental',
    targetPoolId: 'pool-supp-labs',
    targetOrgId: 'org-labs',
    status: 'completed',
    isOverage: false,
    azureInvoiceId: 'INV-2025-04-LABS-001',
    createdAt: '2025-04-01T11:00:00Z',
    completedAt: '2025-04-01T11:04:00Z',
    note: 'Peterman Ventures prototyping budget',
  },
  {
    id: 'purch-005',
    costCenterId: 'cc-product',
    requestedBy: 'user-elaine-benes',
    amount: 50000,
    unitPrice: 0.10,
    totalCost: 5000,
    currency: 'USD',
    poolType: 'supplemental',
    targetOrgId: 'org-product',
    status: 'pending',
    isOverage: false,
    createdAt: '2026-05-12T16:00:00Z',
    note: 'Monk\'s Product Group requesting supplemental - current allocation running low',
  },
  // Auto top-up purchase
  {
    id: 'purch-006',
    costCenterId: 'cc-data',
    requestedBy: 'system',
    approvedBy: 'system',
    amount: 20000,
    unitPrice: 0.10,
    totalCost: 2000,
    currency: 'USD',
    poolType: 'supplemental',
    targetPoolId: 'pool-supp-data',
    targetOrgId: 'org-data',
    status: 'completed',
    isOverage: false,
    azureInvoiceId: 'INV-2026-04-DATA-AUTO',
    createdAt: '2026-04-28T00:00:00Z',
    completedAt: '2026-04-28T00:01:00Z',
    note: 'Auto top-up triggered: Human Fund pool at 15% remaining',
  },
];

// ============================================================
// AUTO TOP-UP RULES
// ============================================================

export const autoTopUpRules: AutoTopUpRule[] = [
  {
    id: 'atr-data-supp',
    poolId: 'pool-supp-data',
    enabled: true,
    trigger: 'percentage_remaining',
    triggerValue: 20,
    topUpAmount: 20000,
    maxMonthlySpend: 8000,
    requiresApproval: false,
    approvalThreshold: 3000,
    costCenterId: 'cc-data',
    createdBy: 'user-jerry-seinfeld',
    lastTriggered: '2026-04-28T00:00:00Z',
    nextScheduled: undefined,
    totalAutoSpend: 6000,
  },
  {
    id: 'atr-platform-supp',
    poolId: 'pool-supp-platform',
    enabled: true,
    trigger: 'projected_exhaustion',
    triggerValue: 7, // days before projected exhaustion
    topUpAmount: 15000,
    maxMonthlySpend: 6000,
    requiresApproval: true,
    approvalThreshold: 2000,
    costCenterId: 'cc-platform',
    createdBy: 'user-george-costanza',
    lastTriggered: '2026-04-15T00:00:00Z',
    nextScheduled: '2026-05-18T00:00:00Z',
    totalAutoSpend: 3000,
  },
  {
    id: 'atr-labs-supp',
    poolId: 'pool-supp-labs',
    enabled: false,
    trigger: 'fixed_schedule',
    triggerValue: 1, // 1st of month
    topUpAmount: 10000,
    maxMonthlySpend: 3000,
    requiresApproval: false,
    approvalThreshold: 0,
    costCenterId: 'cc-labs',
    createdBy: 'user-cosmo-kramer',
    totalAutoSpend: 0,
  },
];

// ============================================================
// POLICIES
// ============================================================

export const policies: Policy[] = [
  {
    id: 'pol-ent-spend-limit',
    name: 'Enterprise Monthly Spend Cap',
    description: 'Maximum monthly AI credit spend across the entire enterprise',
    type: 'spending_limit',
    scope: 'enterprise',
    scopeId: 'ent-acme-001',
    enabled: true,
    config: { maxMonthly: 75000, currency: 'USD', alertAt: 80 },
    createdBy: 'user-art-vandelay',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'pol-data-rate-limit',
    name: 'Human Fund Rate Limit',
    description: 'Rate limit for Human Fund Data to prevent runaway consumption',
    type: 'rate_limit',
    scope: 'org',
    scopeId: 'org-data',
    enabled: true,
    config: { maxPerHour: 500, maxPerDay: 8000, burstAllowed: true, burstLimit: 1000 },
    createdBy: 'user-art-vandelay',
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'pol-model-access',
    name: 'o1 Model Restriction',
    description: 'Restrict o1 model access to approved teams only',
    type: 'model_access',
    scope: 'enterprise',
    scopeId: 'ent-acme-001',
    enabled: true,
    config: { model: 'o1', allowedTeams: ['team-ml-infra', 'team-rnd', 'team-platform-core'], requireJustification: true },
    createdBy: 'user-art-vandelay',
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'pol-approval-threshold',
    name: 'Purchase Approval Required',
    description: 'Purchases over $3,000 require enterprise admin approval',
    type: 'approval_required',
    scope: 'enterprise',
    scopeId: 'ent-acme-001',
    enabled: true,
    config: { threshold: 3000, currency: 'USD', approvers: ['user-art-vandelay'], autoApproveBelow: 1000 },
    createdBy: 'user-art-vandelay',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'pol-alert-anomaly',
    name: 'Consumption Anomaly Alert',
    description: 'Alert when any team exceeds 2x their rolling 7-day average',
    type: 'alert_threshold',
    scope: 'enterprise',
    scopeId: 'ent-acme-001',
    enabled: true,
    config: { multiplier: 2, windowDays: 7, notifyAdmin: true, notifyBudgetOwner: true, autoThrottle: false },
    createdBy: 'user-art-vandelay',
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'pol-individual-cap',
    name: 'Individual Daily Cap',
    description: 'No individual developer may consume more than 500 credits per day without approval',
    type: 'spending_limit',
    scope: 'enterprise',
    scopeId: 'ent-acme-001',
    enabled: true,
    config: { maxDaily: 500, exemptRoles: ['admin', 'budget_owner'], exemptUsers: ['user-bob-sacamano'] },
    createdBy: 'user-art-vandelay',
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2025-08-01T00:00:00Z',
  },
];

// ============================================================
// CONSUMPTION DATA (time series for charts)
// ============================================================

function generateConsumptionData(): ConsumptionRecord[] {
  const records: ConsumptionRecord[] = [];
  const models: ModelType[] = ['copilot', 'gpt-4', 'gpt-4o', 'o1', 'embeddings', 'copilot-workspace'];
  const modelWeights: Record<ModelType, number> = {
    'copilot': 0.45,
    'gpt-4o': 0.25,
    'gpt-4': 0.10,
    'copilot-workspace': 0.10,
    'embeddings': 0.05,
    'o1': 0.05,
  };

  const orgDailyBase: Record<string, number> = {
    'org-platform': 2800,
    'org-product': 3800,
    'org-data': 3500,
    'org-labs': 1400,
    'org-security': 900,
  };

  // Generate 90 days of data
  for (let d = 89; d >= 0; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.3 : 1.0;

    for (const org of organizations) {
      const base = orgDailyBase[org.id] || 1000;
      
      // Scenario: SRE spike during incidents (days 15-18 ago)
      let spikeFactor = 1.0;
      if (org.id === 'org-platform' && d >= 12 && d <= 15) {
        spikeFactor = 3.2; // Major incident
      }
      // Scenario: ML Infra over-consumption trend (growing 5% weekly)
      if (org.id === 'org-data') {
        spikeFactor = 1.0 + ((90 - d) / 90) * 0.5;
      }
      // Scenario: Labs hoarding (low usage)
      if (org.id === 'org-labs') {
        spikeFactor = 0.4 + Math.random() * 0.3;
      }

      for (const model of models) {
        const weight = modelWeights[model];
        const noise = 0.7 + Math.random() * 0.6;
        const credits = Math.round(base * weight * weekendFactor * spikeFactor * noise);
        
        if (credits > 0) {
          records.push({
            date: dateStr,
            orgId: org.id,
            modelType: model,
            creditsUsed: credits,
            requestCount: Math.round(credits * (2 + Math.random() * 3)),
          });
        }
      }
    }
  }

  return records;
}

export const consumptionData = generateConsumptionData();

// ============================================================
// ALERTS
// ============================================================

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'critical',
    title: 'Human Fund pool nearly exhausted',
    message: 'The Human Fund Supplemental pool is at 96.3% utilization (57,800 / 60,000 credits). Auto top-up will trigger at 80% remaining.',
    source: 'pool-supp-data',
    timestamp: '2026-05-14T08:00:00Z',
    acknowledged: false,
    actionUrl: '/pools',
  },
  {
    id: 'alert-002',
    type: 'warning',
    title: 'SRE consumption spike detected',
    message: 'SRE team consumed 3.2x their 7-day average during the May 1-4 incident. 28,400 credits consumed in 4 days vs normal 8,800.',
    source: 'team-sre',
    timestamp: '2026-05-04T12:00:00Z',
    acknowledged: true,
    actionUrl: '/analytics',
  },
  {
    id: 'alert-003',
    type: 'warning',
    title: 'Monk\'s Product Group supplemental request pending',
    message: 'Elaine Benes requested 50,000 supplemental credits ($5,000). Requires admin approval (exceeds $3,000 threshold).',
    source: 'purch-005',
    timestamp: '2026-05-12T16:00:00Z',
    acknowledged: false,
    actionUrl: '/purchase',
  },
  {
    id: 'alert-004',
    type: 'info',
    title: 'Auto top-up executed for Human Fund Data',
    message: '20,000 credits ($2,000) auto-purchased for Human Fund Supplemental pool. Pool was at 15% remaining.',
    source: 'atr-data-supp',
    timestamp: '2026-04-28T00:01:00Z',
    acknowledged: true,
    actionUrl: '/auto-topup',
  },
  {
    id: 'alert-005',
    type: 'warning',
    title: 'Unauthorized credit purchase detected',
    message: 'Cedric (Marble Rye Security) attempted to purchase individual credits outside of organizational policy. Purchase was blocked.',
    source: 'user-cedric',
    timestamp: '2026-05-10T09:30:00Z',
    acknowledged: false,
    actionUrl: '/audit',
  },
  {
    id: 'alert-006',
    type: 'info',
    title: 'Peterman Ventures rollover: 8,400 credits carried forward',
    message: 'Peterman Ventures Supplemental had 59.2% unused credits last month. 8,400 credits rolled over to May.',
    source: 'pool-supp-labs',
    timestamp: '2026-05-01T00:00:00Z',
    acknowledged: true,
    actionUrl: '/pools',
  },
  {
    id: 'alert-007',
    type: 'critical',
    title: 'Enterprise pool projected to exhaust May 28',
    message: 'At current burn rate (13,200 credits/day), the enterprise pool will exhaust 3 days before month end. Consider requesting additional allocation.',
    source: 'pool-enterprise',
    timestamp: '2026-05-14T06:00:00Z',
    acknowledged: false,
    actionUrl: '/pools',
  },
];

// ============================================================
// AUDIT LOG
// ============================================================

export const auditLog: AuditEntry[] = [
  { id: 'aud-001', timestamp: '2026-05-14T08:00:00Z', actor: 'system', actorType: 'system', action: 'budget_alert', targetType: 'pool', targetId: 'pool-supp-data', details: 'Human Fund Supplemental pool at 96.3% utilization' },
  { id: 'aud-002', timestamp: '2026-05-12T16:00:00Z', actor: 'user-elaine-benes', actorType: 'user', action: 'credit_purchase', targetType: 'pool', targetId: 'pool-supp-product', details: 'Requested 50,000 supplemental credits for Monk\'s Product Group ($5,000)' },
  { id: 'aud-003', timestamp: '2026-05-10T09:30:00Z', actor: 'user-cedric', actorType: 'user', action: 'credit_purchase', targetType: 'user', targetId: 'user-cedric', details: 'Attempted unauthorized individual credit purchase - BLOCKED by policy pol-approval-threshold' },
  { id: 'aud-004', timestamp: '2026-05-08T14:20:00Z', actor: 'user-art-vandelay', actorType: 'user', action: 'policy_modified', targetType: 'policy', targetId: 'pol-individual-cap', details: 'Updated individual daily cap: added bob-sacamano to exempt list' },
  { id: 'aud-005', timestamp: '2026-05-05T10:00:00Z', actor: 'user-george-costanza', actorType: 'user', action: 'credit_allocation', targetType: 'team', targetId: 'team-sre', details: 'Increased Marine Ops supplemental allocation from 8,000 to 12,000 (post-incident adjustment)' },
  { id: 'aud-006', timestamp: '2026-05-04T12:00:00Z', actor: 'system', actorType: 'system', action: 'budget_alert', targetType: 'team', targetId: 'team-sre', details: 'Anomaly detected: SRE consumption 3.2x above 7-day average' },
  { id: 'aud-007', timestamp: '2026-05-01T00:00:00Z', actor: 'system', actorType: 'system', action: 'pool_modified', targetType: 'pool', targetId: 'pool-supp-labs', details: 'Monthly rollover: 8,400 unused credits carried forward to May' },
  { id: 'aud-008', timestamp: '2026-04-28T00:01:00Z', actor: 'system', actorType: 'auto_topup', action: 'auto_topup_triggered', targetType: 'pool', targetId: 'pool-supp-data', details: 'Auto top-up: 20,000 credits ($2,000) purchased. Pool was at 15% remaining.' },
  { id: 'aud-009', timestamp: '2026-04-25T11:00:00Z', actor: 'user-jerry-seinfeld', actorType: 'user', action: 'auto_topup_configured', targetType: 'pool', targetId: 'pool-supp-data', details: 'Configured auto top-up for Human Fund Supplemental: trigger at 20% remaining, 20,000 credits per top-up, max $8,000/month' },
  { id: 'aud-010', timestamp: '2026-04-20T09:00:00Z', actor: 'user-art-vandelay', actorType: 'user', action: 'pool_created', targetType: 'pool', targetId: 'pool-reserved-ml', details: 'Created reserved pool for Big Salad Power Users (15,000 credits)' },
  { id: 'aud-011', timestamp: '2026-04-15T00:00:00Z', actor: 'system', actorType: 'auto_topup', action: 'auto_topup_triggered', targetType: 'pool', targetId: 'pool-supp-platform', details: 'Auto top-up: 15,000 credits ($1,500) - projected exhaustion in 5 days. Awaiting approval.' },
  { id: 'aud-012', timestamp: '2026-04-10T16:30:00Z', actor: 'user-morty-seinfeld', actorType: 'user', action: 'overage_warning', targetType: 'cost_center', targetId: 'cc-security', details: 'Puffy Shirt Compliance cost center approaching 80% of monthly budget' },
  { id: 'aud-013', timestamp: '2026-04-01T08:00:00Z', actor: 'user-art-vandelay', actorType: 'user', action: 'credit_allocation', targetType: 'org', targetId: 'org-product', details: 'Increased Monk\'s Product Group enterprise allocation from 100,000 to 120,000 for Q2' },
  { id: 'aud-014', timestamp: '2026-03-15T10:00:00Z', actor: 'user-george-costanza', actorType: 'user', action: 'allocation_protected', targetType: 'team', targetId: 'team-platform-core', details: 'Marked Importer Core supplemental allocation as protected (cannot be consumed by enterprise pool)' },
  { id: 'aud-015', timestamp: '2026-03-01T00:00:00Z', actor: 'system', actorType: 'system', action: 'user_throttled', targetType: 'user', targetId: 'user-bob-sacamano', details: 'Bob Sacamano throttled: exceeded 500 credit daily cap. Exemption added later by admin.' },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getOrgById(id: string) {
  return organizations.find(o => o.id === id);
}

export function getTeamById(id: string) {
  return teams.find(t => t.id === id);
}

export function getUserById(id: string) {
  return users.find(u => u.id === id);
}

export function getCostCenterById(id: string) {
  return costCenters.find(cc => cc.id === id);
}

export function getTeamsByOrg(orgId: string) {
  return teams.filter(t => t.orgId === orgId);
}

export function getPoolsByOrg(orgId: string) {
  return creditPools.filter(p => p.orgId === orgId);
}

export function getAllocationsByPool(poolId: string) {
  return creditAllocations.filter(a => a.poolId === poolId);
}

export function getConsumptionByOrg(orgId: string, days: number = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  return consumptionData.filter(r => r.orgId === orgId && r.date >= cutoffStr);
}

export function getDailyTotals(days: number = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  
  const dailyMap = new Map<string, number>();
  for (const r of consumptionData) {
    if (r.date >= cutoffStr) {
      dailyMap.set(r.date, (dailyMap.get(r.date) || 0) + r.creditsUsed);
    }
  }
  
  return Array.from(dailyMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getConsumptionByModel(days: number = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  
  const modelMap = new Map<string, number>();
  for (const r of consumptionData) {
    if (r.date >= cutoffStr) {
      modelMap.set(r.modelType, (modelMap.get(r.modelType) || 0) + r.creditsUsed);
    }
  }
  
  return Array.from(modelMap.entries())
    .map(([model, total]) => ({ model, total }))
    .sort((a, b) => b.total - a.total);
}

export function getTopConsumers(days: number = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  
  const orgMap = new Map<string, number>();
  for (const r of consumptionData) {
    if (r.date >= cutoffStr) {
      orgMap.set(r.orgId, (orgMap.get(r.orgId) || 0) + r.creditsUsed);
    }
  }
  
  return Array.from(orgMap.entries())
    .map(([orgId, total]) => {
      const org = getOrgById(orgId);
      return { orgId, orgName: org?.name || orgId, total };
    })
    .sort((a, b) => b.total - a.total);
}

export function formatCredits(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
