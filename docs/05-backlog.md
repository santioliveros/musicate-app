# Backlog — MVP v0.1 "La red"

> Versión 0.2 · 18/10/2026
> El backlog es una hipótesis de trabajo. Se revisa al inicio de cada bloque semanal.

## 1. Cómo se lee

- **Prioridad:** P0 = sin esto no hay alpha; P1 = entra si hay aire; P2 = fase 2.
- **Tamaño a 2-3 h/semana:** S ≈ 1 semana; M ≈ 2-3 semanas; L ≈ 4-5 semanas.
- **Fase:** mes del [roadmap](04-roadmap.md).
- Los criterios de aceptación están en el [PRD](01-prd-mvp.md).

El MVP tiene **21 historias** (19 P0 + 2 P1) y suma **≈ 50 semanas de trabajo** a 2-3 h/semana. Con curva de aprendizaje, la alpha cae entre el mes 10 y el 12.

## 2. Capacidad

| Horas/semana | Alpha posible en | Notas |
| --- | --- | --- |
| 2-3 h | 8-12 meses | Plan base; un bloque fijo por semana. |
| 6-8 h | 4-5 meses | Si aparece un periodo con más disponibilidad. |
| 15-20 h | 2-3 meses | Requiere experiencia o ayuda. |
| Socio/freelancer | 2-3 meses | El cuello de botella pasa a ser la coordinación. |

## 3. Épicas

| ID | Épica | Resultado | Fase |
| --- | --- | --- | --- |
| E0 | Validación | Demanda y lista de alpha. | Mes 0 |
| E1 | Fundaciones | Repo, Supabase, Expo y auth. | Mes 1 |
| E2 | Identidad | Perfil musical y búsqueda. | Mes 1-3 |
| E3 | Avisos | Publicar, encontrar y responder. | Mes 3-5 |
| E4 | Red | Follows y Para ti. | Mes 5-6 |
| E5 | Notificaciones | Push e historial. | Mes 6-7 |
| E6 | Confianza | Reportar, bloquear y legal. | Mes 7-8 |
| E7 | Alpha | 20-30 personas usando la app. | Mes 7-9 |
| E8 | Video (fase 2) | Covers verticales y feed. | Mes 12-18 |

## 4. Historias del MVP

### E0 · Validación

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-001 | Landing, waitlist, Instagram y lista de 30 candidatos | P0 | S | Mes 0 |
| US-002 | 10 entrevistas de 15 minutos y síntesis de aprendizajes | P0 | M | Mes 0 |

### E1 · Fundaciones

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-010 | Repo, CI, Supabase dev/prod y migraciones base | P0 | M | Mes 1 |
| US-011 | Scaffold Expo + tema + navegación por tabs | P0 | M | Mes 1 |
| US-012 | Auth email OTP, sesión persistente y términos | P0 | M | Mes 1 |

### E2 · Identidad

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-020 | Onboarding y perfil musical completo | P0 | L | Mes 1-2 |
| US-021 | Perfil público, edición, avatar y compartir | P0 | M | Mes 2 |
| US-022 | Búsqueda de perfiles por texto, instrumento y género | P0 | M | Mes 3 |

### E3 · Avisos

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-030 | Crear aviso y "mis avisos" | P0 | M | Mes 3 |
| US-031 | Listado, filtros y detalle del aviso | P0 | M | Mes 4 |
| US-032 | Me interesa, contacto, bandeja y cierre | P0 | L | Mes 4-5 |

### E4 · Red

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-040 | Follows, listas y Para ti | P0 | M | Mes 5-6 |
| US-041 | Perfiles nuevos y sugerencias simples | P0 | S | Mes 6 |

### E5 · Notificaciones

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-050 | Push con Expo y Edge Function | P0 | M | Mes 6 |
| US-051 | Historial in-app, deep links y preferencias | P0 | M | Mes 7 |

### E6 · Confianza

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-060 | Reportar, bloquear y filtrar contenido | P0 | M | Mes 7 |
| US-061 | Eliminar cuenta, límites y moderación en Studio | P0 | M | Mes 8 |

### E7 · Alpha

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-070 | 15 perfiles y 10 avisos semilla + builds de TestFlight/Play | P0 | M | Mes 8 |
| US-071 | Alpha con 20-30 personas, entrevistas e iteración | P0 | L | Mes 8-9 |

### P1

| ID | Historia | Prioridad | Tamaño | Fase |
| --- | --- | --- | --- | --- |
| US-072 | Compartir perfil y aviso con link externo | P1 | S | Mes 7 |
| US-073 | Preferencias de notificaciones on/off | P1 | S | Mes 7 |

## 5. Fase 2 · Video (no ahora)

| ID | Historia | Tamaño | Fase |
| --- | --- | --- | --- |
| US-080 | Grabar/elegir video vertical 9:16, recortar ≤ 60 s y subir | L | Mes 12-14 |
| US-081 | Feed full-screen con swipe, autoplay muted y tap para audio | L | Mes 14-16 |
| US-082 | Likes y comentarios | M | Mes 15-16 |
| US-083 | Moderación de video y procedimiento de copyright | M | Mes 16-17 |
| US-084 | Beta con video y 50-100 personas | L | Mes 17-18 |

## 6. No ahora

- Chat 1:1.
- Perfil de banda con administración.
- Fotos y crónicas.
- Eventos y venta de entradas.
- Vidriera de cursos con pago.
- Promociones y publicidad.
- Algoritmo de recomendación.
- Versión web.
- Cuentas privadas.
- Verificación de artistas.
- Suscripción premium.

## 7. Definition of Ready

Una historia entra al bloque semanal cuando:

- [ ] Tiene criterios de aceptación claros.
- [ ] Tiene un wireframe o referencia visual mínima.
- [ ] El modelo de datos necesario está definido.
- [ ] El evento de analítica está definido (si aplica).
- [ ] Entra en 1-3 semanas de trabajo.
- [ ] No depende de una decisión abierta.

La Definition of Done está en [CONTRIBUTING.md](../CONTRIBUTING.md).
