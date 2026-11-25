-- TRACOLI — Boutique (guides, ebooks, formations) gérée depuis le tableau de bord (Admin > Boutique).
-- À exécuter UNE fois dans Supabase > SQL Editor.
--
-- • resources : une ligne par livre / guide / formation.
-- • Tant que la table est VIDE, le site affiche les exemples intégrés.
--   Dès qu'une ligne existe (même masquée), seuls vos vrais livres s'affichent.
-- • Les couvertures et PDF gratuits sont stockés dans le bucket « files » (le même que la galerie).
-- • Les PDF payants ne sont PAS publiés : le vendeur les envoie sur WhatsApp après paiement.

create table if not exists public.resources (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  description       text not null,                       -- résumé court (carte)
  long_description  text not null default '',            -- présentation complète (page détail)
  type              text not null default 'ebook'
                      check (type in ('guide', 'ebook', 'formation', 'template')),
  access            text not null default 'free'
                      check (access in ('free', 'premium')),  -- free = Télécharger, premium = Commander
  price             text,                                -- ex : « 15 USD » (payant uniquement)
  level             text not null default 'Tous niveaux',
  meta              text,                                -- ex : « 28 pages · PDF »
  cover_url         text,                                -- image de couverture
  file_url          text,                                -- PDF gratuit hébergé sur le site
  link_url          text,                                -- ou lien externe (Drive, YouTube…)
  outcomes          text[] not null default '{}',        -- « Ce que vous allez apprendre »
  audience          text[] not null default '{}',        -- « Pour qui ? »
  seller_name       text,                                -- vendeur (vide = TRACOLI)
  seller_whatsapp   text,                                -- numéro WhatsApp du vendeur, chiffres seuls (vide = TRACOLI)
  position          integer not null default 0,
  published         boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists resources_position_idx on public.resources (position, created_at desc);

-- Accès uniquement par les routes serveur du site (clé service_role) : pas d'accès direct navigateur.
alter table public.resources enable row level security;

select count(*) as livres from public.resources;
