# Plan: Landing "Bodegas PNTE" con Astro + Vue

## Stack
- **Astro 5** (scaffold con `npm create astro` template `minimal`)
- **Vue 3** vía `@astrojs/vue` (para el formulario)
- **Tailwind CSS** como theme gratis (lightweight, responsive)

## Estructura de archivos
```
bodega/
├── astro.config.mjs          # integra Vue + Tailwind
├── tailwind.config.mjs
├── package.json
├── public/
│   └── logos/                # SVG placeholder por marca (los podrás reemplazar)
├── src/
│   ├── data/marcas.json      # datos: nombre, ruc, descripcion, redes, contacto, logo
│   ├── layouts/Layout.astro  # layout base con nav/footer
│   ├── components/
│   │   ├── BrandCard.astro   # box de marca (logo + nombre)
│   │   ├── ContactForm.vue   # formulario "Contáctanos" (nombre, celular, correo)
│   │   └── SocialIcons.astro # iconos SVG de redes (gratis, inline)
│   └── pages/
│       ├── index.astro       # banner + grid 3 columnas (PC) / 1 col (móvil)
│       └── marca/[slug].astro # página dinámica por marca
```

## Funcionalidad
1. **index.astro**: banner hero con título **"Bodegas PNTE"** + grid responsive (`grid-cols-1 md:grid-cols-3`) con las 3 marcas (logo + nombre). Click en cada box → navega a `/marca/[slug]`.
2. **`/marca/[slug].astro`** (generado con `getStaticPaths` desde `marcas.json`): muestra nombre, RUC, logo, descripción, redes sociales (Facebook, Instagram, WhatsApp) y teléfonos de contacto. Debajo: `ContactForm.vue` "Contáctanos" con campos nombre, celular y correo.
3. **ContactForm.vue**: validación simple y al enviar muestra mensaje de éxito (sin backend, solo frontend; si quieres, lo conectamos a Formspree u otro servicio).

## Asunciones
- **Marcas**: como no se dieron nombres, se crearán 3 marcas de ejemplo (ej. *Viña Norte, Cosecha Real, Sol de Oro*) editables en `marcas.json`. Si el usuario da nombres reales, se usan directamente.
- **Logos**: SVG placeholder genéricos reemplazables en `public/logos/`.

## Pendientes por confirmar
- Nombres reales de las marcas y logos
- Si el formulario queda solo frontend (sin envío real) o se conecta a Formspree/backend
