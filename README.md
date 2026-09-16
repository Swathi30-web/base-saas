# Base — SaaS Admin Dashboard

A fully responsive admin dashboard built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router**, with a **JSON Server** backend and **role-based access control** (Admin / HR / Employee).

## Getting started

```bash
npm install

# Runs the Vite dev server AND the JSON Server API together
npm run dev:all
```

This starts:
- the React app at `http://localhost:5173`
- the JSON Server API at `http://localhost:4000`, backed by `db.json`

If you'd rather run them in two separate terminals:

```bash
npm run server   # JSON Server on :4000
npm run dev      # Vite on :5173
```

To build for production:

```bash
npm run build
npm run preview
```

> The frontend expects the API at `http://localhost:4000` by default. To point it elsewhere, set `VITE_API_URL` in a `.env` file (e.g. `VITE_API_URL=https://your-api.example.com`).

## Demo logins (role-based access control)

The API is seeded with one account per role. Use these on the `/login` screen:

| Role     | Email               | Password      | Can access                                                            |
|----------|---------------------|---------------|------------------------------------------------------------------------|
| Admin    | admin@base.com      | admin123      | Everything — Dashboard, Analytics, Invoices, Customers, Schedule, Calendar, Tasks, Messages, Notifications, Settings, **User Management** |
| HR       | hr@base.com         | hr123456      | Everything **except** Invoices and User Management                    |
| Employee | employee@base.com   | employee123   | Dashboard, Schedule, Calendar, Tasks, Messages, Notifications, Settings only |

You can also sign up a new account from `/signup` and pick a role there (this is a demo app, so self-signup lets you choose any role to try it out — in a real product you'd lock that down and only let admins promote users, which is exactly what the **User Management** page, admin-only, is for: it lets an Admin change any user's role or remove a user).

Trying to open a page your role isn't allowed to see redirects to a **403 Access Restricted** page instead of the page itself, and the sidebar only ever shows links you're allowed to click.

## How the RBAC + backend fit together

- **`db.json`** is the single source of truth for all data: `users`, `invoices`, `customers`, `schedule`, `notifications`, `people`, `tasks`, `board`, `chatContacts`, `chatMessages`. JSON Server turns this into a full REST API (`GET/POST/PATCH/DELETE /users`, `/invoices`, etc.) with zero backend code.
- **`src/api/client.js`** — a tiny fetch wrapper all pages use to talk to that API.
- **`src/context/AuthContext.jsx`** — handles login/signup/logout by querying/writing the `/users` resource on JSON Server. The only thing kept in `localStorage` is *which user id is logged in* (the session), so a page refresh doesn't log you out — no application data is ever stored in localStorage.
- **`src/components/ProtectedRoute.jsx`** — wraps routes in `App.jsx`. Not logged in → redirect to `/login`. Logged in but wrong role → redirect to `/403`.
- **`src/pages/UserManagement.jsx`** — admin-only screen to view every user and change their role or remove them.

## Pages

- `/` — Dashboard (stat cards, reports chart, analytics donut, recent orders, top products)
- `/analytics` — Product Analytics (Admin, HR)
- `/invoices`, `/invoices/new` — Invoices, backed by JSON Server (Admin only)
- `/customers` — Customer List, backed by JSON Server (Admin, HR)
- `/schedule` — Schedule List, backed by JSON Server
- `/calendar` — Calendar (Day / Week / Month / Year views)
- `/messages` — Chat, backed by JSON Server
- `/tasks` — Task Preview (List / Board / Timeline views)
- `/notifications` — Notifications, backed by JSON Server
- `/settings` — Settings — Profile tab edits your real user record via JSON Server
- `/users` — User Management (Admin only)
- `/login`, `/signup`, `/recover`, `/confirm` — Auth flow

## What's still using static demo data

To keep the dashboard's charts and kanban board visually intact, `Dashboard.jsx`, `Analytics.jsx`, and the chart/board layout bits of `Tasks.jsx` still read from `src/data/mockData.js` (stat cards, revenue chart, kanban card positions, timeline bars). These are presentation-heavy demo widgets rather than editable records. Everything a user actually creates, edits, or deletes — invoices, customers, schedule items, notifications, chat messages, and all user accounts/roles — goes through JSON Server. If you'd like those charts wired to the API too, `tasks` and `board` resources already exist in `db.json` ready to be consumed the same way the other pages do.

## Notes

- Colors, spacing and components are defined via Tailwind config (`tailwind.config.js`) and shared classes in `src/index.css` (`.btn-primary`, `.input-field`, `.card`, etc).
- Passwords are stored in plain text in `db.json` for demo purposes only — JSON Server has no authentication/hashing built in. Do not use this login setup as-is in production; swap in a real backend with hashed passwords and signed sessions/tokens before going live.
