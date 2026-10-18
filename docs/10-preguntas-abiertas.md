# Preguntas abiertas

> Versión 0.1 · 18/10/2026
> Decisiones que faltan para pasar de los docs al código. Cada una tiene una recomendación; la idea es confirmarlas o corregirlas.

## 1. Ya decidido

- Stack: React Native + Expo + Supabase ([ADR-0001](decisiones/0001-stack-react-native-expo-supabase.md)).
- Sin streaming ni canciones completas; covers cortos de usuarios ([ADR-0002](decisiones/0002-contenido-ugc-y-covers.md)).
- Montevideo como mercado inicial ([ADR-0003](decisiones/0003-beachhead-montevideo.md)).
- MVP con perfiles, publicaciones, feed, follows y avisos ([ADR-0004](decisiones/0004-alcance-del-mvp.md)).
- Beta 18+, perfiles públicos, sin chat, comentarios planos.
- Español rioplatense.

## 2. Decisiones pendientes

### D1 · ¿Cuántas horas reales por semana?

| Opción | Consecuencia |
| --- | --- |
| 25-30 h | Plan A de 8 semanas. |
| 15-20 h | Plan B de 12 semanas. |
| 10-12 h | 16-20 semanas y recorte de alcance. |

**Recomendación:** elegir el escenario realista, no el deseado. **Bloquea:** el calendario y el tamaño del MVP.

### D2 · ¿Qué formato tiene el cover?

| Opción | Consecuencia |
| --- | --- |
| Video vertical ≤ 60 s | Formato nativo, más engagement, más costo de storage. |
| Video + audio | Más simple de producir, pero la app pierde el componente visual. |
| Solo video | Más fácil de moderar y de mostrar. |

**Recomendación:** video vertical ≤ 60 s, con portada. El audio solo se evalúa en fase 2. **Bloquea:** el modelo de medios y la pantalla de creación.

### D3 · ¿Chat 1:1 en el MVP?

| Opción | Consecuencia |
| --- | --- |
| No; contacto externo tras "me interesa" | Ahorra 1-2 semanas y evita moderar mensajes privados. |
| Sí, chat básico | Mejora la conexión, pero agrega realtime, push, reportes y moderación. |

**Recomendación:** no en el MVP. El "me interesa" revela contactos y deriva a WhatsApp/Instagram. El chat es la primera función de la fase 2. **Bloquea:** alcance de la semana 5.

### D4 · ¿Perfil de banda en el MVP?

| Opción | Consecuencia |
| --- | --- |
| No; el aviso lleva el nombre de la banda | Menos entidades y permisos. |
| Sí, perfil de banda con integrantes | Más completo, pero suma 1-2 semanas y administración de roles. |

**Recomendación:** no. El aviso de "busco integrante" incluye `band_name` y cubre la necesidad. **Bloquea:** modelo de datos de la semana 2.

### D5 · ¿Público inicial: escena de MVD o todo Uruguay?

| Opción | Consecuencia |
| --- | --- |
| MVD y área metropolitana | Densidad, eventos y boca a boca. |
| Todo Uruguay | Más alcance, menos densidad y más dispersión. |

**Recomendación:** MVD primero; el resto del país entra cuando haya 300 usuarios activos. **Bloquea:** onboarding, ciudad por defecto y contenido semilla.

### D6 · ¿Edad mínima 18+ en la beta?

| Opción | Consecuencia |
| --- | --- |
| 18+ | Menos riesgo de moderación y consentimiento. |
| 16+ | Más audiencia, más obligaciones de protección. |

**Recomendación:** 18+ en la beta; revisar antes del lanzamiento público con asesoría legal. **Bloquea:** registro y clasificación de tienda.

### D7 · ¿El nombre Musikate es definitivo?

| Opción | Consecuencia |
| --- | --- |
| Sí | Avanzar con dominio, logo y redes. |
| No | Definir antes de invertir en identidad visual. |

**Recomendación:** hacer una búsqueda rápida de marca y dominio antes de encargar logo. **Bloquea:** landing y tiendas.

### D8 · ¿Quién graba el contenido semilla?

| Opción | Consecuencia |
| --- | --- |
| El fundador + 5 creadores con permiso | 15 publicaciones reales y credibilidad. |
| Solo el fundador | Rápido, pero se nota artificial. |
| Contenido de terceros sin permiso | Riesgo legal inaceptable. |

**Recomendación:** acordar con 5 creadores antes de la semana 3. **Bloquea:** feed de la beta.

### D9 · ¿Quién modera y cuánto tiempo por día?

| Opción | Consecuencia |
| --- | --- |
| El fundador, 30 min/día | Sostenible para 30-50 usuarios. |
| Un moderador voluntario | Riesgo de inconsistencia y dependencia. |
| Nadie | No se puede lanzar. |

**Recomendación:** el fundador con un ritual diario y una guía de moderación. **Bloquea:** lanzamiento de la beta.

### D10 · ¿Qué significa "promoción de nueva canción"?

| Interpretación | Implicancia |
| --- | --- |
| Publicar un cover o tema propio | Ya cubierto por publicaciones. |
| Aviso de "busco difusión" | Nueva categoría de aviso. |
| Lanzamiento con página propia | Fase 2-3. |

**Recomendación:** tratarlo como publicación por ahora y definir el formato en fase 3. **No bloquea** el MVP.

### D11 · ¿Presupuesto y cuentas de desarrollador?

| Concepto | Costo |
| --- | --- |
| Apple Developer | US$ 99/año |
| Google Play | US$ 25 único |
| Supabase Pro | US$ 25/mes desde la beta |
| Dominio | US$ 12-20/año |

**Recomendación:** confirmar el gasto antes de la semana 1; sin Apple no hay TestFlight. **Bloquea:** builds de iOS.

## 3. Cómo se cierran

1. Se elige una opción y se escribe la decisión en un ADR si es estructural.
2. Se actualizan el PRD, el roadmap y el backlog en el mismo cambio.
3. Se avisa en el canal de trabajo (aunque seas una sola persona: deja registro).
