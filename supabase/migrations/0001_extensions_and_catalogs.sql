-- musikate · 0001
-- Extensiones y catálogos base.

create extension if not exists citext;
create extension if not exists pg_trgm;

do $$
begin
  create type public.skill_level as enum ('beginner', 'intermediate', 'advanced');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.instruments (
  id smallint generated always as identity primary key,
  slug text not null unique,
  name text not null
);

create table if not exists public.genres (
  id smallint generated always as identity primary key,
  slug text not null unique,
  name text not null
);

insert into public.instruments (slug, name) values
  ('guitarra', 'Guitarra'),
  ('bajo', 'Bajo'),
  ('bateria', 'Batería'),
  ('voz', 'Voz'),
  ('piano', 'Piano'),
  ('teclado', 'Teclado'),
  ('sintetizador', 'Sintetizador'),
  ('violin', 'Violín'),
  ('viola', 'Viola'),
  ('violonchelo', 'Violonchelo'),
  ('contrabajo', 'Contrabajo'),
  ('flauta', 'Flauta'),
  ('saxo', 'Saxo'),
  ('trompeta', 'Trompeta'),
  ('trombon', 'Trombón'),
  ('clarinete', 'Clarinete'),
  ('percusion', 'Percusión'),
  ('armonica', 'Armónica'),
  ('ukelele', 'Ukelele'),
  ('otros', 'Otros')
on conflict (slug) do nothing;

insert into public.genres (slug, name) values
  ('rock', 'Rock'),
  ('pop', 'Pop'),
  ('indie', 'Indie'),
  ('punk', 'Punk'),
  ('metal', 'Metal'),
  ('hip-hop', 'Hip hop'),
  ('rap', 'Rap'),
  ('trap', 'Trap'),
  ('cumbia', 'Cumbia'),
  ('reggae', 'Reggae'),
  ('ska', 'Ska'),
  ('jazz', 'Jazz'),
  ('blues', 'Blues'),
  ('funk', 'Funk'),
  ('soul', 'Soul'),
  ('electronica', 'Electrónica'),
  ('house', 'House'),
  ('techno', 'Techno'),
  ('folclore', 'Folclore'),
  ('tango', 'Tango'),
  ('murga', 'Murga'),
  ('candombe', 'Candombe'),
  ('clasica', 'Clásica'),
  ('experimental', 'Experimental'),
  ('otros', 'Otros')
on conflict (slug) do nothing;
