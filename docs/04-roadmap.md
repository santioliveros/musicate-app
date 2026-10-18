# Roadmap

> Versión 0.1 · 18/10/2026
> Calendario anclado a la semana del **19 de octubre de 2026**. Si el arranque se corre, se corren las fechas.

## 1. Supuestos del plan

**Plan A — 8 semanas.** Asume 25-30 horas efectivas por semana, una persona con experiencia previa en React/TypeScript y la IA como multiplicador. Es un ritmo exigente: equivale a un trabajo part-time intenso.

**Plan B — 12 semanas.** Asume 15-20 horas por semana y el mismo alcance, con menos presión. Es el escenario recomendable si no hay experiencia previa o si el trabajo/tiempo no permite 25 h.

- **Alcance:** beta cerrada con 30 personas, no lanzamiento público.
- **Definición de éxito:** 30 usuarios reales usando la app, con los cuatro flujos críticos funcionando y métricas instrumentadas.

> Reality check: con 10-20 h/semana, 8 semanas no alcanzan para este alcance. El calendario de abajo es el Plan A; si tu disponibilidad es menor, corré las fechas 4 semanas y usá el Plan B (sección 5). La beta cerrada es el objetivo; el lanzamiento público se decide con datos, no con el calendario.

## 2. Hitos

| Hito | Cuándo | Qué tiene que ser verdad |
| --- | --- | --- |
| M0 · Fundaciones documentadas | 18 oct | Docs, ADRs, backlog y repo listos. |
| M1 · Esqueleto | Semana 1 | Login y perfil vacío funcionando en un dispositivo real. |
| M2 · Primera publicación | Semana 3 | Un cover se graba, sube y se ve en el perfil. |
| M3 · Primera red | Semana 4 | Feed "Siguiendo" con follows reales y likes. |
| M4 · Primer aviso | Semana 5 | Aviso publicado, filtrado y respondido con contacto revelado. |
| M5 · Beta lista | Semana 6 | Push, reportes, bloqueo y builds en TestFlight/Play. |
| M6 · Beta cerrada | Semana 7 | 30 personas invitadas, 10 creadores publicando. |
| M7 · Decisión | Semana 8 | Go/no-go a lanzamiento público según métricas. |

## 3. Calendario semana a semana

### Semana 1 · 19-25 oct · Fundaciones

**Objetivo:** que exista el esqueleto técnico y se pueda iniciar sesión en un teléfono.

- Crear repo, `main`, CI (lint, typecheck, test) y plantilla de PR.
- Crear proyecto Supabase dev, migraciones 0001-0002 y seed de catálogos.
- Scaffold Expo + Expo Router + tema + navegación por tabs.
- Auth con email OTP y sesión persistente.
- Pantalla de bienvenida, términos y política de privacidad (borrador).
- Development build de iOS y Android (no Expo Go).

**Salida:** una cuenta nueva se registra, ve un perfil vacío y la sesión sobrevive al reinicio.

**No hacer:** perfiles completos, publicaciones, diseño final.

### Semana 2 · 26 oct-1 nov · Identidad

**Objetivo:** que el perfil musical sea la carta de presentación.

- Trigger de alta de perfil y onboarding (username, foto, instrumentos, géneros, "estoy buscando").
- Edición de perfil y subida de avatar con compresión.
- Ver perfil propio y ajeno, contadores y links externos.
- Compartir perfil con deep link.
- Login con Apple y Google (necesarios para tiendas).
- Primeros 10 perfiles semilla cargados a mano.

**Salida:** un usuario completa su perfil en menos de 3 minutos y otro puede verlo y seguirlo (follow básico).

**No hacer:** feed, publicaciones, avisos.

### Semana 3 · 2-8 nov · Contenido

**Objetivo:** que la app tenga algo para mirar.

- Publicar texto y foto (picker, compresión, subida, borrado).
- Publicar cover: cámara o galería, recorte ≤ 60 s, portada, caption y tags.
- Subida con progreso, cancelación, reintento y limpieza de huérfanos.
- Detalle de publicación con reproductor de video.
- Perfil con grilla de publicaciones.
- 15 publicaciones semilla (covers y fotos) para que el feed no esté vacío.

**Salida:** se publica un cover desde un Android de gama media y se reproduce en otro teléfono.

**Riesgo principal:** peso, codecs y tiempos de subida. Si el video nativo falla, se prueba compresión en cliente o se limita a 30 s.

### Semana 4 · 9-15 nov · Red

**Objetivo:** convertir publicaciones sueltas en un feed.

- Feed "Siguiendo" con paginación por cursor.
- Feed "Descubrir" por ciudad.
- Like optimista, comentarios planos y contadores.
- Seguir/dejar de seguir, listas de seguidores y seguidos.
- Búsqueda de perfiles por nombre, usuario, instrumento y género.
- Sugerencias simples de a quién seguir.
- **Checkpoint de alcance:** si el feed y los comentarios no están estables, se recorta el resto del MVP (Plan B).

**Salida:** con dos cuentas, A sigue a B, ve su cover en "Siguiendo" y le deja un comentario.

### Semana 5 · 16-22 nov · Avisos

**Objetivo:** resolver la necesidad más urgente de la escena: encontrar gente.

- Crear aviso con tipo, instrumento, género, zona, descripción y contacto.
- Listado con filtros y detalle.
- "Me interesa" con mensaje y revelación de contacto para ambas partes.
- Bandeja de interesados para el autor y cierre del aviso.
- Límite de 3 avisos activos y expiración a 30 días.
- 10 avisos semilla reales (con permiso de sus autores).

**Salida:** un aviso de "busco baterista" recibe un interés y ambas personas ven el contacto.

### Semana 6 · 23-29 nov · Confianza y beta

**Objetivo:** que la app sea segura y publicable en tiendas.

- Push notifications (tokens, Edge Function, deep links, historial y badge).
- Reportar contenido y bloquear usuarios; filtrado en feed y perfiles.
- Normas de comunidad, términos y privacidad publicados en URL.
- Eliminar cuenta y datos.
- Límites anti-abuso.
- PostHog + Sentry; eventos del embudo verificados.
- Builds de develop en TestFlight y Play Internal Testing.

**Salida:** build instalable por testers externos, con push y reportes funcionando.

### Semana 7 · 30 nov-6 dic · Beta cerrada

**Objetivo:** 30 personas reales usando la app.

- Invitar a 30-50 personas de la escena; onboarding asistido por videollamada o presencial.
- La beta corre sobre **prod** (build `production`); backup de Supabase antes de invitar.
- 10 creadores comprometidos con publicar al menos un cover.
- Revisar reportes a diario y responder soporte.
- Entrevistas de 15 minutos con 8-10 usuarios.
- Corregir bugs críticos y de fricción; no agregar features.

**Salida:** 30 cuentas activas, 20 publicaciones y 10 avisos con al menos una respuesta.

### Semana 8 · 7-13 dic · Iteración y decisión

**Objetivo:** decidir el futuro con datos, no con cansancio.

- Analizar embudo, retención D7, publicaciones y respuestas.
- Iterar onboarding y feed según entrevistas.
- Preparar landing, links de descarga y guion de lanzamiento.
- Decidir: lanzamiento público en enero/febrero o segunda beta.
- Documentar aprendizajes y actualizar roadmap.

**Salida:** informe de beta con métricas, aprendizajes y decisión go/no-go.

> Diciembre y enero son meses difíciles para lanzar en Uruguay (vacaciones, fiestas). La beta cerrada en diciembre es ideal; el lanzamiento público conviene en febrero.

## 4. Capacidad y prioridades

| Semana | Foco | Historias P0 | P1 si sobra tiempo |
| --- | --- | --- | --- |
| 1 | Fundaciones | US-001 a US-005 | — |
| 2 | Identidad | US-010 a US-015 | — |
| 3 | Contenido | US-020 a US-025 | Guardados |
| 4 | Red | US-030 a US-036 | Compartir externo |
| 5 | Avisos | US-040 a US-044 | — |
| 6 | Confianza | US-050 a US-071 | Preferencias de notificaciones |
| 7 | Beta | US-080 a US-083 | — |
| 8 | Decisión | US-084 y análisis | — |

El detalle está en [Backlog](05-backlog.md).

## 5. Plan B (12 semanas o recorte de alcance)

### 5.1 Si tu disponibilidad es de 15-20 h/semana

Corré el calendario 4 semanas: la beta cerrada pasa de la semana 7 a la semana 11, y la decisión a la semana 12. El alcance no cambia. Es el escenario recomendable para sostener el ritmo sin quemarse.

### 5.2 Si a la semana 4 vas atrasado

Se recorta en este orden, sin tocar los cuatro flujos críticos:

1. **Comentarios** → solo likes en el MVP. Se agrega en la semana 6 si hay aire.
2. **Búsqueda con filtros** → solo búsqueda por texto.
3. **Sugerencias de seguimiento** → lista curada manual de 10 cuentas.
4. **Fotos y crónicas** → solo covers y texto (las fotos vuelven en fase 2).
5. **Historial de notificaciones** → solo push, sin bandeja in-app.

Si aun así no llega, se extiende la beta 2-3 semanas. Es mejor una beta chica y sólida que una app grande y rota.

## 6. Después del MVP

### Fase 2 · Q1 2027 — La red se completa
- Chat 1:1 (la función más pedida después de "me interesa").
- Perfil de banda con integrantes y administración.
- Guardados, compartir externo y notificaciones configurables.
- Mejoras de onboarding y feed.
- Panel de moderación mínimo.

### Fase 3 · Q2 2027 — La escena se organiza
- Shows: agenda, mapa y difusión.
- Cursos: vidriera de profesores y contacto.
- Promociones pagas para artistas, profesores y salas.
- Verificación de artistas y sellos.
- Expansión a Punta del Este y Buenos Aires (probar densidad fuera de MVD).

### Fase 4 · Segundo semestre 2027 — Escala
- Expansión nacional y LATAM.
- Suscripción premium para profesionales.
- Algoritmo de descubrimiento.
- Versión web.

Cada fase empieza solo si la anterior cumplió sus métricas. No se construye la fase 3 con la beta de la fase 1.

## 7. Dependencias externas

| Dependencia | Cuándo se necesita | Notas |
| --- | --- | --- |
| Apple Developer Program | Semana 1-2 | US$ 99/año; la verificación puede demorar. |
| Google Play Console | Semana 2 | US$ 25 único; requiere cuenta de desarrollador. |
| Dominio y redes | Semana 2 | Para landing, términos y privacidad. |
| Asesoría legal | Antes de beta pública | Términos, covers y datos personales. |
| 30 beta testers | Semana 6 | Reclutar desde ahora, no al final. |
| 10 creadores semilla | Semana 3 | Compromiso explícito de publicar. |

## 8. Riesgos del calendario

- **Medios**: la subida de video es la tarea más impredecible. Tiene una semana completa y un plan de recorte.
- **Auth social**: Apple y Google requieren configuración en consolas; se hace en semana 2, no al final.
- **Tiendas**: el primer build de TestFlight puede tardar días. Se empieza en semana 6.
- **Scope creep**: cada idea nueva va al backlog, no al sprint.
- **Vacaciones**: diciembre y enero bajan la actividad de la escena; la beta cerrada no depende de volumen masivo.
