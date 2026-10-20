# ADR-0005 — Dos entornos: develop y prod

- **Estado**: aceptada
- **Fecha**: 18/10/2026
- **Decisores**: fundador del proyecto
- **Revisión**: al sumar una segunda persona o antes del lanzamiento público

## Contexto

El proyecto necesita separar el lugar donde se prueba del lugar donde usan los usuarios reales. Las opciones eran:

1. Un solo entorno para todo.
2. Tres entornos: local, staging y producción.
3. Dos entornos: develop y prod.
4. Dos o tres ramas permanentes (`develop`, `main`, `prod`) con despliegues por rama.

El equipo es una sola persona, el presupuesto es bajo y la app es móvil: cada build de producción pasa por tiendas y no se puede "revertir" como un servidor web. Un tercer entorno agrega un proyecto de Supabase, otro juego de secretos y otra rutina de migraciones.

## Decisión

Usar **dos entornos**:

| Entorno | Backend | Builds | Origen |
| --- | --- | --- | --- |
| develop | Supabase `musicate!-dev` (o local) | EAS `development` y `preview` | `main`, automático |
| prod | Supabase `musicate!-prod` | EAS `production` | tag `vX.Y.Z`, manual |

Reglas asociadas:

- **No hay staging.** La alpha y la beta corren en prod con un grupo chico; los cambios riesgosos se prueban antes en develop.
- **No hay ramas `develop` ni `prod`.** `main` es la única rama estable; los tags identifican lo publicado. Las ramas de trabajo son cortas (`feat/*`, `fix/*`).
- EAS `preview` apunta a Supabase dev; EAS `production` apunta a Supabase prod.
- Las migraciones se prueban en local y develop antes de aplicarse en prod.
- Un release candidate se compila con `production` y se distribuye por TestFlight/Play Internal antes de liberarlo en la tienda.

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| Un solo entorno | Mezcla pruebas con datos y usuarios reales; un error de migración afecta la beta. |
| Tres entornos (local/staging/prod) | Más aislamiento, pero duplica costo (~US$ 25/mes extra), secretos y mantenimiento para una sola persona. |
| Ramas `develop` y `prod` permanentes | Obliga a mergear entre ramas, genera deriva y no representa el binario publicado; los tags ya resuelven la trazabilidad. |
| GitFlow completo | Demasiada ceremonia para un equipo de una persona y releases semanales. |

## Consecuencias

### Positivas
- Menos infraestructura y menos costo: un Supabase dev (free o Pro) y un Supabase prod (Pro).
- Un solo lugar de integración (`main`) y una sola fuente de verdad para lo publicado (tags).
- El flujo de release es explícito: develop para probar, prod para usuarios.
- Migraciones con dos pasos claros: dev → prod.

### Negativas y riesgos
- Sin staging, un cambio riesgoso se prueba en dev, que no tiene los mismos datos ni volumen que prod.
- La beta comparte prod: un error puede afectar a los primeros usuarios. Mitigación: backup antes de migraciones y cambios pequeños.
- Si el equipo crece o hay QA formal, dos entornos pueden quedar cortos.

### Seguimiento
- Agregar staging cuando haya 3+ personas, QA dedicado o migraciones frecuentes/riesgosas.
- Revisar el costo de Supabase si dev deja de alcanzar con el plan free.
- Documentar el rollback: restaurar backup + volver al tag anterior.
