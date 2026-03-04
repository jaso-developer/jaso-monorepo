---
title: "Git — Ramas y flujo de trabajo"
description: "GitHub Flow adaptado para proyectos personales. Cómo trabajar con ramas de manera efectiva siendo el único desarrollador."
pubDate: 2026-03-03
tags: ["git", "github", "workflow", "ramas"]
categoria: "herramientas"
draft: false
---

# Git — Ramas y flujo de trabajo

## GitHub Flow simplificado

El flujo recomendado para proyectos personales:
```
main                     ← siempre estable
  ├── feat/nueva-feature
  ├── fix/nombre-del-bug
  └── chore/actualizar-deps
```

## El ciclo completo
```bash
# 1. Partir siempre de main actualizado
git checkout main
git pull

# 2. Crear rama para el feature
git checkout -b feat/mi-feature

# 3. Trabajar y hacer commits atómicos
git add .
git commit -m "feat: descripción clara del cambio"

# 4. Subir la rama
git push -u origin feat/mi-feature

# 5. Crear PR en GitHub y mergear

# 6. Limpiar
git checkout main
git pull
git branch -d feat/mi-feature
```

## Convención de commits
```
feat:     nueva funcionalidad
fix:      corrección de bug
chore:    mantenimiento, dependencias
docs:     solo documentación
refactor: reorganizar sin cambiar comportamiento
style:    formato, sin cambios de lógica
```
