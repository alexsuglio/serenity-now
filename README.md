# 🧘 Project Serenity Now — GitHub Enterprise AI Credits Management

> *"SERENITY NOW!"* — Frank Costanza, when the AI credit alerts fire at once

A functional mockup of a GitHub Enterprise capability that enables admins and budget owners to **purchase, distribute, and manage AI credits** across dev communities with full budget controls, policies, and analytics.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Overview

This mockup addresses the core challenge: **When enterprises purchase AI credit bundles, how do they prevent credits from being "swallowed up" by the enterprise pool** while giving engineering leads the autonomy to purchase and manage supplemental capacity for their teams?

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Enterprise Pool** | Shared baseline AI credit allocation across the entire enterprise |
| **Supplemental Credits** | Additional credits purchased by budget owners, scoped to specific teams/orgs — **NOT drawn from enterprise pool** |
| **Reserved Credits** | Earmarked for specific individuals with guaranteed availability |
| **Protected Allocations** | Credits that cannot be consumed by anyone outside the assigned scope |
| **Auto Top-Up** | Automated credit replenishment based on consumption trends and thresholds |
| **Cost Centers** | Mapped to Azure subscriptions for billing attribution |

## 📖 User Stories

### Story 1: Supplemental Credit Purchase (Primary)

> *"I am an engineering lead for a division of ACME. My developers need additional AI capacity beyond the org-wide budget. I want to purchase additional AI credits through my Azure subscription and make them available to my Power Users / Dev Team / certain individuals — NOT be swallowed up by the enterprise pool. My budget should reflect the purchase but not register as an overage (because I don't want to be charged twice)."*

**How it works in Serenity Now:**

1. Navigate to **Purchase** → Click **New Purchase**
2. Select **Supplemental Credits** (separate from enterprise pool)
3. Choose your **Azure cost center** as the billing source
4. Assign to your **organization, team, or individuals**
5. Review the **Budget Impact Preview** which clearly shows:
   - ✅ Bills to YOUR cost center as a supplemental line item
   - ✅ Does NOT register as an enterprise overage
   - ✅ Credits are protected and scoped to your target
   - ✅ Enterprise pool balance is unaffected

**Acceptance Criteria:**
- [x] Budget owner initiates supplemental credit purchase
- [x] Purchase links to a specific Azure subscription/cost center
- [x] Credits tagged as "supplemental" and scoped to team/org/individuals
- [x] Enterprise pool balance unaffected
- [x] Budget report shows purchase as supplemental, NOT overage
- [x] Clear visual distinction between enterprise vs supplemental credits

---

### Story 2: Auto Top-Up Configuration

> *"As the engineering leader and budget owner, I want to set up a regular AI Credit top-up for my team. The enterprise allocation isn't enough for my awesome team and I don't want to have to go through the UI and buy credits every month — I want credits to automatically top up based on historical consumption data and trends."*

**How it works:**

1. Navigate to **Auto Top-Up** → Click **New Rule**
2. Select the pool to auto-replenish
3. Choose a trigger:
   - **Percentage remaining** (e.g., top up when pool drops below 20%)
   - **Projected exhaustion** (e.g., top up when projected to run out in 7 days)
   - **Fixed schedule** (e.g., 1st of every month)
4. Set the top-up amount and spending caps
5. Configure approval requirements (auto-approve below threshold, require approval above)

**Acceptance Criteria:**
- [x] Budget owner enables auto-top-up for supplemental pool
- [x] System analyzes 30/60/90 day consumption trends
- [x] Configurable triggers: percentage remaining, projected exhaustion, fixed schedule
- [x] Configurable limits: max auto-purchase per cycle, monthly spending cap
- [x] Approval workflow option
- [x] Notification when auto-top-up fires
- [x] Full audit trail of auto-purchases

---

### Story 3: Enterprise Admin — Pool Visibility & Control

> *"As a GitHub Enterprise admin, I need to see across all orgs and teams how AI credits are being consumed, who has supplemental budgets, and ensure no one is exceeding policy limits."*

**How it works:** The **Dashboard** provides enterprise-wide visibility with:
- Total credits (enterprise + supplemental breakdown)
- Real-time utilization with projected exhaustion date
- Consumption trends with anomaly detection
- Top consumers by org/team
- Active alerts for budget issues

---

### Story 4: Cost Center Reconciliation

> *"As a finance team member, I need to reconcile AI credit spending against Azure cost centers and ensure supplemental purchases are correctly attributed to the right budget owner."*

**How it works:** The **Analytics → Cost Analysis** tab shows:
- Cost center budget utilization
- Cost per developer by organization
- Clear separation of enterprise vs supplemental spending
- Export capability for financial reporting

---

### Story 5: Individual Developer — Credit Awareness

> *"As a developer, I want to see my personal AI credit usage and know how much capacity I have left."*

**How it works:** The **Distribution** page shows individual reserved allocations with usage tracking.

---

### Story 6: Anomaly Detection

> *"As an admin, I want to be alerted when a team's AI consumption spikes abnormally."*

**How it works:** Policies can be configured with alert thresholds (e.g., 2x the 7-day rolling average triggers an alert). The SRE incident spike scenario demonstrates this in the mock data.

---

## 🎭 Challenging Customer Scenarios (Built Into Mock Data)

The mock data includes six realistic "difficult customer" scenarios:

| Scenario | Who | What |
|----------|-----|------|
| **The Over-Consumer** | ML Infrastructure team | Burns through credits 3x faster than average, growing trend |
| **The Hoarder** | Innovation Labs | 59% unused supplemental credits rolling over monthly |
| **The Budget Fighter** | Product Development | Wants supplemental but cost center is nearly maxed |
| **The Shadow IT** | Tyler Nguyen (Security) | Attempted to purchase individual credits outside policy — blocked |
| **The Spike** | SRE team | 3.2x consumption spike during a major incident (May 1-4) |
| **The Forecasting Challenge** | Product Development | Growing headcount 20% — how to predict future needs? |

## 🏗️ Architecture

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Enterprise-wide AI credits overview |
| Credit Pools | `/pools` | Manage enterprise, supplemental, and reserved pools |
| Purchase | `/purchase` | Buy supplemental/reserved credits (key user story!) |
| Distribution | `/distribution` | Allocate credits to orgs/teams/individuals |
| Auto Top-Up | `/auto-topup` | Automated replenishment rules |
| Policies | `/policies` | Governance controls and spending limits |
| Analytics | `/analytics` | Deep-dive metrics, ROI, forecasting |
| Audit Log | `/audit` | Complete transaction and event history |

### Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Recharts** for data visualization
- **Lucide React** for icons
- All mock data (no database required)

### Mock Enterprise: ACME Corporation

- **2,500 seats** on GitHub Enterprise Cloud
- **5 organizations**: Platform, Product, Data, Labs, Security
- **14 teams** across organizations
- **500,000 base credits/month** enterprise pool
- **140,000 supplemental credits** across 3 supplemental pools + 1 reserved pool
- **5 cost centers** mapped to Azure subscriptions
- **6 active policies** (spending limits, rate limits, model access, approvals, alerts)
- **90 days of consumption data** with realistic patterns

## 📝 Key Design Decisions

1. **Supplemental ≠ Enterprise**: Supplemental credits are a completely separate pool. They don't count toward enterprise utilization and can't be "stolen" by other teams.

2. **Protected allocations**: Any allocation can be marked as "protected", meaning it's ring-fenced and cannot be consumed by the broader enterprise pool.

3. **Budget impact preview**: The purchase flow explicitly shows that supplemental purchases do NOT register as overages — this is the #1 concern from the user story.

4. **Auto top-up with guardrails**: Automated purchasing includes spending caps, approval thresholds, and full audit trails to prevent runaway costs.

5. **Policy-first governance**: Spending limits, rate limits, and model access restrictions are centrally managed and apply hierarchically.

---

*Built with 🧘 and Copilot*
