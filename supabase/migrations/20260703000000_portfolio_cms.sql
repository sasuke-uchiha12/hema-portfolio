create extension if not exists pgcrypto;

create table if not exists public.profile (
  id integer primary key default 1 check (id = 1),
  identity jsonb not null,
  hero_stats jsonb not null default '[]'::jsonb,
  hero_image jsonb not null,
  about jsonb not null,
  social jsonb not null,
  tech_stack jsonb not null,
  footer_tagline text not null,
  footer_credit text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  image text,
  alt text not null,
  aspect text not null check (aspect in ('16/9', '4/3')),
  category text not null,
  category_icon text not null,
  title text not null,
  description text not null,
  year text,
  details text,
  highlights text[] not null default '{}',
  tech text[] not null default '{}',
  link text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_order_idx on public.projects (sort_order);
create index if not exists projects_featured_sort_order_idx on public.projects (featured, sort_order);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  date text not null,
  reading_time text not null,
  tags text[] not null default '{}',
  cover_image text,
  content text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_sort_order_idx on public.blog_posts (published, sort_order);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  role text not null,
  description text not null,
  type text not null check (type in ('education', 'work')),
  current boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists experience_sort_order_idx on public.experience (sort_order);
create unique index if not exists experience_year_role_key on public.experience (year, role);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  date text not null,
  url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists certifications_sort_order_idx on public.certifications (sort_order);
create unique index if not exists certifications_title_issuer_key on public.certifications (title, issuer);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.experience enable row level security;
alter table public.certifications enable row level security;

grant usage on schema public to anon, authenticated;

grant select on table public.profile, public.projects, public.experience, public.certifications to anon;
grant select, insert, update, delete on table
  public.profile,
  public.projects,
  public.blog_posts,
  public.experience,
  public.certifications
to authenticated;
grant select on table public.blog_posts to anon;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['profile', 'projects', 'experience', 'certifications']
  loop
    execute format('drop policy if exists "Public can read %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Public can read %s" on public.%I for select to anon, authenticated using (true)',
      table_name,
      table_name
    );
    execute format('drop policy if exists "Authenticated can insert %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated can insert %s" on public.%I for insert to authenticated with check (true)',
      table_name,
      table_name
    );
    execute format('drop policy if exists "Authenticated can update %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated can update %s" on public.%I for update to authenticated using (true) with check (true)',
      table_name,
      table_name
    );
    execute format('drop policy if exists "Authenticated can delete %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Authenticated can delete %s" on public.%I for delete to authenticated using (true)',
      table_name,
      table_name
    );
  end loop;
end $$;

drop policy if exists "Published blog posts are public" on public.blog_posts;
create policy "Published blog posts are public"
on public.blog_posts for select
to anon
using (published = true);

drop policy if exists "Authenticated can read all blog posts" on public.blog_posts;
create policy "Authenticated can read all blog posts"
on public.blog_posts for select
to authenticated
using (true);

drop policy if exists "Authenticated can insert blog posts" on public.blog_posts;
create policy "Authenticated can insert blog posts"
on public.blog_posts for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update blog posts" on public.blog_posts;
create policy "Authenticated can update blog posts"
on public.blog_posts for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete blog posts" on public.blog_posts;
create policy "Authenticated can delete blog posts"
on public.blog_posts for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read images" on storage.objects;
create policy "Public can read images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'images');

drop policy if exists "Authenticated can upload images" on storage.objects;
create policy "Authenticated can upload images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'images');

drop policy if exists "Authenticated can update images" on storage.objects;
create policy "Authenticated can update images"
on storage.objects for update
to authenticated
using (bucket_id = 'images')
with check (bucket_id = 'images');

drop policy if exists "Authenticated can delete images" on storage.objects;
create policy "Authenticated can delete images"
on storage.objects for delete
to authenticated
using (bucket_id = 'images');
