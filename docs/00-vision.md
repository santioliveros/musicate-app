# Visión y estrategia

> Versión 0.1 · 18/10/2026 · Borrador para validar con la escena

## 1. Resumen

Musikate es la red social de la escena musical uruguaya. Un lugar para mostrar lo que uno hace, encontrar con quién hacerlo y seguir a la gente que lo hace posible.

Arranca en Montevideo con tres verbos: **mostrar** (covers, fotos, crónicas), **encontrar** (integrantes, bandas, productores, clases) y **seguir** (feed de personas y proyectos). Los shows, los cursos y las promociones pagas llegan después, cuando la escena ya esté adentro.

## 2. El problema

La escena existe y está activa, pero no tiene infraestructura social:

- **Los covers viven en Instagram**, mezclados con la vida personal y sin contexto musical (instrumento, género, nivel, si busca banda).
- **Las bandas se arman por WhatsApp y boca a boca**: "¿conocés un baterista?", "¿quién produce?", "¿quién da clases?".
- **Los shows se difunden en flyers** que duran 24 horas y no se pueden buscar.
- **Los músicos nuevos no tienen mapa**: no saben quién toca qué, quién enseña, quién produce, dónde tocar.
- **Los fans no tienen un lugar** para descubrir la escena local más allá del algoritmo de turno.

El resultado: mucha actividad, poca memoria y conexiones que dependen de quién conoce a quién.

## 3. La oportunidad

- Montevideo tiene una escena densa y reconocible, con música en vivo casi todos los días.
- Las herramientas existentes están pensadas para artistas consagrados (Spotify, Bandcamp) o para redes generalistas (Instagram, TikTok). Nadie está resolviendo **la conexión musical local**.
- Un nicho chico permite densidad: si en tres meses entran 300 personas correctas de la escena, la app ya sirve. No hace falta masa global.
- El formato vertical corto (cover de 30-60 s) es nativo para esta generación y barato de producir.

## 4. Propuesta de valor

### Para músicos y bandas
- Un perfil que muestra lo que hacés y lo que buscás, no solo fotos.
- Un lugar donde publicar covers sin que compitan con el resto de tu vida social.
- Avisos de búsqueda con filtros por instrumento, género y zona.
- Un feed de gente de la escena para descubrir con quién tocar.

### Para fans y oyentes
- Descubrir artistas locales antes de que exploten.
- Ver covers y contenido detrás de escena.
- Enterarse de shows y clases (fase 2 y 3).

### Para profesores, productores y salas
- Una vidriera con intención: gente que ya está buscando clases, producción o lugar para tocar.
- Promoción segmentada por escena, no publicidad genérica (fase 3).

## 5. Los siete propósitos y su orden

La visión original tiene siete propósitos. El orden importa más que la lista:

| # | Propósito | Fase | Por qué |
| --- | --- | --- | --- |
| 1 | Relacionamiento (conocer gente, formar bandas) | MVP | Es el corazón de la red; sin vínculos no hay comunidad. |
| 2 | Publicación de covers | MVP | Es el contenido que hace visible a la gente y alimenta el feed. |
| 5 | Búsqueda de integrantes de banda | MVP | Es la necesidad más concreta y urgente de la escena. |
| 6 | Búsqueda de productor musical | MVP (aviso) | Mismo mecanismo que el anterior; solo cambia la categoría. |
| 3 | Cursos y clases | MVP (aviso) / Fase 3 (vidriera) | El aviso ya resuelve la conexión; la vidriera y el pago llegan después. |
| 4 | Shows en Montevideo | Fase 3 | Requiere agenda, mapas y posible venta de entradas. |
| 7 | Difusión de nueva canción | Fase 3 | Falta definir el formato; puede ser un tipo de publicación. |

El MVP no construye siete módulos: construye **un perfil, un feed y un sistema de avisos** que sirve a los propósitos 1, 2, 5 y 6. Los demás se apoyan sobre esa base.

## 6. Público y mercado inicial

**Beachhead: Montevideo.** No "Uruguay" ni "LATAM" al inicio. La densidad es la ventaja competitiva: es mejor 300 personas de la escena de MVD que 30.000 dispersas.

| Segmento | Quiénes | Rol en el MVP | Prioridad |
| --- | --- | --- | --- |
| Creadores | Músicos, bandas, productores, profesores | Generan el contenido y los avisos | Primaria |
| Audiencia | Fans, oyentes, estudiantes | Consumen, siguen y responden | Secundaria |
| Aliados | Salas, escuelas, colectivos, sellos | Prestan espacio y credibilidad | Tercera |

> La respuesta original fue "público general amante de la música". La lectura de producto es que la app debe ser **fácil para cualquiera**, pero el lanzamiento se enfoca en creadores de la escena porque sin oferta no hay red. Esto se valida en la beta.

## 7. Principios de producto

1. **La escena primero.** Densidad local antes que escala. Cada decisión se pregunta: ¿esto hace que la escena de MVD esté más conectada?
2. **Mostrar, no lucirse.** Un cover grabado con el celular vale. La app no debe exigir producción.
3. **Intención explícita.** "Busco baterista" es tan importante como "mirá mi cover". La app hace visible lo que uno busca.
4. **Menos funciones, mejor loop.** Tres verbos en el MVP. Todo lo demás espera.
5. **Seguridad desde el día uno.** Reportar, bloquear y moderar no son "para después": son requisito de tienda y de comunidad.
6. **Hecho con la escena.** Los primeros usuarios son socios, no conejillos de indias.

## 8. Hipótesis críticas

| # | Hipótesis | Cómo la validamos | Señal de éxito |
| --- | --- | --- | --- |
| H1 | Los músicos de MVD publican covers si el formato es simple y la audiencia es local. | Beta con 30 creadores; medir publicación en 48 h. | ≥ 40 % publica al menos un cover. |
| H2 | Los avisos de "busco integrante/banda" generan respuestas reales. | 10 avisos semilla; medir "me interesa" y conversaciones. | ≥ 50 % de avisos con 1+ respuesta. |
| H3 | El feed mixto (covers + avisos) hace que la gente vuelva. | Retención D7 y D30 de la beta. | D7 ≥ 25 %. |
| H4 | La gente comparte la app con su círculo musical. | Links de invitación y menciones. | ≥ 20 % de usuarios invita. |

Si H1 y H2 fallan, el problema no es de features: es de propuesta. Antes de agregar módulos, hay que corregir el loop.

## 9. No objetivos (por ahora)

- **Streaming**: no vamos a alojar canciones completas ni competir con Spotify. Los covers son fragmentos cortos.
- **Red generalista**: no es un Instagram con filtro musical. Si el contenido no es musical, no entra.
- **Algoritmo**: el MVP usa orden cronológico y filtros simples. El algoritmo es un problema de escala, no de validación.
- **Marketplace de entradas**: los shows se difunden, no se venden (fase 3).
- **Expansión internacional**: primero MVD; después Uruguay; después LATAM.
- **Chat completo**: el MVP usa comentarios y contacto externo. El chat 1:1 es la primera apuesta post-MVP.

## 10. Modelo de negocio (resumen)

Beta gratuita. La monetización llega cuando hay audiencia y confianza:

1. **Promociones** de artistas, profesores, productores y salas (destacados en el feed y en avisos).
2. **Publicidad musical** segmentada (sellos, instrumentos, escuelas, ticketeras).
3. **Tiendas de apps** como canal de distribución y, más adelante, de suscripciones.

Detalle en [Monetización](08-monetizacion.md).

## 11. Norte y métricas

**North Star: conexiones musicales semanales.** La suma de publicaciones, avisos y respuestas a avisos por semana. Mide lo que hace valiosa a la red: que la gente haga cosas con otra gente.

Métricas de apoyo en [Métricas y experimentos](06-metricas-experimentos.md).

## 12. Marca y tono

- **Nombre**: Musikate (a confirmar disponibilidad de dominio y usuario).
- **Tono**: cercano, de escena, sin corporativismo. Español rioplatense. Habla como un músico, no como un community manager.
- **Tagline tentativa**: "Tu música, tu gente." Alternativas: "La escena en tus manos", "Donde la música se encuentra".
- **Estética**: oscura, contrastada, con acento vibrante; el contenido manda. Nada de degradados genéricos ni estética SaaS.

## 13. Riesgos principales

- **Cold start**: sin contenido no hay red; sin red no hay contenido. Mitigación: siembra manual de 50 creadores.
- **Derechos de autor**: los covers son contenido de terceros. Requiere términos, notificación y baja, y asesoría legal antes del lanzamiento público.
- **Moderación**: UGC en una app social exige reportar, bloquear y moderar (también por reglas de tienda).
- **Scope creep**: siete propósitos compiten por el MVP. El roadmap los ordena; el backlog los contiene.
- **Ancho de banda**: una sola persona construyendo. El plan está dimensionado para 10-20 h/semana y tiene Plan B.

Detalle en [Riesgos y legal](07-riesgos-legal.md).
