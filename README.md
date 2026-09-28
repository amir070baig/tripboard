# TripBoard

TripBoard is a practice travel experience booking platform for discovering local experiences and multi-day trips.

This foundation includes a responsive homepage and route placeholders for experience browsing and details, guest checkout, customer bookings, and the admin area. Booking, payment, authentication, and database features are not implemented yet.

## Getting started

Requirements: Node.js and npm.

Install project dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
```

## Project structure

- `src/app/` — App Router routes, route groups, and shared styles
- `src/app/(customer)/` — customer-facing routes (group name is omitted from URLs)
- `src/app/admin/` — admin foundation
- `src/components/` — reusable presentation components
- `public/` — static assets

## Environment variables

`.env.example` lists names reserved for future database and authentication configuration. No environment values are currently required to run the starter. Keep real values in an ignored local env file and never commit secrets.

## Development notes

Before changing Next.js conventions, consult the installed guides in `node_modules/next/dist/docs/` and follow `AGENTS.md`. PostgreSQL and Prisma are planned but have not been added.
