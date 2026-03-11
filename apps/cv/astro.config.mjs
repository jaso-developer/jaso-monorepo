// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, "../..")

/**
 * Configuración de Astro para apps/cv (cv.jaso.me)
 *
 * output: "static" genera HTML puro en build time.
 * Ideal para un CV: no necesita servidor, se puede hostear en cualquier CDN.
 */
export default defineConfig({
  site:   "https://cv.jaso.me",
  output: "static",

  vite: {
    server: {
      fs: {
        allow: [root]
      }
    },

    resolve: {
      alias: {
        "@jaso/design-tokens/css": path.resolve(root, "packages/design-tokens/src/index.css"),
        "@jaso/utils":      path.resolve(root, "packages/utils/src/index.ts"),
      }
    },

    ssr: {
      noExternal: ["@jaso/utils", "@jaso/ui-astro", "@jaso/design-tokens"]
    }
  }
})
