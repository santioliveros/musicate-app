# Decisiones de arquitectura (ADR)

Un ADR registra una decisión importante, el contexto en el que se tomó y sus consecuencias. Sirve para no repetir discusiones y para entender, meses después, por qué el proyecto es como es.

## Índice

| ID | Decisión | Estado | Fecha |
| --- | --- | --- | --- |
| [ADR-0001](0001-stack-react-native-expo-supabase.md) | Stack: React Native + Expo + Supabase | Aceptada | 18/10/2026 |
| [ADR-0002](0002-contenido-ugc-y-covers.md) | Contenido generado por usuarios y covers, sin streaming | Aceptada (fase 2) | 18/10/2026 |
| [ADR-0003](0003-beachhead-montevideo.md) | Montevideo como mercado inicial | Aceptada | 18/10/2026 |
| [ADR-0004](0004-alcance-del-mvp.md) | Alcance y recortes del MVP | Reemplazada por ADR-0006 | 18/10/2026 |
| [ADR-0005](0005-dos-entornos-develop-prod.md) | Dos entornos: develop y prod | Aceptada | 18/10/2026 |
| [ADR-0006](0006-ruta-utilidad-first-y-mvp-sin-video.md) | Ruta utilidad-first y MVP sin video | Aceptada | 18/10/2026 |

## Cuándo escribir uno

- Elección de stack, proveedor o servicio.
- Cambio de alcance del producto.
- Modelo de datos o estrategia de seguridad.
- Precios, monetización o legal.
- Cualquier decisión que sea cara o lenta de revertir.

Si es reversible en una tarde, no hace falta ADR: se anota en el PR.

## Plantilla

```markdown
# ADR-000N — Título corto

- **Estado**: propuesta | aceptada | reemplazada por ADR-XXXX | obsoleta
- **Fecha**: DD/MM/AAAA
- **Decisores**: quiénes participaron
- **Revisión**: cuándo se revisa (opcional)

## Contexto

Qué problema o tensión obliga a decidir. Datos, restricciones y opciones.

## Decisión

Qué se decidió, en una frase clara y en presente.

## Alternativas consideradas

| Alternativa | Por qué no se eligió |
| --- | --- |
| ... | ... |

## Consecuencias

### Positivas
- ...

### Negativas y riesgos
- ...

### Seguimiento
- Qué habría que revisar y cuándo.
```

## Convenciones

- Numeración secuencial, sin reutilizar números.
- Un ADR no se edita para cambiar la decisión: se escribe uno nuevo que lo reemplaza.
- Los cambios menores (typos, links) sí se pueden corregir.
