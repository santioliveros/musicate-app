import { existsSync, readFileSync } from 'node:fs'

function parseEnv(path) {
  if (!existsSync(path)) return {}

  const env = {}
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

const env = { ...parseEnv('.env.local'), ...process.env }
const url = env.EXPO_PUBLIC_SUPABASE_URL?.trim()
const anonKey = env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim()

if (!url || !anonKey || url.includes('<') || anonKey.includes('<')) {
  console.error('Falta configurar Supabase en .env.local.')
  console.error('Completá EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.')
  console.error('Los datos están en Supabase → Project Settings → API.')
  process.exit(1)
}

if (!/^https?:\/\//.test(url)) {
  console.error('EXPO_PUBLIC_SUPABASE_URL tiene que empezar con https://')
  process.exit(1)
}

const maskedKey = anonKey.length > 12 ? `${anonKey.slice(0, 6)}…${anonKey.slice(-4)}` : '***'
console.log(`Proyecto: ${url}`)
console.log(`Anon key: ${maskedKey}`)

try {
  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/health`, {
    headers: { apikey: anonKey },
  })

  console.log(`Auth health: ${response.status} ${response.statusText}`)

  if (!response.ok) {
    console.error('Supabase respondió con error. Revisá la URL y la anon key.')
    process.exit(1)
  }

  console.log('Configuración OK. Ya podés correr npm start.')
} catch (cause) {
  console.error('No se pudo conectar con Supabase.')
  console.error(cause instanceof Error ? cause.message : String(cause))
  process.exit(1)
}
