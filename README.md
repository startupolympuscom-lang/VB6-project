# Aurora — Auth UI

A front-end-only login/sign-up interface built with Next.js (App Router) and CSS Modules. Nothing is wired to a backend: forms validate client-side, fake a short delay, then redirect.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/login`).

## Pages

- `/login` — email/password, show/hide password, "keep me signed in", Google/GitHub buttons
- `/signup` — name, email, password with strength meter, terms checkbox
- `/forgot-password` — reset request with a "check your inbox" state
- `/dashboard` — placeholder shown after a "successful" sign-in

Tip: on `/login`, use the password `wrongpass` to see the error banner.

Supports light and dark mode automatically and collapses to a single column on mobile.
