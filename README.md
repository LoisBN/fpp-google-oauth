# Google OAuth — Social Sign-In

Add "Sign in with Google" alongside email/password authentication using Supabase OAuth.

## Quick Start

**1. Fork this repo** — Click the **Fork** button at the top right of this page.

**2. Clone your fork:**
```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/fpp-google-oauth.git
cd fpp-google-oauth
npm install
```

Create `.env` with your Supabase credentials, then `npm run dev`.

**Setup required:** You need to configure Google Cloud Console and connect it to Supabase before the sign-in button works. See the exercise instructions for the full setup guide.

## Exercise Instructions

This repo is part of the **From Prompt to Production** course.

👉 **[Find the full exercise instructions on the course platform](https://aicode-academy.com)**

## Tech Stack

- React Router v7 (framework mode)
- Supabase Auth (OAuth)
- Tailwind CSS v4
- TypeScript

## Project Structure

```
app/
├── routes/
│   ├── home.tsx          ← Google sign-in button
│   ├── callback.tsx      ← OAuth redirect handler
│   └── profile.tsx       ← User profile + sign out
├── lib/
│   └── supabase.ts       ← Supabase client
└── routes.ts             ← Route configuration
```

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
