# musicate!

**La red social para mostrar lo que hacés, encontrar con quién tocar y seguir a la gente de la escena.**
Mostrá quién sos, encontrá con quién tocar y seguí a la gente que hace música.

> Estado: **scaffold v0.1**. La app base ya está en el repo: Expo + Expo Router, Supabase, auth por email y perfil musical. El módulo de avisos es el próximo paso.
>
> Repositorio: [santioliveros/musicate-app](https://github.com/santioliveros/musicate-app)

## El problema en una frase

La escena musical ya existe, pero está dispersa: las búsquedas de bandas viven en grupos de WhatsApp, los covers en Instagram, los shows en flyers sueltos y las clases en el boca a boca. No hay un lugar donde mostrarse, encontrarse y seguir lo que pasa.

## La apuesta

Una red social vertical, de nicho:

- **MVP:** perfil musical + avisos para encontrar integrantes, bandas, productores y clases + follows y una sección Para ti.
- **Fase 2:** covers en video vertical, estilo TikTok/Reels.
- **Fase 3:** shows, cursos, chat y perfil de banda.

El orden es deliberado: con 2-3 horas por semana, construir primero el video sería invertir en lo más caro antes de saber si la escena usa la app. Primero la red, después el escaparate.

## Estado

| Área | Estado |
| --- | --- |
| App base (Expo + Router + tema) | Listo |
| Auth con email OTP | Listo (requiere Supabase configurado) |
| Perfil musical, avatar y taxonomía | Listo |
| Búsqueda de perfiles | Básica |
| Validación formal con la escena | Pendiente; ya hubo conversaciones informales |
| Avisos: listado y detalle | Implementados; falta aplicar `0004` y `0005` |
| Avisos: publicar, mis avisos y cerrar | Implementados; falta aplicar `0004` y `0005` |
| Avisos: interés y contacto | Implementados; falta aplicar `0004` y `0005` |
| Notificaciones push | Próximo |
| Alpha privada (20-30 personas) | Mes 8-12 |

## Stack

- **App**: React Native + Expo (TypeScript, Expo Router)
- **Backend**: Supabase (Postgres, Auth, Storage)
- **Entornos**: `develop` (interno) y `prod` (alpha y tiendas), sin staging
- **Builds**: EAS Build / EAS Submit
- **Video**: fase 2

## Empezar

```powershell
npm install
Copy-Item .env.example .env.local
# completá EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY
npm run check:setup
npm start
```

Antes de probar el login, creá el proyecto de Supabase y aplicá las migraciones. Las instrucciones están en [supabase/README.md](supabase/README.md).

```powershell
npm run typecheck
```

## Cómo está organizado

```text
src/app/              Rutas de Expo Router
  (auth)/             login, código y onboarding
  (tabs)/             Inicio (Para ti + Novedades), Buscar, Perfil
src/components/       UI reutilizable
src/features/         auth, profile
src/lib/              Supabase y React Query
supabase/migrations/  Esquema, RLS y storage
```

## Documentación

| Documento | Para qué sirve |
| --- | --- |
| [Visión](docs/00-vision.md) | Problema, propuesta, público, hipótesis y no-objetivos. |
| [PRD del MVP](docs/01-prd-mvp.md) | Qué se construye, con criterios de aceptación. |
| [Arquitectura](docs/02-arquitectura.md) | Cómo se construye y por qué. |
| [Modelo de datos](docs/03-modelo-de-datos.md) | Tablas, relaciones, RLS e índices. |
| [Roadmap](docs/04-roadmap.md) | Fases, hitos y ritmo de trabajo. |
| [Backlog](docs/05-backlog.md) | Historias priorizadas y estimaciones. |
| [Métricas y experimentos](docs/06-metricas-experimentos.md) | Qué medimos y cómo validamos. |
| [Riesgos y legal](docs/07-riesgos-legal.md) | Datos, moderación, copyright y tiendas. |
| [Monetización](docs/08-monetizacion.md) | Hipótesis de ingresos y su secuencia. |
| [Setup y operación](docs/09-setup-operacion.md) | Cuentas, comandos, releases y costos. |
| [Preguntas abiertas](docs/10-preguntas-abiertas.md) | Decisiones pendientes. |
| [Decisiones (ADR)](docs/decisiones/README.md) | Registro de decisiones. |

## Próximos pasos

1. Aplicar las migraciones `0004` y `0005`.
2. Ejecutar el seed de avisos.
3. Probar publicar, “mis avisos”, cerrar, “me interesa” y contacto revelado.
4. Agregar notificaciones push y tests.
