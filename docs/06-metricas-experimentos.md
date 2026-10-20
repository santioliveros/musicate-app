# Métricas y experimentos

> Versión 0.2 · 18/10/2026
> En la alpha no se mide vanidad: se mide si la gente encuentra y responde.

## 1. North Star

**Conexiones musicales semanales (CMS):** cantidad de personas únicas por semana que hacen al menos una de estas acciones:

- publican un aviso,
- envían un "me interesa".

No cuenta follows ni visitas: cuenta personas que intentan conectar con otra. Es la señal de que `musicate!` sirve como red y no como vidriera.

**Apoyo:** perfiles completos, avisos activos y follows.

## 2. Embudo de activación

| Paso | Definición | Objetivo alpha |
| --- | --- | --- |
| Lista de espera → instalación | Instala el build de alpha | ≥ 60 % de invitados |
| Instalación → registro | Crea cuenta | ≥ 70 % |
| Registro → onboarding | Completa perfil | ≥ 80 % |
| Onboarding → primer follow | Sigue a 1+ perfil | ≥ 60 % |
| Onboarding → primera conexión | Publica aviso o envía interés | ≥ 30 % |
| D7 | Vuelve dentro de 7 días | ≥ 30 % |

## 3. Métricas de la alpha

| Métrica | Definición | Objetivo |
| --- | --- | --- |
| Perfiles completos | Instrumentos + géneros + foto | ≥ 15 de 25 registrados |
| Avisos publicados | Total en las primeras 2 semanas | ≥ 10 |
| Avisos respondidos | % con ≥ 1 interés | ≥ 50 % |
| Tiempo a primera respuesta | Desde publicación hasta primer interés | < 48 h |
| Conexiones reales | Intercambios con contacto revelado | ≥ 5 |
| Follows por usuario | Promedio | ≥ 3 |
| Invitaciones | % que comparte un link | ≥ 20 % |

## 4. Métricas de guardia

| Métrica | Umbral |
| --- | --- |
| Sesiones sin crash | ≥ 99,5 % |
| Reportes por 100 avisos | ≤ 5 |
| Bloqueos por 100 usuarios | ≤ 3 |
| Carga de listas (p90) | ≤ 1,5 s en 4G |
| Latencia de push | ≤ 30 s |

## 5. Eventos

El listado completo está en el [PRD](01-prd-mvp.md#9-eventos-de-analítica). Reglas:

- Un evento por acción, no por render.
- Propiedades acotadas: tipo, origen, cantidad de resultados.
- Nunca descripciones de avisos, mensajes ni emails.
- `distinct_id` estable por dispositivo; al registrarse se asocia a la cuenta.

## 6. Tablero semanal

Un solo tablero, revisado en el bloque semanal:

1. CMS y avisos/intereses de la semana.
2. Embudo de activación.
3. Retención D7 de la cohorte.
4. Avisos: publicados, respondidos, tiempo a primera respuesta.
5. Guardia: crashes, reportes.
6. Top 5 avisos y top 5 perfiles (para entender qué busca la escena).

## 7. Experimentos

Con 20-30 usuarios no hay A/B tests finos. Se comparan secuencias y se entrevista.

| # | Pregunta | Intervención | Cómo se lee |
| --- | --- | --- | --- |
| E1 | ¿El problema justifica una app? | 10 entrevistas en fase 0 | Cuántos describen el dolor sin que lo nombres. |
| E2 | ¿Una app vacía mata la primera visita? | Sembrar 10 avisos y 15 perfiles antes de invitar | Activación y D7. |
| E3 | ¿Pedir intención en el onboarding mejora la conexión? | Onboarding con "estoy buscando" vs sin ese paso | % que publica aviso o envía interés. |
| E4 | ¿La gente vuelve por Para ti o por búsqueda? | Medir origen de la sesión | Sesiones por pestaña y D7. |

## 8. Entrevistas

- 10 en fase 0, 8-10 en la alpha.
- 15 minutos, preguntas sobre comportamiento pasado.
- Guion: qué hacían antes para buscar banda/profesor/productor, qué les faltó, qué los haría volver, qué les dio vergüenza.
- No preguntar "¿te gusta la app?". Preguntar qué hicieron con ella.
- Registrar citas textuales y agrupar en temas.

## 9. Puertas de decisión

Al final de la fase 5 (mes 9-12):

| Señal | Decisión |
| --- | --- |
| D7 ≥ 30 %, ≥ 50 % de avisos respondidos, ≥ 5 conexiones | Invertir en video (fase 6). |
| Una métrica floja pero con tendencia positiva | Segunda alpha de 4-6 semanas con foco en esa métrica. |
| Nadie publica ni responde después de dos iteraciones | Replantear la propuesta: la red de avisos no resuelve el problema. |

La decisión se documenta en un ADR con los datos que la sustentan.
