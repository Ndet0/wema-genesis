#  🧩 WEMA PROJECT – FULL ALIGNMENT PLAN

(Frontend + Backend + CLI, Stripe-only, no Mongo)

The Big Picture (what we’re building toward)
React Frontend  ──┐
                  ├──> Wema API (Express + Stripe)
Python CLI    ────┘


Single source of truth: Stripe

No database

Backend = contract

Frontend & CLI = clients

#  ✅ PHASE 1 — Backend Audit & Cleanup (STARTING NOW)
🚨 Current problems (from your tree)

Your backend still has Mongo-era artifacts:

server/
├── models/Donation.js        ❌ Mongo
├── middleware/auth.js        ❌ DB-based auth assumption
├── controllers/donationController.js ❌ likely Mongo
├── routes/donations.js       ❌ Mongo


But your server.js already says:

“No MongoDB”

So we must make the code tell the same story as the architecture.

#  🧹 Phase 1.1 — Files to DELETE (intentionally)

These should not exist anymore:

server/models/Donation.js
server/middleware/auth.js   (for now)


This is not “losing work” — this is removing the wrong abstraction.

#  🧠 Phase 1.2 — What the backend will do now
Backend responsibilities (new truth)
Endpoint	Responsibility
POST /api/donations	Create Stripe checkout
GET /api/donations	Fetch paid donations from Stripe
POST /api/contact	Handle contact form
GET /api/health	Health check

👉 No persistence.
👉 Stripe is the ledger.

#  🔧 Phase 1.3 — Refactor donations flow (core)
✔ donationController.js (Stripe-only)
✔ routes/donations.js (clean, no DB)


# 🔌 Phase 1.4 — server.js should only wire things

#  ✅ PHASE 2 — Frontend ↔ Backend Alignment (Next)
What I’ll check next:

services/api/donations.js

DonationContext.js

DonationForm.jsx

Stripe redirect handling

Success / Cancel pages

Goal:

Frontend ONLY calls /api/donations

No Stripe logic in React

Backend owns payments

#  ✅ PHASE 3 — CLI ↔ Backend Contract Alignment

Your CLI should:

POST /api/donations → get checkoutUrl

GET /api/donations → list donations (admin-style)

No DB.
No migrations.
No local state.

I’ll align:

payload shape

error handling

output UX

#  ✅ PHASE 4 — Final Cleanup & Documentation

Remove dead files

Add backend README

Define API contract

Ensure repo tells a coherent story