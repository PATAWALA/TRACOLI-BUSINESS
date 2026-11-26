-- TRACOLI — Newsletter : une adresse e-mail ne peut exister qu'UNE seule fois.
-- À exécuter UNE fois dans Supabase > SQL Editor.
--
-- 1. Supprime les doublons éventuels déjà présents (on garde la plus ancienne inscription).
-- 2. Verrouille la base : impossible d'enregistrer deux fois le même e-mail,
--    quelle que soit la casse (Test@x.com = test@x.com).

delete from public.email_captures a
using public.email_captures b
where lower(trim(a.email)) = lower(trim(b.email))
  and (a.created_at, a.id) > (b.created_at, b.id);

create unique index if not exists email_captures_email_unique
  on public.email_captures (lower(trim(email)));
