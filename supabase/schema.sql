-- RD Travel — /captura landing: schema + RLS policies
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
--
-- After running it:
-- 1. Create your admin user in Authentication → Users → Add user (email + password).
-- 2. Copy that user's UID and run:
--      insert into public.admins (user_id) values ('paste-the-uid-here');
--    Only users listed in public.admins can log into /admin or read leads.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- admins: allowlist of auth.users who can access /admin
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "users can check their own admin status"
  on public.admins
  for select
  to authenticated
  using (user_id = auth.uid());

-- No insert/update/delete policy for anyone: only the service-role key
-- (used from trusted server code, never shipped to the browser) can write
-- to this table. Manage admins from the SQL editor.

-- ---------------------------------------------------------------------------
-- leads: every submission from the /captura form
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  page_path text,
  user_agent text,
  ip_hash text
);

create index if not exists leads_ip_hash_created_at_idx
  on public.leads (ip_hash, created_at desc);

alter table public.leads enable row level security;

create policy "admins can read leads"
  on public.leads
  for select
  to authenticated
  using (exists (select 1 from public.admins where admins.user_id = auth.uid()));

-- No insert/update/delete policy for anon or authenticated roles on purpose:
-- the public lead form writes through a Server Action using the service-role
-- key (src/lib/supabase/admin.ts), which bypasses RLS. This means nobody can
-- read or write leads through the public API keys — not even blind inserts.

-- ---------------------------------------------------------------------------
-- site_settings: singleton row editable from /admin (no redeploy needed)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1,
  headline text,
  subheadline text,
  cta_label text,
  whatsapp_number text,
  whatsapp_message text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "anyone can read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

create policy "admins can update site settings"
  on public.site_settings
  for update
  to authenticated
  using (exists (select 1 from public.admins where admins.user_id = auth.uid()))
  with check (exists (select 1 from public.admins where admins.user_id = auth.uid()));
