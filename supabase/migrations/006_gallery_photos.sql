-- TRACOLI — Galerie de l'accueil gérée depuis le tableau de bord (Admin > Galerie).
-- À exécuter UNE fois dans Supabase > SQL Editor.
--
-- • gallery_photos : une ligne par photo (légende, adresse de l'image, ordre, visible ou masquée).
-- • Les 5 photos déjà présentes sur le site sont ajoutées pour que vous puissiez les gérer aussi.
-- • Les nouvelles photos envoyées depuis l'admin sont stockées dans le bucket « files ».

create table if not exists public.gallery_photos (
  id          uuid primary key default gen_random_uuid(),
  caption     text not null,
  image_url   text not null,
  width       integer not null default 1200,
  height      integer not null default 900,
  position    integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Accès uniquement par les routes serveur du site (clé service_role) : pas d'accès direct navigateur.
alter table public.gallery_photos enable row level security;

insert into public.gallery_photos (caption, image_url, width, height, position)
select * from (values
  ('Chargement d''un conteneur au chariot élévateur', '/images/galerie/chargement-conteneur-chariot.webp', 735, 983, 1),
  ('Sacs à main en sachets',                           '/images/galerie/sacs-a-main.webp',                 736, 736, 2),
  ('Pesée d''un colis',                                '/images/galerie/pesee-colis.webp',                 736, 981, 3),
  ('Cartons ouverts en entrepôt',                      '/images/galerie/cartons-entrepot.webp',            720, 960, 4),
  ('Chargement d''un conteneur',                       '/images/galerie/chargement-conteneur.webp',        736, 981, 5)
) as v(caption, image_url, width, height, position)
where not exists (select 1 from public.gallery_photos);

select count(*) as photos from public.gallery_photos;
