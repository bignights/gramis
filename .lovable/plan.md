
## Goal
Replace hardcoded waitlist numbers with a real backend so signups, tier assignment, counts, and tier "filled" states update automatically. Add a protected `/admin` page to view and export signups.

## What gets built

### 1. Enable Lovable Cloud
Provisions the database and auth needed for everything below.

### 2. Database
A single `waitlist_signups` table:
- `id` (uuid)
- `email` (text, unique, lowercase)
- `tier` (text: `founder` | `priority` | `early_adopter`)
- `source_button` (text: which button they clicked — `hero`, `founder`, `priority`, `early_adopter`)
- `created_at` (timestamptz)

RLS: no public read, no public write. All access goes through server functions using the admin client. Admin dashboard reads via an authenticated server function.

A separate `user_roles` table + `has_role()` function for admin gating (per Lovable's role security pattern — roles never on the user object).

### 3. Server functions (TanStack `createServerFn`)
- **`joinWaitlist({ email, sourceButton })`** — public. Logic:
  1. Lowercase + validate email.
  2. Look up current real counts per tier.
  3. Decide actual tier:
     - If `sourceButton === 'founder'` and Founder has spots → `founder`
     - Else if `sourceButton === 'priority'` and Priority has spots → `priority`
     - Else assign to the lowest open tier (Founder → Priority → Early Adopter → closed)
     - If all closed → return `{ status: 'closed' }`
  4. Insert row (ignore duplicate-email error → return `{ status: 'already_joined' }`).
  5. Forward submission to Formspree so you keep getting the email notifications you already use.
  6. Return `{ status: 'ok', tier }`.
- **`getWaitlistStats()`** — public. Returns `{ founder, priority, earlyAdopter, total }` real counts. Cached briefly.
- **`getAllSignups()`** — admin only (uses `requireSupabaseAuth` + `has_role('admin')`). Returns full list for the dashboard.

### 4. Landing page changes (`src/routes/index.tsx`)
- On mount, fetch `getWaitlistStats()` once.
- Counter card: shows `31 + stats.total` (keeps the +31 baseline you asked for).
- Scarcity block: shows `(100 − 31 − stats.founder)` remaining; if Founder is full, swap copy to "Founder Access — closed forever ✓" and dim the card.
- Tier buttons:
  - Each button passes its tier to `joinWaitlist` via the `sourceButton` field. The hero email form passes `sourceButton: 'hero'` (auto-assigned).
  - When a tier is full, replace its button with a non-clickable "Filled — thank you ✓" badge and slightly dim that card.
  - When all three tiers are full, the entire Tiers section is replaced with a "Waitlist closed" message.
- Success overlay tells the user which tier they landed in ("You're in — Founder Access secured" vs "You're on the Priority list").

### 5. Admin dashboard (`/admin`)
- Protected route under `_authenticated/admin.tsx`.
- Email/password login (you sign up once with your own email, then I'll mark you as admin via a one-time migration insert into `user_roles`).
- Shows:
  - Live counts per tier with progress bars (Founder x/100, Priority x/300, Early Adopter x/1000).
  - Sortable table of every signup: email, tier, button clicked, joined date.
  - "Export CSV" button.
  - Manual "Override tier" dropdown per row (in case you ever want to bump someone).

### 6. Keep Formspree
You keep getting an email for every signup — the server function POSTs to your existing Formspree endpoint after the DB insert succeeds. Nothing changes in your inbox.

## What you'll need to do
1. Approve this plan → I enable Lovable Cloud.
2. Once it's live, sign up at `/admin` with your email.
3. Tell me the email — I'll run a one-line insert to grant you the admin role.
4. From then on everything is automatic.

## Out of scope (say the word if you want them)
- Email confirmation to the signup (welcome email).
- Public "live counter" with WebSockets (current plan re-fetches on page load, which is plenty for a waitlist).
- Google Sheets mirroring — Cloud + CSV export covers it; we can add a Sheets sync later if you still want it.
