/**
 * Utilidades de fechas.
 *
 * Todas estas funciones son puras:
 * - Reciben un input
 * - Devuelven un output
 * - No tienen efectos secundarios
 * - No dependen de ningún framework
 */

/**
 * Formatea una fecha a texto legible en español.
 *
 * @example
 * formatDate("2025-01-15") → "15 de enero de 2025"
 * formatDate(new Date())   → "3 de marzo de 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("es-MX", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  })
}

/**
 * Devuelve hace cuánto tiempo ocurrió una fecha.
 *
 * @example
 * timeAgo(new Date()) → "justo ahora"
 * timeAgo("2025-12-01") → "hace 3 meses"
 */
export function timeAgo(date: Date | string): string {
  const d       = typeof date === "string" ? new Date(date) : date
  const now     = new Date()
  const diff    = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours   = Math.floor(diff / 3_600_000)
  const days    = Math.floor(diff / 86_400_000)
  const months  = Math.floor(days / 30)
  const years   = Math.floor(days / 365)

  if (minutes < 1)  return "justo ahora"
  if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`
  if (hours < 24)   return `hace ${hours} hora${hours > 1 ? "s" : ""}`
  if (days < 30)    return `hace ${days} día${days > 1 ? "s" : ""}`
  if (months < 12)  return `hace ${months} mes${months > 1 ? "es" : ""}`
  return `hace ${years} año${years > 1 ? "s" : ""}`
}

/**
 * Verifica si una fecha ya pasó.
 *
 * @example
 * isPast("2020-01-01") → true
 * isPast("2099-01-01") → false
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date
  return d.getTime() < new Date().getTime()
}
