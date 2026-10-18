# ADR-0004 — Alcance y recortes del MVP

- **Estado**: reemplazada por [ADR-0006](0006-ruta-utilidad-first-y-mvp-sin-video.md)
- **Fecha**: 18/10/2026
- **Decisores**: fundador del proyecto
- **Revisión**: checkpoint de la semana 4

> **Nota:** esta decisión describía un MVP con covers, fotos y feed. La ruta cambió por la disponibilidad real de 2-3 h/semana: el MVP pasa a perfiles + avisos y el video a fase 2. Se conserva como historial.

## Contexto

La visión tiene siete propósitos: relacionamiento, covers, cursos, shows, integrantes de banda, productores y difusión de canciones nuevas. Construirlos todos en 8 semanas con una sola persona es inviable. Además, el éxito de una red social depende de un loop simple que funcione, no de la cantidad de módulos.

Las respuestas del fundador priorizan tres propósitos para la base: **relacionamiento, publicación de covers y búsqueda de integrantes de banda**. El MVP también incluye fotos y crónicas de shows como formato de publicación, y follows con feed.

## Decisión

El MVP se organiza alrededor de tres verbos:

1. **Mostrar**: perfil musical + publicaciones (cover ≤ 60 s, foto, texto).
2. **Encontrar**: avisos de integrante, banda, productor y clases.
3. **Seguir**: follows, feed "Siguiendo" y "Descubrir", likes y comentarios.

Quedan **fuera del MVP**:

- Chat 1:1 y mensajería.
- Perfil de banda con administración.
- Agenda de shows y venta de entradas.
- Vidriera de cursos con pago.
- Promociones pagas y publicidad.
- Algoritmo de recomendación.
- Versión web y cuentas privadas.
- Canciones completas o integración con Spotify/Apple Music.

El contacto ocurre por comentarios y por el "me interesa" de los avisos, que revela links externos (WhatsApp, Instagram, email).

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| Incluir chat en el MVP | Suma realtime, push, moderación de mensajes y reportes; 1-2 semanas que retrasan la beta. |
| Incluir perfil de banda | Agrega entidades, roles y permisos; el aviso con nombre de banda cubre la necesidad inicial. |
| Incluir shows y cursos | Duplica el alcance y requiere pagos, mapas o calendarios; no valida el loop central. |
| Lanzar solo un portfolio | No genera red ni conversación; es el problema que ya resuelve Instagram. |

## Consecuencias

### Positivas
- Un loop claro y medible: publicar → seguir → descubrir → avisar → responder.
- Menos superficie de moderación y menos riesgo legal.
- Beta más rápida y con más probabilidad de aprendizaje.
- El backlog de fase 2 queda armado con lo que la beta pida.

### Negativas y riesgos
- La experiencia de "conocer gente" queda incompleta sin chat; se apuesta al contacto externo.
- Los usuarios pueden pedir shows y cursos desde el día uno.
- El recorte puede quedarse corto si la escena necesita el perfil de banda para publicar avisos creíbles.

### Seguimiento
- **Semana 4**: si el feed y las publicaciones no están estables, se aplica el Plan B del roadmap (sin comentarios, sin fotos, sin búsqueda con filtros).
- **Semana 8**: decidir la primera función de fase 2 con datos de la beta; la hipótesis es chat 1:1 o perfil de banda.
- Revisar este ADR si aparece una necesidad de negocio que justifique adelantar shows o cursos.
