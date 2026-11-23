-- TRACOLI — Code groupé : un seul code pour plusieurs colis d'un même client.
-- À exécuter UNE fois dans Supabase > SQL Editor, AVANT de déployer la nouvelle version du site.
--
-- • parcels.group_code : code partagé par les colis d'un lot (nullable, NON unique).
-- • Les codes individuels (matricule) restent inchangés et continuent de fonctionner.

alter table public.parcels add column if not exists group_code text;
create index if not exists parcels_group_code_idx on public.parcels (group_code) where group_code is not null;

select count(*) as colis, count(group_code) as colis_en_lot from public.parcels;
