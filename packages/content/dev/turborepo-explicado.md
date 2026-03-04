---
title: "Turborepo explicado"
description: "Cómo Turbo orquesta builds en paralelo con caché inteligente para acelerar el desarrollo en monorepos."
pubDate: 2026-01-20
tags: ["turborepo", "build", "monorepo", "performance"]
categoria: "herramientas"
draft: false
---

# Turborepo explicado

Turborepo es el orquestador de tareas del monorepo. Resuelve tres problemas
que aparecen cuando tienes múltiples paquetes relacionados.

## Problema 1 — Orden de build

Si `apps/web` depende de `packages/ui`, necesitas construir `ui` primero.
Turbo lee el grafo de dependencias y ejecuta las tareas en el orden correcto
automáticamente.

## Problema 2 — Paralelismo

Las tareas independientes se ejecutan al mismo tiempo, aprovechando
todos los núcleos del CPU.
```
Sin Turbo:  config → ui → web → cv → blog  (secuencial)
Con Turbo:  config → ui → web              (paralelo donde es posible)
                       └→ cv
                       └→ blog
```

## Problema 3 — Caché inteligente

Turbo genera un hash de cada paquete basado en sus archivos.
Si el hash no cambió, restaura el output del caché en milisegundos.
```bash
$ pnpm build

config:build  - cache hit ⚡  (12ms)
ui:build      - cache hit ⚡  (8ms)
web:build     - cache miss    (construyendo...)
```

Solo reconstruye lo que realmente cambió.
