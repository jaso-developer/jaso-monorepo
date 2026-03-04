/**
 * Utilidades de strings.
 */

/**
 * Convierte texto a slug URL-friendly.
 * Elimina acentos, caracteres especiales y espacios.
 *
 * @example
 * slugify("Manejo de Praderas!")  → "manejo-de-praderas"
 * slugify("¿Qué es un Monorepo?") → "que-es-un-monorepo"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")               // descompone: "é" → "e" + acento
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos sueltos
    .replace(/[^a-z0-9\s-]/g, "")  // solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, "-")           // espacios → guiones
    .replace(/-+/g, "-")            // guiones múltiples → uno solo
}

/**
 * Trunca un texto largo y agrega puntos suspensivos.
 *
 * @example
 * truncate("Hola mundo cruel", 8) → "Hola mun..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

/**
 * Calcula tiempo de lectura estimado en minutos.
 * Asume 200 palabras por minuto (promedio en español).
 *
 * @example
 * readingTime("una dos tres...") → 1
 */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

/**
 * Convierte la primera letra de cada palabra a mayúscula.
 *
 * @example
 * titleCase("manejo de praderas") → "Manejo De Praderas"
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
