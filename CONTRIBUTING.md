# Cómo trabajamos en Musikate

Este documento define el método, no el código. La idea es que una sola persona (o un equipo chico) pueda avanzar rápido sin perder el hilo.

## 1. Ritual semanal

- **Lunes (30 min)**: elegir el objetivo de la semana desde el backlog, escribir el resultado esperado y mover solo esas historias a "en curso".
- **Miércoles (15 min)**: revisar si el objetivo sigue siendo realista; recortar antes de acumular.
- **Viernes (30 min)**: demo de lo construido en un dispositivo real, actualizar docs y registrar decisiones.

Regla: **una cosa en curso a la vez**. El trabajo a medias no cuenta.

## 2. Cómo se decide

- Decisión reversible y barata: la toma quien implementa y la anota en el PR.
- Decisión costosa o estructural (stack, modelo de datos, alcance, precios): ADR en `docs/decisiones/`.
- Si hay desacuerdo, se escribe la opción recomendada y se pide validación antes de avanzar.

La plantilla de ADR está en [docs/decisiones/README.md](docs/decisiones/README.md).

## 3. Git

- Rama principal: `main`, siempre desplegable.
- Ramas cortas: `feat/perfil-musical`, `fix/upload-video`, `docs/roadmap`.
- Commits convencionales: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- PRs chicos (menos de ~400 líneas cuando se pueda). Aunque seas una sola persona, abrí PR: te obliga a revisar el diff y deja historia.
- Merge con squash.

## 4. Código

- TypeScript en modo `strict`; sin `any` sin justificar.
- Lógica de negocio fuera de los componentes (hooks y servicios testeables).
- Tests: unitarios para reglas (permisos, validaciones, filtros); E2E solo para los tres flujos críticos.
- Nombres de código en inglés; textos de UI en español rioplatense.
- Ningún secreto en el repo. Variables en `.env.local` y en EAS Secrets.

## 5. Definición de terminado (DoD)

Una historia está terminada cuando:

- [ ] Funciona en iOS y Android en un dispositivo real.
- [ ] Tiene estados vacíos, de carga y de error.
- [ ] Respeta las reglas de RLS (probado con dos cuentas).
- [ ] Pasa lint y typecheck.
- [ ] Tiene eventos de analítica si corresponde.
- [ ] Está documentada (README o doc de feature) si cambia el comportamiento.
- [ ] Se probó con una cuenta nueva, no solo con la de desarrollo.

## 6. Reportar bugs

Abrí un issue con: pasos para reproducir, resultado esperado, resultado actual, dispositivo/SO y captura si aplica. Si es de seguridad o privacidad, no lo publiques: avisá por privado.

## 7. Documentación

- `docs/` es la fuente de verdad del producto y la técnica.
- Cada cambio de alcance actualiza el PRD y el backlog en el mismo PR.
- Los docs se escriben en español claro; el código y los nombres técnicos en inglés.
