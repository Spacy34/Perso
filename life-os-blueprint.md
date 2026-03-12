# Personal Life OS — Execution Blueprint

## Executive summary

Build a **single-user, privacy-first Life OS** that unifies day planning, tasks, finances, and home intelligence into one daily command center. Start with a narrow MVP that is usable in under 10 minutes per day, then add automation in layers.

**Core principle:** The app is not a database; it is a **decision engine** for “what matters now.”

**Primary success metrics (first 90 days):**
1. You open it daily (>=5 days/week).
2. Morning planning takes <10 minutes.
3. Monthly money review takes <45 minutes.
4. Home status issues are surfaced before they become problems.

---

## Recommended MVP

### Smallest useful version
A web app with 4 core capabilities:
1. **Today Dashboard** (priorities + routines + key money + key home signals).
2. **Tasks & Routines** (quick capture, due dates, recurring checklists).
3. **Finance Ledger Lite** (manual/CSV transactions + categories + monthly snapshot).
4. **Home Snapshot** (read-only Home Assistant status + basic actions).

Everything else (goals engine, deep notes graph, advanced automation, AI copilots) is later.

### 5 most important MVP screens
1. **Home / Today**
   - Today priorities, overdue tasks, routine checklist, upcoming bills, account balances summary, home alerts.
2. **Tasks**
   - Inbox + Today + Upcoming + Routine templates.
3. **Finances**
   - Accounts, transactions table, category breakdown, this-month cash flow.
4. **Home**
   - Rooms/devices status, alerts, and a few safe quick actions.
5. **Weekly Review**
   - Guided checklist: done/undone tasks, spending summary, next-week top 3 priorities.

### Essential daily workflows
- Morning: open Today → pick top 3 priorities → complete routine checklist.
- During day: quick-add tasks/expenses in <10 seconds.
- Evening: check home alerts + tomorrow prep.
- Weekly: run review ritual and plan week.

### MVP integrations: do now vs later
**Now**
- Home Assistant API (read + limited service calls).
- CSV import for bank/credit card transactions.
- Email/push notifications (basic reminders).

**Later**
- Bank sync providers (Plaid/Tink/TrueLayer depending region).
- Calendar 2-way sync.
- Advanced notification channels (Telegram/Slack/WhatsApp).

### What to cut (opinionated)
- Multi-user support.
- Complex goal frameworks.
- Full PKM/graph notes features.
- AI chat assistant in v1.
- Advanced budgeting envelopes and forecasting simulations.

---

## Product modules

### 1) Dashboard / Home
**Purpose:** One screen that answers: *What should I do now?*

**Problems solved:** fragmented context, decision fatigue.

**Core features:**
- Priority stack (top 3), overdue items, routine progress.
- Money pulse (cash in/out this month, due bills in next 7 days).
- Home pulse (critical alerts, occupancy, temperature/security summary).

**MVP:** static widgets with lightweight personalization.
**Later:** dynamic scoring/ranking engine + AI summaries.

### 2) Tasks / Routines
**Purpose:** Execution system for day-to-day commitments.

**Problems solved:** forgotten chores, recurring task chaos, weak planning discipline.

**Core features:**
- Task inbox, due/scheduled dates, priority, tags/life area.
- Recurring routine templates (daily/weekly/monthly).
- Project linkage for outcomes.

**MVP:** single list model + recurrence rules.
**Later:** dependencies, effort estimates, habit streak analytics.

### 3) Calendar / Planning
**Purpose:** Time-aware planning layer.

**Problems solved:** overcommitment, no weekly structure.

**Core features:**
- Week planner view.
- Time blocks tied to task/project.
- Review workflow (weekly reset).

**MVP:** internal planner only.
**Later:** Google/Outlook sync, time-block suggestions.

### 4) Notes / Personal knowledge
**Purpose:** Capture context and decisions.

**Problems solved:** knowledge fragmentation.

**Core features:**
- Quick notes, linked to projects/goals/tasks.
- Templates for journals/reviews.

**MVP:** markdown note pages + tags.
**Later:** backlinks, semantic search, AI extraction.

### 5) Finances
**Purpose:** Personal financial clarity and control.

**Problems solved:** unclear cash flow, missed trends.

**Core features:**
- Accounts and balances.
- Transactions + categorization.
- Monthly cash flow summary.

**MVP:** manual + CSV ingestion, basic rules.
**Later:** bank sync, anomaly detection, forecast engine.

### 6) Subscriptions / Bills
**Purpose:** Eliminate surprises from recurring obligations.

**Problems solved:** forgotten renewals, late fees.

**Core features:**
- Recurring bill records + next due date.
- Reminder lead times.
- “Expected vs actual” bill checks.

**MVP:** manual setup + reminders.
**Later:** auto-detect from transactions.

### 7) Home Assistant integration
**Purpose:** Surface home intelligence where you already plan life.

**Problems solved:** home data buried in separate app.

**Core features:**
- Status tiles for key entities.
- Active alerts.
- Safe action triggers (lights scene, alarm mode where safe).

**MVP:** read + controlled write for selected services.
**Later:** richer telemetry, cross-domain automations.

### 8) Alerts / Notifications
**Purpose:** Proactive, actionable prompts.

**Problems solved:** reactive living.

**Core features:**
- Due task reminders.
- Bill due and low-balance alerts.
- Home anomaly alerts.

**MVP:** in-app + email.
**Later:** push, escalation policies, quiet hours.

### 9) Settings / Rules / Automations
**Purpose:** Personalization and deterministic automation.

**Problems solved:** repetitive manual decisions.

**Core features:**
- Rule builder (if condition, then action/tag/alert).
- Thresholds and preferences.

**MVP:** finance categorization rules + notification thresholds.
**Later:** cross-module automations.

### 10) Missing module to add: **Reviews & Insights**
This should be explicit, not hidden.

**Purpose:** weekly and monthly reflection loops.

**MVP:** guided checklists + snapshot stats.
**Later:** AI-generated summaries and recommendations.

---

## Technical architecture recommendation

### Candidate options (brief)
1. **Next.js full-stack + Postgres (recommended)**
   - Fast iteration, excellent ecosystem, can self-host.
2. **Django + HTMX/React**
   - Strong backend ergonomics, slower polished UI iteration.
3. **Laravel + Inertia/Vue**
   - Productive, but smaller TS-centric integration ecosystem for this use case.

### Recommended stack (opinionated)
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- **Backend:** Next.js server actions/routes + dedicated domain services in `/lib`.
- **DB:** PostgreSQL + Prisma.
- **Auth:** Better Auth or NextAuth with email + passkeys (later) + optional TOTP.
- **Hosting:** Start on Railway/Fly.io (app + Postgres). Easy self-host path later via Docker.
- **Background jobs:** Trigger.dev or Temporal-lite approach using BullMQ + Redis.
- **Integrations:**
  - Home Assistant REST/WebSocket client.
  - Finance CSV import service first; bank API adapter interface for future providers.
- **Charts:** ECharts or Recharts for dashboard widgets.
- **Notifications:** Resend (email), Web Push later.
- **CI/CD:** GitHub Actions + preview deploys + migration checks.
- **Mobile:** responsive web first, installable PWA later.

### Why this stack
- **Speed:** single TypeScript codebase.
- **Maintainability:** strong typings + Prisma schema + clear module boundaries.
- **Privacy:** self-hostable containers; no forced SaaS lock-in.
- **Cost:** low initial infra (<$30–60/month depending usage).

---

## Data model

### Core design principles
- Use **normalized core tables** for transactional integrity.
- Add `metadata JSONB` + tags for flexible extension.
- Keep module boundaries explicit but link via `user_id`, `project_id`, `life_area_id`.

### Key entities (minimum)

- `user`
  - identity, auth settings, timezone, locale.

- `life_area`
  - health/work/personal/admin/learning/relationships + custom.

- `project`
  - name, status, life_area, due horizon.

- `goal`
  - target metric/date, linked projects.

- `task`
  - title, status, priority, due_at, scheduled_at, project_id, life_area_id, estimate_min.

- `routine`
  - recurrence rule, checklist items, active windows.

- `note`
  - markdown content, linked entity refs, tags.

- `account`
  - type (checking/savings/card/cash), currency, current_balance, institution.

- `transaction`
  - booked_at, amount, merchant, category_id, account_id, transfer_group_id, import_source, fingerprint_hash.

- `category`
  - income/expense, parent_id for hierarchy.

- `budget`
  - period, category_id, planned_amount, rollover_mode.

- `subscription`
  - vendor, expected_amount, cadence, next_due_date, linked transactions.

- `bill`
  - due_date, amount_due, autopay flag, reminder offsets.

- `device`
  - home assistant entity id, domain, room_id, capabilities, last_state.

- `room`
  - name, floor/zone metadata.

- `sensor_reading`
  - device_id, metric_type, value, timestamp.

- `automation_reference`
  - HA automation id, purpose, safe_to_trigger flag.

- `alert`
  - source module, severity, status, payload, acknowledged_at.

- `daily_summary`
  - generated snapshot JSON (tasks, finance pulse, home pulse).

- `weekly_review`
  - checklist results + notes + carry-forward actions.

### Relationships
- User owns almost everything.
- Tasks link to projects/goals/life areas.
- Transactions link to account/category; bills/subscriptions may map to recurring transactions.
- Devices belong to rooms; alerts can reference any entity via polymorphic pointer (`entity_type`, `entity_id`).

### Normalized vs flexible
- Normalize: financial ledger, tasks status, core entities.
- Flexible: widget configs, custom dashboard layouts, AI annotations, external payload snapshots in JSONB.

---

## Home Assistant integration design

### Best connection approach
1. **Long-lived access token** for your app service account in HA.
2. Use **REST for writes** (explicit service calls) and **WebSocket/events for state updates**.
3. Maintain local cache of selected entities to avoid API thrash.

### Data to pull (MVP)
- Presence entities, alarm status, key doors/windows, temperatures, humidity, energy summary sensors, important automations state.

### Actions allowed in app
- Trigger pre-approved scenes/scripts.
- Acknowledge home alerts.
- Toggle selected low-risk devices.

Avoid high-risk actions in MVP (e.g., unlocking doors remotely).

### Useful dashboards
- **Home Now:** occupancy, security, climate, key lights.
- **Energy:** current power, daily kWh, 7-day trend.
- **Maintenance:** battery low, offline devices, filter replacement reminders.

### Secure auth handling
- Store HA token encrypted at rest.
- Scope to least privilege service account.
- Rotate quarterly.
- Log every write action with actor and timestamp.

### Anti-fragility strategy
- Keep HA as **source of truth** for automations/devices.
- Your app is an orchestration and insight layer, not device control brain.
- Graceful degradation: if HA offline, show stale data timestamp and disable actions.

### Example widgets
- Daily home summary: “Away mode active, 2 windows open, living room 24.5°C, no critical alerts.”
- Maintenance alerts: “Kitchen sensor battery <15%.”
- Occupancy insight: “Home empty >8h, energy baseline still high.”
- Command center widget: “Good night sequence” (single safe scene trigger).

---

## Finance system design

### Core components
1. **Account overview**
   - current balances, trend, available cash.
2. **Transaction ingestion**
   - manual entry + CSV parser with source-specific mapping templates.
3. **Categorization engine**
   - deterministic rules first; ML suggestions later.
4. **Recurring detection**
   - identify likely subscriptions/bills by merchant cadence/amount bands.
5. **Budget tracking**
   - monthly category budgets + burn rate.
6. **Monthly close**
   - lock period, reconcile balances, snapshot KPIs.
7. **Cash flow forecast (basic)**
   - expected recurring inflows/outflows + scheduled bills.

### Automation vs manual
**Automate now:**
- Duplicate detection via fingerprint hash.
- Rule-based category assignment.
- Transfer pair suggestion.
- Recurring candidate suggestions.

**Keep manual now:**
- Final category approval queue.
- Subscription confirmation.
- Monthly close sign-off.

### Rules engine (simple and effective)
- If merchant contains `X` and amount range `Y` → category `Z`.
- If account A negative and account B positive same amount/date window → mark transfer.
- If pattern repeats ~monthly ±3 days for 3 cycles → recurring candidate.

### High-value charts
- Income vs expense by month.
- Expense by category (month + 12-month trend).
- Remaining budget by category.
- 30-day cash runway estimate.
- Recurring obligations calendar.

### Financial alerts to include
- Bill due in 3 days and projected low balance.
- Unusual spending anomaly (relative to trailing 90-day baseline).
- New recurring charge candidate.
- Category overspend threshold breach.

### Data handling specifics
- **CSV imports:** mapping profiles per institution.
- **Bank sync later:** adapter interface `provider_connector` so providers are swappable.
- **Duplicates:** `fingerprint_hash` on normalized date/amount/merchant/account.
- **Transfers:** linked dual transactions with `transfer_group_id`.
- **Subscriptions:** entity linked to matched transactions and next expected date.
- **Reimbursements/shared:** tag + receivable status in MVP.

---

## UX / screen architecture

### Navigation (desktop-first)
Left sidebar:
- Today
- Tasks
- Planner
- Finances
- Home
- Reviews
- Notes
- Settings

Top bar:
- global quick add (`Cmd/Ctrl+K`), search, alerts bell, profile.

### Homepage structure (Today)
1. **Top strip:** date, day score, top 3 priorities.
2. **Main column:** Today tasks + routines checklist.
3. **Right column:** money pulse, bills due, home pulse, alerts.
4. **Bottom:** “Decide now” cards (3 suggested actions).

### One-click actions
- Add task.
- Mark routine item done.
- Log expense.
- Snooze alert.
- Trigger safe home scene.

### Info hierarchy
- Immediate: critical alerts, overdue tasks, today priorities, due bills.
- Secondary: trends/charts.
- Deep detail: transaction edits, device history, note linking.

### Design language
- Minimal, card-based, high contrast, calm neutral palette with severity color coding.
- Keep dense desktop layout with adaptive stacking on mobile.

---

## Build roadmap

### Phase 1 — MVP (6–8 weeks)
**Goals:** daily usefulness and habit formation.

**Deliverables:**
- Auth, Today dashboard, tasks/routines, finance CSV flow, basic HA read integration, weekly review.

**Dependencies:**
- Stable schema, notification baseline, HA token setup.

**Risks:**
- Scope creep, data model churn.

**Complexity:** medium.

### Phase 2 — Automation + deeper finance (6–10 weeks)
**Goals:** reduce manual work and increase financial control.

**Deliverables:**
- Rule engine v1, recurring detection, budget system, bill/subscription center, improved alerts.

**Dependencies:**
- Clean transaction ingestion pipeline.

**Risks:**
- Edge cases in categorization/transfers.

**Complexity:** medium-high.

### Phase 3 — Home intelligence + advanced dashboards (8–12 weeks)
**Goals:** meaningful home insights, not raw telemetry.

**Deliverables:**
- WebSocket sync, maintenance/occupancy/energy panels, cross-module insights.

**Dependencies:**
- HA entity mapping and reliable cache.

**Risks:**
- Integration fragility if over-coupled.

**Complexity:** high.

### Phase 4 — Personal OS + AI layer (ongoing)
**Goals:** assistant-like recommendations and autonomous summaries.

**Deliverables:**
- AI suggestions for planning/finance/home anomalies, natural language briefings.

**Dependencies:**
- High-quality historical data and deterministic baseline.

**Risks:**
- User trust loss if hallucinations or noisy suggestions.

**Complexity:** high.

---

## AI opportunities

### Strong practical use cases
- Transaction category suggestion confidence ranking.
- Spending anomaly explanations.
- Daily prioritization suggestions from tasks, deadlines, and routines.
- Weekly review summary and carry-forward recommendations.
- Note-to-task extraction.
- Home anomaly narratives (“temperature drift + occupancy mismatch”).

### Deterministic vs AI
- Deterministic for money movement, reminders, thresholds, automations, and anything safety-critical.
- AI for summarization, suggestions, classification assistance, and pattern discovery.

### Local vs API
- Start with external API for speed (OpenAI/Anthropic).
- Keep personally sensitive financial/home raw data minimized in prompts.
- Later: local model option for summaries if privacy needs increase.

### Reliability guardrails
- Show “suggested by AI” with confidence.
- Require user confirmation for any state-changing action.
- Keep full rule-based fallback when AI unavailable.

---

## Security / privacy / reliability

### Minimum acceptable security posture (non-negotiable)
- Strong auth (email magic link + optional TOTP).
- Session security with short-lived tokens + refresh rotation.
- Encryption at rest (DB volume) and in transit (TLS everywhere).
- Secrets in managed vault (not `.env` in git).
- Per-integration scoped tokens (HA, email, bank connectors).
- Audit log for sensitive actions (finance edits, HA writes, auth events).
- Automated daily backups + tested restore monthly.
- Error monitoring + alerting (Sentry + uptime checks).

### Additional reliability controls
- Idempotent import jobs for finance data.
- Rate-limit external API calls.
- Circuit breaker and retry for HA/bank API outages.
- Graceful offline tolerance: local cached last-known dashboard + stale indicators.

### Data governance
- Soft deletes + archival snapshots for monthly closes.
- Clear retention policy for logs and raw import files.

---

## Final recommendation: the best version to build first

Build **Version 0.1 “Daily Command Center”**:
- Today dashboard with top priorities, routines, bills due, and home status.
- Tasks/routines you can trust daily.
- Finance ledger that handles CSV imports and monthly clarity.
- HA integration that is mostly read-only + a handful of safe actions.

This gives maximum personal leverage quickly, stays solo-builder realistic, and creates the data foundation needed for automation and AI in later phases.
