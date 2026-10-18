# ADR-0002 — Contenido generado por usuarios y covers, sin streaming

- **Estado**: aceptada para fase 2 (no aplica al MVP)
- **Fecha**: 18/10/2026
- **Decisores**: fundador del proyecto
- **Revisión**: antes de subir el primer cover

## Contexto

La visión original incluye "publicación de covers" como uno de los propósitos principales. Al mismo tiempo, se descartó compartir canciones o integrar un catálogo de streaming. La app no va a competir con Spotify ni a alojar discos completos.

Esto deja dos caminos:

1. Integrar metadata y previews de Spotify/Apple Music.
2. Alojar contenido propio de los usuarios: covers en video corto, fotos y textos.

La opción 1 reduce el riesgo de derechos, pero convierte a musikate en una capa sobre otro servicio y limita la expresividad. La opción 2 da identidad propia, pero traslada el riesgo legal y de moderación a la plataforma.

## Decisión

**No habrá streaming ni catálogo de canciones.** El contenido es generado por los usuarios: covers en video de hasta 60 segundos (fase 2). No se sube audio completo ni se reproduce música de terceros fuera de los covers.

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| Spotify/Apple Music con previews de 30 s | Dependencia de API, requisitos de licencia y una experiencia partida; no resuelve el relacionamiento. |
| Embeds de YouTube/SoundCloud | Fácil, pero la app se vuelve un agregador de links y pierde control sobre el feed. |
| Solo obras originales | Elimina el riesgo de covers, pero deja afuera la práctica más común de la escena y el contenido que la gente ya produce. |
| Audio completo alojado | Costos, derechos y competencia directa con servicios establecidos. |

## Consecuencias

### Positivas
- Identidad propia: el contenido vive en musikate.
- El cover corto es un formato nativo, barato de producir y fácil de consumir.
- No hay dependencia de APIs de terceros para el contenido central.
- El modelo de datos es simple: un post con un archivo y metadatos.

### Negativas y riesgos
- **Riesgo de derechos de autor**: los covers usan obras de terceros. Requiere términos, notificación y baja, moderación y, antes del lanzamiento público, asesoría legal.
- **Moderación**: UGC obliga a reportar, bloquear y revisar; también es requisito de tiendas.
- **Costos de storage y egress**: el video pesa y se reproduce muchas veces.
- **Calidad variable**: la experiencia depende de la conexión y del dispositivo del usuario.

### Seguimiento
- Revisar el riesgo legal antes de abrir el registro al público.
- Medir el costo de storage por usuario activo en la beta.
- Si los reclamos de copyright crecen, evaluar licencias colectivas o restringir a obras originales.
- Documentar el procedimiento de notificación y baja en [Riesgos y legal](../07-riesgos-legal.md).
