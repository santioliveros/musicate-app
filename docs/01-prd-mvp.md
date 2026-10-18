# PRD — MVP v0.1 "La red"

> Versión 0.2 · 18/10/2026
> **Cambio de ruta:** utilidad primero. El MVP valida la red (perfiles + avisos), no el formato audiovisual. Los covers verticales son fase 2.

## 1. Objetivo

Lanzar una **alpha privada en 8-12 meses** (2-3 h/semana) que permita a 20-30 personas de la escena de Montevideo:

1. crear un perfil musical,
2. publicar y responder avisos (integrante, banda, productor, clases),
3. seguir a otros y ver novedades,
4. recibir notificaciones cuando alguien se interesa.

La pregunta que responde: **¿la escena usa un lugar central para encontrarse, incluso sin video?**

## 2. Por qué el MVP no tiene video

- A 2-3 h/semana, el video es la parte más cara y la que más se estira.
- Los avisos resuelven la necesidad más urgente: encontrar con quién tocar, producir o aprender.
- Un alpha con perfiles y avisos consigue usuarios y feedback para diseñar el video con sentido.
- El video vertical llega en fase 2, con una comunidad que ya usa la app.

Esto no cambia la visión: cambia el orden. Primero la red, después el escaparate.

## 3. Alcance

### Dentro del MVP

| Módulo | Qué incluye | Prioridad |
| --- | --- | --- |
| Cuenta | Registro con email OTP; 18+; términos; sesión persistente | P0 |
| Perfil | Identidad musical, instrumentos, géneros, "estoy buscando", links | P0 |
| Avisos | Crear, listar, filtrar, responder, cerrar; contacto tras interés | P0 |
| Red | Seguir/dejar de seguir; listas; "Novedades" con avisos de tu red | P0 |
| Búsqueda | Perfiles por nombre, usuario, instrumento y género; avisos por filtros | P0 |
| Notificaciones | Push e in-app para follows e intereses | P0 |
| Confianza | Reportar, bloquear, eliminar cuenta, normas | P0 |
| Analítica | Eventos del embudo y de uso | P0 |
| Compartir | Link de perfil y de aviso | P1 |

### Fuera del MVP

- **Covers y video vertical** (fase 2).
- Fotos y crónicas.
- Likes, comentarios y guardados.
- Chat 1:1.
- Perfil de banda con administración.
- Eventos, shows y venta de entradas.
- Vidriera de cursos con pago.
- Promociones pagas y publicidad.
- Algoritmo de recomendación.
- Versión web.
- Cuentas privadas.
- Login con Google/Apple (fase 2, antes de tiendas).
- Verificación de artistas.

> **Criterio de corte:** si no ayuda a que alguien publique un aviso, lo responda o encuentre un perfil, no entra al MVP.

## 4. Personas

### Nico — 24, guitarrista, busca banda
Toca hace seis años. Está en tres grupos de WhatsApp de "músicos Montevideo". Quiere mostrar lo que hace y encontrar baterista y cantante, pero no quiere publicar en Instagram porque mezcla familia y música.

- Necesita: un perfil que hable de su música, un aviso claro y gente que responda.
- Miedo: que la app esté vacía o sea "otra red social".

### Sofi — 29, profesora de canto y productora
Da clases y produce demos. Consigue alumnos por Instagram y recomendación. Quiere llegar a gente que ya está buscando clases, sin pagar publicidad.

- Necesita: un aviso de "ofrezco clases" con credibilidad y un perfil que muestre su trabajo.
- Miedo: que la contacten por curiosidad y no por interés real.

### Fede — 33, fan de la escena
Va a shows, escucha bandas nuevas y comparte hallazgos. No toca instrumentos. Quiere descubrir artistas locales y enterarse de fechas.

- Necesita: un lugar donde ver quién está activo y qué busca.
- Miedo: perderse entre contenido que no le interesa.

> En este MVP Fede es secundario: la app está optimizada para quienes buscan o publican avisos. Los fans entran cuando llegue el video (fase 2).

## 5. Flujos clave

### 5.1 Onboarding (3 minutos)

1. Abre la app y ve una propuesta breve.
2. Se registra con email y código de un solo uso.
3. Acepta términos y privacidad; confirma 18+.
4. Elige usuario, foto, instrumentos (1-3), géneros (1-3), ciudad y nivel.
5. Indica qué busca (opcional): banda, integrantes, productor, clases, shows.
6. Agrega links (Instagram, YouTube, Spotify, sitio) si quiere.
7. Cae en "Novedades" con perfiles y avisos semilla.

**Fricción deliberada:** no se puede ver la app sin cuenta. Simplifica el MVP y permite medir activación.

### 5.2 Publicar un aviso

1. Toca "+" y elige "Publicar aviso".
2. Elige tipo: busco integrante, busco banda, busco productor, ofrezco producción, ofrezco clases, busco clases.
3. Completa título, descripción, instrumento, género, zona, nombre de banda (opcional) y contacto.
4. Publica; el aviso queda visible 30 días.
5. Puede ver interesados y cerrarlo antes.

### 5.3 Responder un aviso

1. Filtra avisos por tipo, instrumento, género o zona.
2. Abre el detalle.
3. Toca "Me interesa", escribe un mensaje (opcional) y deja un contacto (opcional).
4. Ve el contacto del autor.
5. El autor recibe una notificación y ve el perfil, el mensaje y el contacto de quien se interesó.
6. La conversación sigue por WhatsApp, Instagram o email, fuera de la app.

### 5.4 Seguir y ver novedades

1. En "Novedades" ve avisos de la gente que sigue y perfiles nuevos de Montevideo.
2. Entra a un perfil, ve su identidad musical y sus avisos activos.
3. Toca "Seguir".
4. La próxima vez, sus avisos aparecen en "Novedades".

## 6. Requisitos funcionales

### RF-01 · Registro y sesión (P0)

- Email con código de un solo uso (OTP).
- Confirmación de edad 18+ y aceptación de términos y privacidad.
- Sesión persistente; cerrar sesión desde ajustes.
- Recuperación de acceso por email.
- Sin Google/Apple en el MVP; se agregan antes de publicar en tiendas.

**Aceptación**

- [ ] Una persona nueva completa registro y onboarding en menos de 3 minutos.
- [ ] El email se verifica antes de publicar.
- [ ] Un código vencido se explica y permite reintentar.
- [ ] La sesión sobrevive a cerrar y abrir la app.

### RF-02 · Perfil musical (P0)

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

- Ver perfil propio y ajeno; editar el propio.
- Contadores: avisos activos, seguidores, seguidos.
- Compartir perfil con link (`musikate://u/usuario` y link web de fallback).
- Perfiles públicos; no hay cuentas privadas.

**Aceptación**

- [ ] Se puede completar el perfil sin publicar un aviso.
- [ ] Instrumentos y géneros se eligen de un catálogo.
- [ ] El usuario ve su perfil como lo ve otro.
- [ ] Un username tomado se rechaza con un mensaje claro.

### RF-03 · Avisos (P0)

Tipos: `busco_integrante`, `busco_banda`, `busco_productor`, `ofrezco_produccion`, `ofrezco_clases`, `busco_clases`.

| Campo | Regla |
| --- | --- |
| Título | 6-80 caracteres |
| Descripción | 20-600 caracteres |
| Instrumento | Opcional; catálogo |
| Género | Opcional; catálogo |
| Zona | Barrios de Montevideo o "Remoto" |
| Nombre de banda | Opcional, 2-40 caracteres |
| Contacto | WhatsApp, Instagram o email |
| Vigencia | 30 días; se puede cerrar antes |

- Hasta 3 avisos activos por usuario.
- Filtros: tipo, instrumento, género y zona.
- "Me interesa" con mensaje ≤ 300 caracteres y contacto opcional; una vez por aviso.
- El autor ve la lista de interesados con perfil, mensaje y contacto.
- Quien se interesa ve el contacto del autor.
- Avisos vencidos se archivan automáticamente.

**Aceptación**

- [ ] Publicar un aviso toma menos de 90 segundos.
- [ ] El filtro por instrumento y zona devuelve resultados correctos.
- [ ] El autor recibe push al primer interés.
- [ ] Un aviso cerrado no aparece en listados ni acepta intereses.
- [ ] No se puede ver el contacto del autor sin enviar "me interesa".

### RF-04 · Red y novedades (P0)

- Seguir y dejar de seguir desde el perfil o el aviso.
- Listas de seguidores y seguidos.
- "Novedades" con dos secciones:
  - **Avisos de tu red:** avisos abiertos de perfiles seguidos.
  - **Perfiles nuevos:** altas recientes en Montevideo.
- Cada aviso muestra tipo, instrumento, zona y autor.
- Sin feed de publicaciones (no hay posts en el MVP).

**Aceptación**

- [ ] Seguir es inmediato y actualiza contadores.
- [ ] Un aviso de alguien que sigo aparece en "Avisos de tu red".
- [ ] "Perfiles nuevos" no muestra usuarios bloqueados.
- [ ] No se puede seguir a uno mismo ni duplicar el follow.

### RF-05 · Búsqueda (P0)

- Perfiles por nombre, usuario, instrumento y género.
- Avisos por tipo, instrumento, género y zona.
- Resultados ordenados por actividad reciente.
- Sin búsqueda full-text de descripciones en el MVP.

**Aceptación**

- [ ] Buscar "baterista" devuelve perfiles con ese instrumento.
- [ ] Los filtros de avisos se combinan correctamente.
- [ ] Una búsqueda sin resultados muestra una salida clara.

### RF-06 · Notificaciones (P0)

- Push (Expo) e historial in-app.
- Tipos: nuevo seguidor, interés en tu aviso, sistema.
- Deep link al perfil o al aviso.
- Preferencia simple: notificaciones on/off.

**Aceptación**

- [ ] La push llega en un dispositivo físico con la app cerrada.
- [ ] Tocar la notificación abre la pantalla correcta.
- [ ] El badge de no leídas se actualiza al entrar.

### RF-07 · Confianza y seguridad (P0)

- Reportar perfil o aviso con motivo: spam, acoso, estafa, contenido inapropiado, otro.
- Bloquear usuario: oculta su contenido y evita interacciones en ambas direcciones.
- Normas de comunidad, términos y privacidad accesibles.
- Eliminar cuenta desde ajustes (borra perfil, avisos y datos; ventana de 30 días).
- Moderación manual desde Supabase Studio.
- Límites anti-abuso: 3 avisos activos, 10 intereses/día, 100 follows/día.

**Aceptación**

- [ ] Reportar se completa en menos de 4 toques.
- [ ] Bloquear oculta el contenido de inmediato.
- [ ] Eliminar cuenta pide confirmación escribiendo el usuario.
- [ ] Un reporte queda registrado con contexto.

### RF-08 · Analítica (P0)

- Eventos de [Métricas](06-metricas-experimentos.md).
- Identificación por ID anónimo; sin datos sensibles.
- Aviso en la política de privacidad.

**Aceptación**

- [ ] El embudo registro → perfil completo → primer aviso/interés se reconstruye.
- [ ] Los eventos no incluyen descripciones de avisos ni mensajes.

## 7. Reglas de negocio

| Tema | Regla |
| --- | --- |
| Edad | 18+ durante la alpha. Se revisa antes de abrir al público. |
| Visibilidad | Perfiles y avisos públicos para usuarios autenticados. |
| Medios | Solo avatar en el MVP; sin video ni fotos de contenido. |
| Textos | Bio 160; aviso 600; interés 300. |
| Avisos | 30 días; 3 activos; contacto tras interés. |
| Límites | 10 intereses/día; 100 follows/día. |
| Username | Único, inmutable durante la alpha salvo error evidente. |
| Contenido | Español rioplatense; sin contenido sexual, violento, de odio ni estafas. |
| Datos | Sin venta ni uso publicitario en la alpha. |

## 8. Requisitos no funcionales

- **Rendimiento**: arranque < 2,5 s en Android de gama media; listas < 1,5 s en 4G.
- **Dispositivos**: iOS 16+ y Android 10+; probar en un Android de gama baja real.
- **Accesibilidad**: tipografía dinámica, contraste AA, áreas táctiles de 44 pt.
- **Idioma**: español rioplatense; fechas y números locales.
- **Offline**: lists cacheadas de solo lectura; publicar requiere conexión.
- **Seguridad**: RLS en todas las tablas; TLS; secretos fuera del bundle.
- **Privacidad**: minimización; eliminar cuenta; política publicada.
- **Tiendas**: alpha por TestFlight/Play Internal; la publicación pública se prepara en fase 2.

## 9. Eventos de analítica

| Evento | Cuándo | Propiedades |
| --- | --- | --- |
| `app_open` | Apertura | origen |
| `sign_up_started` | Toca registrarse | método |
| `sign_up_completed` | Cuenta creada | método |
| `onboarding_completed` | Termina el perfil inicial | instrumentos, géneros |
| `profile_edited` | Guarda cambios | campos |
| `profile_viewed` | Abre un perfil | origen |
| `follow_created` | Sigue | origen |
| `search_performed` | Busca | término, resultados |
| `listing_created` | Publica aviso | tipo |
| `listing_viewed` | Abre aviso | tipo |
| `listing_interest_sent` | Envía interés | tipo, tiene mensaje |
| `novedades_viewed` | Abre Novedades | — |
| `notification_opened` | Abre desde push | tipo |
| `report_submitted` | Reporta | motivo, target |
| `user_blocked` | Bloquea | origen |

## 10. Criterios de lanzamiento de la alpha

- [ ] Los flujos de perfil, aviso y novedades funcionan en iOS y Android reales.
- [ ] RLS probado con dos cuentas.
- [ ] Reportar y bloquear funcionan de punta a punta.
- [ ] Términos, privacidad y normas publicados en URL.
- [ ] Push funcionando en dispositivo físico.
- [ ] Eventos del embudo verificados.
- [ ] 20-30 personas invitadas, con 15 perfiles completos.
- [ ] 10 avisos semilla reales, con permiso de sus autores.
- [ ] Canal de soporte y responsable de moderación definidos.
- [ ] Backups de Supabase activos.
- [ ] Build en TestFlight y Play Internal.

## 11. Fase 2 — Covers verticales (resumen)

No se construye ahora, pero el MVP no debe bloquearlo:

- Video vertical 9:16, ≤ 60 s, grabado o elegido desde la galería.
- Feed full-screen estilo TikTok/Reels: swipe, autoplay muted, tap para audio.
- Likes y comentarios.
- Grilla de covers en el perfil.
- Moderación de video y procedimiento de copyright.
- Requisitos legales de [Riesgos y legal](07-riesgos-legal.md).

## 12. Supuestos y decisiones

- 2-3 h/semana; experiencia de tutoriales; IA como apoyo.
- Marca `musikate`, todo en minúsculas; sin logo ni redes todavía.
- Sin chat ni perfil de banda (fase 3).
- Sin video en el MVP (fase 2).
- Solo email como método de acceso.
- Alpha por TestFlight/Play Internal, no tiendas públicas.

Las decisiones que faltan están en [Preguntas abiertas](10-preguntas-abiertas.md).
