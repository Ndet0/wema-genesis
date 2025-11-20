# WEMA Project Roadmap

This roadmap lays out a phased plan to improve the WEMA codebase (security, reliability, DX, testing, and production readiness). Each phase has concrete tasks, estimated time, acceptance criteria, and suggested files/places to change.

---

## Overview / Goals
- Secure payment handling (server-side verification + webhooks).
- Solid developer experience (linting, formatting, single dev command, docs).
- CI and testing (unit + basic e2e for donation flow).
- Safe incremental migration to stronger types (optional: TypeScript).
- Production readiness: monitoring, logging, rate-limiting, hardened CORS, secrets management.

---

## Phase 0 — Immediate (0–2 days)
Goals: Prevent accidental secret commits and add a compact, actionable checklist.

Tasks:
- Ensure environment files are ignored by git.
  - Files: `.gitignore` (done)
  - Acceptance: `.env` and `.env.*` present in `.gitignore`
- Add `.env.example` with placeholder keys and README note.
  - Files: `.env.example`, `README.md` (update section)
  - Acceptance: Example file contains placeholders for required vars (STRIPE_SECRET_KEY, VITE_STRIPE_PUBLIC_KEY, VITE_PAYPAL_CLIENT_ID, PORT, VITE_FRONTEND_ORIGIN)

Quick wins implemented in this phase:
- Add `.env` exclusion to `.gitignore` (done)
- Create `.env.example` (recommended next step)

---

## Phase 1 — Safety & Payment Correctness (1–2 weeks)
Goals: Ensure payments are verified and server endpoints are hardened.

Tasks:
1. Implement Stripe webhook endpoint and verification
   - Files: `server/server.js` (or `server/routes/webhooks.js`)
   - Details: Add route to receive Stripe events, verify signature with `STRIPE_WEBHOOK_SECRET`, handle `checkout.session.completed` to record payments.
   - Acceptance: A webhook route exists and validates Stripe signatures; test using `stripe CLI` or `ngrok` in dev.

2. Harden payment endpoints
   - Add input validation (amount types), more detailed JSON errors.
   - Add rate limiting (e.g., `express-rate-limit`) on `/create-checkout-session` and other public endpoints.
   - Add basic request logging (request id, timestamp) and structured error responses.

3. Tighten CORS configuration
   - Use `VITE_FRONTEND_ORIGIN` only; no multiple origins in production.

4. Secrets validation on startup
   - Validate presence of critical env vars (`STRIPE_SECRET_KEY`, `VITE_PAYPAL_CLIENT_ID`) and log a clear startup error.

---

## Phase 2 — Developer Experience & CI (1–3 weeks)
Goals: Improve DX with formatting, linting, single command to run both servers, and CI checks.

Tasks:
1. Lint & Formatter
   - Add Prettier and `eslint-config-prettier`.
   - Add `lint:fix` and `format` npm scripts.
   - Files: `package.json`, `.eslintrc.cjs` or `eslint.config.js`, add `.prettierrc`.

2. Single dev command
   - Add `concurrently` (or `npm-run-all`) script: `dev:all` to run Vite and Express in parallel.
   - Files: `package.json`

3. CI Workflow (GitHub Actions)
   - Add workflow that runs: `npm ci`, `npm run lint`, `npm run build` (and tests when available).
   - Files: `.github/workflows/ci.yml`

4. Basic tests
   - Add unit tests for server validation logic (e.g., amount validation) using Jest or Vitest (Vite-friendly).
   - Add one integration test mocking Stripe responses for the `/create-checkout-session` endpoint.

Acceptance criteria:
- CI runs on PRs and fails on lint/build errors.
- Devs can run both frontend+backend with `npm run dev:all`.

---

## Phase 3 — Robustness & Observability (2–6 weeks)
Goals: Add logging, monitoring, persistent storage for donations, and admin improvements.

Tasks:
1. Logging & monitoring
   - Add `pino` or `winston` for structured logs.
   - Wire basic error reporting (Sentry or similar) in server (optional).

2. Database integration
   - Add a small DB (Postgres or Mongo). Create a `donations` table/collection to record events when webhooks confirm payment.
   - Files: `server/db/*`, `server/models/donation.js` or TS equivalents.

3. Admin dashboard improvements
   - Connect admin pages to DB read endpoints.
   - Add pagination, CSV export for donations.

4. Production checklist
   - Add health endpoint, graceful shutdown, env-specific config, CORS for production origin only.

Acceptance criteria:
- Payments are recorded server-side based on verified webhook events.
- Admin can view recent donations from DB.

---

## Phase 4 — Scale & Long Term (1–3 months)
Goals: Type safety, performance improvements, E2E tests, infra & deployment.

Tasks:
1. TypeScript migration (incremental)
   - Start with server (small) or shared utils; add `tsconfig.json`, enable `allowJs` and gradually convert files.

2. E2E tests
   - Add Playwright or Cypress tests for the donation flow using sandbox credentials.

3. Bundle & performance
   - Use Vite build reports and code-splitting for large libs; lazy-load PayPal/Stripe SDKs.

4. Deployment & infra
   - Add Dockerfile(s), prepared deploy scripts, or use platforms (Vercel for frontend, Railway/Render for API).
   - Add observability: logs, metrics, alerting.

Acceptance criteria:
- Deterministic build + deployment procedure; E2E tests pass in CI; performance budgets established.

---

## Risk & Blockers
- Webhook setup needs a public endpoint (ngrok or deploy) and `STRIPE_WEBHOOK_SECRET` in env.
- Migration to TypeScript is beneficial but non-trivial—plan incremental steps.
- Payment flows require secure storage of secrets in deployment environment.

---

## Suggested File/Directory Conventions
- `server/` for backend code. Example subfolders:
  - `server/index.js` (or `server/server.js`) — app bootstrap
  - `server/routes/` — route handlers (payments, webhooks, admin API)
  - `server/services/` — payment service wrappers
  - `server/db/` — DB client and models
- `src/` for frontend code:
  - `src/pages/` — route pages (Home, Donation, Success, Cancel, Admin)
  - `src/components/` — shared components
  - `src/services/` — api clients and SDK wrappers
  - `src/hooks/` and `src/context/`

---

## Rough Timeline / Estimates
- Phase 0: 0–2 days
- Phase 1: 1–2 weeks
- Phase 2: 1–3 weeks
- Phase 3: 2–6 weeks
- Phase 4: 1–3 months

---

## Next immediate actions I can take for you
- Create `.env.example` with placeholders and add a README section.
- Add a simple GitHub Actions CI config that runs lint and build.
- Add `express-rate-limit` into `server/server.js` and small logging.

If you want, I can start implementing any of the above quick wins now — tell me which one.

---

_End of Roadmap_
