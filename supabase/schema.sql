-- =============================================================================
-- Kivens Arts and Crafts — database schema
-- =============================================================================
-- HOW TO USE THIS FILE
--   1. Create a free project at https://supabase.com
--   2. Open the project, go to "SQL Editor" in the left sidebar
--   3. Paste this whole file in and press Run
--   4. Copy the Project URL and the anon key from Settings → API into .env.local
--
-- Safe to run more than once.
-- =============================================================================

-- ----------------------------------------------------------------- categories
create table if not exists public.categories (
  slug        text primary key,
  name        text not null,
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------------- products
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  category    text not null references public.categories (slug) on update cascade,
  summary     text not null default '',
  story       text[] not null default '{}',
  materials   text,
  dimensions  text,
  finish      text,
  lead_time   text,
  price       numeric,                      -- leave null for "Price on request"
  currency    text not null default 'XAF',
  year        integer,
  featured    boolean not null default false,
  available   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured) where featured;

-- ------------------------------------------------------------- product images
create table if not exists public.product_images (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  src        text not null,                 -- "/images/products/x.jpg" or a full URL
  alt        text not null default '',
  kind       text not null default 'scene', -- 'cutout' (on white) | 'scene'
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_images_kind_check check (kind in ('cutout', 'scene'))
);

create index if not exists product_images_product_idx on public.product_images (product_id);

-- ------------------------------------------------------------------ enquiries
create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  piece        text,                        -- slug of the piece, if any
  message      text not null,
  source       text not null default 'website',
  handled      boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);

-- --------------------------------------------------------- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY
-- The catalogue is public to read. Enquiries can be created by anyone but read
-- by nobody through the API — you read them in the Supabase dashboard.
-- Writing products is done from the dashboard too (service role bypasses RLS).
-- =============================================================================

alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.enquiries      enable row level security;

drop policy if exists "categories are public" on public.categories;
create policy "categories are public"
  on public.categories for select using (true);

drop policy if exists "available products are public" on public.products;
create policy "available products are public"
  on public.products for select using (available);

drop policy if exists "product images are public" on public.product_images;
create policy "product images are public"
  on public.product_images for select using (true);

drop policy if exists "anyone can send an enquiry" on public.enquiries;
create policy "anyone can send an enquiry"
  on public.enquiries for insert with check (true);

-- =============================================================================
-- SEED — the four categories the site expects
-- =============================================================================

insert into public.categories (slug, name, description, sort_order) values
  ('furniture',   'Furniture',   'Seating, tables and case pieces, built to be used every day for a lifetime.', 1),
  ('sculpture',   'Sculpture',   'Carved forms that exist for their own sake — figurative and abstract.',       2),
  ('homeware',    'Homeware',    'Bowls, boards and smaller turned and carved objects for the table.',          3),
  ('restoration', 'Restoration', 'Bringing damaged and inherited pieces back into daily use.',                  4)
on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description,
      sort_order = excluded.sort_order;
