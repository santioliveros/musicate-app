# Métricas y experimentos

> Versión 0.1 · 18/10/2026
> Si no se mide, no se aprende. Pero medir de más también distrae: estas son las métricas que importan.

## 1. North Star

**Conexiones musicales semanales (CMS):** cantidad de personas únicas por semana que hacen al menos una de estas acciones:

- publican un cover, foto o crónica,
- publican un aviso,
- envían un "me interesa".

No mide descargas ni registros: mide personas haciendo cosas con otras personas. Es la métrica que dice si Musikate es una red y no un catálogo.

**Métrica de volumen de apoyo:** total de acciones de esas tres categorías por semana (una persona puede aportar más de una).

## 2. Embudo de activación

| Paso | Definición | Objetivo beta |
| --- | --- | --- |
| Instalación | Abre la app por primera vez | — |
| Registro | Crea cuenta | ≥ 60 % de instalaciones |
| Onboarding | Completa perfil (instrumentos, géneros, ciudad) | ≥ 80 % de registros |
| Primer follow | Sigue al menos 1 cuenta | ≥ 70 % de onboardings |
| Primera publicación | Publica cover, foto o texto | ≥ 40 % de quienes completaron onboarding |
| Primera conexión | Envía o recibe un interés en aviso | ≥ 30 % de usuarios activos |

## 3. Retención y calidad

| Métrica | Definición | Objetivo beta |
| --- | --- | --- |
| D1 | Vuelve al día siguiente | ≥ 40 % |
| D7 | Vuelve dentro de 7 días | ≥ 25 % |
| D30 | Vuelve dentro de 30 días | ≥ 15 % |
| Sesiones/semana | Aperturas por usuario activo | ≥ 3 |
| Tiempo a primera respuesta | Desde aviso publicado hasta primer interés | < 48 h |
| Avisos respondidos | % de avisos con ≥ 1 interés | ≥ 50 % |
| Invitaciones | % de usuarios que comparte un link | ≥ 20 % |

## 4. Métricas de guardia

Estas no se optimizan: se vigilan. Si empeoran, se frena el lanzamiento.

| Métrica | Umbral |
| --- | --- |
| Sesiones sin crash | ≥ 99,5 % |
| Subidas exitosas | ≥ 95 % |
| Reportes por 100 publicaciones | ≤ 5 |
| Bloqueos por 100 usuarios | ≤ 3 |
| Tiempo de carga del feed (p90) | ≤ 2 s en 4G |
| Latencia de push | ≤ 30 s |

## 5. Métricas de vanidad (ignorar)

- Descargas totales.
- Usuarios registrados sin actividad.
- Impresiones y alcance.
- Likes por publicación (sin contexto de retención).

Se pueden reportar, pero no guían decisiones.

## 6. Eventos

El listado completo está en el [PRD](01-prd-mvp.md#8-eventos-de-analítica). Reglas:

- Un evento por acción de usuario, no por render.
- Propiedades acotadas: tipo, origen, duración, tags. Nunca captions, mensajes ni emails.
- `distinct_id` estable por dispositivo; al registrarse se asocia a la cuenta.
- Los eventos de embudo se validan en un tablero antes de la beta.

## 7. Tablero semanal

Un solo tablero, revisado los lunes:

1. CMS y volumen por tipo de acción.
2. Embudo de activación de la semana.
3. Retención por cohorte semanal.
4. Avisos: publicados, respondidos, tiempo a primera respuesta.
5. Guardia: crashes, subidas fallidas, reportes.
6. Top 5 publicaciones y top 5 avisos (para entender qué funciona).

## 8. Experimentos de la beta

Con 30-50 usuarios no hay significancia estadística para A/B tests finos. Se usan comparaciones secuenciales y entrevistas.

| # | Pregunta | Intervención | Cómo se lee |
| --- | --- | --- | --- |
| E1 | ¿El feed vacío mata la primera visita? | Sembrar 15 publicaciones antes de invitar vs invitar con feed vacío | Retención D1 y primera publicación. |
| E2 | ¿Pedir intención en el onboarding mejora la activación? | Onboarding con "estoy buscando" vs sin ese paso | % que completa y % que publica aviso. |
| E3 | ¿Un aviso destacado en el feed genera respuestas? | Insertar avisos en el feed vs solo en la pestaña | Intereses por aviso. |
| E4 | ¿La invitación de un par convierte mejor? | Links personalizados de creadores vs invitación genérica | Registro y activación por canal. |

## 9. Entrevistas

- 8-10 entrevistas de 15 minutos en la semana 7.
- Guion: qué hacían antes para resolver esto, qué les faltó, qué los haría volver, qué les dio vergüenza.
- No preguntar "¿te gusta la app?". Preguntar por comportamiento pasado.
- Registrar citas textuales; agrupar en temas; no confundir pedidos con necesidades.

## 10. Puertas de decisión

Al final de la semana 8:

| Señal | Decisión |
| --- | --- |
| D7 ≥ 25 %, ≥ 50 % de avisos respondidos, ≥ 10 creadores activos | Lanzamiento público en febrero. |
| Una métrica clave por debajo, pero tendencia positiva | Segunda beta de 4 semanas con foco en esa métrica. |
| H1 y H2 fallan después de dos iteraciones | Replantear la propuesta: la red vertical no está resolviendo el problema. |

La decisión se documenta en un ADR con los datos que la sustentan.
