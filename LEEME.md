# Mi Galpón — versión instalable

App para planificar y llevar día a día criaderos de pollos de engorde y gallinas ponedoras en Lima.
Se instala en el celular desde el navegador y **funciona sin internet** en el galpón.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` | Nombre, ícono y colores para instalarla |
| `sw.js` | Guarda la app en el celular para usarla sin señal |
| `icons/` | Íconos de la app |
| `vendor/` | Generador de PDF (funciona sin internet) |

## 1. Publicarla (una sola vez)

Para instalarla, la app tiene que estar en una dirección **https**. Ambas opciones son gratis.

### Opción A: GitHub Pages (recomendada, queda fija)
1. Crea una cuenta en github.com y un repositorio nuevo, por ejemplo `mi-galpon` (público).
2. En el repositorio: **Add file → Upload files** y arrastra **todo el contenido** de esta carpeta
   (`index.html`, `manifest.webmanifest`, `sw.js` y las carpetas `icons` y `vendor`). Luego **Commit changes**.
3. Ve a **Settings → Pages**. En *Branch* elige `main` y carpeta `/ (root)`, y guarda.
4. En 1–2 minutos tu app estará en `https://TU-USUARIO.github.io/mi-galpon/`.

### Opción B: Netlify
1. Crea una cuenta en netlify.com.
2. **Add new site → Deploy manually** y arrastra la carpeta completa.
3. Te da una dirección tipo `https://nombre.netlify.app` (puedes cambiar el nombre).

## 2. Instalarla en el celular (Android)
1. Abre la dirección en **Chrome**.
2. Toca el botón **Instalar** que aparece arriba en la app, o el menú **⋮ → Instalar app** (o "Agregar a pantalla principal").
3. Aparece el ícono de Mi Galpón en tu celular. Ábrela una vez con internet; desde ahí funciona sin señal.

En iPhone: abre la dirección en **Safari → Compartir → Agregar a inicio**.

## 3. Tus datos
- Se guardan **solo en tu celular**, no se envían a ningún servidor.
- Desde la pantalla de Proyectos usa **Descargar respaldo** cada semana y guarda el archivo `.json` en Drive o envíatelo por WhatsApp.
- Si cambias de celular: instala la app y toca **Restaurar respaldo** con ese archivo.
- No borres los "datos del sitio" de Chrome para esta dirección, o perderás lo que no tengas respaldado.

## 4. Actualizar la app
Si recibes una versión nueva, reemplaza los archivos en GitHub o Netlify. Antes de reemplazar,
cambia la línea `const VERSION = 'mi-galpon-v1'` de `sw.js` a `v2`, `v3`, etc.
El celular toma la versión nueva la siguiente vez que abras la app con internet. Tus datos no se pierden.

---
Los valores de crecimiento, alimento, postura y vacunas son referenciales (guías de Aviagen, Cobb-Vantress,
Lohmann, Hy-Line e ISA). Confírmalos con tu médico veterinario o zootecnista.
