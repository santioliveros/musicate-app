# musikate

**La red social de la escena musical uruguaya.**
Mostrá quién sos, encontrá con quién tocar y seguí lo que pasa en Montevideo.

> Estado: **documentación v0.2 — plan utilidad-first**. Todavía no hay código. El MVP arranca con perfiles y avisos; los covers verticales son fase 2.
>
> Repositorio: [santioliveros/musikate-app](https://github.com/santioliveros/musikate-app)

## El problema en una frase

La escena musical de Montevideo ya existe, pero está dispersa: las búsquedas de bandas viven en grupos de WhatsApp, los covers en Instagram, los shows en flyers sueltos y las clases en el boca a boca. No hay un lugar donde mostrarse, encontrarse y seguir lo que pasa.

## La apuesta

Una red social vertical, local y de nicho:

- **MVP:** perfil musical + avisos para encontrar integrantes, bandas, productores y clases + follows y novedades.
- **Fase 2:** covers en video vertical, estilo TikTok/Reels.
- **Fase 3:** shows, cursos, chat y perfil de banda.

El orden es deliberado: con 2-3 horas por semana, construir primero el video sería invertir en lo más caro antes de saber si la escena usa la app. Primero la red, después el escaparate.

## Estado

| Área | Estado |
| --- | --- |
| Visión y alcance | Documentados |
| Arquitectura y modelo de datos | Documentados |
| Roadmap y backlog | Documentados |
| Validación con la escena | Próximo paso |
| Scaffold del repositorio | Después de validar |
| Alpha privada (20-30 personas) | Mes 8-12 |
| Beta con video | Mes 15-18 |

## Stack

- **App**: React Native + Expo (TypeScript, Expo Router)
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions)
- **Entornos**: `develop` (interno) y `prod` (alpha y tiendas), sin staging
- **Builds**: EAS Build / EAS Submit
- **Analítica y errores**: PostHog + Sentry
- **Video**: fase 2 (expo-video, expo-camera)

## Ritmo

2-3 horas por semana, un bloque fijo. El plan es por hitos, no por fechas: alpha en 8-12 meses, beta con video en 15-18. Si aparece más tiempo o ayuda, se acelera.

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

## Cómo trabajar en este repo

Ver [CONTRIBUTING.md](CONTRIBUTING.md). En resumen: un bloque de 2-3 h por semana, una historia a la vez, decisiones en ADRs y demo al final de cada fase.

## Próximos pasos

1. **Fase 0:** landing, waitlist, 10 entrevistas y 10 avisos semilla.
2. **Fase 1:** scaffold de Expo + Supabase, auth y perfil.
3. **Fase 2:** avisos, follows y notificaciones.
4. **Alpha:** 20-30 personas, medición y decisión sobre video.
