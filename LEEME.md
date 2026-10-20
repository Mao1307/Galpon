# Mi Galpón · versión instalable

App para planificar y llevar día a día criaderos de pollos de engorde y gallinas ponedoras en Lima.
Incluye la **Academia avícola** con sus dos cursos. Se instala en el celular, **funciona sin internet**
y, si activas Firebase, **guarda todo en línea** con tu cuenta de Google.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app |
| `academia/ponedoras.html`, `academia/engorde.html` | Tus dos cursos, integrados a la app |
| `firebase-config.js` | Datos de tu base de datos en línea (lo llenas tú, paso 3) |
| `manifest.webmanifest`, `icons/` | Nombre e ícono para instalarla |
| `sw.js` | Guarda la app en el celular para usarla sin señal |
| `vendor/` | Generador de PDF (funciona sin internet) |

---

## 1. Actualizar tu repositorio de GitHub

Ya tienes la app publicada en GitHub Pages. Para pasar a esta versión:

1. Entra a tu repositorio en github.com → **Add file → Upload files**.
2. Arrastra **todo el contenido** de esta carpeta, incluidas las carpetas `academia`, `icons` y `vendor`.
   Si te pregunta, acepta reemplazar los archivos existentes. Pulsa **Commit changes**.
3. Espera 1–2 minutos y abre la app con internet. La versión nueva se carga sola
   (si no la ves, cierra la app por completo y ábrela otra vez).

Tus proyectos actuales **no se pierden**: siguen guardados en el celular.

---

## 2. Crear tu base de datos en Firebase (una sola vez, gratis)

Firebase es un servicio de Google. El plan gratuito ("Spark") alcanza de sobra para esta app.

### 2.1 Crear el proyecto
1. Entra a **https://console.firebase.google.com** con tu cuenta de Gmail.
2. **Crear un proyecto** → ponle un nombre, por ejemplo `mi-galpon` → puedes desactivar Google Analytics → **Crear proyecto**.

### 2.2 Activar el inicio de sesión
1. En el menú izquierdo: **Compilación (Build) → Authentication → Comenzar**.
2. En **Método de acceso**: activa **Google** (elige tu correo de asistencia y guarda).
   Opcional: activa también **Correo electrónico/contraseña**.
3. En **Configuración → Dominios autorizados → Agregar dominio**, escribe la dirección de tu app
   **sin** `https://` ni carpetas. Ejemplo: `tuusuario.github.io`

### 2.3 Crear la base de datos
1. Menú izquierdo: **Compilación → Firestore Database → Crear base de datos**.
2. Ubicación: la más cercana es **southamerica-east1 (São Paulo)**. Elige **modo de producción**.
3. Abre la pestaña **Reglas**, borra lo que hay, pega esto y pulsa **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Estas reglas hacen que **solo tú** puedas leer y escribir tus datos.

### 2.4 Copiar los datos de conexión
1. Arriba a la izquierda, engranaje ⚙ → **Configuración del proyecto**.
2. En **Tus apps**, pulsa el ícono **`</>`** (Web). Nombre: `Mi Galpón`. No marques Hosting. **Registrar app**.
3. Firebase te muestra un bloque así:
   ```
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "mi-galpon-xxxx.firebaseapp.com",
     projectId: "mi-galpon-xxxx",
     ...
   };
   ```
   Déjalo a la vista para el siguiente paso.

## 3. Conectar la app con Firebase

1. En tu repositorio de GitHub abre **`firebase-config.js`** y pulsa el lápiz ✏️ (Edit).
2. Reemplaza cada `PEGA_AQUI` por el valor correspondiente que te dio Firebase (dentro de las comillas).
3. **Commit changes**.
4. Abre la app con internet. En la pantalla de Proyectos aparece **"Guarda tus datos en línea"** →
   **Entrar con Google**. Tus proyectos del celular se suben solos.

Desde ahí, arriba verás **"Guardado en la nube"**. Si no tienes señal dirá
**"Sin señal · se sube luego"**: sigue registrando, todo se sube cuando vuelva la conexión.
En otro celular o computadora, abre la misma dirección y entra con la misma cuenta.

### Si algo falla
| Mensaje | Qué hacer |
|---|---|
| "Falta agregar tu dirección… Dominios autorizados" | Paso 2.2, punto 3 |
| "Revisa las reglas de Firebase" | Paso 2.3, punto 3: pega las reglas y **Publicar** |
| "No se pudo conectar con Firebase" | Revisa que `firebase-config.js` no tenga comillas o comas borradas |
| El botón de Google no hace nada | Prueba "Entrar" con correo y contraseña (actívalo en 2.2) |

---

## 4. Academia avícola

- En la pantalla de **Proyectos** está la sección **Academia avícola** con tus dos cursos y su avance.
- Dentro de cada lote, en **Plan** y **Resumen**, hay enlaces directos a los módulos que tocan ese tema
  (producción y sanidad, costos, comercialización, finanzas, calculadora y plan de negocio).
  El curso que se abre depende del lote: ponedoras o engorde.
- Para regresar desde un curso, usa **← Mi Galpón** arriba.
- Los cursos funcionan sin internet y su avance (lecciones leídas, quizzes, tareas, calculadora y plan de negocio)
  se guarda en la nube junto con tus proyectos y va dentro del respaldo.

---

## 5. Respaldo
Aunque uses la nube, puedes descargar un **respaldo** (archivo `.json`) desde Proyectos.
Incluye tus proyectos y el avance de los cursos. Se recupera con **Restaurar respaldo**.

## 6. Próximas actualizaciones
Antes de subir una versión nueva, cambia en `sw.js` la línea `const VERSION = 'mi-galpon-v2'`
a `v3`, `v4`, etc. **No reemplaces `firebase-config.js`** si ya lo llenaste.

---
Los valores de crecimiento, alimento, postura, vacunas y precios son referenciales (guías de Aviagen,
Cobb-Vantress, Lohmann, Hy-Line e ISA; precios 2026). Confírmalos con tu médico veterinario o zootecnista,
un contador y SENASA. ESAN no participa ni respalda los cursos.
