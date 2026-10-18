# Backlog

> Versión 0.1 · 18/10/2026
> El backlog es una hipótesis de trabajo, no un contrato. Se revisa cada lunes.

## 1. Cómo se lee

- **Prioridad**: P0 = sin esto no hay beta; P1 = entra si hay aire; P2 = fase 2.
- **Tamaño**: S ≈ 0,5 día ideal; M ≈ 1 día; L ≈ 2 días. Un día ideal son 6-8 h concentradas, no un día de calendario.
- **Semana**: semana objetivo del [roadmap](04-roadmap.md), no una promesa.
- Los criterios de aceptación de cada flujo están en el [PRD](01-prd-mvp.md).

El backlog completo suma **≈ 45 días ideales**. Con 25-30 h/semana y IA como multiplicador, entra en 8 semanas ajustadas. Con 15-20 h/semana, el escenario realista es 12 semanas (Plan B del roadmap).

## 2. Escenarios de capacidad

| Escenario | Horas/semana | Duración | Qué cambia |
| --- | --- | --- | --- |
| A · Full-time parcial intenso | 25-30 h | 8 semanas | Plan base; P1 solo si sobra tiempo. |
| B · Ritmo sostenible | 15-20 h | 12 semanas | Mismo alcance, menos presión; beta en enero. |
| C · Aprendizaje | 10-12 h | 16-20 semanas | Recortar comentarios, fotos y búsqueda con filtros. |

## 3. Épicas

| ID | Épica | Resultado | Semanas |
| --- | --- | --- | --- |
| E0 | Fundaciones | Repo, backend, app y auth funcionando. | 1 |
| E1 | Identidad | Perfil musical completo y visible. | 2 |
| E2 | Contenido | Covers, fotos y textos publicados. | 3 |
| E3 | Red | Feed, follows, likes y comentarios. | 4 |
| E4 | Avisos | Búsquedas de integrantes, bandas, productores y clases. | 5 |
| E5 | Notificaciones | Push e historial con deep links. | 6 |
| E6 | Confianza | Reportes, bloqueo, legal y borrado de cuenta. | 6 |
| E7 | Medición | Analítica y errores. | 6 |
| E8 | Beta | 30 usuarios reales y decisión go/no-go. | 7-8 |

## 4. Historias

### E0 · Fundaciones

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-001 | Repo, ramas, CI (lint/typecheck/test) y plantilla de PR | P0 | S | 1 |
| US-002 | Proyecto Supabase dev, migraciones 0001-0002 y seed de catálogos | P0 | M | 1 |
| US-003 | Scaffold Expo + Expo Router + tema + tabs | P0 | M | 1 |
| US-004 | Registro con email OTP, sesión persistente y logout | P0 | L | 1 |
| US-005 | Bienvenida, aceptación de términos y privacidad | P0 | S | 1 |

### E1 · Identidad

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-010 | Trigger de perfil y onboarding (username, foto, instrumentos, géneros, intención) | P0 | M | 2 |
| US-011 | Editar perfil y subir avatar con compresión | P0 | L | 2 |
| US-012 | Catálogo de instrumentos, géneros y niveles | P0 | M | 2 |
| US-013 | Perfil público con grilla, contadores y "estoy buscando" | P0 | M | 2 |
| US-014 | Links externos y compartir perfil con deep link | P0 | S | 2 |
| US-015 | Login con Apple y Google | P0 | M | 2-3 |

### E2 · Contenido

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-020 | Publicar texto y foto con caption y ciudad | P0 | M | 3 |
| US-021 | Grabar o elegir cover, recortar a 60 s y elegir portada | P0 | L | 3 |
| US-022 | Subida con progreso, cancelación, reintento y limpieza de huérfanos | P0 | L | 3 |
| US-023 | Detalle de publicación con reproductor y borrado | P0 | M | 3 |
| US-024 | Grilla de publicaciones en el perfil | P0 | S | 3 |
| US-025 | Publicaciones semilla (15) | P0 | S | 3 |
| US-026 | Guardar publicaciones | P1 | M | 4 |

### E3 · Red

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-030 | Feed "Siguiendo" con paginación por cursor | P0 | M | 4 |
| US-031 | Feed "Descubrir" por ciudad | P0 | M | 4 |
| US-032 | Like optimista con contador | P0 | S | 4 |
| US-033 | Comentarios planos con borrado propio | P0 | M | 4 |
| US-034 | Seguir/dejar de seguir y listas de seguidores | P0 | M | 4 |
| US-035 | Búsqueda de perfiles por texto, instrumento y género | P0 | M | 4 |
| US-036 | Sugerencias de a quién seguir | P0 | S | 4 |
| US-037 | Compartir publicación con link externo | P1 | S | 4 |

### E4 · Avisos

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-040 | Crear aviso con tipo, tags, zona y contacto | P0 | M | 5 |
| US-041 | Listado de avisos con filtros por tipo, instrumento, género y zona | P0 | M | 5 |
| US-042 | Detalle del aviso, "me interesa" y contacto revelado | P0 | L | 5 |
| US-043 | Bandeja de interesados y cierre del aviso | P0 | M | 5 |
| US-044 | Expiración a 30 días y límite de 3 avisos activos | P0 | S | 5 |

### E5 · Notificaciones

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-050 | Registro de tokens y permisos de push | P0 | M | 6 |
| US-051 | Edge Function `send-push` y triggers de notificación | P0 | L | 6 |
| US-052 | Historial in-app, badge y marcar como leído | P0 | M | 6 |
| US-053 | Deep links desde la notificación a post, perfil o aviso | P0 | S | 6 |
| US-054 | Preferencias de notificaciones on/off | P1 | S | 6 |

### E6 · Confianza

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-060 | Reportar post, comentario, perfil o aviso | P0 | M | 6 |
| US-061 | Bloquear usuario y filtrar su contenido | P0 | M | 6 |
| US-062 | Normas de comunidad, términos y privacidad publicados | P0 | S | 6 |
| US-063 | Eliminar cuenta y datos asociados | P0 | M | 6 |
| US-064 | Límites anti-abuso (posts, comentarios, follows, avisos) | P0 | S | 6 |
| US-065 | Flujo de moderación manual en Supabase Studio | P0 | S | 6 |

### E7 · Medición

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-070 | PostHog y eventos del embudo | P0 | M | 6 |
| US-071 | Sentry en builds de producción | P0 | S | 6 |

### E8 · Beta

| ID | Historia | Prioridad | Tamaño | Semana |
| --- | --- | --- | --- | --- |
| US-080 | Reclutar 30-50 testers y 10 creadores semilla | P0 | L | 6-7 |
| US-081 | TestFlight y Play Internal Testing | P0 | M | 6-7 |
| US-082 | Guion de entrevistas y síntesis de aprendizajes | P0 | S | 7 |
| US-083 | Iteración de bugs y fricción de onboarding | P0 | L | 7-8 |
| US-084 | Landing, links de descarga y decisión go/no-go | P0 | S | 8 |

## 5. P1 y P2

**P1 (entra si hay aire):** guardar publicaciones, compartir externo, preferencias de notificación.

**P2 (fase 2):**
- Chat 1:1.
- Perfil de banda con integrantes y administración.
- Comentarios con respuestas e hilos.
- Destacar avisos (monetización manual).
- Verificación de artistas.
- Cuentas privadas.
- Búsqueda de publicaciones.
- Modo claro.

## 6. No ahora

Estas ideas están explícitamente fuera hasta que la beta valide el loop:

- Agenda de shows y venta de entradas.
- Vidriera de cursos con pago.
- Publicidad y promociones self-serve.
- Algoritmo de recomendación.
- Versión web.
- Integración con Spotify/Apple Music.
- Canciones completas.
- Expansión a otras ciudades.
- Suscripción premium.

## 7. Definition of Ready

Una historia entra a la semana cuando:

- [ ] Tiene criterios de aceptación claros.
- [ ] Tiene un wireframe o referencia visual mínima.
- [ ] El modelo de datos necesario está definido.
- [ ] El evento de analítica está definido (si aplica).
- [ ] Las dependencias externas están identificadas.
- [ ] Entra en la capacidad de la semana.

La Definition of Done está en [CONTRIBUTING.md](../CONTRIBUTING.md).
