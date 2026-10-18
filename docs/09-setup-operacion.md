# Setup y operación

> Versión 0.2 · 18/10/2026
> Instrucciones para pasar de la documentación al primer build. El código todavía no existe: esto es el manual de arranque.

## 1. Requisitos

### Hardware y sistema
- Windows, macOS o Linux. En Windows: PowerShell 7+ y Git.
- Un teléfono Android real (gama media) y, si se puede, un iPhone.
- **iOS**: no hay simulador en Windows; los builds se hacen en la nube con EAS y se prueban con TestFlight.

### Software
- Node.js LTS (24 o superior) y `pnpm` (`corepack enable`).
- Git.
- Docker Desktop (solo si se usa Supabase local; si no, proyecto cloud de desarrollo).
- Expo Go para pruebas rápidas de UI; **development build** para push y cámara.
- VS Code con extensiones: ESLint, Prettier, Expo Tools, Supabase.

### Cuentas
- GitHub.
- Supabase.
- Expo (EAS).
- Apple Developer Program (US$ 99/año).
- Google Play Console (US$ 25 único).
- PostHog y Sentry (planes gratuitos).
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

## 3. Bootstrap del repositorio

Si empezás en otra máquina, cloná el repo:

```powershell
git clone https://github.com/santioliveros/musikate-app.git
cd musikate-app
```

El repo ya contiene `docs/`, `README.md` y `CONTRIBUTING.md`. Como `create-expo-app` necesita una carpeta vacía, se genera el scaffold aparte y se copia:

```powershell
# Desde la carpeta padre
cd C:\Users\satio\Documents
npx create-expo-app@latest musikate-scaffold --template default

# Copiar el scaffold al repo, sin pisar README ni la configuración propia
robocopy .\musikate-scaffold .\musikate /E /XD .git node_modules `
  /XF README.md .gitignore .editorconfig .gitattributes
```

Luego:

```powershell
cd C:\Users\satio\Documents\musikate
corepack enable
pnpm install
```

### Dependencias de la app (MVP)

```powershell
npx expo install expo-image expo-image-manipulator expo-image-picker `
  expo-notifications expo-haptics expo-secure-store expo-web-browser expo-linking

pnpm add @supabase/supabase-js @tanstack/react-query react-hook-form zod `
  @hookform/resolvers zustand posthog-react-native @sentry/react-native

pnpm add -D supabase eslint prettier typescript @types/react
```

**Fase 2 (no instalar ahora):** `expo-video`, `expo-camera`, compresión de video y procesamiento de medios.

> Las versiones se fijan en el momento del scaffold. No copiar versiones de este documento a ciegas: usar `expo install` para que Expo elija las compatibles.

### Estructura esperada

```text
app/
src/
supabase/
assets/
docs/
app.json
eas.json
package.json
tsconfig.json
```

## 4. Supabase

### Opción A · Cloud (recomendada para empezar)

1. Crear proyecto **dev** en Supabase (región São Paulo si está disponible).
2. `npx supabase link --project-ref <ref-dev>`.
3. `npx supabase db push` para aplicar migraciones.
4. Copiar URL y `anon key` a `.env.local`.
5. Repetir con un proyecto **prod** cuando llegue la alpha.

> A 2-3 h/semana, un solo proyecto dev al inicio es suficiente. El proyecto prod se crea en el mes 7-9, antes de invitar testers.

### Opción B · Local (para probar migraciones)

Requiere Docker Desktop.

```powershell
npx supabase init
npx supabase start
npx supabase db reset   # aplica migraciones y seed
```

La salida de `start` da la URL local y las claves. Se copian a `.env.local`.

### Auth

En el panel de Supabase:

- Habilitar Email OTP.
- Configurar la plantilla de email con la marca.
- Agregar redirect URLs: `musikate://auth/callback` y la URL de desarrollo.
- Google/Apple se agregan en fase 2, antes de publicar en tiendas.

### Migraciones

- Viven en `supabase/migrations/`.
- Nunca se edita una migración ya aplicada en producción.
- `supabase db diff` para verificar diferencias.
- `supabase db push` en cada entorno.

## 5. Variables de entorno

`.env.local` (no se commitea):

```bash
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
EXPO_PUBLIC_POSTHOG_KEY=...
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Cada entorno tiene su propio juego de variables:

| Entorno | Variables |
| --- | --- |
| develop | `.env.local` (local) y perfiles EAS `development`/`preview` (nube dev) |
| prod | perfil EAS `production` |

Se configuran con `eas env:create` o el bloque `env` de `eas.json`. La `service_role` **nunca** va en la app: solo en Edge Functions.

## 6. Scripts previstos

```json
{
  "scripts": {
    "start": "expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"
  }
}
```

## 7. Builds y releases

### Desarrollo

```powershell
eas build --profile development --platform android
```

En Windows, para iOS:

```powershell
eas build --profile development --platform ios
```

El build se instala en el dispositivo mediante un link; no hace falta Mac.

### Los dos entornos

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

## 10. Checklist antes de la primera línea de código

- [ ] Cuenta de Apple Developer iniciada (la verificación demora).
- [ ] Cuenta de Google Play creada.
- [ ] Proyecto Supabase dev creado.
- [ ] Dominio comprado y correo de soporte funcionando.
- [ ] Landing y waitlist de la fase 0 publicadas.
- [ ] Repositorio en GitHub con `main` protegida.
- [ ] Términos y privacidad en borrador (aunque sea en Notion).
- [ ] Lista de 30 candidatos para la alpha.
- [ ] Presupuesto mensual aprobado (~US$ 30-35).
- [ ] Las 10 entrevistas de la fase 0 agendadas.

La decisión de arrancar con perfiles + avisos y dejar el video para fase 2 está en [ADR-0006](decisiones/0006-ruta-utilidad-first-y-mvp-sin-video.md).
