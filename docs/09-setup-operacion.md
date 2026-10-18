# Setup y operación

> Versión 0.3 · 18/10/2026
> El scaffold ya está en el repo. Esto es lo que falta para correrlo y publicarlo.

## 1. Requisitos

### Hardware y sistema
- Windows, macOS o Linux. En Windows: PowerShell 7+ y Git.
- Un teléfono Android real (gama media) y, si se puede, un iPhone.
- **iOS**: no hay simulador en Windows; los builds se hacen en la nube con EAS y se prueban con TestFlight.

### Software
- Node.js LTS (20 o superior) y npm.
- Git.
- Expo Go para probar la UI en el teléfono.
- Docker Desktop solo si querés correr Supabase local; para empezar, la nube es más simple.

### Cuentas
- GitHub.
- Supabase.
- Expo (EAS).
- Apple Developer Program (US$ 99/año).
- Google Play Console (US$ 25 único).
- PostHog y Sentry (planes gratuitos, se agregan después).
- Dominio y correo (para landing, términos, privacidad y soporte).

## 2. Costos de arranque

| Concepto | Costo | Cuándo |
| --- | --- | --- |
| Apple Developer | US$ 99/año | Mes 1-2 |
| Google Play | US$ 25 único | Mes 1-2 |
| Dominio | US$ 12-20/año | Mes 0 |
| Supabase Pro (prod) | ~US$ 25/mes | Al empezar la alpha; dev puede ir en free |
| EAS | Gratis (cola) o US$ 99/mes | Opcional |
| Total inicial | ~US$ 125-150 | — |
| Total mensual en alpha | ~US$ 25-35 | — |

Sin video en el MVP, el storage y el egress son mínimos.

## 3. Puesta en marcha

```powershell
git clone https://github.com/santioliveros/musikate-app.git
cd musikate-app
npm install
Copy-Item .env.example .env.local
```

Completá `.env.local` con la URL y la `anon key` de Supabase. Después:

```powershell
npm run check:setup
npm start
```

Escaneá el QR con Expo Go. Para módulos nativos (push, cámara) vas a necesitar un development build más adelante; el scaffold actual funciona en Expo Go.

Verificación rápida:

```powershell
npm run typecheck
```

## 4. Supabase

### Opción A · Cloud (recomendada para empezar)

1. Crear proyecto **dev** en [supabase.com](https://supabase.com) (región São Paulo si está disponible).
2. `npx supabase login`.
3. `npx supabase link --project-ref <ref-dev>`.
4. `npx supabase db push`.
5. Copiar URL y `anon key` a `.env.local`.
6. Repetir con un proyecto **prod** recién en el mes 7-9.

Las migraciones están en [`supabase/migrations`](../supabase/migrations) y se explican en [supabase/README.md](../supabase/README.md).

### Opción B · Local

Requiere Docker Desktop.

```powershell
npx supabase init
npx supabase start
npx supabase db reset
```

La salida de `start` da la URL local y las claves. Se copian a `.env.local`.

### Auth

En el panel de Supabase:

- Authentication → Providers → Email: habilitado.
- Authentication → Email Templates → Magic Link: incluí `{{ .Token }}` para que la app reciba el código de 6 dígitos.
- Authentication → URL Configuration: agregá `musikate://auth/callback` cuando configures deep links.
- Google y Apple se agregan en fase 2, antes de publicar en tiendas.

### Verificar

```sql
select count(*) from public.instruments; -- 20
select count(*) from public.genres;      -- 25
select * from storage.buckets where id = 'avatars';
```

## 5. Variables de entorno

`.env.local` (no se commitea):

```bash
EXPO_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Cada entorno tiene su propio juego de variables:

| Entorno | Variables |
| --- | --- |
| develop | `.env.local` (local) y perfiles EAS `development`/`preview` (nube dev) |
| prod | perfil EAS `production` |

La `service_role` **nunca** va en la app: solo en Edge Functions.

## 6. Scripts

| Comando | Qué hace |
| --- | --- |
| `npm start` | Expo Go, para UI y auth. |
| `npm run android` | Build y run en Android local. |
| `npm run ios` | Build y run en iOS (requiere macOS). |
| `npm run typecheck` | TypeScript sin emitir. |
| `npm run check:setup` | Verifica `.env.local` y la conexión con Supabase. |
| `npm run web` | Versión web de desarrollo. |

Builds:

```powershell
npx eas-cli login
npx eas-cli init
npx eas-cli build --profile development --platform android
```

En Windows, para iOS:

```powershell
npx eas-cli build --profile development --platform ios
```

El build se instala en el dispositivo mediante un link; no hace falta Mac.

## 7. Entornos y releases

| Entorno | Perfil EAS | Backend | Distribución | Origen |
| --- | --- | --- | --- | --- |
| develop | `development` o `preview` | Supabase dev | Interna / TestFlight / Play Internal | `main` |
| prod | `production` | Supabase prod | App Store / Play Store | tag `vX.Y.Z` |

`development` y `preview` son dos formas de usar el mismo entorno develop: dev client para tu teléfono, preview para testers. `production` es el único perfil que apunta a prod.

Para la alpha: build `production`, `eas submit` a TestFlight/Play Internal, y recién después liberar en la tienda.

Checklist de release:

- [ ] `version` y `buildNumber`/`versionCode` actualizados.
- [ ] Variables del perfil `production` correctas (Supabase prod).
- [ ] Migraciones probadas en develop y aplicadas en prod.
- [ ] Tag `vX.Y.Z` creado.
- [ ] Build `production` generado desde el tag.
- [ ] Smoke test en Android e iOS reales.
- [ ] Analítica y Sentry activos.
- [ ] Notas de versión escritas.
- [ ] Build subido a TestFlight/Play Internal y probado por 2 personas.

## 8. Operación de la alpha

### Soporte
- Canal único (WhatsApp o email) publicado en la app y la landing.
- Respuesta en menos de 24 h hábiles.
- Plantillas para bugs, reportes y pedidos de baja.

### Moderación
- Revisar reportes todos los días, 15 minutos.
- Tiempo de respuesta objetivo: 24 h; casos graves, inmediato.
- Registrar decisión y fecha en `reports`.

### Métricas
- Revisión semanal del tablero (ver [Métricas](06-metricas-experimentos.md)).
- Una nota por semana con: qué cambió, qué aprendimos, qué sigue.

### Backups
- Supabase Pro con backups diarios.
- Prueba de restauración antes de la alpha.
- Export mensual de la base a un storage externo.

### Incidentes
- **Caída**: revisar status de Supabase/Expo; comunicar en el canal de soporte.
- **Fuga o acceso indebido**: rotar claves, revisar logs, notificar según corresponda.
- **Contenido grave**: ocultar, preservar evidencia, evaluar denuncia y comunicación.
- **Pérdida de datos**: restaurar backup, comunicar y documentar.

## 9. Ritmo de trabajo

- **Un bloque de 2-3 h por semana**, siempre el mismo día si se puede.
- Al final del bloque: 15 minutos para actualizar el backlog y anotar el siguiente paso.
- **Una historia a la vez.** Si no cabe en 3 semanas, se parte.
- **Demo visible:** al final de cada fase, algo que se pueda mostrar en un teléfono.
- **Semana perdida:** no se recupera con una maratón; se retoma el bloque siguiente.

## 10. Checklist antes de testers

- [ ] Proyecto Supabase dev creado y migraciones aplicadas.
- [ ] Email template con `{{ .Token }}`.
- [ ] `.env.local` completo y `npm run typecheck` pasando.
- [ ] Registro, onboarding y perfil probados en Android real.
- [ ] Build de iOS probado por TestFlight.
- [ ] Términos y privacidad publicados.
- [ ] Reportar y bloquear (cuando exista el módulo de avisos).
- [ ] 15 perfiles y 10 avisos semilla.
- [ ] Backups y canal de soporte.
- [ ] Apple Developer y Google Play activos.
