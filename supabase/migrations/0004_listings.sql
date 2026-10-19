-- musikate · 0004
-- Avisos, contactos e intereses.

do $$
begin
  create type public.listing_type as enum (
    'looking_for_member',
    'looking_for_band',
    'looking_for_producer',
    'offering_production',
    'offering_lessons',
    'looking_for_lessons'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.listing_status as enum ('open', 'closed', 'expired');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  type public.listing_type not null,
  title text not null,
  description text not null,
  instrument_id smallint references public.instruments(id),
  genre_id smallint references public.genres(id),
  zone text,
  band_name text,
  status public.listing_status not null default 'open',
  expires_at timestamptz not null default (now() + interval '30 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz,
  constraint listing_title_len check (char_length(title) between 6 and 80),
  constraint listing_description_len check (char_length(description) between 20 and 600),
  constraint listing_band_name_len check (band_name is null or char_length(band_name) between 2 and 40)
);

create table if not exists public.listing_contacts (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  contact_type text not null check (contact_type in ('whatsapp', 'instagram', 'email')),
  contact_value text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.listing_interests (
  listing_id uuid not null references public.listings(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  message text,
  contact_type text check (contact_type in ('whatsapp', 'instagram', 'email')),
  contact_value text,
  created_at timestamptz not null default now(),
  primary key (listing_id, profile_id),
  constraint listing_interest_message_len check (message is null or char_length(message) <= 300),
  constraint listing_interest_contact_pair check (
    (contact_type is null and contact_value is null)
    or (contact_type is not null and contact_value is not null)
  )
);

create index if not exists listings_open_idx
  on public.listings (status, created_at desc);

create index if not exists listings_type_idx
  on public.listings (type, status);

create index if not exists listings_expires_idx
  on public.listings (expires_at);

create index if not exists listings_author_idx
  on public.listings (author_id, created_at desc);

create index if not exists listing_interests_listing_idx
  on public.listing_interests (listing_id, created_at desc);

drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

create or replace function public.enforce_listing_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  active_count integer;
begin
  select count(*) into active_count
  from public.listings
  where author_id = new.author_id
    and status = 'open'
    and expires_at > now();

  if active_count >= 3 then
    raise exception 'listing_limit_reached'
      using errcode = 'P0001',
            hint = 'Cerrá un aviso antes de publicar otro.';
  end if;

  return new;
end;
$$;

drop trigger if exists listings_enforce_limit on public.listings;
create trigger listings_enforce_limit
before insert on public.listings
for each row execute function public.enforce_listing_limit();

alter table public.listings enable row level security;
alter table public.listing_contacts enable row level security;
alter table public.listing_interests enable row level security;

drop policy if exists "open listings are viewable" on public.listings;
create policy "open listings are viewable"
on public.listings for select to authenticated
using (
  (status = 'open' and expires_at > now())
  or author_id = auth.uid()
);

drop policy if exists "users create their own listings" on public.listings;
create policy "users create their own listings"
on public.listings for insert to authenticated
with check (author_id = auth.uid());

drop policy if exists "users update their own listings" on public.listings;
create policy "users update their own listings"
on public.listings for update to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid());

drop policy if exists "listing contacts are private" on public.listing_contacts;
create policy "listing contacts are private"
on public.listing_contacts for select to authenticated
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_contacts.listing_id
      and l.author_id = auth.uid()
  )
  or exists (
    select 1 from public.listing_interests i
    where i.listing_id = listing_contacts.listing_id
      and i.profile_id = auth.uid()
  )
);

drop policy if exists "authors insert their listing contact" on public.listing_contacts;
create policy "authors insert their listing contact"
on public.listing_contacts for insert to authenticated
with check (
  exists (
    select 1 from public.listings l
    where l.id = listing_id and l.author_id = auth.uid()
  )
);

drop policy if exists "authors update their listing contact" on public.listing_contacts;
create policy "authors update their listing contact"
on public.listing_contacts for update to authenticated
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_id and l.author_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.listings l
    where l.id = listing_id and l.author_id = auth.uid()
  )
);

drop policy if exists "authors delete their listing contact" on public.listing_contacts;
create policy "authors delete their listing contact"
on public.listing_contacts for delete to authenticated
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_id and l.author_id = auth.uid()
  )
);

drop policy if exists "listing interests are visible to the parties" on public.listing_interests;
create policy "listing interests are visible to the parties"
on public.listing_interests for select to authenticated
using (
  profile_id = auth.uid()
  or exists (
    select 1 from public.listings l
    where l.id = listing_interests.listing_id
      and l.author_id = auth.uid()
  )
);

drop policy if exists "users send their own interest" on public.listing_interests;
create policy "users send their own interest"
on public.listing_interests for insert to authenticated
with check (
  profile_id = auth.uid()
  and exists (
    select 1 from public.listings l
    where l.id = listing_id
      and l.status = 'open'
      and l.expires_at > now()
      and l.author_id <> auth.uid()
  )
);

drop policy if exists "users delete their own interest" on public.listing_interests;
create policy "users delete their own interest"
on public.listing_interests for delete to authenticated
using (profile_id = auth.uid());

grant select, insert, update on public.listings to authenticated;
grant select, insert, update, delete on public.listing_contacts to authenticated;
grant select, insert, delete on public.listing_interests to authenticated;
