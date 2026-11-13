# NetConnect ISP (ispProvisioner)

A full-stack ISP network management platform. It provides a web dashboard for monitoring access points, managing subscribers, handling billing and subscriptions, viewing analytics reports, and supporting customers through tickets and notifications.

The application is a single Node.js/Express server that serves both the REST API and the React client. Data is held in an in-memory store by default, so it runs without a database.

## Features

- **Dashboard** — KPI cards (active users, bandwidth, revenue, open tickets) plus bandwidth and revenue charts and recent activity.
- **User Management** — Searchable/filterable subscriber table with plan, status, device count, and actions.
- **Access Points** — Grid and interactive map views of APs, with status, uptime, signal strength, bandwidth, connected users, and per-AP details.
- **Billing & Subscriptions** — Subscription plan cards, plan creation dialog, transaction history, and revenue metrics.
- **Reports & Analytics** — Revenue, user activity, bandwidth, and payment-method charts with date range selection and export.
- **Support** — Support ticket list with priority/status filters and a notification composer with delivery history.
- **Role-based access control** — Five roles (`super_admin`, `network_admin`, `billing_admin`, `support_agent`, `customer`) gate navigation and pages.
- **Theming** — Light/dark theme toggle.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix), TanStack Query, Recharts, Leaflet / react-leaflet, Wouter, Framer Motion

**Backend:** Node.js, Express, TypeScript (tsx), Drizzle ORM (PostgreSQL schema/migrations)

**Database (optional):** PostgreSQL via `@neondatabase/serverless` / Drizzle — only needed if you wire up persistent storage; the running app uses an in-memory store.

## Getting Started

### Prerequisites

- Node.js 20+ (tested with 26.x)
- npm 10+

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The server starts on `http://localhost:5000` (override with the `PORT` environment variable). It serves both the API and the client with Vite HMR.

### Build for production

```bash
npm run build
npm run start
```

`npm run build` compiles the client into `dist/public` and bundles the server into `dist/index.js`. `npm run start` runs the production bundle.

### Type check

```bash
npm run check
```

## Demo Accounts

Log in at `http://localhost:5000/login` with any of these (password equals username):

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin` | Super Admin |
| `network` | `network` | Network Admin |
| `billing` | `billing` | Billing Admin |
| `support` | `support` | Support Agent |

## Role-Based Access

| Page | Allowed roles |
| --- | --- |
| Dashboard | All authenticated users |
| User Management | `super_admin`, `network_admin` |
| Access Points | `super_admin`, `network_admin` |
| Billing | `super_admin`, `billing_admin` |
| Reports | `super_admin`, `billing_admin`, `network_admin` |
| Support | `super_admin`, `support_agent` |

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/access-points` | List all access points |
| `GET` | `/api/customers` | List all customers |

## Database (optional)

The runtime uses an in-memory store (`server/storage.ts`), so no database is required to run or build. A Drizzle schema and migrations are included for a future persistent backend:

```bash
# requires DATABASE_URL to be set
DATABASE_URL=postgres://user:pass@host:5432/db npm run db:push
```

## Project Structure

```
ispProvisioner/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # UI components (shadcn/ui + app components)
│       ├── contexts/       # Auth and theme contexts
│       ├── pages/          # Route pages
│       └── lib/            # Utilities and query client
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # In-memory data store
│   └── vite.ts             # Vite dev/static serving
├── shared/                 # Shared Drizzle schema and types
├── migrations/             # Drizzle migrations
├── package.json
└── vite.config.ts
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server (Express + Vite) on port 5000 |
| `npm run build` | Build client and bundle server |
| `npm run start` | Run production bundle |
| `npm run check` | TypeScript type check |
| `npm run db:push` | Push Drizzle schema to PostgreSQL (requires `DATABASE_URL`) |

## Notes

- Most page data is mock/static data; only Access Points and Customers are fetched from the API.
- Authentication is client-side mock auth (credentials above); there is no real backend auth endpoint yet.
- The default port is `5000` (configurable via `PORT`).
