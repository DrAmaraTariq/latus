# Latus — Doctor Intelligence Workspace

High-fidelity, clickable frontend prototype of Latus, an AI-powered clinical
intelligence platform for physicians. Built for UX research / physician
interviews — no backend, no real data, no real AI calls. Everything runs on
mock data and local React state.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Recharts (trend charts)
- lucide-react (icons)

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Suggested walkthrough for interviews

1. **Dashboard** — start here (`/`). Shows today's appointments, patients
   needing attention, and recent changes.
2. Click **Sarah Mitchell** (from the dashboard, appointments, or patients
   list) to open **Patient Intelligence** — the most detailed screen.
3. On her profile, try:
   - **View Evidence** under the AI Clinical Summary or an Immediate Concern
     — opens the evidence drawer with a trend chart, confidence score, and
     sources.
   - **Acknowledge** on the critical oxygen-saturation concern.
   - Add/edit/remove an item in **Physician Plan**.
   - Switch the **Recent Changes** and **Wearable & Health Trends** period
     filters (7D / 14D / 30D / 1Y).
   - Add a note under **Doctor Notes**.
4. Click **Start Consultation** to open the consultation workspace, then
   **Generate SOAP Note** to see the mock AI draft (clearly labeled as
   requiring physician review).
5. Try the floating **Latus AI** assistant in the bottom-right corner for
   quick mock summaries.

Other patients (John Smith, Emily Davis, etc.) have lighter profile pages —
Sarah Mitchell carries the full depth of the prototype, per the brief.

## Project structure

```
src/
├── components/       # Reusable UI (patient/, dashboard/, assistant/, etc.)
├── pages/            # Route-level screens
├── data/             # Synthetic mock data
├── hooks/            # useEvidence (drawer state)
├── types/            # Shared TypeScript types
├── layouts/          # AppShell, Sidebar, Header
└── lib/              # Small style helpers (risk badge config, cn)
```

All data is fictional and synthetic. No real patient information is used.
