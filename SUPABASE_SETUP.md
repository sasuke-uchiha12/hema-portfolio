# Supabase Setup

## 1. Create the project

Create a Supabase project and copy:

- Project URL -> `VITE_SUPABASE_URL`
- Anon/public key -> `VITE_SUPABASE_ANON_KEY`

For local development, create `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Add the same two variables in Vercel project settings.

## 2. Run schema and seed

Open the Supabase SQL editor and run:

1. `supabase/migrations/20260703000000_portfolio_cms.sql`
2. `supabase/seed.sql`

The migration creates the content tables, enables RLS, grants Data API access, and creates a public `images` Storage bucket for admin uploads.

## 3. Create the owner login

In Supabase Dashboard:

1. Go to Authentication -> Providers and keep Email enabled.
2. Go to Authentication -> Sign In / Providers or Auth settings and disable public sign-ups.
3. Create exactly one owner user under Authentication -> Users.

Use that email/password at `/admin/login`.

## 4. GitHub keep-alive

Add these repository secrets for `.github/workflows/supabase-keepalive.yml`:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The workflow runs every 3 days and performs a tiny read from `profile` to reduce free-tier idle pausing.

## 5. Safety notes

- Never add the `service_role` key to Vite, Vercel public env vars, or frontend code.
- RLS is enabled on all public tables.
- Blog posts are public only when `published = true`; authenticated admin users can read drafts.
