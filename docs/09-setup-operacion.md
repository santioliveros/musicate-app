# Setup y operación

> Versión 0.1 · 18/10/2026
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
- Expo Go para pruebas rápidas de UI; **development build** para cámara, video y push.
- VS Code con extensiones: ESLint, Prettier, Tailwind? (no), Expo Tools, Supabase.

### Cuentas
- GitHub.
- Supabase.
- Expo (EAS).
- Apple Developer Program (US$ 99/año).
- Google Play Console (US$ 25 único).
- PostHog y Sentry (planes gratuitos).
- Dominio y correo (para términos, privacidad y soporte).

## 2. Costos de arranque

| Concepto | Costo | Cuándo |
| --- | --- | --- |
| Apple Developer | US$ 99/año | Semana 1-2 |
| Google Play | US$ 25 único | Semana 2 |
| Dominio | US$ 12-20/año | Semana 2 |
| Supabase Pro | ~US$ 25/mes | Al empezar la beta |
| EAS | Gratis (cola) o US$ 99/mes | Opcional |
| Total inicial | ~US$ 125-150 | — |
| Total mensual beta | ~US$ 25-45 | — |

## 3. Bootstrap del repositorio

El repo ya contiene `docs/`, `README.md` y `CONTRIBUTING.md`. Como `create-expo-app` necesita una carpeta vacía, se genera el scaffold aparte y se copia:

```powershell
# Desde la carpeta padre
cd C:\Users\satio\Documents
npx create-expo-app@latest musikate-scaffold --template default

# Copiar el scaffold al repo, sin pisar README ni la configuración propia
robocopy .\musikate-scaffold .\musikate /E /XD .git node_modules `
  /XF README.md .gitignore .editorconfig .gitattributes
```

Alternativa más simple: crear el proyecto en una carpeta nueva y mover `docs/`, `README.md`, `CONTRIBUTING.md`, `.gitignore`, `.editorconfig` y `.gitattributes` allí.

Luego:

```powershell
cd C:\Users\satio\Documents\musikate
corepack enable
pnpm install
```

### Dependencias de la app

```powershell
npx expo install expo-image expo-video expo-image-picker expo-camera `
  expo-notifications expo-haptics expo-secure-store expo-apple-authentication `
  expo-web-browser expo-linking

pnpm add @supabase/supabase-js @tanstack/react-query react-hook-form zod `
  @hookform/resolvers zustand posthog-react-native @sentry/react-native

pnpm add -D supabase eslint prettier typescript @types/react
```

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

### Opción A · Local (recomendada para desarrollo)

Requiere Docker Desktop.

```powershell
npx supabase init
npx supabase start
npx supabase db reset   # aplica migraciones y seed
```

La salida de `start` da la URL local y las claves. Se copian a `.env.local`.

### Opción B · Cloud

1. Crear proyecto en Supabase (región São Paulo si está disponible).
2. `npx supabase link --project-ref <ref>`.
3. `npx supabase db push` para aplicar migraciones.
4. Copiar URL y `anon key` a `.env.local`.

### Auth

En el panel de Supabase:

- Habilitar Email OTP.
- Habilitar Google (client ID y secret).
- Habilitar Apple (service ID, team ID, key).
- Agregar redirect URLs: `musikate://auth/callback` y la URL de desarrollo.
- Configurar plantilla de email con marca.

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

En EAS se configuran con `eas secret:create` o `eas.json` por perfil. La `service_role` **nunca** va en la app: solo en Edge Functions.

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

### Preview y producción

| Perfil | Uso | Distribución |
| --- | --- | --- |
| `development` | Desarrollo con dev client | Interna |
| `preview` | Testers de la beta | TestFlight / Play Internal |
| `production` | Lanzamiento | App Store / Play Store |

Checklist de release:

- [ ] `version` y `buildNumber`/`versionCode` actualizados.
- [ ] Variables de entorno del perfil correctas.
- [ ] Migraciones aplicadas en producción.
- [ ] Smoke test en Android e iOS reales.
- [ ] Analítica y Sentry activos.
- [ ] Notas de versión escritas.
- [ ] Tag en git (`v0.1.0`).
- [ ] Build subido a TestFlight/Play y probado por 2 personas.

## 8. Operación de la beta

### Soporte
- Canal único (WhatsApp o email) publicado en la app y la landing.
- Respuesta en menos de 24 h hábiles.
- Plantillas para bugs, reportes y pedidos de baja.

### Moderación
- Revisar reportes todos los días.
- Tiempo de respuesta objetivo: 24 h; casos graves, inmediato.
- Registrar decisión y fecha en `reports`.

### Métricas
- Revisión semanal del tablero (ver [Métricas](06-metricas-experimentos.md)).
- Un documento por semana con: qué cambió, qué aprendimos, qué sigue.

### Backups
- Supabase Pro con backups diarios.
- Prueba de restauración antes de la beta.
- Export mensual de la base a un storage externo.

### Incidentes
- **Caída**: revisar status de Supabase/Expo; comunicar en el canal de soporte.
- **Fuga o acceso indebido**: rotar claves, revisar logs, notificar según corresponda.
- **Contenido grave**: ocultar, preservar evidencia, evaluar denuncia y comunicación.
- **Pérdida de datos**: restaurar backup, comunicar y documentar.

## 9. Checklist antes de la primera línea de código

- [ ] Cuenta de Apple Developer iniciada (la verificación demora).
- [ ] Cuenta de Google Play creada.
- [ ] Proyecto Supabase dev creado.
- [ ] Dominio comprado y correo de soporte funcionando.
- [ ] Repositorio en GitHub con `main` protegida.
- [ ] Términos y privacidad en borrador (aunque sea en Notion).
- [ ] Lista de 30 beta testers y 10 creadores semilla.
- [ ] Presupuesto mensual aprobado (~US$ 30-50).
- [ ] Decididas las [preguntas abiertas](10-preguntas-abiertas.md) que bloquean el diseño.
