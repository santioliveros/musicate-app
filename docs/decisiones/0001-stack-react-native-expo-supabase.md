# ADR-0001 — Stack: React Native + Expo + Supabase

- **Estado**: aceptada
- **Fecha**: 18/10/2026
- **Decisores**: fundador del proyecto
- **Revisión**: al finalizar la alpha

> **Nota:** la estimación de 8-12 semanas quedó obsoleta por [ADR-0006](0006-ruta-utilidad-first-y-mvp-sin-video.md). El stack sigue vigente; el MVP no incluye video.

## Contexto

El MVP tiene que estar en iOS y Android, construido por una sola persona con ayuda de IA, a un ritmo de 2-3 horas por semana. El presupuesto es bajo. La app necesita autenticación, base de datos relacional, almacenamiento de avatares, notificaciones push y reglas de acceso por usuario. El video llega en fase 2.

Las alternativas eran:

- React Native + Expo + Supabase.
- Flutter + Supabase/Firebase.
- Nativo Swift + Kotlin.
- PWA/web mobile.

## Decisión

Usar **React Native con Expo (TypeScript) y Supabase** como backend (Postgres, Auth, Storage, Edge Functions), con EAS para builds y distribución.

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| Flutter | Excelente rendimiento, pero el ecosistema y la disponibilidad de ayuda son menores para este equipo; hay más material y comunidad en React. |
| Nativo Swift + Kotlin | Duplica el esfuerzo y el tiempo; inviable para una persona sola. |
| PWA | Sin push confiable en iOS y sin presencia en tiendas; la app es social y móvil. |
| Firebase | Buena opción, pero el modelo relacional y RLS de Postgres encajan mejor con permisos por fila y consultas de avisos y novedades. |
| Backend propio (NestJS + Postgres) | Más control, pero suma operación, despliegue y seguridad sin necesidad en el MVP. |

## Consecuencias

### Positivas
- Un solo código para iOS y Android.
- Auth, storage, base de datos y RLS sin operar servidores.
- Iteración rápida y despliegues OTA con EAS Update.
- TypeScript de punta a punta con tipos generados desde la base.
- Comunidad grande y documentación abundante.

### Negativas y riesgos
- Dependencia de Supabase y Expo; migrar después tiene costo.
- El video requiere trabajo extra (compresión, codecs, storage) y no hay transcodificación nativa.
- El cliente habla directo con la base: la seguridad depende de RLS bien hecha.
- Expo impone restricciones a módulos nativos; si aparece una necesidad muy específica, hay que hacer un dev build o expo prebuild.

### Seguimiento
- Revisar en fase 2 si el video funciona en Android de gama media.
- Evaluar Supabase Pro al empezar la alpha.
- Si el costo de video se dispara, evaluar Mux o Cloudflare Stream (ADR nuevo).
