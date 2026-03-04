/**
 * Utilidades SEO.
 * Genera metadatos consistentes en todas las apps.
 */

export interface SeoProps {
  title:        string
  description:  string
  image?:       string
  url?:         string
  siteName?:    string
  type?:        "website" | "article"
  pubDate?:     string
  tags?:        string[]
}

/**
 * Construye los metadatos SEO completos para una página.
 * Incluye Open Graph (Facebook, LinkedIn) y Twitter Card.
 *
 * @example
 * const seo = buildSeoMeta({
 *   title: "Manejo de praderas",
 *   description: "Guía práctica para...",
 *   siteName: "Jaso Ganado"
 * })
 */
export function buildSeoMeta(props: SeoProps) {
  const {
    title,
    description,
    image    = "/og-image.png",
    url      = "",
    siteName = "Jaso",
    type     = "website",
    pubDate,
    tags     = [],
  } = props

  const fullTitle = title === siteName
    ? title
    : `${title} | ${siteName}`

  return {
    title: fullTitle,
    meta: [
      // Básicos
      { name: "description",         content: description },
      { name: "keywords",            content: tags.join(", ") },

      // Open Graph
      { property: "og:title",        content: fullTitle },
      { property: "og:description",  content: description },
      { property: "og:image",        content: image },
      { property: "og:url",          content: url },
      { property: "og:site_name",    content: siteName },
      { property: "og:type",         content: type },

      // Artículo (solo si es un post)
      ...(type === "article" && pubDate
        ? [{ property: "article:published_time", content: pubDate }]
        : []),

      // Twitter Card
      { name: "twitter:card",        content: "summary_large_image" },
      { name: "twitter:title",       content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image",       content: image },
    ],
  }
}
