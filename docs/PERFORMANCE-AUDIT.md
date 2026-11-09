# Auditoría de performance — ORBIS II & Novias Naomi

> Fecha: 2026-03-31 · Stack: React 19 + Vite 8 + Tailwind 4 (CSR, sin SSR)

## Resumen ejecutivo

Los puntajes **FCP ~35 s** y **LCP ~81 s** son incompatibles con un build de producción optimizado en conexión normal. Indican casi siempre:

1. Medición sobre **`npm run dev`** (Vite sirve miles de módulos sin empaquetar).
2. **Videos MP4 autoplay** en el hero de inicio (~6 MB solo en los dos heroes).
3. **Google Fonts** bloqueando render (hoja síncrona en `<head>`).
4. **Bundle JS único** (~470 KB) sin code splitting por ruta.

**Siempre auditar con:** `npm run build && npm run preview` y Lighthouse en `http://localhost:4173`.

## Fase 1 — Inventario

| Área | Detalle |
|------|---------|
| Framework | React 19.2, react-router 7.18 |
| Build | Vite 8.1, `@vitejs/plugin-react` |
| Estilos | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Animación | framer-motion 12 |
| Iconos | lucide-react (imports nombrados) |
| Imágenes | `public/images/` estáticas; sin CDN de imágenes |
| Fuentes | Google Fonts: Fraunces, Inter, Parisienne |
| Deploy | Vercel (`vercel.json` SPA rewrite) |
| Mapas | iframe Google Maps lazy en tiendas |

## Fase 2 — Cuellos de botella

### LCP (inicio `/`)

Elemento probable: **poster** `/images/orbis/hero.jpg` o video `orbis-hero.mp4` (2.66 MB) + `naomi-hero.mp4` (3.41 MB) en paralelo con `autoPlay` y sin `preload="none"`.

### FCP

- JS de entrada + CSS (~60 KB gzip) + fuentes + descarga de videos.
- Hero con `motion` (animaciones iniciales en texto).

### TBT (~660 ms)

- framer-motion en casi todas las secciones.
- Bundle inicial sin división por ruta (corregido con `React.lazy` en rutas).

### Vídeos (peso en `public/video/`)

| Archivo | ~MB |
|---------|-----|
| nahomi2.mp4 | 5.26 |
| video.mp4 | 4.36 |
| nahomi1.mp4 | 3.80 |
| naomi-hero.mp4 | 3.41 |
| orbis-hero.mp4 | 2.66 |

## Fase 3 — Cambios aplicados (código)

1. **Hero:** poster JPG + `preload="none"`; video solo al entrar en viewport (`useInView`).
2. **`index.html`:** preload LCP poster; fuentes con `preload` + `onload` (no bloqueante); menos pesos de Fraunces.
3. **Rutas:** `React.lazy` por página; chunks `vendor-react`, `vendor-motion`, `vendor-icons`.
4. **`StyleDetailModal`:** import dinámico en páginas con catálogo.
5. **FramedPromo / NaomiVideoShowcase:** sin autoplay ni descarga de MP4 hasta viewport; miniaturas sin `<source>`.
6. **`vercel.json`:** cabeceras `Cache-Control` para `/assets/`, `/images/`, `/video/`.
7. **Imágenes:** `loading="lazy"`, `decoding="async"` por defecto; `fetchPriority="high"` en hero de marca y poster Orbis.

## Recuperación Git

Antes de estos cambios: `git stash list` → entrada **`pre-performance-audit-baseline`**.  
Restaurar: `git stash apply stash@{0}` (o el índice que muestre `git stash list`).

## Medición recomendada

```bash
npm run build
npm run preview
# Lighthouse → URL http://localhost:4173
# Modo: Mobile, Sin throttling (primero) y luego Slow 4G para sensibilidad
```

## Próximos pasos (sin romper diseño)

- Convertir heroes MP4 a **versiones más cortas/bitrate menor** o WebM.
- **WebP/AVIF** para JPG pesados (script `sharp` ya en devDependencies).
- Revisar **BlurFillImage** (doble descarga por imagen).
- Considerar **self-host** de fuentes WOFF2 para eliminar round-trip a Google.

## Resultados Lighthouse

_Pendiente de medición local en preview de producción tras desplegar o correr `npm run preview`._
