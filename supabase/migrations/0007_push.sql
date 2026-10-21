-- musicate! · 0007
-- Push: lectura por dispositivo, estado de envío y limpieza de tokens.

alter table public.notifications
  add column if not exists push_attempted_at timestamptz,
  add column if not exists push_error text;

alter table public.push_tokens
  add column if not exists last_error_at timestamptz,
  add column if not exists last_error text;

create index if not exists notifications_push_queue_idx
  on public.notifications (created_at)
  where push_attempted_at is null;

-- Los tokens que Expo devuelve como inválidos se marcan para no reintentar.
-- Se borran definitivamente con la limpieza periódica.
create or replace function public.prune_push_tokens()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.push_tokens
  where last_error_at is not null
    and last_error_at < now() - interval '7 days';
$$;

-- Los push se envían desde la Edge Function `send-push` con la service role.
-- El cliente solo puede leer y actualizar sus propias notificaciones.
drop policy if exists "users mark their notifications as read" on public.notifications;
create policy "users mark their notifications as read"
on public.notifications for update to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

grant select, update on public.notifications to authenticated;
