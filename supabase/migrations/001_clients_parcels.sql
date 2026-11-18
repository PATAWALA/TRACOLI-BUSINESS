-- TRACOLI — Clients & colis (suivi individuel)
-- À exécuter UNE fois dans Supabase > SQL Editor.
-- Les tables sont protégées par RLS sans politique publique :
-- seules les routes API serveur (service_role) y accèdent.

create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,             -- code de suivi communiqué au client (TRC-2026-0001)
  name        text not null,
  city        text,
  country     text,
  whatsapp    text,
  email       text,
  notes       text,
  source      text not null default 'manual',   -- manual | import | site
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.parcels (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid not null references public.clients(id) on delete cascade,
  matricule          text not null unique,      -- TRC-2026-0001-01 (étiquette physique)
  mode               text not null default 'a_preciser'
                       check (mode in ('maritime','aerien','a_preciser')),
  status             text not null default 'en_agence'
                       check (status in ('en_agence','expedie','en_transit','douane','livre')),
  description        text,                      -- contenu libre : "2 cartons vêtements"
  external_code      text,                      -- code Alibaba / 1688 / autre (en MAJUSCULES)
  external_platform  text,
  expected_ship_date date,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists public.parcel_events (
  id          uuid primary key default gen_random_uuid(),
  parcel_id   uuid not null references public.parcels(id) on delete cascade,
  status      text not null,
  note        text,
  created_at  timestamptz not null default now()
);

create index if not exists parcels_client_idx   on public.parcels(client_id);
create index if not exists parcels_external_idx on public.parcels(external_code);
create index if not exists events_parcel_idx    on public.parcel_events(parcel_id, created_at);

alter table public.clients       enable row level security;
alter table public.parcels       enable row level security;
alter table public.parcel_events enable row level security;
