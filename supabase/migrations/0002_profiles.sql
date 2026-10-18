-- musikate · 0002
-- Perfiles, identidad musical y RLS.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext not null unique,
  display_name text not null,
  bio text,
  avatar_path text,
  city text not null default 'Montevideo',
  country text not null default 'UY',
  looking_for text[] not null default '{}',
  instagram_url text,
  youtube_url text,
  spotify_url text,
  website_url text,
  followers_count integer not null default 0,
  following_count integer not null default 0,
  onboarded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint username_format check (username::text ~ '^[a-z0-9_]{3,20}$'),
  constraint display_name_len check (char_length(display_name) between 2 and 40),
  constraint bio_len check (bio is null or char_length(bio) <= 160),
  constraint looking_for_valid check (
    looking_for <@ array['banda','integrantes','productor','clases','shows']::text[]
  )
);

create table if not exists public.profile_instruments (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  instrument_id smallint not null references public.instruments(id),
  level public.skill_level not null default 'intermediate',
  primary key (profile_id, instrument_id)
);

create table if not exists public.profile_genres (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  genre_id smallint not null references public.genres(id),
  primary key (profile_id, genre_id)
);

create index if not exists profiles_username_trgm_idx
  on public.profiles using gin ((username::text) gin_trgm_ops);

create index if not exists profiles_name_trgm_idx
  on public.profiles using gin (display_name gin_trgm_ops);

create index if not exists profile_instruments_profile_idx
  on public.profile_instruments (profile_id);

create index if not exists profile_genres_profile_idx
  on public.profile_genres (profile_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    'user_' || substr(replace(new.id::text, '-', ''), 1, 12),
    coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), 'Nuevo usuario')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.profile_instruments enable row level security;
alter table public.profile_genres enable row level security;
alter table public.instruments enable row level security;
alter table public.genres enable row level security;

drop policy if exists "profiles are viewable by authenticated users" on public.profiles;
create policy "profiles are viewable by authenticated users"
on public.profiles for select to authenticated
using (deleted_at is null);

drop policy if exists "users update their own profile" on public.profiles;
create policy "users update their own profile"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "catalogs are viewable" on public.instruments;
create policy "catalogs are viewable"
on public.instruments for select to authenticated
using (true);

drop policy if exists "genres are viewable" on public.genres;
create policy "genres are viewable"
on public.genres for select to authenticated
using (true);

drop policy if exists "profile instruments are viewable" on public.profile_instruments;
create policy "profile instruments are viewable"
on public.profile_instruments for select to authenticated
using (true);

drop policy if exists "users insert their own instruments" on public.profile_instruments;
create policy "users insert their own instruments"
on public.profile_instruments for insert to authenticated
with check (profile_id = auth.uid());

drop policy if exists "users update their own instruments" on public.profile_instruments;
create policy "users update their own instruments"
on public.profile_instruments for update to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

drop policy if exists "users delete their own instruments" on public.profile_instruments;
create policy "users delete their own instruments"
on public.profile_instruments for delete to authenticated
using (profile_id = auth.uid());

drop policy if exists "profile genres are viewable" on public.profile_genres;
create policy "profile genres are viewable"
on public.profile_genres for select to authenticated
using (true);

drop policy if exists "users insert their own genres" on public.profile_genres;
create policy "users insert their own genres"
on public.profile_genres for insert to authenticated
with check (profile_id = auth.uid());

drop policy if exists "users update their own genres" on public.profile_genres;
create policy "users update their own genres"
on public.profile_genres for update to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

drop policy if exists "users delete their own genres" on public.profile_genres;
create policy "users delete their own genres"
on public.profile_genres for delete to authenticated
using (profile_id = auth.uid());

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.profile_instruments to authenticated;
grant select, insert, update, delete on public.profile_genres to authenticated;
grant select on public.instruments to authenticated;
grant select on public.genres to authenticated;
