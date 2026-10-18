# ADR-0006 — Ruta utilidad-first y MVP sin video

- **Estado**: aceptada
- **Fecha**: 18/10/2026
- **Decisores**: fundador del proyecto
- **Revisión**: mes 9-12, con datos de la alpha

## Contexto

El fundador dispone de **2-3 horas por semana** y tiene experiencia de tutoriales y proyectos chicos. El plan anterior asumía 8-12 semanas a tiempo completo parcial y un MVP con covers verticales, fotos, feed, avisos y notificaciones. Con la disponibilidad real, ese alcance llevaría entre 15 y 24 meses.

Las opciones eran:

1. **Utilidad primero:** perfiles + avisos + follows; alpha en 8-12 meses; video después.
2. **Video primero:** covers + feed + follows; beta en 12-15 meses; avisos después.
3. **Todo junto:** MVP completo en 18-24 meses, sin versión intermedia.
4. **Buscar ayuda o más horas:** socio, freelancer o subir a 8-10 h/semana.

El fundador eligió la ruta 1.

## Decisión

El MVP v0.1 "La red" construye:

- Registro con email OTP y perfil musical.
- Avisos para buscar integrante, banda, productor o clases.
- Follows y pantalla "Novedades" (avisos de tu red + perfiles nuevos).
- Notificaciones push e in-app.
- Reportar, bloquear y eliminar cuenta.
- Analítica y alpha privada con 20-30 personas.

Quedan fuera del MVP:

- **Covers y video vertical** (fase 2).
- Fotos, crónicas, likes y comentarios.
- Chat 1:1 y perfil de banda (fase 3).
- Eventos, cursos y pagos.
- Login con Google/Apple (fase 2, antes de tiendas).

El plan es por hitos, no por fechas: alpha en 8-12 meses, beta con video en 15-18. Si el fundador consigue más horas o ayuda, se acelera sin cambiar el orden.

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| Video primero | Es la parte más cara y la que más se estira; a 2-3 h/semana, tardaría meses en haber feedback real. |
| Todo junto | 18-24 meses sin versión intermedia; alta probabilidad de abandonar antes de lanzar. |
| No-code (FlutterFlow, Glide) | Más rápido para un prototipo, pero el video y la personalización se vuelven un techo; se puede evaluar para la fase 0. |
| Buscar socio/freelancer ahora | Válido, pero el fundador prefirió avanzar solo y decidir más adelante. |

## Consecuencias

### Positivas
- Feedback real en el mes 8-12, no en el 18.
- Menor riesgo técnico: sin video, sin transcodificación, sin copyright.
- Se valida la necesidad más urgente (encontrar gente) antes de invertir en engagement.
- El modelo de datos y la arquitectura dejan espacio para agregar video sin romper lo anterior.
- El ritmo de 2-3 h/semana es sostenible con hitos chicos.

### Negativas y riesgos
- La app no tiene el gancho visual del video; puede costar atraer fans.
- Si la escena solo quiere video, la alpha lo va a mostrar tarde (mes 8).
- El video llega en 2028; el mercado puede cambiar.
- Sin chat, la conexión depende de WhatsApp/Instagram externos.

### Seguimiento
- **Mes 9-12:** decidir si se invierte en video según D7, avisos respondidos y conexiones.
- Si la alpha no tracciona, replantear la propuesta antes de construir video.
- Si el fundador consigue 8-10 h/semana, reestimar el calendario, no el alcance.
- Revisar este ADR si aparece un socio o financiamiento.
