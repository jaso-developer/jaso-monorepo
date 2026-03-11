/**
 * Configuración PostCSS compartida.
 *
 * Usamos .cjs (CommonJS) porque Astro y Vite buscan
 * el archivo postcss.config.cjs o postcss.config.js
 * en formato CJS en algunos contextos de build.
 *
 * Plugins incluidos:
 *  postcss-import   → permite @import en archivos CSS
 *  postcss-nesting  → CSS nesting nativo (&:hover, & .child)
 *  autoprefixer     → agrega -webkit-, -moz- automaticamente
 *  cssnano          → minifica CSS solo en produccion
 * 
 * postcss-import necesita configuración especial para resolver
 * paquetes del workspace (@jaso/tokens, etc.) porque por defecto
 * solo resuelve paths relativos de archivo.
 */
module.exports = {
  plugins: [
    require("postcss-import")({
      resolve(id, basedir) {
        // Si el import empieza con @ es un paquete de Node
        // Lo resolvemos con el sistema de módulos de Node
        if (id.startsWith("@")) {
          try {
            return require.resolve(id)
          } catch {
            // Si falla, dejamos que postcss-import lo intente normalmente
          }
        }
        // Para paths relativos, comportamiento normal
        return id
      }
    }),
    require("postcss-nesting"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [require("cssnano")({ preset: "default" })]
      : [])
  ]
}
