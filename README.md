# Google OAuth — Social Sign-In

Add Google sign-in to a React app using Supabase OAuth for social authentication.

## What You'll Learn
- OAuth flow and how it works
- supabase.auth.signInWithOAuth for social login
- Handling OAuth callback and redirects
- Accessing user profile from Google
- Provider configuration in Supabase
- Token management and session persistence

## Tech Stack
- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

## Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/LoisBN/fpp-google-oauth.git
cd fpp-google-oauth

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env
# Add your Supabase URL and anon key to .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Project Structure

```
fpp-google-oauth/
├── app/
│   ├── routes/
│   │   ├── home.tsx          # Google sign-in button
│   │   ├── callback.tsx      # OAuth redirect handler
│   │   ├── profile.tsx       # User profile display
│   │   └── routes.ts         # Route definitions
│   └── lib/
│       └── supabase.ts       # Supabase client setup
├── .env.example
├── package.json
└── README.md
```

## Exercise Tasks

1. **Configure Google OAuth** — Set up credentials in Google Cloud Console and Supabase dashboard
2. **Implement signInWithOAuth** — Create button that calls supabase.auth.signInWithOAuth
3. **Handle callback** — Create callback route to handle OAuth redirect
4. **Display Google profile** — Show user's name and profile picture from Google
5. **Implement signout** — Add logout button for OAuth session

## Hints

- Set up in Supabase → Authentication → Providers → Google
- Need Google Cloud Console project with OAuth 2.0 credentials (Web application type)
- Redirect URL must match both Google and Supabase settings
- OAuth call: `const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/callback' } })`
- Callback route handles the OAuth redirect and extracts user data
- User profile accessible via: `const { data: { user } } = await supabase.auth.getUser()`
- User.user_metadata contains profile info from Google

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
