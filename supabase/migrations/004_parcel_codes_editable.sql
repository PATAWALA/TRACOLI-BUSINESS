-- TRACOLI — Codes de colis saisis par l'équipe (plus de codes générés par le système)
-- À exécuter UNE fois dans Supabase > SQL Editor, AVANT de déployer la nouvelle version du site.
--
-- • Chaque colis a son propre code (clients.parcels.matricule), saisi/modifiable dans l'admin.
-- • Le client n'a plus de code : on suit un colis par SON code.
-- • Les codes générés automatiquement jusqu'ici (TRC-2026-xxxx…) sont effacés ;
--   les clients et leurs colis restent, il suffit de saisir le code de chaque colis.

alter table public.clients alter column code drop not null;
alter table public.parcels alter column matricule drop not null;

update public.clients set code = null;
update public.parcels set matricule = null;

-- Les contraintes UNIQUE existantes restent : un code ne peut pas servir à deux colis,
-- et plusieurs colis « sans code » (NULL) sont autorisés.

select (select count(*) from public.clients) as clients,
       (select count(*) from public.parcels) as colis,
       (select count(*) from public.parcels where matricule is null) as colis_sans_code;
