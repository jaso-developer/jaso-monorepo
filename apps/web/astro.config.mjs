// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, "../..")

/**
 * Configuración de Astro para apps/web (jaso.me)
 *
 * output: "static" genera HTML puro en build time.
 * Es el modo más rápido y compatible con Cloudflare Pages.
 *
 * PostCSS se configura en postcss.config.cjs
 * Astro lo detecta automáticamente.
 */
export default defineConfig({
  site:   "https://jaso.me",
  output: "static",

  vite: {
    server: {
      fs: {
        allow: [root]
      }
    },

    resolve: {
      alias: {
        // Tokens CSS
        "@jaso/tokens/css": path.resolve(root, "packages/tokens/src/index.css"),

        // Utils — apuntamos directo a los archivos fuente
        "@jaso/utils":         path.resolve(root, "packages/utils/src/index.ts"),
        "@jaso/utils/dates":   path.resolve(root, "packages/utils/src/dates.ts"),
        "@jaso/utils/strings": path.resolve(root, "packages/utils/src/strings.ts"),
        "@jaso/utils/seo":     path.resolve(root, "packages/utils/src/seo.ts"),
      }
    },

    // Le dice a Vite que NO trate estos paquetes como externos
    // sino que los procese como código fuente del proyecto
    ssr: {
      noExternal: ["@jaso/utils", "@jaso/ui-astro", "@jaso/tokens"]
    }
  }
})
