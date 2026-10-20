// Los 19 departamentos de Uruguay.
// El nombre de cada uno es el que se guarda en profiles.city.

export const DEPARTMENTS = [
  'Montevideo',
  'Artigas',
  'Canelones',
  'Cerro Largo',
  'Colonia',
  'Durazno',
  'Flores',
  'Florida',
  'Lavalleja',
  'Maldonado',
  'Paysandú',
  'Río Negro',
  'Rivera',
  'Rocha',
  'Salto',
  'San José',
  'Soriano',
  'Tacuarembó',
  'Treinta y Tres',
] as const

export type Department = (typeof DEPARTMENTS)[number]

export function isDepartment(value: string | null | undefined): value is Department {
  return Boolean(value) && (DEPARTMENTS as readonly string[]).includes(value as string)
}
