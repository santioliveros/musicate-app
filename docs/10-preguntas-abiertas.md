# Preguntas abiertas

> Versión 0.2 · 18/10/2026
> Lo que ya está decidido y lo que falta para arrancar la alpha.

## 1. Decidido

- **Dedicación:** 2-3 h/semana, un bloque fijo.
- **Ruta:** utilidad primero. MVP con perfiles + avisos; covers verticales en fase 2 ([ADR-0006](decisiones/0006-ruta-utilidad-first-y-mvp-sin-video.md)).
- **Formato de video (fase 2):** vertical 9:16, ≤ 60 s, estilo TikTok/Reels.
- **Chat 1:1 y perfil de banda:** fase 3, fuera del MVP.
- **Marca:** `musikate`, todo en minúsculas. Sin logo ni redes todavía.
- **Stack:** React Native + Expo + Supabase.
- **Mercado:** Montevideo.
- **Edad:** 18+ en la alpha.
- **Sin streaming** ni canciones completas.
- **Dos entornos:** develop y prod, sin staging.
- **Alpha:** TestFlight/Play Internal, no tiendas públicas.

## 2. Decisiones pendientes

### D1 · ¿Quiénes son los 10 entrevistados de la fase 0?

| Opción | Consecuencia |
| --- | --- |
| 10 personas de la escena, conocidas y no conocidas | Feedback real, no complaciente. |
| Solo amigos | Rápido, pero sesga la validación. |

**Recomendación:** 6 desconocidos + 4 conocidos, todos con actividad musical real. **Bloquea:** el mes 0.

> Estado: ya hubo conversaciones informales con gente del entorno. Faltan las 10 entrevistas formales si se quiere validar con más rigor; no bloquean el scaffold.

### D2 · ¿De dónde salen los 20-30 alpha testers?

| Opción | Consecuencia |
| --- | --- |
| Lista de espera de la fase 0 | Ya están interesados; mejor retención. |
| Grupos de WhatsApp/Instagram de músicos | Volumen, pero menos compromiso. |
| Conocidos del fundador | Fácil, pero poca diversidad. |

**Recomendación:** 70 % de la lista de espera, 30 % de grupos de la escena. **Bloquea:** mes 7.

### D3 · ¿Quién aporta los 10 avisos semilla?

| Opción | Consecuencia |
| --- | --- |
| 10 personas reales con permiso | Contenido creíble y legal. |
| El fundador escribe avisos ficticios | Rápido, pero se nota y confunde. |

**Recomendación:** acordar con 10 personas en la fase 0 y publicar con su nombre. **Bloquea:** mes 4-5.

### D4 · ¿Quién modera y cuánto tiempo por día?

| Opción | Consecuencia |
| --- | --- |
| El fundador, 15 min/día | Sostenible para 20-30 usuarios. |
| Un amigo de confianza | Riesgo de inconsistencia. |
| Nadie | No se puede abrir la alpha. |

**Recomendación:** el fundador con una guía de moderación y 15 minutos diarios. **Bloquea:** mes 8.

### D5 · ¿Presupuesto y cuentas?

| Concepto | Costo |
| --- | --- |
| Apple Developer | US$ 99/año |
| Google Play | US$ 25 único |
| Supabase Pro (prod) | ~US$ 25/mes desde la alpha |
| Dominio | US$ 12-20/año |

**Recomendación:** confirmar ~US$ 125 iniciales y ~US$ 25-35/mes. Sin Apple no hay TestFlight. **Bloquea:** mes 1.

### D6 · ¿Dominio, handles y logo?

| Decisión | Cuándo |
| --- | --- |
| Dominio `.com.uy` / `.com` | Antes de la landing (mes 0). |
| Instagram/TikTok | Mes 0, para la fase de validación. |
| Logo | Después de la alpha; no bloquea. |

**Recomendación:** reservar dominio y handles ahora; logo cuando haya usuarios. **No bloquea** el código.

### D7 · ¿Cuándo entra el abogado?

| Opción | Consecuencia |
| --- | --- |
| Antes de la alpha | Términos y privacidad revisados; costo temprano. |
| Antes de la beta pública | Más barato, pero se corrige sobre la marcha. |

**Recomendación:** términos y privacidad propios para la alpha; revisión legal antes de abrir al público o de subir video (fase 2). **No bloquea** la alpha.

### D8 · ¿Qué significa "promoción de nueva canción"?

| Interpretación | Implicancia |
| --- | --- |
| Publicar un cover o tema propio | Ya cubierto por el video de fase 2. |
| Aviso de "busco difusión" | Nueva categoría de aviso. |
| Lanzamiento con página propia | Fase 3. |

**Recomendación:** tratarlo como video en fase 2; definir en fase 3. **No bloquea.**

### D9 · ¿Qué pasa si la alpha no tracciona?

| Señal | Decisión |
| --- | --- |
| Nadie publica ni responde | Replantear la propuesta antes de invertir en video. |
| Publican pero no vuelven | Mejorar retención y notificaciones. |
| Usan avisos pero piden video | Acelerar fase 2. |

**Recomendación:** decidir con datos en el mes 9-12, no antes. **No bloquea** el arranque.

### D10 · ¿Cuándo se suma ayuda?

| Opción | Consecuencia |
| --- | --- |
| Si la alpha tracciona y no das abasto | Socio técnico o freelancer para video. |
| Si el proyecto se estanca 3 meses | Revisar alcance, no sumar gente por sumar. |

**Recomendación:** definir un umbral de horas y de tracción antes de buscar socio. **No bloquea.**

## 3. Cómo se cierran

1. Se elige una opción y se escribe la decisión en un ADR si es estructural.
2. Se actualizan el PRD, el roadmap y el backlog en el mismo cambio.
3. Se registra en el bloque semanal, aunque sea una nota de tres líneas.
