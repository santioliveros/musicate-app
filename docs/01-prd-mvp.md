# PRD — MVP "Semilla"

> Versión 0.1 · 18/10/2026
> Pregunta que responde: **¿la escena musical de Montevideo usa una red vertical para mostrarse y encontrarse?**

## 1. Objetivo

Lanzar en 8-12 semanas (según dedicación) una app móvil (iOS + Android) que permita a 30-50 personas de la escena de Montevideo:

1. crearse un perfil musical,
2. publicar un cover corto, una foto o una crónica,
3. seguir a otros y ver un feed,
4. publicar y responder avisos de búsqueda (integrante, banda, productor, clases).

El éxito no es "tener la app": es que la gente publique, se siga y responda avisos sin que tengamos que empujar cada interacción. Los umbrales están en [Métricas](06-metricas-experimentos.md).

## 2. Alcance

### Dentro del MVP

| Módulo | Qué incluye | Prioridad |
| --- | --- | --- |
| Cuenta | Registro con email, Google y Apple; edad 18+; términos | P0 |
| Perfil | Identidad musical, instrumentos, géneros, "estoy buscando", links | P0 |
| Publicaciones | Cover en video ≤ 60 s, foto, texto; caption y tags | P0 |
| Feed y red | Seguir/dejar de seguir, feed "Siguiendo" y "Descubrir", likes y comentarios | P0 |
| Avisos | Crear, filtrar y responder avisos; contacto externo | P0 |
| Notificaciones | Push e in-app para follows, likes, comentarios e interés | P0 |
| Confianza | Reportar, bloquear, eliminar cuenta, normas de comunidad | P0 |
| Analítica | Eventos del embudo y de uso | P0 |
| Guardados | Guardar publicaciones | P1 |
| Perfil de banda | Página de banda con integrantes | P2 (fase 2) |

### Fuera del MVP

- Chat 1:1 y mensajería.
- Agenda de shows, mapas y venta de entradas.
- Vidriera de cursos con pago.
- Promociones pagas y publicidad.
- Algoritmo de recomendación.
- Versión web.
- Verificación de artistas.
- Canciones completas o integración con Spotify/Apple Music.
- Cuentas privadas.
- Comentarios anidados o hilos.

> **Criterio de corte:** si una función no ayuda a que alguien publique, siga o responda un aviso, no entra al MVP.

## 3. Personas

### Nico — 24, guitarrista, busca banda
Toca hace seis años, tiene temas propios y covers. Está en tres grupos de WhatsApp de "músicos Montevideo". Le da vergüenza publicar en Instagram porque mezcla a la familia con la música. Quiere mostrar lo que hace y encontrar baterista y cantante.

- Necesita: un perfil que hable de su música, ver quién busca lo mismo, un aviso claro.
- Miedo: que la app esté vacía o sea "otra red social".

### Sofi — 29, profesora de canto y productora
Da clases en su casa y produce demos. Consigue alumnos por Instagram y recomendación. Quiere llegar a gente que ya está buscando clases, sin pagar publicidad.

- Necesita: un aviso de "ofrezco clases" con credibilidad (links, fotos, géneros) y un perfil que muestre su trabajo.
- Miedo: que la contacten por curiosidad y no por interés real.

### Fede — 33, fan de la escena
Va a shows dos veces por mes, escucha bandas nuevas y comparte hallazgos. No toca instrumentos. Quiere descubrir artistas locales y enterarse de fechas.

- Necesita: un feed entretenido, perfiles con video, guardar para después.
- Miedo: perderse entre contenido que no le interesa.

## 4. Flujos clave

### 4.1 Onboarding (3 minutos)

1. Abre la app y ve una propuesta breve (3 pantallas máximo).
2. Se registra con email (código), Google o Apple.
3. Acepta términos, privacidad y confirma que tiene 18+.
4. Elige nombre de usuario, foto, instrumentos (1-3), géneros (1-3) y ciudad (Montevideo por defecto).
5. Elige qué busca (opcional): banda, integrantes, productor, clases, nada.
6. Ve 5 perfiles sugeridos y puede seguirlos.
7. Cae en el feed "Descubrir" con contenido semilla.

**Fricción deliberada:** no se puede ver el feed sin cuenta. Simplifica el MVP y permite medir mejor la activación. Se revisa después de la beta.

### 4.2 Publicar un cover

1. Toca "+".
2. Graba con la cámara o elige un video (máx. 60 s).
3. Recorta el fragmento y elige portada.
4. Escribe un caption (máx. 220 caracteres).
5. Agrega instrumento, género y ciudad.
6. Publica y ve el progreso de subida; puede cancelar o reintentar.
7. El post aparece en su perfil y en el feed de sus seguidores.

### 4.3 Buscar integrante

1. Entra a "Avisos" y toca "Publicar aviso".
2. Elige tipo: busco integrante, busco banda, busco productor, ofrezco producción, ofrezco clases, busco clases.
3. Completa instrumento, género, zona, descripción y contacto.
4. El aviso queda visible 30 días y se puede cerrar antes.
5. Otro usuario filtra por instrumento y encuentra el aviso.
6. Toca "Me interesa", escribe un mensaje corto (opcional).
7. El autor recibe una notificación y ve el contacto de quien se interesó; quien se interesó ve el contacto del autor.
8. La conversación sigue por WhatsApp, Instagram o email, fuera de la app.

### 4.4 Descubrir y seguir

1. En "Descubrir" ve publicaciones recientes de Montevideo.
2. Entra a un perfil, ve sus covers y su "estoy buscando".
3. Toca "Seguir".
4. La próxima vez, el feed "Siguiendo" muestra sus publicaciones.

## 5. Requisitos funcionales

Las prioridades usan P0 (sin esto no hay beta), P1 (si hay tiempo), P2 (fase 2).

### RF-01 · Registro y sesión (P0)

- Email con código de un solo uso (OTP), Google y Apple.
- Si se ofrece Google en iOS, Apple es obligatorio por regla de App Store.
- Confirmación de edad 18+ y aceptación de términos y privacidad.
- Sesión persistente; cerrar sesión desde ajustes.
- Recuperación de acceso por email.

**Aceptación**

- [ ] Una persona nueva completa registro y onboarding en menos de 3 minutos.
- [ ] El email se verifica antes de publicar.
- [ ] Los errores de código vencido o incorrecto se explican y permiten reintentar.
- [ ] La sesión sobrevive a cerrar y abrir la app.

### RF-02 · Perfil musical (P0)

Campos:

| Campo | Regla |
| --- | --- |
| Nombre visible | 2-40 caracteres |
| Usuario | 3-20, minúsculas, números y guion bajo; único |
| Bio | 160 caracteres |
| Avatar | Imagen ≤ 5 MB, recorte cuadrado |
| Ciudad | Por defecto Montevideo; lista de ciudades de Uruguay |
| Instrumentos | 1-3, con nivel (principiante, intermedio, avanzado) |
| Géneros | 1-3 |
| Estoy buscando | 0-3 opciones: banda, integrantes, productor, clases, shows |
| Links | Instagram, YouTube, Spotify, sitio (opcional) |

- Ver perfil propio y ajeno, editar el propio.
- Contadores: publicaciones, seguidores, seguidos.
- Compartir perfil con link (`musikate://u/usuario` y link web de fallback).
- Perfiles públicos en el MVP; no hay cuentas privadas.

**Aceptación**

- [ ] Se puede completar el perfil sin publicar nada.
- [ ] Los instrumentos y géneros se eligen de un catálogo, no de texto libre.
- [ ] El usuario ve cómo se ve su perfil como lo ve otro.
- [ ] Un username tomado se rechaza con un mensaje claro.

### RF-03 · Publicar cover (P0)

- Grabar con cámara frontal o trasera, o elegir de la galería.
- Duración máxima: 60 segundos. Formato MP4/MOV, hasta 50 MB.
- Recorte simple y selección de portada.
- Caption ≤ 220 caracteres.
- Tags: un instrumento y un género (opcionales), ciudad.
- Subida con progreso, cancelación y reintento.
- El video se reproduce en el feed sin sonido por defecto; un toque activa el audio.
- Autor puede borrar su publicación.

**Aceptación**

- [ ] Un video de 60 s sube en menos de 90 s en 4G y se reproduce en el feed.
- [ ] Si la subida falla, el usuario puede reintentar sin volver a grabar.
- [ ] El video no se reproduce en looping con audio automático.
- [ ] El post borrado desaparece del feed y del perfil.

### RF-04 · Publicar foto o crónica (P0)

- Foto: imagen ≤ 5 MB, redimensionada a 1440 px de lado mayor.
- Crónica: texto ≤ 500 caracteres, sin imagen.
- Caption ≤ 500 caracteres; ciudad opcional.
- Mismo flujo de subida y borrado que el cover.

**Aceptación**

- [ ] La imagen se comprime antes de subir y no se ve pixelada en el feed.
- [ ] Una crónica se publica en menos de 5 segundos.
- [ ] Los posts de texto no muestran un espacio vacío de imagen.

### RF-05 · Feed (P0)

- Dos pestañas: **Siguiendo** (posts de cuentas seguidas + propios) y **Descubrir** (posts recientes de la ciudad).
- Orden cronológico inverso; sin algoritmo.
- Paginación por cursor, 20 posts por página; pull to refresh.
- Acciones por post: me gusta, comentar, compartir, guardar (P1), reportar, borrar (si es propio).
- Comentarios planos, ≤ 300 caracteres, con borrado propio.
- Contadores de likes y comentarios visibles.
- Estados vacíos con llamada a la acción (seguir gente, publicar).

**Aceptación**

- [ ] El feed carga la primera página en menos de 2 s en 4G.
- [ ] Al llegar al final, se cargan más posts sin saltos.
- [ ] Un post de una cuenta bloqueada no aparece en ningún feed.
- [ ] El feed "Siguiendo" se actualiza al volver de seguir a alguien.

### RF-06 · Red y descubrimiento (P0)

- Seguir y dejar de seguir desde el perfil o el feed.
- Listas de seguidores y seguidos.
- Sugerencias: 5 perfiles de la misma ciudad, priorizando instrumentos complementarios y actividad reciente.
- Búsqueda por nombre, usuario, instrumento y género.
- No hay solicitudes de seguimiento ni cuentas privadas.

**Aceptación**

- [ ] Seguir es inmediato y actualiza los contadores sin recargar.
- [ ] La búsqueda por "baterista" devuelve perfiles con ese instrumento.
- [ ] No se puede seguir a uno mismo ni duplicar el follow.

### RF-07 · Avisos (P0)

Tipos: `busco_integrante`, `busco_banda`, `busco_productor`, `ofrezco_produccion`, `ofrezco_clases`, `busco_clases`.

Campos:

| Campo | Regla |
| --- | --- |
| Título | 6-80 caracteres |
| Descripción | 20-600 caracteres |
| Instrumento | Opcional; catálogo |
| Género | Opcional; catálogo |
| Zona | Barrios de Montevideo o "Remoto" |
| Nombre de banda | Opcional, 2-40 caracteres |
| Contacto | Link de WhatsApp, Instagram o email |
| Vigencia | 30 días; se puede cerrar antes |

- Hasta 3 avisos activos por usuario.
- Filtros: tipo, instrumento, género, zona.
- "Me interesa" con mensaje ≤ 300 caracteres, una vez por aviso.
- El contacto se revela a ambas partes después del interés.
- El autor ve la lista de interesados y puede cerrar el aviso.
- Los avisos vencidos se archivan automáticamente.

**Aceptación**

- [ ] Publicar un aviso toma menos de 90 segundos.
- [ ] El filtro por instrumento y zona devuelve resultados correctos.
- [ ] El autor recibe push al primer interés.
- [ ] Un aviso cerrado no aparece en listados ni acepta nuevos intereses.
- [ ] No se puede ver el contacto sin enviar "me interesa".

### RF-08 · Notificaciones (P0)

- Push (Expo) e historial in-app.
- Tipos: nuevo seguidor, me gusta, comentario, interés en aviso, respuesta a interés, sistema.
- Agrupación de likes y follows en una sola notificación cuando son varios.
- Deep link a la publicación, el perfil o el aviso.
- Preferencia simple: notificaciones on/off.

**Aceptación**

- [ ] La push llega en un dispositivo físico con la app cerrada.
- [ ] Tocar la notificación abre la pantalla correcta.
- [ ] El badge de no leídas se actualiza al entrar.
- [ ] Desactivar notificaciones no borra el historial.

### RF-09 · Confianza y seguridad (P0)

- Reportar publicación, comentario, perfil o aviso con motivo: spam, acoso, desnudez, violencia, derechos de autor, otro.
- Bloquear usuario: oculta su contenido y evita interacciones en ambas direcciones.
- Normas de comunidad y términos accesibles desde ajustes y registro.
- Eliminar cuenta desde ajustes (borra perfil y contenido; ventana de 30 días).
- Moderación manual desde Supabase Studio con estados: pendiente, revisado, accionado, descartado.
- Límites anti-abuso: 10 posts/día, 50 comentarios/día, 100 follows/día, 3 avisos activos.

**Aceptación**

- [ ] Reportar se completa en menos de 4 toques.
- [ ] Bloquear oculta el contenido de inmediato, sin reiniciar la app.
- [ ] Eliminar cuenta pide confirmación escribiendo el usuario.
- [ ] Un reporte queda registrado con contexto (quién, qué, cuándo).

### RF-10 · Analítica (P0)

- Eventos definidos en [Métricas](06-metricas-experimentos.md).
- Identificación por ID anónimo; sin datos sensibles en propiedades.
- Pantalla de consentimiento o aviso en la política de privacidad.

**Aceptación**

- [ ] El embudo registro → perfil completo → primera publicación se puede reconstruir.
- [ ] Los eventos no incluyen captions ni mensajes privados.

## 6. Reglas de negocio

| Tema | Regla |
| --- | --- |
| Edad | 18+ durante la beta. Se revisa antes del lanzamiento público. |
| Visibilidad | Perfiles y publicaciones públicas para usuarios autenticados. |
| Medios | Cover ≤ 60 s y 50 MB; foto ≤ 5 MB; sin audio completo. |
| Textos | Caption de cover 220; crónica 500; comentario 300; aviso 600. |
| Avisos | 30 días de vigencia; 3 activos por usuario; contacto tras interés. |
| Límites | 10 posts/día; 50 comentarios/día; 100 follows/día. |
| Username | Único, inmutable durante la beta salvo error evidente. |
| Contenido | Español rioplatense; sin contenido sexual, violento o de odio. |
| Datos | Sin venta ni uso publicitario de datos personales en la beta. |

## 7. Requisitos no funcionales

- **Rendimiento**: arranque en frío < 3 s en Android de gama media; feed < 2 s en 4G; video empieza en < 1,5 s.
- **Dispositivos**: iOS 16+ y Android 10+; probar en un Android de gama baja real.
- **Accesibilidad**: tipografía dinámica, contraste AA, áreas táctiles de 44 pt, labels en lectores de pantalla.
- **Idioma**: español rioplatense; fechas y números en formato local; textos centralizados para futura traducción.
- **Offline**: el feed cacheado se puede leer; publicar requiere conexión (con mensaje claro).
- **Seguridad**: RLS en todas las tablas; TLS; secretos fuera del bundle; rate limits.
- **Privacidad**: minimización de datos; eliminar cuenta; política publicada.
- **Tiendas**: cumplir la guía 1.2 de Apple (UGC: filtro, reporte, bloqueo, contacto).

## 8. Eventos de analítica

| Evento | Cuándo | Propiedades |
| --- | --- | --- |
| `app_open` | Apertura | origen |
| `sign_up_started` | Toca registrarse | método |
| `sign_up_completed` | Cuenta creada | método |
| `onboarding_completed` | Termina el perfil inicial | instrumentos, géneros |
| `profile_edited` | Guarda cambios | campos |
| `post_created` | Publica | tipo, duración, tags |
| `post_liked` | Da me gusta | tipo de post |
| `comment_created` | Comenta | tipo de post |
| `follow_created` | Sigue | origen (perfil, feed, sugerencia) |
| `feed_viewed` | Abre pestaña | pestaña |
| `search_performed` | Busca | término, resultados |
| `listing_created` | Publica aviso | tipo |
| `listing_viewed` | Abre aviso | tipo |
| `listing_interest_sent` | Envía interés | tipo, tiene mensaje |
| `notification_opened` | Abre desde push | tipo |
| `report_submitted` | Reporta | motivo, target |
| `user_blocked` | Bloquea | origen |

## 9. Criterios de lanzamiento de la beta

- [ ] Los cuatro flujos clave funcionan en iOS y Android reales.
- [ ] RLS probado con dos cuentas: no se ven datos privados ni ajenos.
- [ ] Reportar y bloquear funcionan de punta a punta.
- [ ] Términos, privacidad y normas publicados en una URL accesible.
- [ ] Push funcionando en dispositivo físico.
- [ ] Eventos de analítica del embudo verificados.
- [ ] 30 personas invitadas, con al menos 10 creadores comprometidos.
- [ ] Canal de soporte (WhatsApp o email) y persona responsable.
- [ ] Backups de Supabase activos.
- [ ] Build en TestFlight y Play Internal Testing.

## 10. Supuestos y decisiones abiertas

- 18+ en la beta por riesgo de moderación; se evalúa 16+ al lanzar.
- Perfiles públicos; sin cuentas privadas.
- Sin chat: el contacto es externo tras el interés.
- Comentarios planos, sin hilos.
- Solo español.
- El nombre Musikate es provisorio hasta confirmar marca y dominio.

Las decisiones que faltan están en [Preguntas abiertas](10-preguntas-abiertas.md).
