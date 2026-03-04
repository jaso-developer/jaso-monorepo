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
 */
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nesting"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [require("cssnano")({ preset: "default" })]
      : [])
  ]
}
