# CareCompass

> AI-powered healthcare triage and clinic navigation for Kenya.

CareCompass helps patients understand their symptoms and find the right level of care — pharmacy, clinic, or emergency room — in seconds. The platform combines an AI triage engine with a real-time directory of healthcare facilities, all optimised for the Kenyan healthcare context.

---

## Features

- **AI Symptom Checker** — multi-step triage flow (profile → symptoms → AI chat) with clinician-verified response logic
- **Clinic Finder** — searchable directory with live wait times, distance, cost range, and verified badges
- **Emergency Routing** — prominent 999 callouts and an emergency information page with Nairobi-specific contacts
- **Progressive Web App** — installable on mobile via `next-pwa`, works offline for static content
- **Full content site** — 20+ pages covering legal, support, blog, API docs, careers, and partnerships
- **Responsive** — fully tested across mobile, tablet, and desktop breakpoints

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 with custom design tokens |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| UI Primitives | Radix UI (Dialog, Select, Tabs, Progress) |
| AI Backend | Anthropic Claude API (via `/api/triage`) |
| Database / Auth | Supabase |
| Maps | SVG-rendered map (no external dependency); Mapbox token ready |
| PWA | next-pwa |

---

## Project Structure

```
carecompass/
├── app/
│   ├── (main)/               # Public-facing pages (Navbar + Footer layout)
│   │   ├── page.tsx          # Landing page
│   │   ├── check/            # AI triage flow
│   │   ├── results/          # Triage results + clinic list
│   │   ├── clinics/          # Clinic directory + [id] detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── blog/
│   │   ├── careers/
│   │   ├── docs/             # API documentation
│   │   ├── emergency/
│   │   ├── help/
│   │   ├── partners/
│   │   ├── press/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── disclaimer/
│   │   ├── accessibility/
│   │   ├── report/
│   │   └── learn/            # Symptoms A–Z
│   ├── admin/                # Internal admin dashboard
│   ├── api/
│   │   └── triage/route.ts   # POST /api/triage — Claude API integration
│   ├── globals.css
│   └── layout.tsx            # Root layout with metadata + favicon
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/             # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── TriageSection.tsx
│   │   ├── NearbySection.tsx
│   │   └── TrustSection.tsx
│   └── ui/
│       └── MapPlaceholder.tsx  # SVG clinic map with interactive pins
│
├── lib/
│   ├── data.ts               # Placeholder clinics, symptoms, admin stats
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
│
├── types/
│   └── index.ts              # Shared TypeScript types
│
├── public/
│   ├── HeroCare bg.png       # Hero background image
│   ├── favicon.svg           # SVG favicon (cross + circle logo)
│   └── manifest.json         # PWA manifest
│
├── .env.example              # Environment variable template
├── tailwind.config.js        # Design tokens (colours, typography, spacing)
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+ (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-org/carecompass.git
cd carecompass

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your API keys (see Environment Variables below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and populate the following:

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Claude API key for AI triage (`/api/triage`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Optional | Mapbox token (for future live map integration) |
| `NEXT_PUBLIC_APP_URL` | Optional | Base URL — defaults to `http://localhost:3000` |
| `NEXT_PUBLIC_APP_ENV` | Optional | `development` or `production` |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secret keys in `NEXT_PUBLIC_` variables.

---

## Available Scripts

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # Run ESLint
npx tsc --noEmit # Type-check without emitting files
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with Hero, Triage cards, Nearby clinics, Trust section |
| `/check` | 3-step AI triage: Profile → Symptoms → AI chat assessment |
| `/results` | Triage results with urgency level and matched nearby clinics |
| `/clinics` | Full clinic directory with search and filters |
| `/clinics/[id]` | Individual clinic detail page |
| `/about` | About CareCompass — story, values, team |
| `/contact` | Contact form + office details |
| `/blog` | Health blog with clinician-authored articles |
| `/careers` | Open roles and culture |
| `/docs` | API documentation for clinic / triage integration |
| `/partners` | Partner clinic application form and pricing tiers |
| `/press` | Press kit and media contacts |
| `/emergency` | Emergency contacts and first-aid guidance |
| `/help` | Searchable FAQ / Help Center |
| `/report` | Report inaccurate clinic data |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/disclaimer` | Medical Disclaimer |
| `/accessibility` | Accessibility Statement |
| `/learn` | Symptoms A–Z health library |

---

## Design System

Colours and typography are defined as CSS custom properties in `tailwind.config.js` and consumed as Tailwind utility classes throughout the app.

**Key tokens:**

| Token | Value | Usage |
|---|---|---|
| `primary` | `#00478d` | Brand blue — buttons, links, accents |
| `primary-fixed-dim` | `#a9c7ff` | Light blue for dark backgrounds |
| `blue-400` | `#60a5fa` | Hero headline (visible on dark overlay) |
| `ink-dark` | `#1C1C1C` | Primary text |
| `on-surface-variant` | `#6B7280` | Secondary / muted text |
| `surface-container-low` | `#faf2ea` | Page backgrounds, cards |
| `error` | `#B91C1C` | Emergency alerts |

**Section layout:** All pages use the `.section-container` utility class (defined in `globals.css`) which applies `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## API

### `POST /api/triage`

Accepts symptom data and returns a triage recommendation via the Claude API.

**Request body:**
```json
{
  "profile": { "age": 34, "sex": "Female", "conditions": ["Diabetes"] },
  "symptoms": ["Chest pain", "Difficulty breathing"],
  "messages": [{ "role": "user", "content": "Just started today" }]
}
```

**Response:**
```json
{
  "urgency": "urgent",
  "message": "Based on your symptoms...",
  "actions": ["Seek care within 2–4 hours", "..."]
}
```

---

## Deployment

### Vercel (recommended)

```bash
# Push to GitHub, then import the repo in Vercel.
# Add all .env.local variables to Vercel's Environment Variables dashboard.
vercel deploy
```

### Docker / self-hosted

```bash
npm run build
npm run start
# Runs on port 3000 by default
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a pull request

Please run `npx tsc --noEmit` and `npm run lint` before submitting a PR.

---

## License

Proprietary — © 2026 CareCompass Kenya Ltd. All rights reserved.

For partnership or licensing enquiries contact [hello@carecompass.ke](mailto:hello@carecompass.ke).
