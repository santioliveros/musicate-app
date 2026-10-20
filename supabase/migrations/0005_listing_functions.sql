-- musicate! · 0005
-- Funciones para crear y cerrar avisos de forma atómica.

create or replace function public.create_listing(
  p_type public.listing_type,
  p_title text,
  p_description text,
  p_instrument_id smallint default null,
  p_genre_id smallint default null,
  p_zone text default null,
  p_band_name text default null,
  p_contact_type text default 'whatsapp',
  p_contact_value text default null
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_listing_id uuid;
begin
  if p_contact_value is null or length(btrim(p_contact_value)) = 0 then
    raise exception 'contact_required'
      using errcode = 'P0001',
            hint = 'Agregá un contacto para que te puedan responder.';
  end if;

  insert into public.listings (
    author_id,
    type,
    title,
    description,
    instrument_id,
    genre_id,
    zone,
    band_name
  )
  values (
    auth.uid(),
    p_type,
    btrim(p_title),
    btrim(p_description),
    p_instrument_id,
    p_genre_id,
    nullif(btrim(p_zone), ''),
    nullif(btrim(p_band_name), '')
  )
  returning id into v_listing_id;

  insert into public.listing_contacts (listing_id, contact_type, contact_value)
  values (v_listing_id, p_contact_type, btrim(p_contact_value));

  return v_listing_id;
end;
$$;

create or replace function public.close_listing(p_listing_id uuid)
returns void
language sql
security invoker
set search_path = public
as $$
  update public.listings
  set status = 'closed',
      closed_at = now()
  where id = p_listing_id
    and author_id = auth.uid()
    and status = 'open';
$$;

grant execute on function public.create_listing(
  public.listing_type,
  text,
  text,
  smallint,
  smallint,
  text,
  text,
  text,
  text
) to authenticated;

grant execute on function public.close_listing(uuid) to authenticated;
