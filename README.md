# Google OAuth — Social Sign-In

Add Google sign-in to a React app using Supabase OAuth for social authentication.

## What You'll Learn

- OAuth flow and how it works
- `supabase.auth.signInWithOAuth` for social login
- Handling OAuth callback and redirects
- Accessing user profile from Google
- Provider configuration in Supabase

## Tech Stack

- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

---

## Exercise: Step-by-Step Instructions

> **Read each step carefully.** We tell you exactly _where_ to do each thing — your VSCode terminal, the Supabase dashboard, Google Cloud Console, a specific file, or Claude.

> **Heads up:** This exercise has more setup steps than the others because you need to configure both Google Cloud Console AND Supabase. Take your time — it's worth it!

---

### Step 1: Clone the repository

> 📍 **Where:** Your VSCode terminal (`` Ctrl + ` `` to open it)

```bash
cd ~/Desktop
git clone https://github.com/LoisBN/fpp-google-oauth.git
cd fpp-google-oauth
code .
```

---

### Step 2: Install dependencies

> 📍 **Where:** Your VSCode terminal

```bash
npm install
```

---

### Step 3: Set up your environment file

> 📍 **Where:** Your VSCode terminal

**On Mac/Linux:**
```bash
cp .env.example .env
```

**On Windows (Command Prompt):**
```bash
copy .env.example .env
```

**On Windows (PowerShell):**
```bash
Copy-Item .env.example .env
```

> 📍 **Where:** VSCode — open the `.env` file

Replace the placeholder values with your Supabase credentials:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> 💡 **Where do I find these?** Supabase dashboard → your project → **Settings** (gear icon) → **API**. Copy "Project URL" and the "anon public" key.

---

### Step 4: Create Google OAuth credentials

> 📍 **Where:** Your browser — [Google Cloud Console](https://console.cloud.google.com/)

This is the most complex setup step. Follow carefully:

**4a. Create a Google Cloud project (if you don't have one):**
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Click the project dropdown at the top → **"New Project"**
3. Name it something like "AI Code Academy" and click **"Create"**
4. Make sure your new project is selected in the dropdown

**4b. Enable the Google API:**
1. Go to **APIs & Services** → **Library** (in the left sidebar)
2. Search for **"Google Identity"** or **"Google+ API"**
3. Click on it and press **"Enable"**

**4c. Configure the OAuth consent screen:**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** and click **"Create"**
3. Fill in the required fields (app name, user support email, developer email)
4. Click **"Save and Continue"** through the remaining steps (you can skip scopes and test users for now)

**4d. Create OAuth credentials:**
1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: anything (e.g. "Supabase Auth")
5. Under **"Authorized redirect URIs"**, click **"+ Add URI"** and add:
   ```
   https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
   ```
   (Replace `YOUR-PROJECT-ID` with your actual Supabase project ID — find it in your Supabase URL)
6. Click **"Create"**
7. You'll see a popup with your **Client ID** and **Client Secret**. **Copy both** — you'll need them in the next step!

> 💡 **Ask Claude if you get lost!** Try: *"I'm trying to create Google OAuth credentials in Google Cloud Console but I'm stuck on [describe where you are]. Can you walk me through it?"*

---

### Step 5: Configure Google provider in Supabase

> 📍 **Where:** Your browser — Supabase Dashboard

1. Go to your Supabase project
2. Click **"Authentication"** (person icon) in the left sidebar
3. Click **"Providers"** in the top menu
4. Find **"Google"** in the list and click to expand it
5. Toggle it **ON** (enabled)
6. Paste your **Client ID** from Google Cloud Console
7. Paste your **Client Secret** from Google Cloud Console
8. Click **"Save"**

> 💡 **What just happened?** You connected your Supabase project to Google's authentication system. When users click "Sign in with Google", Supabase will handle the entire OAuth flow for you.

---

### Step 6: Start the app

> 📍 **Where:** Your VSCode terminal

```bash
npm run dev
```

> 📍 **Where:** Your browser

Open [http://localhost:5173](http://localhost:5173). You should see a landing page with a "Sign in with Google" button (it won't work yet until you write the code).

---

### Step 7: Implement the Google sign-in button

> 📍 **Where:** VSCode — open `app/routes/home.tsx`

Your job is to write a function that calls `supabase.auth.signInWithOAuth` when the user clicks the "Sign in with Google" button. The key part is telling Supabase to redirect back to your app after Google authenticates the user.

> 💡 **Ask Claude!** Try: *"I need to implement a 'Sign in with Google' button that calls supabase.auth.signInWithOAuth with provider 'google'. The redirect URL after login should be http://localhost:5173/callback. Show me how."*

---

### Step 8: Handle the OAuth callback

> 📍 **Where:** VSCode — open `app/routes/callback.tsx`

After Google authenticates the user, they get redirected back to your app at `/callback`. This page needs to:

1. Grab the authentication data from the URL
2. Complete the sign-in process
3. Redirect the user to the profile page

> 💡 **Ask Claude!** Try: *"I have a /callback route in React Router v7 that handles the OAuth redirect from Google. How do I extract the session from the URL hash and redirect to /profile?"*

---

### Step 9: Display the user's Google profile

> 📍 **Where:** VSCode — open `app/routes/profile.tsx`

This page should:
1. Check if the user is logged in
2. Display their Google profile info (name, email, profile picture)
3. Have a "Sign Out" button

The user's Google profile data is in `user.user_metadata` — this includes their full name, avatar URL, and email.

> 💡 **Ask Claude!** Try: *"How do I get the current user's Google profile info from supabase.auth.getUser()? I want to display their name, email, and profile picture."*

---

### Step 10: Test your work

> 📍 **Where:** Your browser — [http://localhost:5173](http://localhost:5173)

1. Click **"Sign in with Google"**
2. You should be redirected to Google's login page
3. Choose your Google account or sign in
4. You should be redirected back to your app, to the `/profile` page
5. You should see your Google name, email, and profile picture
6. Click **"Sign Out"** — you should be redirected back to the home page

> 📍 **Where:** Supabase Dashboard → Authentication → Users

Check the Authentication section — you should see your Google account listed as a user!

---

### Step 11: Commit and push your work

> 📍 **Where:** Your VSCode terminal

```bash
git add .
git commit -m "Implement Google OAuth sign-in"
git push
```

---

## Ask Claude for Help

- **"What is OAuth and how does the flow work?"** — Great for understanding the concept
- **"What's the difference between signInWithPassword and signInWithOAuth?"**
- **"I'm getting 'redirect_uri_mismatch' error"** — The redirect URL in Google Console doesn't match Supabase
- **"How do I access the user's profile picture from Google?"** — It's in `user.user_metadata.avatar_url`
- **"I'm getting this error: [paste error]. What's wrong?"**

---

## Project Structure

```
app/
├── routes/
│   ├── home.tsx          ← ⭐ Google sign-in button — implement OAuth call here!
│   ├── callback.tsx      ← ⭐ OAuth redirect handler — process the callback here!
│   └── profile.tsx       ← ⭐ User profile — show Google info and logout here!
└── lib/
    └── supabase.ts       ← Supabase client setup (no need to edit)
```

---

## Troubleshooting

**"redirect_uri_mismatch" error from Google:**
- The redirect URI in Google Cloud Console must exactly match: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`
- Check for typos, trailing slashes, or http vs https

**Google sign-in opens but then returns an error:**
- Make sure Google provider is enabled in Supabase (Step 5)
- Make sure the Client ID and Client Secret are correct
- Make sure the OAuth consent screen is configured (Step 4c)

**Profile page is blank or shows no user data:**
- Make sure your callback route is correctly processing the OAuth redirect
- Check that `supabase.auth.getUser()` is called in the loader/component
- Check the browser console (`F12` → Console) for errors

**"Access blocked: This app's request is invalid":**
- Go back to Google Cloud Console and make sure your OAuth consent screen is configured
- You may need to add yourself as a test user if the app is in "testing" mode

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
