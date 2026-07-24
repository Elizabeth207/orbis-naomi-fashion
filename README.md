# ORBIS II & Novias Naomi — Sitio web

Sitio institucional y catálogo visual para dos tiendas de moda en Pichanaki, Junín, Perú.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Framer Motion

---

## Descripción del proyecto

Este sitio web es la presencia digital de dos marcas hermanas con tiendas físicas en Pichanaki, Junín, Perú: **Orbis II**, dedicada a ropa casual para damas y caballeros, y **Novias Naomi**, especializada en vestidos de novia, gala y quinceañera desde los 8 años. Ambas marcas comparten un mismo sitio, pero cada una mantiene su propia identidad visual (paleta de color, tono de fotos y estilos destacados).

El sitio funciona como un catálogo visual tipo lookbook: cada marca tiene su propia página con una selección de estilos/prendas destacadas, hay un catálogo combinado que mezcla ambas marcas en un mosaico editorial, una galería de fotos de tienda, y una página de tiendas con dirección, horarios y mapa. No es una tienda en línea (no hay carrito ni pagos): el objetivo es mostrar el producto y **derivar el contacto directo a WhatsApp o al formulario de contacto**, que es como el cliente final cierra la compra o consulta disponibilidad.

En resumen, el proyecto resuelve tres necesidades del negocio: dar presencia web profesional a ambas marcas, mostrar el catálogo de productos de forma atractiva sin necesidad de mantener un inventario en línea, y facilitar que cualquier visitante contacte a la tienda correcta (por WhatsApp, formulario o correo) en un clic.

## Stack técnico

Versiones exactas instaladas (ver `package.json`):

- **React 19.2.7** — librería de UI, base de toda la interfaz por componentes.
- **TypeScript ~6.0.2** — tipado estático para todo el código fuente.
- **Vite 8.1.1** — servidor de desarrollo y bundler de producción.
- **Tailwind CSS 4.3.3** (vía `@tailwindcss/postcss`) — estilos utilitarios, con paleta y tipografías de marca definidas en `src/styles/globals.css`.
- **React Router DOM 7.18.1** — enrutamiento entre las páginas del sitio (`src/App.tsx`).
- **Framer Motion 12.42.2** — animaciones (transiciones de entrada al hacer scroll, hover en tarjetas, modales, menú móvil, etc.).
- **Formspree** (servicio externo, sin paquete npm) — recibe y reenvía por correo los envíos del formulario de contacto.
- **ESLint 10 + typescript-eslint** — linting del proyecto (`npm run lint`).

> Nota: `clsx` está en las dependencias pero actualmente no se usa en ningún archivo del proyecto; se puede quitar en una limpieza futura o dejar para uso posterior.

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/        # Navbar, Footer y MainLayout (armazón visible en todas las páginas)
│   ├── sections/       # Bloques grandes de página: Hero, BrandHero, StoresSection,
│   │                   # StyleGrid, StyleMosaic, ContactForm, FramedPromo, etc.
│   └── ui/             # Piezas reutilizables más pequeñas: StyleCard, StyleDetailModal,
│                       # PhotoOrFallback, ImageBackground, VideoBackground, Reveal, etc.
├── data/               # "Contenido" del sitio en archivos .ts (ver sección Contenido editable)
├── hooks/              # Carpeta reservada para hooks personalizados (actualmente vacía, sin uso)
├── lib/
│   └── constants.ts    # Constantes globales: WhatsApp, correo, endpoint de Formspree, textos de marca
├── pages/              # Una página por ruta (HomePage, OrbisPage, NaomiPage, CatalogoPage, ...)
├── styles/
│   └── globals.css     # Import de Tailwind + variables de tema (colores y fuentes de marca)
├── assets/             # Restos del template inicial de Vite (react.svg, vite.svg, hero.png), sin uso real
├── App.tsx             # Definición de rutas
└── main.tsx            # Punto de entrada (StrictMode + BrowserRouter)

public/
├── images/             # Todas las fotos reales del sitio, organizadas por marca/sección (ver más abajo)
└── video/              # Videos de fondo del Hero de la página de Inicio
```

Las fotos y videos **ya no viven en `src/assets`**: se movieron a `public/` para que Vite los incluya correctamente en el build de producción (ver sección Contenido editable).

## Páginas del sitio

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio (`HomePage`) | Hero animado con video de fondo por marca, introducción, colecciones destacadas de ambas marcas, promoción vigente, ubicación de tiendas y llamado a la acción por WhatsApp. |
| `/orbis-ii` | Orbis II (`OrbisPage`) | Página de marca: hero con imagen de fondo, historia de la marca y grid de estilos/prendas destacadas de Orbis II. |
| `/novias-naomi` | Novias Naomi (`NaomiPage`) | Misma estructura que Orbis II, con paleta, textos y estilos propios de Novias Naomi. |
| `/catalogo` | Catálogo (`CatalogoPage`) | Mosaico editorial que combina estilos de ambas marcas, con filtro Todo / Orbis II / Novias Naomi. |
| `/galeria` | Galería (`GaleriaPage`) | Galería de fotos de ambas tiendas, con vista ampliada (lightbox) al hacer clic. |
| `/nuestras-tiendas` | Tiendas (`TiendasPage`) | Dirección, horario, WhatsApp, mapa y fotos del local de cada tienda. |
| `/contacto` | Contacto (`ContactoPage`) | Formulario de contacto conectado a Formspree, más datos de contacto directo y resumen de ambas tiendas. |

## Cómo correr el proyecto localmente

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Levantar el servidor de desarrollo (con recarga en caliente):
   ```bash
   npm run dev
   ```
3. Generar el build de producción (corre `tsc -b` y luego `vite build`, el resultado queda en `dist/`):
   ```bash
   npm run build
   ```
4. Previsualizar localmente el build de producción ya generado:
   ```bash
   npm run preview
   ```

El `package.json` no especifica una versión mínima de Node.js (no existe un campo `engines`); se recomienda usar una versión de Node reciente compatible con Vite 8.

## Variables y configuración importante

Todas las constantes globales del sitio viven en **`src/lib/constants.ts`**, en un solo lugar:

| Constante | Valor actual | Para qué sirve |
|---|---|---|
| `WHATSAPP_NUMBER` | `"51916621772"` | Número usado en todos los botones/links de WhatsApp del sitio (Hero, tiendas, modales de estilo, formulario de contacto, CTA final). |
| `CONTACT_EMAIL` | `"naomiorbis@gmail.com"` | Correo mostrado en la página de Contacto y usado en el link `mailto:`. |
| `FORMSPREE_ENDPOINT` | `"https://formspree.io/f/xvzebpkr"` | URL a la que se envía el formulario de contacto (ver sección Formulario de contacto). |
| `BRAND` | objeto con `orbis` y `naomi` | Nombre y tagline corto de cada marca (`name`, `tagline`), usados en varios títulos y textos del sitio. |

**Si en el futuro cambia el número de WhatsApp o el correo de contacto, solo hay que actualizar este archivo** — no hay que buscar el dato en cada componente.

## Contenido editable

Esta es la guía rápida para actualizar contenido del sitio **sin tocar el diseño**:

- **Estilos/prendas destacadas (lo que se ve en Orbis II, Novias Naomi y Catálogo)** → `src/data/styles.ts`. Cada estilo se define con la función `buildStyle(brand, folder, name, description, collectionFiles)` y necesita una carpeta en `public/images/{orbis|naomi}/estilos/{Nombre del estilo}/` que contenga:
  - `{Nombre del estilo}.jpg` — la foto principal/portada (mismo nombre que la carpeta).
  - una subcarpeta `coleccion/` con 3 o 4 fotos (`coleccion1.jpg`, `coleccion2.jpg`, `coleccion3.jpg`, `coleccion4.jpg`) que se muestran en el detalle del estilo.

  Para agregar un estilo nuevo: crear la carpeta con esa misma convención dentro de `public/images/orbis/estilos/` o `public/images/naomi/estilos/`, y agregar una nueva entrada con `buildStyle(...)` en `STYLES_ORBIS` o `STYLES_NAOMI`. Importante: los nombres de archivo deben coincidir exactamente con los que se escriban en `styles.ts` (mayúsculas, espacios y tildes incluidos).

  > Nota: existe también `src/data/categories.ts` (categorías con ícono tipo "Polos & camisas", "Vestidos de novia", etc.), pero **ya no se usa en ninguna página activa** — quedó del diseño anterior al mosaico editorial. Ver "Pendientes conocidos".

- **Fotos y videos generales del sitio** → carpetas `public/images/` y `public/video/`, organizadas así:
  - `public/images/orbis/hero.jpg` y `public/images/naomi/hero.jpg` — foto de fondo del Hero de `/orbis-ii` y `/novias-naomi`.
  - `public/images/incio/orbis.jpg` y `public/images/incio/naomi.jpg` — fotos de la sección de colecciones destacadas en Inicio.
  - `public/images/tienda/imagen1.jpg` — foto de cabecera de la página Tiendas.
  - `public/images/tienda/orbislugar.jpg` y `public/images/tienda/naomilugar.jpg` — foto de "Conoce nuestro local" de cada tienda.
  - `public/images/tienda/contacto.jpg` — foto de la página de Contacto.
  - `public/images/galeria/*.jpg` — fotos individuales de la Galería, cada una referenciada por nombre de archivo en `src/data/gallery.ts`.
  - `public/video/orbis-hero.mp4` y `public/video/naomi-hero.mp4` — videos de fondo del Hero de Inicio.

  Para reemplazar cualquiera de estas fotos/videos, basta con sobrescribir el archivo manteniendo el mismo nombre; para agregar fotos nuevas a la Galería hay que además agregar la entrada correspondiente en `src/data/gallery.ts`.

- **Datos de tiendas (dirección, horario, WhatsApp, mapa)** → `src/data/stores.ts`.
- **Promociones** (bloque "Promoción vigente" en Inicio) → `src/data/promotions.ts`.
- **Fotos de galería** → `src/data/gallery.ts` (cada objeto define `id`, `brand`, `caption` y `src` de la imagen en `public/images/galeria/`).

## Formulario de contacto

El formulario de `/contacto` (`src/components/sections/ContactForm.tsx`) envía los datos (nombre, correo, tienda de interés y mensaje) mediante `fetch` a **Formspree**, usando la URL configurada en `FORMSPREE_ENDPOINT` (`src/lib/constants.ts`). Los mensajes enviados llegan al correo verificado en la cuenta de Formspree asociada a ese formulario. Si el envío falla, el formulario muestra un mensaje de error y ofrece como alternativa inmediata un botón de WhatsApp.

## Despliegue

El proyecto está pensado para desplegarse en **Vercel**, conectado directamente al repositorio de GitHub (Vercel detecta automáticamente que es un proyecto Vite y usa `npm run build` / carpeta `dist/`).

**Pendiente:** el archivo `vercel.json` con la regla de `rewrites` **todavía no existe en el proyecto**. Es necesario agregarlo antes de publicar, ya que sin él las rutas de React Router (por ejemplo `/catalogo` o `/contacto`) devolverán error 404 al recargar la página o al entrar directamente por esa URL en producción. La regla típica para este caso es redirigir cualquier ruta hacia `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Pendientes conocidos

Lista honesta de lo que queda por resolver o limpiar, verificado directamente en el código actual:

- **Dirección de Novias Naomi incompleta**: en `src/data/stores.ts`, el campo `address` de Novias Naomi todavía dice *"Bajo Pichanaqui, Chanchamayo, Junín, Perú (coordenadas exactas confirmadas, dirección en texto pendiente)"*. Las coordenadas del mapa ya son correctas, pero falta redactar la dirección definitiva en texto.
- **`vercel.json` no existe todavía** — necesario antes de publicar en Vercel (ver sección Despliegue).
- **Componentes de categorías sin uso** (`src/components/sections/CategoryGrid.tsx`, `src/components/ui/CategoryModal.tsx`, `src/components/ui/CategoryIcon.tsx` y los datos de `src/data/categories.ts`) quedaron del diseño anterior al mosaico editorial y ya no se usan en ninguna página. Se pueden eliminar del proyecto con tranquilidad, o dejarse por si se reutilizan más adelante.
- **`PromoBanner.tsx`** (`src/components/sections/PromoBanner.tsx`) también quedó sin uso: fue reemplazado por `FramedPromo.tsx` en Inicio.
- **Corazón de "favorito" en las tarjetas de estilo** (`src/components/ui/StyleCard.tsx`) es solo un guiño visual decorativo por ahora — no hay backend de favoritos conectado (queda marcado con un comentario `// TODO` en el código, por si el cliente lo pide en el futuro).
- **Carpeta vacía `public/images/Catálogo/`** sin referencias en el código — parece un remanente de organización manual de archivos, se puede eliminar.
- **Foto suelta sin usar**: `public/images/galeria/orbis-02.jpeg` existe en el disco pero no está referenciada en `src/data/gallery.ts` (la galería actual usa `orbis-01.jpg` y `orbis-04.jpeg` para Orbis II). Si es una foto pendiente de sumar a la galería, hay que agregar su entrada en `gallery.ts`.
- **Nombres de archivo con pequeños errores de tipeo** en algunas fotos de "colección" dentro de `public/images/orbis/estilos/` (por ejemplo `colecion3.jpg`, `collecion2.jpg` en vez de `coleccion3.jpg`/`coleccion2.jpg`). El código en `src/data/styles.ts` ya está adaptado a esos nombres exactos y todo funciona, pero si se reemplazan esas fotos en el futuro hay que respetar el nombre de archivo tal cual está registrado (o actualizar `styles.ts` si se corrige el nombre).
- **Carpeta `src/hooks/`** existe pero está vacía, reservada para hooks personalizados futuros.
- **Dependencia `clsx`** instalada en `package.json` pero no usada actualmente en el código.

## Créditos

Desarrollado por **Elizabeth Huarcaya Contreras** — 2026.
