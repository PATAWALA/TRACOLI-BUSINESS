-- TRACOLI — Import de la liste d'attente du 15 novembre 2026 (21 clients, 80 colis)
-- À exécuter APRÈS 001_clients_parcels.sql, une seule fois, dans Supabase > SQL Editor.
-- Codes clients : TRC-2026-1001 à TRC-2026-1021 / matricules : TRC-2026-1001-01, -02…
-- Rejouable sans doublon (on conflict do nothing).

with src(code, name, city, country, cnt, mode) as (values
  ('TRC-2026-1001','Nad Business',    null,         'Burundi', 1,  'maritime'),
  ('TRC-2026-1002','Grady',           'Uvira',      'RDC',     1,  'maritime'),
  ('TRC-2026-1003','Marie G',         null,         'Burundi', 1,  'maritime'),
  ('TRC-2026-1004','Chance',          null,         'RDC',     4,  'a_preciser'),
  ('TRC-2026-1005','Dav Business',    'Bukavu',     'RDC',     2,  'maritime'),
  ('TRC-2026-1006','Malipo',          'Kalemie',    'RDC',     3,  'aerien'),
  ('TRC-2026-1007','Maman Justine',   'Kinshasa',   'RDC',     4,  'a_preciser'),
  ('TRC-2026-1008','Antoinette Eliya','Bujumbura',  'Burundi', 1,  'maritime'),
  ('TRC-2026-1009','Fraternité M',    'Bujumbura',  'Burundi', 1,  'maritime'),
  ('TRC-2026-1010','Espoir S',        'Uvira',      'RDC',     2,  'maritime'),
  ('TRC-2026-1011','Michel MB',       'Bujumbura',  'Burundi', 1,  'maritime'),
  ('TRC-2026-1012','Bwessa Divine',   'Kinshasa',   'RDC',     2,  'a_preciser'),
  ('TRC-2026-1013','Richard',         'Goma',       'RDC',     2,  'maritime'),
  ('TRC-2026-1014','Da Safi',         'Uvira',      'RDC',     3,  'maritime'),
  ('TRC-2026-1015','Jospin',          'Kolwezi',    'RDC',     7,  'aerien'),
  ('TRC-2026-1016','Masoka',          'Butembo',    'RDC',     2,  'maritime'),
  ('TRC-2026-1017','Jacques',         'Butembo',    'RDC',     11, 'maritime'),
  ('TRC-2026-1018','Daplogistic',     'Kinshasa',   'RDC',     23, 'maritime'),
  ('TRC-2026-1019','AKC Logistics',   'Kinshasa',   'RDC',     5,  'aerien'),
  ('TRC-2026-1020','Da Francine',     'Lubumbashi', 'RDC',     3,  'aerien'),
  ('TRC-2026-1021','Gracy Business',  'Goma',       'RDC',     1,  'maritime')
),
new_clients as (
  insert into public.clients (code, name, city, country, source)
  select code, name, city, country, 'import' from src
  on conflict (code) do nothing
  returning id, code
),
new_parcels as (
  insert into public.parcels (client_id, matricule, mode, status)
  select c.id,
         c.code || '-' || lpad(n::text, 2, '0'),
         s.mode,
         'en_agence'
  from new_clients c
  join src s on s.code = c.code
  cross join lateral generate_series(1, s.cnt) as n
  returning id
)
insert into public.parcel_events (parcel_id, status, note)
select id, 'en_agence', 'Colis enregistré' from new_parcels;

-- Vérification : doit afficher 21 clients et 80 colis
select (select count(*) from public.clients where source = 'import') as clients,
       (select count(*) from public.parcels p join public.clients c on c.id = p.client_id
         where c.code between 'TRC-2026-1001' and 'TRC-2026-1021') as colis;
