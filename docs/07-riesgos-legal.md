# Riesgos y legal

> Versión 0.2 · 18/10/2026
> **Esto no es asesoría legal.** Es una lista de riesgos y preguntas para llevar a un abogado antes de abrir al público o subir video.

El MVP no aloja música: solo perfiles, avisos y avatares. Eso baja el riesgo de derechos de autor, pero aumenta el de datos personales, estafas y moderación de avisos. Los covers son fase 2.

## 1. Matriz de riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- | --- |
| R1 | Cold start: la app está vacía y nadie vuelve | Alta | Alto | Siembra manual de 15 perfiles y 10 avisos; alpha cerrada. |
| R2 | Reclamos por derechos de autor de covers | Alta | Medio-Alto | **Fase 2**: términos, notificación y baja, límite de 60 s, moderación, abogado. |
| R3 | Acoso o contenido dañino en perfiles/avisos | Media | Alto | Reportar, bloquear, moderación manual, normas claras. |
| R4 | Estafas en avisos (clases, producción, shows) | Media | Alto | Reportar, revisar avisos semilla, límites, señales de confianza. |
| R5 | Rechazo en tiendas | Media | Medio | Alpha por TestFlight/Play Internal; reporte y bloqueo desde el día uno. |
| R6 | Scope creep: siete propósitos en 2-3 h/semana | Alta | Medio | Roadmap por fases y backlog con "no ahora". |
| R7 | Falla de seguridad o fuga de datos | Baja | Crítico | RLS, pruebas con dos cuentas, backups, minimización. |
| R8 | Conflicto de marca `musicate!` | Media | Medio | Búsqueda en INPI, dominios y redes antes de invertir en logo. |
| R9 | Abandono por lentitud | Alta | Alto | Hitos chicos, bloque fijo, demos visibles, plan de 8-12 meses. |
| R10 | Cobros y facturación mal resueltos | Baja (alpha gratis) | Medio | Asesoría contable antes de facturar. |

## 2. Derechos de autor y covers (fase 2)

No aplica al MVP porque no hay video ni audio. Se activa **antes de subir el primer cover**:

- Un cover implica derechos de reproducción, comunicación pública y derechos de intérpretes.
- La plataforma puede recibir reclamos de autores, editores, sellos o artistas.
- El régimen uruguayo de responsabilidad de intermediarios no es idéntico al DMCA estadounidense; no alcanza con copiar un formulario de baja.

### Mitigaciones antes de la fase 2

1. **Términos claros**: el usuario declara que tiene derechos o autorización y otorga una licencia limitada a `musicate!`.
2. **Límite de 60 segundos** y prohibición de canciones completas o audio de terceros.
3. **Notificación y baja**: canal visible (`copyright@...`) y procedimiento documentado.
4. **Política de reincidentes**: suspender cuentas con reclamos reiterados.
5. **Contenido semilla con permiso escrito**: no usar videos de artistas sin autorización.
6. **Moderación**: revisar reportes de copyright y conservar evidencia.
7. **Asesoría legal** antes de abrir el video al público.
8. **Entidades de gestión**: en Uruguay, AGADU administra derechos de autores. Consultar qué licencias cubren el entorno digital.

## 3. Moderación y seguridad de la comunidad

### Reglas mínimas

- Prohibido: acoso, amenazas, discurso de odio, contenido sexual, violencia explícita, doxxing, spam, estafas y suplantación.
- Reportar en cualquier perfil o aviso.
- Bloquear usuario con efecto bidireccional.
- Moderación manual con estados y tiempos de respuesta.
- Canal de contacto público para reportes.

### Riesgo específico: avisos y estafas

Los avisos pueden usarse para pedir dinero por clase, producción o "lugar para tocar" sin contraprestación. Mitigaciones:

- Revisar los 10 avisos semilla y hablar con sus autores.
- No permitir pagos dentro de la app en la alpha.
- Mostrar el perfil y los links del autor para que la gente verifique.
- Reportar y bloquear con un toque.
- Guía de comunidad: "si te piden dinero por adelantado, desconfiá".

### Operación durante la alpha

- Revisar reportes al menos una vez por día (15 minutos).
- Prioridad alta: amenazas, contenido sexual, datos personales, estafas.
- Documentar cada caso: qué se reportó, qué se hizo, cuándo.

### Menores

La alpha es 18+. Si más adelante se abre a 16+, hay que revisar consentimiento, moderación y edad en tiendas.

## 4. Privacidad y datos personales

### Marco

- Uruguay: Ley 18.331 de Protección de Datos Personales; autoridad de control: URCDP.
- Si hay usuarios en la UE, aplica GDPR; si hay usuarios en California, CCPA/CPRA.
- Las tiendas exigen política de privacidad y declaración de datos.

### Datos que se recolectan en el MVP

| Dato | Finalidad | Base |
| --- | --- | --- |
| Email | Cuenta y acceso | Contrato |
| Usuario, nombre, bio, avatar | Perfil público | Contrato |
| Instrumentos, géneros, ciudad | Descubrimiento y filtros | Contrato |
| Contenido de avisos | Publicación pública | Contrato |
| Contacto del aviso (WhatsApp/Instagram/email) | Que otros puedan responder | Consentimiento/contrato |
| Mensajes de interés y contacto opcional | Conexión entre usuarios | Consentimiento |
| Tokens de push | Notificaciones | Consentimiento |
| Eventos de uso | Mejora del producto | Interés legítimo/consentimiento |
| Reportes y bloqueos | Seguridad | Interés legítimo |

### Compromisos mínimos

- No vender datos ni usarlos para publicidad de terceros en la alpha.
- Minimizar: no pedir teléfono, documento ni dirección.
- Permitir eliminar la cuenta y los datos asociados.
- Política de retención: cuenta eliminada en 30 días; backups rotan en 90 días.
- Aviso de cookies/analítica en la landing.
- Proveedores: Supabase (base/storage), Expo (push), PostHog (analítica), Sentry (errores).
- Transferencia internacional: servidores fuera de Uruguay; informarlo.
- Los contactos de avisos son datos de terceros: no usarlos para marketing.

### Pendiente

- Registro de actividades de tratamiento (si aplica).
- Responsable de datos y canal de contacto.
- Revisión legal antes de la beta pública.

## 5. Tiendas de apps

La alpha se distribuye por TestFlight y Play Internal. La publicación pública se prepara en fase 2.

### Apple App Store

- **Guía 1.2 (UGC)**: filtrado de contenido objetable, reporte, bloqueo y datos de contacto publicados. Aplica a perfiles y avisos, aunque no haya video.
- **Guía 5.1.1**: política de privacidad y transparencia sobre datos.
- **Guía 3.1.1**: bienes digitales vendidos dentro de la app deben usar In-App Purchase. No aplica a la alpha gratuita.
- **Sign in with Apple**: obligatorio si se ofrecen otros logins sociales. En el MVP solo hay email, así que no aplica.
- **Edad**: declarar correctamente; la alpha es 18+.

### Google Play

- Política de contenido generado por usuarios: moderación, reporte y bloqueo.
- Declaración de seguridad de datos y política de privacidad.
- Clasificación de contenido y público objetivo.

### Recomendación

- Hacer el primer build interno en el mes 7, no en el 8.
- Tener un usuario de revisión con contenido de ejemplo y flujos funcionando.
- Leer las guías completas antes de la beta pública.

## 6. Marca y propiedad intelectual

- `musicate!` se escribe todo en minúsculas; el logo y las redes se crean después de la alpha.
- Buscar "musicate!" en INPI Uruguay, registros regionales y USPTO/EUIPO antes de encargar logo.
- Verificar dominio `.com.uy`, `.com`, `.uy` y usuarios en Instagram/TikTok/YouTube.
- El código es propiedad del proyecto; definir licencia y titularidad si se suma un socio.
- Los términos deben aclarar que el contenido del usuario sigue siendo suyo y que la plataforma tiene licencia para mostrarlo.

## 7. Impuestos y facturación

- La alpha es gratuita: no hay ingresos ni facturación.
- Antes de cobrar promociones o suscripciones: definir forma jurídica (por ejemplo, SAS), facturación electrónica y tratamiento de IVA con un contador.
- Los pagos de Apple/Google llegan del exterior; su tratamiento impositivo debe revisarse.

## 8. Checklist

### Antes de la alpha

- [ ] Términos, privacidad y normas publicados.
- [ ] Reportar y bloquear probados con dos cuentas.
- [ ] Responsable de moderación y 15 min/día definidos.
- [ ] Edad 18+ declarada.
- [ ] Avisos semilla con permiso de sus autores.
- [ ] Backups y plan de respuesta a incidentes.
- [ ] Datos de contacto de proveedores declarados en la política.

### Antes de la beta pública o del video (fase 2)

- [ ] Términos y privacidad revisados por abogado.
- [ ] Procedimiento de notificación y baja por copyright.
- [ ] Clasificación de tienda y revisión de guías.
- [ ] Contenido semilla con permisos por escrito.
- [ ] Búsqueda de marca y dominio resuelta.
- [ ] Forma jurídica y facturación definidas si hay ingresos.

## 9. Preguntas para el abogado

1. ¿Cómo se implementa un procedimiento de baja válido en Uruguay?
2. ¿Qué responsabilidad tiene la plataforma por avisos de usuarios?
3. ¿Qué tiene que decir la política de privacidad según Ley 18.331 y GDPR?
4. ¿Qué pasa si un menor se registra con datos falsos?
5. ¿Qué licencias se necesitan para covers de 60 s (fase 2)?
6. ¿Cómo se factura una promoción paga a un artista local?
7. ¿La marca `musicate!` es registrable y libre en la clase 9/41/42?
