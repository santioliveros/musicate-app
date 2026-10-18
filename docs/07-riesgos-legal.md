# Riesgos y legal

> Versión 0.1 · 18/10/2026
> **Esto no es asesoría legal.** Es una lista de riesgos y preguntas para llevar a un abogado antes del lanzamiento público.

## 1. Matriz de riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- | --- |
| R1 | Cold start: la app está vacía y nadie vuelve | Alta | Alto | Siembra manual de 50 creadores; beta cerrada; contenido semilla. |
| R2 | Reclamos por derechos de autor de covers | Alta | Medio-Alto | Términos, notificación y baja, límite de 60 s, moderación, asesoría legal. |
| R3 | Contenido dañino o acoso en la comunidad | Media | Alto | Reportar, bloquear, moderación manual, normas claras, SLA de respuesta. |
| R4 | Rechazo en App Store o Google Play | Media | Alto | Cumplir guías de UGC, privacidad, edad y compras; builds tempranos. |
| R5 | Scope creep: siete propósitos en una sola persona | Alta | Medio | Roadmap cerrado, backlog con "no ahora", checkpoint semana 4. |
| R6 | Video: peso, codecs, costos de storage/egress | Media | Medio | Límite 60 s/50 MB, compresión en cliente, prueba en Android gama media. |
| R7 | Falla de seguridad o fuga de datos | Baja | Crítico | RLS, revisión con dos cuentas, backups, minimización de datos. |
| R8 | Conflicto de marca "Musikate" | Media | Medio | Búsqueda en INPI, dominios y redes antes de invertir en identidad. |
| R9 | Agotamiento de la única persona que construye | Media | Alto | Plan B de 12 semanas, alcance recortable, semanas sin features nuevas. |
| R10 | Cobros y facturación mal resueltos | Media | Medio | Asesoría contable antes de facturar; separar beta gratuita de monetización. |

## 2. Derechos de autor y covers

Es el riesgo legal más importante del proyecto, porque el contenido central son interpretaciones de obras de terceros.

### Qué puede pasar

- Un cover implica, según el caso, derechos de reproducción, comunicación pública y derechos de los intérpretes.
- La plataforma puede recibir reclamos de autores, editores, sellos o artistas.
- El régimen uruguayo de responsabilidad de intermediarios no es idéntico al DMCA estadounidense; no alcanza con "copiar y pegar" un formulario de baja.

### Mitigaciones para la beta

1. **Términos claros**: el usuario declara que tiene derechos o autorización para publicar lo que sube y otorga a Musikate una licencia limitada para alojarlo y mostrarlo.
2. **Límite de 60 segundos** y prohibición de subir canciones completas o audio de terceros.
3. **Notificación y baja**: canal visible (`copyright@...`) y procedimiento documentado para retirar contenido tras un reclamo.
4. **Política de reincidentes**: suspender cuentas con reclamos reiterados.
5. **Contenido semilla con permiso escrito**: no usar videos de artistas sin autorización, ni siquiera para "arrancar".
6. **Moderación**: revisar reportes de copyright y conservar evidencia.
7. **Asesoría legal antes del lanzamiento público**: revisar términos, licencias y procedimiento con un abogado especializado en propiedad intelectual.
8. **Entidades de gestión**: en Uruguay, AGADU administra derechos de autores. Consultar qué licencias cubren el entorno digital y si existe una vía colectiva para covers.

### Lo que no hay que asumir

- Que 60 segundos es un "uso justo" automático.
- Que atribuir al autor alcanza.
- Que una plataforma extranjera (Instagram, TikTok) tiene licencias que cubren a Musikate.

Si el volumen de reclamos crece, la salida es licenciar (por ejemplo, a través de una entidad de gestión) o restringir el contenido a obras originales.

## 3. Moderación y seguridad de la comunidad

### Reglas mínimas

- Prohibido: acoso, amenazas, discurso de odio, contenido sexual, violencia explícita, doxxing, spam y suplantación.
- Reportar en cualquier publicación, comentario, perfil o aviso.
- Bloquear usuario con efecto bidireccional.
- Moderación manual con estados y tiempos de respuesta.
- Canal de contacto público para reportes (requisito de tiendas).

### Operación durante la beta

- Revisar reportes al menos una vez por día.
- Prioridad alta: amenazas, contenido sexual con menores, datos personales.
- Si aparece contenido de explotación infantil: no descargar, preservar evidencia y denunciar a las autoridades; consultar el procedimiento legal aplicable.
- Documentar cada caso: qué se reportó, qué se hizo, cuándo.

### Riesgo específico: menores

La beta es 18+. Si más adelante se abre a 16+, hay que revisar consentimiento, moderación y edad en tiendas. No abrir antes de tener un plan.

## 4. Privacidad y datos personales

### Marco

- Uruguay: Ley 18.331 de Protección de Datos Personales y su reglamentación; autoridad de control: URCDP.
- Si hay usuarios en la Unión Europea, aplica GDPR; si hay usuarios en California, CCPA/CPRA. Aunque el foco sea Uruguay, las tiendas distribuyen globalmente.
- Las tiendas exigen política de privacidad y declaración de datos recolectados.

### Datos que se recolectan

| Dato | Finalidad | Base |
| --- | --- | --- |
| Email | Cuenta y acceso | Contrato |
| Usuario, nombre, bio, avatar | Perfil público | Contrato |
| Instrumentos, géneros, ciudad | Descubrimiento y filtros | Contrato |
| Videos y fotos | Contenido público | Consentimiento/contrato |
| Tokens de push | Notificaciones | Consentimiento |
| Eventos de uso | Mejora del producto | Interés legítimo/consentimiento |
| Reportes y bloqueos | Seguridad | Interés legítimo |

### Compromisos mínimos

- No vender datos ni usarlos para publicidad de terceros en la beta.
- Minimizar: no pedir teléfono, documento ni dirección.
- Permitir eliminar la cuenta y los datos asociados.
- Política de retención: cuenta eliminada en 30 días; backups rotan en 90 días.
- Aviso de cookies/analítica en la landing.
- Proveedores: Supabase (base de datos/storage), Expo (push), PostHog (analítica), Sentry (errores). Declararlos como encargados del tratamiento.
- Transferencia internacional: los servidores pueden estar fuera de Uruguay; informarlo.

### Pendiente

- Registro de actividades de tratamiento (si aplica).
- Designar responsable de datos y canal de contacto.
- Revisar la política con abogado antes del lanzamiento público.

## 5. Tiendas de apps

### Apple App Store

- **Guía 1.2 (UGC)**: filtrado de contenido objetable, mecanismo de reporte, bloqueo de usuarios abusivos y datos de contacto publicados. Sin esto, rechazo.
- **Guía 5.1.1**: política de privacidad y transparencia sobre datos.
- **Guía 3.1.1**: bienes y servicios digitales vendidos dentro de la app deben usar In-App Purchase (con excepciones limitadas). Tenerlo en cuenta para promociones y suscripciones.
- **Edad**: apps con UGC suelen requerir clasificación 12+ o 17+; declarar correctamente.
- **Sign in with Apple**: obligatorio si se ofrecen otros logins sociales.

### Google Play

- Política de contenido generado por usuarios: requiere moderación, reporte y bloqueo.
- Declaración de seguridad de datos y política de privacidad.
- Clasificación de contenido y público objetivo.

### Recomendación

- Hacer el primer build y someterlo a revisión en la semana 6, no en la 8.
- Leer las guías completas antes de la beta; las políticas cambian.
- Tener un usuario de revisión con contenido de ejemplo y flujos funcionando.

## 6. Marca y propiedad intelectual

- Buscar "Musikate" en INPI Uruguay, registros de marcas de la región y USPTO/EUIPO.
- Verificar dominio `.com.uy`, `.com`, `.uy` y usuarios en Instagram/TikTok/YouTube.
- No encargar logo ni identidad visual definitiva hasta tener el visto bueno de marca.
- El código es propiedad del proyecto; definir licencia y titularidad si se suma un socio.
- Los términos deben aclarar que el contenido del usuario sigue siendo suyo y que la plataforma tiene una licencia para mostrarlo.

## 7. Impuestos y facturación

- La beta es gratuita: no hay ingresos ni facturación.
- Antes de cobrar promociones o suscripciones: definir forma jurídica (por ejemplo, SAS), facturación electrónica y tratamiento de IVA con un contador.
- Los pagos de Apple/Google llegan del exterior; su tratamiento impositivo debe revisarse.
- No mezclar cuentas personales y del proyecto.

## 8. Checklist antes del lanzamiento público

- [ ] Términos y condiciones revisados por abogado.
- [ ] Política de privacidad publicada y enlazada en la app y las tiendas.
- [ ] Procedimiento de notificación y baja por copyright documentado.
- [ ] Normas de comunidad y canal de reportes visibles.
- [ ] Reportar y bloquear probados con dos cuentas.
- [ ] Responsable de moderación y SLA definidos.
- [ ] Edad mínima y clasificación de tienda declaradas.
- [ ] Contenido semilla con permisos por escrito.
- [ ] Búsqueda de marca y dominio resuelta.
- [ ] Forma jurídica y facturación definidas si hay ingresos.
- [ ] Backups y plan de respuesta a incidentes.
- [ ] Registro de proveedores y transferencias internacionales.

## 9. Preguntas para el abogado

1. ¿Qué licencias se necesitan para covers de 60 s alojados en una app uruguaya?
2. ¿Cómo se implementa un procedimiento de baja válido en Uruguay?
3. ¿Qué responsabilidad tiene la plataforma por contenido de usuarios?
4. ¿Qué tiene que decir la política de privacidad según Ley 18.331 y GDPR?
5. ¿Qué pasa si un menor de edad se registra con datos falsos?
6. ¿Cómo se factura una promoción paga a un artista local?
7. ¿La marca "Musikate" es registrable y libre en la clase 9/41/42?
