# Cómo trabajamos en musicate!

Este documento define el método, no el código. Está pensado para avanzar 2-3 horas por semana sin perder el hilo.

## 1. Ritmo semanal

- **Un bloque de 2-3 horas**, idealmente el mismo día y horario.
- **Primeros 10 minutos:** elegir una sola historia del backlog y escribir el resultado esperado.
- **Últimos 15 minutos:** demo en un dispositivo real, actualizar el backlog y anotar el siguiente paso.
- **Semana perdida:** se retoma en el bloque siguiente. No se compensa con una maratón.

Regla: **una cosa en curso a la vez**. El trabajo a medias no cuenta.

## 2. Cómo se decide

- Decisión reversible y barata: la toma quien implementa y la anota en el PR.
- Decisión costosa o estructural (stack, modelo de datos, alcance, precios): ADR en `docs/decisiones/`.
- Si hay desacuerdo, se escribe la opción recomendada y se pide validación antes de avanzar.

La plantilla de ADR está en [docs/decisiones/README.md](docs/decisiones/README.md).

## 3. Git

- Rama principal: `main`, siempre desplegable.
- `main` alimenta el entorno **develop**; un tag `vX.Y.Z` alimenta **prod**.
- No hay ramas `develop` ni `prod`: los entornos no son ramas.
- Ramas cortas: `feat/perfil-musical`, `fix/aviso-contacto`, `docs/roadmap`.
- Commits convencionales: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- PRs chicos (menos de ~400 líneas cuando se pueda). Aunque seas una sola persona, abrí PR: te obliga a revisar el diff y deja historia.
- Merge con squash.

## 4. Código

- TypeScript en modo `strict`; sin `any` sin justificar.
- Lógica de negocio fuera de los componentes (hooks y servicios testeables).
- Tests: unitarios para reglas (permisos, validaciones, filtros); E2E solo para los flujos críticos.
- Nombres de código en inglés; textos de UI en español rioplatense.
- Ningún secreto en el repo. Variables en `.env.local` y en EAS Secrets.

## 5. Estimaciones

- **S** ≈ 1 semana; **M** ≈ 2-3 semanas; **L** ≈ 4-5 semanas, a 2-3 h/semana.
- Si una historia no entra en 3 semanas, se parte o se recorta.
- Las estimaciones se ajustan con las horas reales anotadas cada semana.

## 6. Definición de terminado (DoD)

Una historia está terminada cuando:

- [ ] Funciona en Android real; en iOS se probó por TestFlight o build interna.
- [ ] Tiene estados vacíos, de carga y de error.
- [ ] Respeta las reglas de RLS (probado con dos cuentas).
- [ ] Pasa typecheck.
- [ ] Tiene eventos de analítica si corresponde.
- [ ] Está documentada (README o doc de feature) si cambia el comportamiento.
- [ ] Se probó con una cuenta nueva, no solo con la de desarrollo.

## 7. Reportar bugs

Abrí un issue con: pasos para reproducir, resultado esperado, resultado actual, dispositivo/SO y captura si aplica. Si es de seguridad o privacidad, no lo publiques: avisá por privado.

## 8. Documentación

- `docs/` es la fuente de verdad del producto y la técnica.
- Cada cambio de alcance actualiza el PRD y el backlog en el mismo PR.
- Los docs se escriben en español claro; el código y los nombres técnicos en inglés.
- `musicate!` se escribe siempre en minúsculas, incluso al inicio de una oración.
