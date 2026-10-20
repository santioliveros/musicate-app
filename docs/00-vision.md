# Visión y estrategia

> Versión 0.2 · 18/10/2026 · Borrador para validar con la escena

## 1. Resumen

`musicate!` es la red social de la escena musical uruguaya. Un lugar para mostrar quién sos, encontrar con quién tocar y seguir lo que pasa.

La visión completa incluye covers verticales, shows y cursos. Pero el MVP arranca por la **utilidad**: perfiles musicales y avisos para encontrar integrantes, bandas, productores y clases. El video vertical llega en fase 2, cuando haya una comunidad usando la app.

El orden cambió por una razón práctica: con 2-3 horas por semana, construir primero el video sería invertir en la parte más cara antes de saber si la escena usa la app. Primero la red, después el escaparate.

## 2. El problema

La escena existe y está activa, pero no tiene infraestructura social:

- **Las bandas se arman por WhatsApp y boca a boca**: "¿conocés un baterista?", "¿quién produce?", "¿quién da clases?".
- **Los covers viven en Instagram**, mezclados con la vida personal y sin contexto musical (instrumento, género, nivel, si busca banda).
- **Los shows se difunden en flyers** que duran 24 horas y no se pueden buscar.
- **Los músicos nuevos no tienen mapa**: no saben quién toca qué, quién enseña, quién produce, dónde tocar.
- **Los fans no tienen un lugar** para descubrir la escena local más allá del algoritmo de turno.

El resultado: mucha actividad, poca memoria y conexiones que dependen de quién conoce a quién.

## 3. La oportunidad

- Montevideo tiene una escena densa y reconocible, con música en vivo casi todos los días.
- Las herramientas existentes están pensadas para artistas consagrados (Spotify, Bandcamp) o para redes generalistas (Instagram, TikTok). Nadie está resolviendo **la conexión musical local**.
- Un nicho chico permite densidad: si en tres meses entran 300 personas correctas de la escena, la app ya sirve. No hace falta masa global.
- El formato vertical corto (cover de 30-60 s) es nativo para esta generación y barato de producir, pero requiere más infraestructura que un aviso.

## 4. Propuesta de valor

### Para músicos y bandas
- Un perfil que muestra lo que hacés y lo que buscás, no solo fotos.
- Avisos de búsqueda con filtros por instrumento, género y zona.
- Una lista de gente de la escena para descubrir con quién tocar.
- Más adelante, un lugar donde publicar covers sin que compitan con tu vida personal.

### Para fans y oyentes
- Descubrir artistas locales y ver quién está activo (fase 2, con video).
- Enterarse de shows y clases (fase 3).

### Para profesores, productores y salas
- Una vidriera con intención: gente que ya está buscando clases, producción o lugar para tocar.
- Promoción segmentada por escena, no publicidad genérica (fase 4).

## 5. Los siete propósitos y su orden

La visión original tiene siete propósitos. El orden importa más que la lista:

| # | Propósito | Fase | Por qué |
| --- | --- | --- | --- |
| 1 | Relacionamiento (conocer gente, formar bandas) | MVP | Es el corazón de la red; sin vínculos no hay comunidad. |
| 5 | Búsqueda de integrantes de banda | MVP | Es la necesidad más concreta y urgente de la escena. |
| 6 | Búsqueda de productor musical | MVP (aviso) | Mismo mecanismo que el anterior; solo cambia la categoría. |
| 3 | Cursos y clases | MVP (aviso) / Fase 3 (vidriera) | El aviso ya resuelve la conexión; la vidriera y el pago llegan después. |
| 2 | Publicación de covers | Fase 2 | Es el motor de engagement, pero el más caro de construir. |
| 4 | Shows en Montevideo | Fase 3 | Requiere agenda, mapas y posible venta de entradas. |
| 7 | Difusión de nueva canción | Fase 3 | Falta definir el formato; puede ser un tipo de video. |

El MVP no construye siete módulos: construye **un perfil y un sistema de avisos** que sirve a los propósitos 1, 3, 5 y 6. Los demás se apoyan sobre esa base.

## 6. Público y mercado inicial

**Beachhead: Montevideo.** No "Uruguay" ni "LATAM" al inicio. La densidad es la ventaja competitiva: es mejor 300 personas de la escena de MVD que 30.000 dispersas.

| Segmento | Quiénes | Rol en el MVP | Prioridad |
| --- | --- | --- | --- |
| Creadores | Músicos, bandas, productores, profesores | Publican avisos y completan perfiles | Primaria |
| Audiencia | Fans, oyentes, estudiantes | Buscan y responden avisos | Secundaria |
| Aliados | Salas, escuelas, colectivos, sellos | Prestan espacio y credibilidad | Tercera |

> La respuesta original fue "público general amante de la música". La lectura de producto es que la app debe ser **fácil para cualquiera**, pero el lanzamiento se enfoca en creadores de la escena porque sin oferta no hay red. Los fans entran con fuerza en fase 2, cuando hay video.

## 7. Principios de producto

1. **La escena primero.** Densidad local antes que escala. Cada decisión se pregunta: ¿esto hace que la escena de MVD esté más conectada?
2. **Utilidad antes que escaparate.** Un aviso respondido vale más que un feed lindo y vacío.
3. **Intención explícita.** "Busco baterista" es tan importante como "mirá mi cover". La app hace visible lo que uno busca.
4. **Menos funciones, mejor loop.** Perfil → aviso → interés → contacto. Todo lo demás espera.
5. **Seguridad desde el día uno.** Reportar, bloquear y moderar no son "para después": son requisito de comunidad.
6. **Hecho con la escena.** Los primeros usuarios son socios, no conejillos de indias.
7. **Ritmo sostenible.** 2-3 horas por semana, un bloque fijo. Mejor avanzar lento y constante que abandonar.

## 8. Hipótesis críticas

| # | Hipótesis | Cómo la validamos | Señal de éxito |
| --- | --- | --- | --- |
| H1 | Los músicos de MVD publican avisos si el formulario es simple. | Alpha con 20-30 personas; medir avisos en 2 semanas. | ≥ 10 avisos publicados. |
| H2 | Los avisos generan respuestas reales. | Medir intereses y contactos revelados. | ≥ 50 % de avisos con 1+ interés. |
| H3 | Un perfil musical genera confianza suficiente para responder. | Entrevistas y tasa de respuesta. | ≥ 5 conexiones reales. |
| H4 | La gente vuelve a ver novedades de su red. | Retención D7. | D7 ≥ 30 %. |
| H5 | El video vertical es el siguiente motor de uso. | Se valida en fase 2, no antes. | Retención y publicaciones de video. |

Si H1 y H2 fallan, el problema no es de features: es de propuesta. Antes de agregar video, hay que corregir el loop.

## 9. No objetivos (por ahora)

- **Streaming**: no vamos a alojar canciones completas ni competir con Spotify.
- **Video en el MVP**: llega en fase 2.
- **Red generalista**: no es un Instagram con filtro musical.
- **Algoritmo**: el MVP usa orden cronológico y filtros simples.
- **Marketplace de entradas**: los shows se difunden, no se venden (fase 3).
- **Expansión internacional**: primero MVD; después Uruguay; después LATAM.
- **Chat completo**: el MVP usa intereses y contacto externo. El chat es fase 3.

## 10. Modelo de negocio (resumen)

Alpha gratuita. La monetización llega cuando hay audiencia y confianza:

1. **Promociones** de artistas, profesores, productores y salas (destacados en avisos y perfiles).
2. **Publicidad musical** segmentada.
3. **Suscripción profesional** y comisiones por clases o entradas (fase 3-4).

Detalle en [Monetización](08-monetizacion.md). No se cobra en la alpha.

## 11. Norte y métricas

**North Star: conexiones musicales semanales.** Personas únicas por semana que publican un aviso o envían un interés. Mide lo que hace valiosa a la red: que la gente intente conectar con otra.

Métricas de apoyo en [Métricas y experimentos](06-metricas-experimentos.md).

## 12. Marca y tono

- **Nombre:** `musicate!`, siempre en minúsculas, incluso al inicio de una oración y en el logo.
- **Tono:** cercano, de escena, sin corporativismo. Español rioplatense. Habla como un músico, no como un community manager.
- **Tagline tentativa:** "tu música, tu gente". Alternativas: "la escena en tus manos", "donde la música se encuentra".
- **Descripción pública:** "La red social para mostrar lo que hacés, encontrar con quién tocar y seguir a la gente de la escena." Sin mención de ciudad ni país.
- **Estética:** clara, con fondo `#FFECE4`, acento `#FFD082` y títulos en `#4A2E00`; el contenido manda. Nada de degradados genéricos ni estética SaaS.
- **Logo y redes:** todavía no existen. Se crean después de la alpha, cuando haya una identidad que valga la pena comunicar.

## 13. Riesgos principales

- **Ancho de banda:** 2-3 h/semana es un ritmo de maratón. El plan está dimensionado para eso y prioriza hitos chicos.
- **Cold start:** sin avisos no hay red; sin red no hay avisos. Mitigación: 10 avisos semilla y 15 perfiles antes de invitar.
- **Construir sin feedback:** la fase 0 y la alpha existen para validar antes de invertir en video.
- **Derechos de autor:** los covers son fase 2; el riesgo legal se aborda antes de subir video.
- **Moderación:** avisos y perfiles pueden usarse para spam o estafas; reportar y bloquear son P0.
- **Scope creep:** siete propósitos compiten por el MVP. El roadmap los ordena; el backlog los contiene.

Detalle en [Riesgos y legal](07-riesgos-legal.md).
