---
title: "¿Qué es un Monorepo?"
description: "Estrategia de gestión de código donde múltiples proyectos coexisten en un único repositorio Git."
pubDate: 2026-01-15
updatedDate: 2026-03-01
tags: ["arquitectura", "monorepo", "git"]
categoria: "arquitectura"
draft: false
---

# ¿Qué es un Monorepo?

Un **monorepo** (monolithic repository) es una estrategia donde múltiples
proyectos coexisten en un único repositorio Git.

## La alternativa: Polyrepo

En un polyrepo cada proyecto tiene su propio repositorio:
```
repo-web/
repo-api/
repo-design-system/   ← versionar cambios entre repos es complejo
```

En un monorepo todo vive junto:
```
mi-monorepo/
├── apps/web/
├── apps/api/
└── packages/design-system/   ← un solo commit puede tocar todo
```

## Ventajas principales

- **Código compartido real** sin publicar paquetes a npm
- **Refactoring atómico** — un PR puede cambiar 5 paquetes a la vez
- **Consistencia** — TypeScript, ESLint y PostCSS configurados una vez
- **Onboarding simple** — un solo `git clone` y tienes todo el sistema

## Cuándo usarlo

Ideal cuando tienes 2+ proyectos que comparten lógica, componentes o tipos.
No vale la pena para proyectos completamente independientes entre sí.
