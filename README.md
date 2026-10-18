# Musikate

**La red social de la escena musical uruguaya.**
Mostrá lo que hacés, encontrá con quién tocar y seguí a la gente que mueve la música en Montevideo.

> Estado: **v0.1 — fundaciones**. Todavía no hay código. Este repo contiene la visión, el alcance del MVP, la arquitectura, el roadmap y el backlog acordados para arrancar.
>
> Repositorio: [santioliveros/musikate-app](https://github.com/santioliveros/musikate-app)

## El problema en una frase

La escena musical de Montevideo ya existe, pero está dispersa: los covers viven en Instagram, las búsquedas de bandas en grupos de WhatsApp, los shows en flyers sueltos y las clases en el boca a boca. No hay un lugar donde mostrarse, encontrarse y seguir lo que pasa.

## La apuesta

Una red social vertical, local y de nicho:

- **Mostrar**: covers en video corto, fotos y crónicas de shows.
- **Encontrar**: avisos de "busco integrante", "busco banda", "busco productor", "doy clases".
- **Seguir**: un feed de personas y proyectos de la escena, no de marcas.

No es un servicio de streaming. No compite con Spotify: compite con la sensación de que la escena no tiene mapa.

## Estado

| Área | Estado |
| --- | --- |
| Visión y hipótesis | Documentada |
| Alcance del MVP | Documentado |
| Arquitectura y modelo de datos | Documentados |
| Roadmap y backlog | Documentados |
| Scaffold del repositorio | Próximo paso |
| Beta cerrada (30 personas) | Semana 7 |

## Stack

- **App**: React Native + Expo (TypeScript, Expo Router)
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions)
- **Builds**: EAS Build / EAS Submit
- **Analítica y errores**: PostHog + Sentry

## Documentación

| Documento | Para qué sirve |
| --- | --- |
| [Visión](docs/00-vision.md) | Problema, propuesta, público, hipótesis y no-objetivos. |
| [PRD del MVP](docs/01-prd-mvp.md) | Qué se construye, con criterios de aceptación. |
| [Arquitectura](docs/02-arquitectura.md) | Cómo se construye y por qué. |
| [Modelo de datos](docs/03-modelo-de-datos.md) | Tablas, relaciones, RLS e índices. |
| [Roadmap](docs/04-roadmap.md) | Plan de 8-12 semanas y fases posteriores. |
| [Backlog](docs/05-backlog.md) | Historias priorizadas y estimaciones. |
| [Métricas y experimentos](docs/06-metricas-experimentos.md) | Qué medimos y cómo validamos. |
| [Riesgos y legal](docs/07-riesgos-legal.md) | Derechos, moderación, privacidad y tiendas. |
| [Monetización](docs/08-monetizacion.md) | Hipótesis de ingresos y su secuencia. |
| [Setup y operación](docs/09-setup-operacion.md) | Cuentas, comandos, releases y costos. |
| [Preguntas abiertas](docs/10-preguntas-abiertas.md) | Decisiones pendientes antes de codear. |
| [Decisiones (ADR)](docs/decisiones/README.md) | Registro de decisiones arquitectónicas. |

## Cómo trabajar en este repo

Ver [CONTRIBUTING.md](CONTRIBUTING.md). En resumen: una tarea a la vez, decisiones en ADRs, commits convencionales y demo al final de cada semana.

## Próximos pasos

1. Cerrar las [preguntas abiertas](docs/10-preguntas-abiertas.md) que bloquean el diseño.
2. Crear el scaffold de Expo y el proyecto de Supabase ([setup](docs/09-setup-operacion.md)).
3. Implementar la semana 1 del [roadmap](docs/04-roadmap.md).
