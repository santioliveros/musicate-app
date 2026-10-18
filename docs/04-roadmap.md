# Roadmap — Ruta utilidad-first

> Versión 0.2 · 18/10/2026
> **2-3 h/semana · experiencia de tutoriales · alpha en 8-12 meses · visión completa en 15-18 meses**

## 1. Supuestos

- **Dedicación:** un bloque de 2-3 horas por semana, sostenido. No hay fecha límite; hay hitos.
- **Experiencia:** tutoriales y proyectos chicos. Se suma un 30-50 % al tiempo estimado por aprendizaje y debugging.
- **IA:** como multiplicador para escribir código, no para reemplazar las pruebas en dispositivo ni las decisiones de producto.
- **Alcance:** alpha privada con 20-30 personas, no lanzamiento público.
- **Método:** milestones, no calendario. Si una fase se estira, se estira; no se acumula deuda.

> A 2-3 h/semana, la constancia vale más que la velocidad. El objetivo es llegar a una alpha usable sin quemarse en el intento.
>
> **Ejecución:** el scaffold de la fase 1 ya está en el repo (auth, perfil y tabs). La fase 0 se cubrió con conversaciones informales; las 10 entrevistas formales quedan pendientes si se quiere validar con más rigor.

## 2. Calendario resumen

| Fase | Mes objetivo | Resultado |
| --- | --- | --- |
| 0 · Validación | Mes 0 | 10 entrevistas, 20 interesados, 5 comprometidos. |
| 1 · Fundaciones e identidad | Mes 1-3 | Login y perfil funcionando en un dispositivo real. |
| 2 · Avisos | Mes 3-5 | Primer aviso publicado y respondido. |
| 3 · Red y notificaciones | Mes 5-7 | Follows, Novedades y push funcionando. |
| 4 · Confianza y alpha | Mes 7-9 | Build instalable y 20-30 personas usando la app. |
| 5 · Iteración | Mes 9-12 | Aprendizajes, correcciones y decisión sobre video. |
| 6 · Covers verticales | Mes 12-18 | Beta con video vertical y feed. |

Los meses son rangos, no promesas. Si una fase se estira, la alpha puede caer en el mes 12; el orden no cambia.

Si arrancás en octubre de 2026, la alpha cae entre junio y octubre de 2027, y la beta con video entre enero y abril de 2028. Son fechas incómodas de leer, pero son las reales para 2-3 h/semana.

## 3. Hitos

| Hito | Mes objetivo | Qué tiene que ser verdad |
| --- | --- | --- |
| M0 · Demanda validada | Mes 0 | 10 entrevistas y 20 personas en lista de espera. |
| M1 · Esqueleto | Mes 3 | Dos cuentas se registran, completan perfil y se ven. |
| M2 · Primer aviso | Mes 5 | Un aviso se publica, se filtra y recibe un interés. |
| M3 · Primera red | Mes 7 | Seguir a alguien hace aparecer sus avisos en Novedades. |
| M4 · Alpha | Mes 8-12 | 20-30 personas usan la app durante 2 semanas. |
| M5 · Decisión | Mes 12-14 | Go/no-go a video según métricas y entrevistas. |
| M6 · Beta con video | Mes 15-18 | Covers verticales y feed funcionando con 50-100 personas. |

## 4. Fases

### Fase 0 · Mes 0 · Validación y comunidad

No se escribe código. Se prueba si el problema existe y si la gente se suma.

- Landing simple (Carrd, Notion o Framer) con waitlist.
- 10 entrevistas de 15 minutos con músicos, profesores y productores.
- Cuenta de Instagram con 10 perfiles y 10 avisos reales de la escena (con permiso).
- Lista de 30 candidatos para la alpha.
- Guion de entrevista: qué hacen hoy para buscar banda/profesor/productor, qué les falta, qué les da vergüenza.

**Salida:** 20 personas en la lista, 5 comprometidas a probar la alpha, 10 entrevistas documentadas.

**No hacer:** diseñar la app, elegir colores, programar.

### Fase 1 · Mes 1-3 · Fundaciones e identidad

- Repo, CI y proyecto Supabase dev/prod.
- Scaffold Expo + navegación + tema.
- Registro con email OTP y sesión persistente.
- Perfil: usuario, foto, bio, instrumentos, géneros, nivel, "estoy buscando", links.
- Perfil público y edición.
- Búsqueda básica de perfiles.
- Pantalla de bienvenida, términos y privacidad.

**Salida:** dos cuentas reales se registran, completan su perfil y se encuentran buscando por instrumento.

**Riesgo:** el onboarding es la primera impresión. Probarlo con 3 personas antes de seguir.

### Fase 2 · Mes 3-5 · Avisos

- Crear aviso con tipo, título, descripción, instrumento, género, zona y contacto.
- Listado con filtros y detalle.
- "Me interesa" con mensaje y contacto opcional.
- Contacto del autor revelado tras el interés.
- Bandeja de interesados y cierre del aviso.
- Límite de 3 avisos activos y expiración a 30 días.
- 10 avisos semilla reales.

**Salida:** un aviso de "busco baterista" recibe un interés y ambas personas pueden contactarse.

### Fase 3 · Mes 5-7 · Red y notificaciones

- Seguir/dejar de seguir y listas.
- "Novedades": avisos de tu red y perfiles nuevos.
- Push con Expo y Edge Function.
- Historial in-app y deep links.
- Preferencia on/off.

**Salida:** seguir a alguien hace que sus avisos aparezcan en Novedades; la push llega con la app cerrada.

### Fase 4 · Mes 7-9 · Confianza y alpha

- Reportar perfil y aviso.
- Bloquear usuario y filtrar su contenido.
- Términos, privacidad y normas publicados.
- Eliminar cuenta y datos.
- Límites anti-abuso.
- PostHog + Sentry.
- Build en TestFlight y Play Internal.
- Invitar a 20-30 personas con onboarding asistido.

**Salida:** 20-30 personas usan la app durante dos semanas; reportes y bloqueo funcionan.

### Fase 5 · Mes 9-12 · Iteración

- Entrevistas con 8-10 usuarios de la alpha.
- Corregir fricción de onboarding y avisos.
- Mejorar "Novedades" y búsqueda.
- Medir retención, avisos respondidos y conexiones.
- Decidir si el video es la siguiente inversión o si hay que ajustar la propuesta.

**Salida:** informe de alpha con métricas y decisión documentada.

### Fase 6 · Mes 12-18 · Covers verticales

- Grabación o selección de video vertical 9:16, ≤ 60 s.
- Subida con compresión, portada y reintento.
- Feed full-screen estilo TikTok/Reels.
- Likes y comentarios.
- Grilla de covers en el perfil.
- Moderación de video y procedimiento de copyright.
- Beta con 50-100 personas.

**Salida:** beta con video y una comunidad que ya usa la app para encontrarse.

## 5. Ritmo de trabajo

- **Un bloque semanal de 2-3 h.** Al final, 15 minutos para anotar qué quedó y qué sigue.
- **Una historia a la vez.** No hay dos frentes abiertos.
- **Tamaños:** S = 1 semana; M = 2-3 semanas; L = 4-5 semanas.
- **Regla de las 3 semanas:** si una tarea no se termina en 3 semanas, se parte o se recorta.
- **Demo visible:** al final de cada fase, algo que se pueda mostrar en un teléfono.

## 6. Aceleradores

| Si sumás... | Alpha posible en... |
| --- | --- |
| 6-8 h/semana | 4-5 meses |
| 15-20 h/semana | 2-3 meses |
| Un socio técnico o freelancer | 8-12 semanas |
| IA + plantillas + un template de Expo | 20-30 % menos tiempo, no 80 % |

La IA acelera la escritura de código, pero no reemplaza probar en dispositivos, configurar tiendas, moderar ni hablar con usuarios.

## 7. Después de la beta

- **Fase 3 de producto:** chat 1:1, perfil de banda, eventos y cursos.
- **Fase 4:** promociones pagas, suscripción profesional, publicidad local.
- **Expansión:** Punta del Este y Buenos Aires solo con densidad en Montevideo.

Cada fase empieza si la anterior cumplió sus métricas. No se construye el futuro sobre una alpha que nadie usa.

## 8. Dependencias

| Dependencia | Cuándo | Notas |
| --- | --- | --- |
| Apple Developer | Mes 1-2 | US$ 99/año; necesario para TestFlight. |
| Google Play Console | Mes 1-2 | US$ 25 único; necesario para Play Internal. |
| Dominio y landing | Mes 0 | Para waitlist, términos y privacidad. |
| 10 entrevistados | Mes 0 | Reclutar desde la escena, no de conocidos genéricos. |
| 20-30 alpha testers | Mes 7 | Empezar a reclutar en la fase 0. |
| Asesoría legal | Antes de la beta pública | Términos, privacidad y, en fase 2, covers. |

## 9. Riesgos del plan

- **Abandono por lentitud:** 2-3 h/semana puede sentirse eterno. Mitigación: hitos chicos, demos visibles y un bloque fijo.
- **Curva de aprendizaje:** los tutoriales no cubren RLS, migraciones ni tiendas. Mitigación: recortar alcance y pedir ayuda puntual.
- **Construir sin feedback:** la fase 0 y la alpha existen para evitarlo.
- **Scope creep:** cada idea nueva va al backlog, no al mes.
- **Video demasiado tarde:** si la escena solo quiere video, la alpha de avisos lo va a mostrar. Mejor saberlo en el mes 8 que en el 18.
