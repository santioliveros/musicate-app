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

O pegá el contenido de `migrations/*.sql` en el SQL Editor, en orden.

## 3. Configurar Auth

- Authentication → Providers → Email: habilitado.
- Authentication → Email Templates → Magic Link: incluir el token para que la app pueda pedir el código de 6 dígitos:

```html
<h2>Tu código de musikate</h2>
<p>Ingresá este código en la app:</p>
<p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">{{ .Token }}</p>
```

Sin `{{ .Token }}`, Supabase manda un magic link y la pantalla de verificación no recibe el código.

- Authentication → URL Configuration: agregar `musikate://auth/callback` cuando se configuren deep links.

## 4. Verificar

```sql
select count(*) from public.instruments; -- 20
select count(*) from public.genres;      -- 25
select * from storage.buckets where id = 'avatars';
```

## 5. Notas

- `profiles` se crea automáticamente con un trigger cuando se registra un usuario.
- El username provisional es `user_<12 caracteres>`; el onboarding lo reemplaza.
- La alpha usa email OTP. Google y Apple se agregan en fase 2.
- Los avisos (`listings`) se agregan en la migración 0004, cuando se construya ese módulo.
