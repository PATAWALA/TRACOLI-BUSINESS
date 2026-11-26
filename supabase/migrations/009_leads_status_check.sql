-- TRACOLI — Corrige l'envoi des demandes (/demande, /sourcer).
-- La contrainte leads_status_check de la base n'accepte encore que les anciens statuts
-- (received, researching, quoted…) alors que le site utilise les 11 nouveaux.
-- À exécuter dans Supabase > SQL Editor.

alter table public.leads drop constraint if exists leads_status_check;

-- Reprend les anciennes valeurs vers les nouvelles.
update public.leads set status = 'en_attente_paiement' where status = 'received';
update public.leads set status = 'recherche'            where status = 'researching';
update public.leads set status = 'devis'                where status = 'quoted';

alter table public.leads alter column status set default 'en_attente_paiement';

alter table public.leads add constraint leads_status_check check (status in (
  'en_attente_paiement','paiement_soumis','confirme','recherche','devis',
  'achat','expedition','en_transit','douane','livre','cloture'
));
