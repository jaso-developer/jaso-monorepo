# Arquitectura del Monorepo `jaso-monorepo`

Un **monorepo** es un repositorio Git único que contiene múltiples proyectos o paquetes relacionados. En lugar de tener un repositorio por aplicación, todos viven juntos y pueden compartir código entre sí.

---

## Vista general

```txt
jaso-monorepo/
├── apps/          ← Aplicaciones finales (lo que el usuario ve)
│   ├── web/       → jaso.me
│   └── cv/        → cv.jaso.me
│
├── packages/      ← Bloques reutilizables (lo que las apps consumen)
│   ├── config/    → Configuración compartida (TS, PostCSS)
│   ├── design-tokens/    → Variables de diseño en CSS
│   ├── ui-astro/  → Componentes Astro reutilizables
│   ├── utils/     → Funciones TypeScript de utilidad
│   └── content/   → Contenido en Markdown
│
├── package.json        ← Raíz del workspace (pnpm + turbo)
├── pnpm-workspace.yaml ← Define qué carpetas son parte del workspace
└── turbo.json          ← Orquesta tareas: build, dev, lint
```

---

## Capas del monorepo

```txt
┌─────────────────────────────────────────────────────────────────┐
│                          APPS (nivel 3)                         │
│                                                                 │
│   ┌──────────────────┐         ┌──────────────────────────┐     │
│   │    apps/web      │         │    apps/cv               │     │
│   │   jaso.me        │         │   cv.jaso.me             │     │
│   │                  │         │                          │     │
│   │ Usa: TODOS       │         │ Usa: config,             │     │
│   │ los packages     │         │ design-tokens, ui, utils │     │
│   └────────┬─────────┘         └────────┬─────────────────┘     │
└────────────┼────────────────────────────┼───────────────────────┘
             │                            │
             └──────────┬─────────────────┘
                        │  consumen
┌───────────────────────▼────────────────────────────────────────┐
│                       PACKAGES (nivel 2)                       │
│                                                                │
│   ┌──────────┐  ┌───────────────┐  ┌──────────┐  ┌──────────┐  │
│   │ ui-astro │  │ design-tokens │  │  utils   │  │ content  │  │
│   │          │  │               │  │          │  │          │  │
│   │ Header   │  │ colores       │  │ fechas   │  │ dev/     │  │
│   │ Footer   │  │ tipog.        │  │ strings  │  │ ganado/  │  │
│   │ Card     │  │ spacing       │  │ seo      │  │          │  │
│   │ Layout   │  │ bordes        │  │          │  │          │  │
│   └──────────┘  └───────────────┘  └──────────┘  └──────────┘  │
│                                                                │
│                        ┌──────────┐                            │
│                        │  config  │ ← base de todo             │
│                        │ tsconfig │                            │
│                        │ postcss  │                            │
│                        └──────────┘                            │
└────────────────────────────────────────────────────────────────┘
```

---

## Grafo de dependencias actual

```txt
apps/web  ──────────────────────────────────────────────────────┐
  ├── @jaso/config          (tsconfig + postcss)                │
  ├── @jaso/design-tokens   (variables CSS de diseño)           │
  ├── @jaso/ui-astro   ──── @jaso/design-tokens                 │
  ├── @jaso/utils           (funciones TS)                      │
  └── @jaso/content         (artículos markdown: dev, ganado)   │
                                                                │
apps/cv  ───────────────────────────────────────────────────────┘
  ├── @jaso/config
  ├── @jaso/design-tokens
  ├── @jaso/ui-astro
  └── @jaso/utils
```

La regla clave: **los packages no dependen de apps**, las apps dependen de packages. Los packages pueden depender entre sí (ej: `ui-astro` usa `design-tokens`).

---

## Qué va en cada lugar

### `apps/` — Aplicaciones finales

Son los productos concretos que se despliegan en producción. Cada app:

- Tiene su propia URL y dominio
- Consume packages internos y dependencias externas
- Contiene páginas, rutas, assets y lógica específica del producto
- **No debe** exportar código para otros — eso va en `packages/`

| App       | Descripción                  | URL             |
|-----------|------------------------------|-----------------|
| `web`     | Sitio principal JASO         | jaso.me         |
| `cv`      | Currículum vitae interactivo | cv.jaso.me      |

### `packages/` — Bloques reutilizables

Son unidades de código que pueden ser consumidas por cualquier app (o por otros packages). Cada package:

- Tiene un nombre bajo el scope `@jaso/`
- Declara sus exports en `package.json`
- **No sabe** qué apps lo usan

| Package          | Tipo          | Qué contiene                            |
|------------------|---------------|-----------------------------------------|
| `config`         | Configuración | tsconfig base, postcss con plugins      |
| `design-tokens`  | Diseño (CSS)  | Variables de color, tipografía, spacing |
| `ui-astro`       | Componentes   | Header, Footer, Card, BaseLayout        |
| `utils`          | Librería TS   | Funciones de fechas, strings, SEO       |
| `content`        | Contenido     | Artículos markdown por dominio temático |

---

## Cómo puede crecer este monorepo

### Nuevas aplicaciones

```txt
apps/
  ├── web/          (ya existe)
  ├── cv/           (ya existe)
  ├── blog/         ← nuevo: blog público con artículos de @jaso/content
  ├── admin/        ← nuevo: panel interno de administración
  └── newsletter/   ← nuevo: landing page de suscripción
```

Cada nueva app simplemente se agrega en `apps/` y referencia los packages que necesita.

### Nuevos packages por dominio

El monorepo puede crecer agregando packages especializados por dominio o tecnología:

```txt
packages/
  ├── config/        (ya existe)
  ├── design-tokens/        (ya existe)
  ├── ui-astro/      (ya existe)
  ├── utils/         (ya existe)
  ├── content/       (ya existe)
  │
  ├── ui-react/      ← nuevo: componentes para apps React/Next
  ├── ui-vue/        ← nuevo: componentes para apps Vue/Nuxt
  ├── analytics/     ← nuevo: helpers de tracking y métricas
  ├── auth/          ← nuevo: lógica de autenticación compartida
  ├── db/            ← nuevo: modelos y queries de base de datos
  └── email/         ← nuevo: plantillas de email transaccional
```

### Crecimiento por dominios de negocio

El package `@jaso/content` ya muestra este patrón: agrupa contenido por dominio.
Puedes replicarlo para más dominios:

```txt
packages/content/
  ├── dev/           (ya existe — artículos de desarrollo)
  ├── ganado/        (ya existe — artículos de ganadería)
  ├── agricultura/   ← nuevo dominio
  ├── finanzas/      ← nuevo dominio
  └── comunidad/     ← nuevo dominio
```

---

## Flujo de trabajo con Turborepo

```txt
pnpm dev          →  turbo dev
                        ├── apps/web   pnpm dev  (puerto 4321)
                        └── apps/cv    pnpm dev  (puerto 4322)

pnpm build        →  turbo build
                        ├── packages/config    (primero — sin deps internas)
                        ├── packages/design-tokens    (primero — sin deps internas)
                        ├── packages/utils     (primero — sin deps internas)
                        ├── packages/ui-astro  (después — depende de design-tokens)
                        └── apps/web, apps/cv  (al final — dependen de todo)
```

Turbo analiza el grafo de dependencias automáticamente y ejecuta las tareas en el orden correcto, en paralelo cuando es posible, y con **caché** para no recompilar lo que no cambió.

---

## Resumen visual: regla de oro

```txt
          ┌─────────────────────────────────────┐
          │              APPS                   │
          │  Productos finales · Se despliegan  │
          │  Consumen packages · No exportan    │
          └───────────────┬─────────────────────┘
                          │ dependen de
          ┌───────────────▼─────────────────────┐
          │            PACKAGES                 │
          │  Bloques reutilizables · Se exportan│
          │  Sin conocimiento de las apps       │
          └─────────────────────────────────────┘
```

**Una app nueva = crear carpeta en `apps/` + agregar los packages que necesita.**
**Un código nuevo reutilizable = crear o ampliar un package en `packages/`.**
