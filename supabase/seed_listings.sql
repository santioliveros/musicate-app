-- musicate! · seed de avisos para desarrollo
-- Ejecutar después de tener al menos un perfil (después del onboarding).
-- Pensado para una tabla listings vacía: crea 3 avisos del primer perfil.
-- Si ya hay avisos propios, el trigger de límite puede rechazar alguno.

insert into public.listings (
  author_id, type, title, description, instrument_id, genre_id, zone, band_name
)
select
  p.id,
  'looking_for_member',
  'Busco baterista para banda indie',
  'Tenemos temas propios y ensayamos los jueves en el Centro. Buscamos una persona con ganas de sumarse a un proyecto estable.',
  (select id from public.instruments where slug = 'bateria'),
  (select id from public.genres where slug = 'indie'),
  'Centro',
  'Los Últimos'
from public.profiles p
where not exists (
  select 1 from public.listings l where l.title = 'Busco baterista para banda indie'
)
order by p.created_at
limit 1;

insert into public.listings (
  author_id, type, title, description, instrument_id, genre_id, zone, band_name
)
select
  p.id,
  'offering_lessons',
  'Clases de guitarra para principiantes',
  'Doy clases personalizadas de guitarra y armonía. Primera clase de prueba sin costo. Zona Pocitos o virtual.',
  (select id from public.instruments where slug = 'guitarra'),
  (select id from public.genres where slug = 'rock'),
  'Pocitos',
  null
from public.profiles p
where not exists (
  select 1 from public.listings l where l.title = 'Clases de guitarra para principiantes'
)
order by p.created_at
limit 1;

insert into public.listings (
  author_id, type, title, description, instrument_id, genre_id, zone, band_name
)
select
  p.id,
  'looking_for_producer',
  'Busco productor para EP de cuatro temas',
  'Tenemos las maquetas listas y queremos grabar un EP. Buscamos alguien que pueda producir y mezclar en Montevideo.',
  null,
  (select id from public.genres where slug = 'indie'),
  'Remoto',
  null
from public.profiles p
where not exists (
  select 1 from public.listings l where l.title = 'Busco productor para EP de cuatro temas'
)
order by p.created_at
limit 1;
