-- musicate! · 0006
-- Confianza y notificaciones: reportes, bloqueos, notificaciones y tokens de push.

do $$
begin
  create type public.notification_type as enum ('follow', 'listing_interest', 'system');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.report_target as enum ('profile', 'listing');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.report_reason as enum (
    'spam', 'harassment', 'scam', 'inappropriate', 'other'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.report_status as enum ('pending', 'reviewed', 'actioned', 'dismissed');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint no_self_block check (blocker_id <> blocked_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  type public.notification_type not null,
  listing_id uuid references public.listings(id) on delete cascade,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.push_tokens (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  token text not null,
  platform text not null check (platform in ('ios', 'android')),
  updated_at timestamptz not null default now(),
  primary key (profile_id, token)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.report_target not null,
  target_id uuid not null,
  target_author_id uuid references public.profiles(id) on delete set null,
  reason public.report_reason not null,
  details text,
  status public.report_status not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id) on delete set null,
  constraint report_details_len check (details is null or char_length(details) <= 500)
);

create index if not exists notifications_recipient_idx
  on public.notifications (recipient_id, read_at, created_at desc);

create index if not exists reports_status_idx
  on public.reports (status, created_at desc);

create index if not exists blocks_blocked_idx
  on public.blocks (blocked_id);

-- Bloqueo bidireccional: sirve para filtrar feed, búsqueda y perfiles sin
-- depender de leer public.blocks bajo RLS.
create or replace function public.is_blocked(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.blocks
    where (blocker_id = a and blocked_id = b)
       or (blocker_id = b and blocked_id = a)
  );
$$;

grant execute on function public.is_blocked(uuid, uuid) to authenticated;

-- Cuando alguien envía un interés, se notifica al autor del aviso.
create or replace function public.notify_listing_interest()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_author uuid;
begin
  select author_id into v_author
  from public.listings
  where id = new.listing_id;

  if v_author is null or v_author = new.profile_id then
    return new;
  end if;

  if public.is_blocked(v_author, new.profile_id) then
    return new;
  end if;

  insert into public.notifications (recipient_id, actor_id, type, listing_id)
  values (v_author, new.profile_id, 'listing_interest', new.listing_id);

  return new;
end;
$$;

drop trigger if exists listing_interests_notify on public.listing_interests;
create trigger listing_interests_notify
after insert on public.listing_interests
for each row execute function public.notify_listing_interest();

alter table public.blocks enable row level security;
alter table public.notifications enable row level security;
alter table public.push_tokens enable row level security;
alter table public.reports enable row level security;

drop policy if exists "users see their own blocks" on public.blocks;
create policy "users see their own blocks"
on public.blocks for select to authenticated
using (blocker_id = auth.uid());

drop policy if exists "users create their own blocks" on public.blocks;
create policy "users create their own blocks"
on public.blocks for insert to authenticated
with check (blocker_id = auth.uid() and blocked_id <> auth.uid());

drop policy if exists "users remove their own blocks" on public.blocks;
create policy "users remove their own blocks"
on public.blocks for delete to authenticated
using (blocker_id = auth.uid());

drop policy if exists "users see their own notifications" on public.notifications;
create policy "users see their own notifications"
on public.notifications for select to authenticated
using (recipient_id = auth.uid());

drop policy if exists "users mark their notifications as read" on public.notifications;
create policy "users mark their notifications as read"
on public.notifications for update to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

drop policy if exists "users manage their push tokens" on public.push_tokens;
create policy "users manage their push tokens"
on public.push_tokens for all to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

drop policy if exists "users see their own reports" on public.reports;
create policy "users see their own reports"
on public.reports for select to authenticated
using (reporter_id = auth.uid());

drop policy if exists "users create their own reports" on public.reports;
create policy "users create their own reports"
on public.reports for insert to authenticated
with check (reporter_id = auth.uid());

-- El contenido de usuarios bloqueados deja de ser visible.
drop policy if exists "open listings are viewable" on public.listings;
create policy "open listings are viewable"
on public.listings for select to authenticated
using (
  (
    (status = 'open' and expires_at > now())
    or author_id = auth.uid()
  )
  and not public.is_blocked(auth.uid(), author_id)
);

drop policy if exists "profiles are viewable by authenticated users" on public.profiles;
create policy "profiles are viewable by authenticated users"
on public.profiles for select to authenticated
using (
  deleted_at is null
  and (id = auth.uid() or not public.is_blocked(auth.uid(), id))
);

grant select, insert, delete on public.blocks to authenticated;
grant select, update on public.notifications to authenticated;
grant select, insert, update, delete on public.push_tokens to authenticated;
grant select, insert on public.reports to authenticated;
