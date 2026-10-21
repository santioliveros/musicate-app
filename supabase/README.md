# Supabase

Migraciones del MVP. Se aplican con la CLI de Supabase.

## 1. Crear el proyecto

1. Crear un proyecto en [supabase.com](https://supabase.com) (región São Paulo si está disponible).
2. Copiar la URL y la `anon key` a `.env.local`.

## 2. Aplicar migraciones

```powershell
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

O pegá el contenido de `migrations/*.sql` en el SQL Editor, en orden:

1. `0001_extensions_and_catalogs.sql`
2. `0002_profiles.sql`
3. `0003_storage_avatars.sql`
4. `0004_listings.sql`
5. `0005_listing_functions.sql`
6. `0006_trust_and_notifications.sql`
7. `0007_push.sql`

## 3. Configurar Auth

- Authentication → Providers → Email: habilitado.
- Authentication → Email Templates → Magic Link: incluir el token para que la app pueda pedir el código que llega por email (6 a 10 dígitos):

```html
<h2>Tu código de musicate!</h2>
<p>Ingresá este código en la app:</p>
<p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">{{ .Token }}</p>
```

Sin `{{ .Token }}`, Supabase manda un magic link y la pantalla de verificación no recibe el código.

- Authentication → URL Configuration: agregar `musicate://auth/callback` cuando se configuren deep links.

## 4. Verificar

```sql
select count(*) from public.instruments; -- 20
select count(*) from public.genres;      -- 25
select * from storage.buckets where id = 'avatars';
```

## 5. Seed de avisos (desarrollo)

Después de completar el onboarding, ejecutá `seed_listings.sql` para crear 3 avisos de prueba:

```sql
-- pegá el contenido de seed_listings.sql en el SQL Editor
```

El seed usa el primer perfil y crea 3 avisos: busca baterista, ofrece clases y busca productor.

## 6. Push notifications

El push real requiere **development build** (no funciona en Expo Go) y un `projectId` de EAS.

### Variables de la Edge Function

En **Edge Functions → Secrets**:

| Secreto | Valor |
| --- | --- |
| `PUSH_WEBHOOK_SECRET` | una cadena aleatoria larga |
| `EXPO_ACCESS_TOKEN` | opcional; solo si habilitaste el acceso a la API de Expo Push |

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` los inyecta Supabase automáticamente.

### Deploy

```powershell
npx supabase functions deploy send-push
```

### Programar el envío

Dispará `send-push` cada minuto con `pg_cron` + `pg_net`:

```sql
select cron.schedule(
  'send-push',
  '* * * * *',
  $$
    select net.http_post(
      url := 'https://<project-ref>.supabase.co/functions/v1/send-push',
      headers := jsonb_build_object(
        'x-webhook-secret', '<secreto>',
        'content-type', 'application/json'
      ),
      body := '{}'::jsonb
    );
  $$
);
```

### Limitación conocida

Cada ejecución procesa hasta 50 notificaciones pendientes, incluidas las de personas sin tokens registrados. Revisá `notifications.push_error` y `push_tokens.last_error` antes de investigar.

## 7. Notas

- `profiles` se crea automáticamente con un trigger cuando se registra un usuario.
- El username provisional es `user_<12 caracteres>`; el onboarding lo reemplaza.
- La alpha usa email OTP. Google y Apple se agregan en fase 2.
- La migración 0004 crea `listings`, `listing_contacts` y `listing_interests`.
- La migración 0005 crea `create_listing` y `close_listing`.
- La migración 0006 crea `notifications`, `blocks`, `reports` y `push_tokens`.
- La migración 0007 agrega el estado de envío del push y la limpieza de tokens.
