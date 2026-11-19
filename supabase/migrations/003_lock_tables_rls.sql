-- TRACOLI — Verrouillage des tables (RLS)
-- À EXÉCUTER APRÈS avoir déployé la version du site où toutes les pages admin passent par l'API.
-- Le site n'utilise plus la clé publique (anon) pour lire leads / orders / etc. :
-- tout passe par des routes serveur (service_role, qui ignore la RLS).
-- Sans politique, RLS activée = personne côté navigateur ne peut lire ni écrire ces tables.
--
-- Avant d'exécuter, regardez ce qui existe :
--   select tablename, policyname, cmd, roles from pg_policies where schemaname = 'public';

alter table if exists public.leads          enable row level security;
alter table if exists public.orders         enable row level security;
alter table if exists public.products       enable row level security;
alter table if exists public.email_captures enable row level security;
alter table if exists public.payment_methods enable row level security;
alter table if exists public.shipping_rates enable row level security;

-- Supprime d'éventuelles politiques ouvertes à "anon" sur les tables sensibles :
-- (décommentez et adaptez après avoir listé les politiques ci-dessus)
-- drop policy if exists "<nom de la politique>" on public.leads;

-- Tables encore lues directement par les pages admin avec la session connectée :
-- users (page Paramètres) et partners (page Partenaires) → réservées aux utilisateurs connectés.
alter table if exists public.users    enable row level security;
alter table if exists public.partners enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'users' and policyname = 'admin_read_users') then
    create policy admin_read_users on public.users for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'partners' and policyname = 'admin_all_partners') then
    create policy admin_all_partners on public.partners for all to authenticated using (true) with check (true);
  end if;
end $$;

-- Rappel : dans Supabase > Authentication > Providers > Email, désactivez "Allow new users to sign up",
-- sinon n'importe qui peut créer un compte "authenticated".
