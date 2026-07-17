# 🌿 Tienda Natura Jacquy

Tienda online de productos naturales construida con **Next.js 14**, **Tailwind CSS** y **Supabase**.
Todo con herramientas **gratuitas**.

- 🛍️ Catálogo público con búsqueda y filtro por categoría
- 🛒 Carrito de compras con envío del pedido por **WhatsApp**
- 🔐 Panel de administración (para agregar, editar, eliminar productos, subir fotos, marcar agotados y ver pedidos)
- 📦 249 productos listos para importar

---

# 📖 GUÍA PASO A PASO (para personas sin experiencia técnica)

> Sigue los pasos **en orden**. No necesitas saber programar. Cada paso indica exactamente dónde hacer clic.

Hay **5 grandes pasos**:

1. Crear la base de datos gratis en Supabase
2. Importar los 249 productos
3. Conectar el proyecto (variables de entorno)
4. Publicar la tienda gratis en Vercel
5. Cómo tu mamá usa el panel de administración

---

## 🟢 PASO 1: Crear la cuenta y base de datos en Supabase

Supabase es donde vivirán tus productos y pedidos (es gratis).

### 1.1 Crear cuenta y proyecto
1. Entra a **https://supabase.com** y haz clic en **"Start your project"**.
2. Regístrate con tu cuenta de **GitHub** o correo (es gratis, plan "Free").
3. Ya dentro, haz clic en **"New project"**.
4. Completa:
   - **Name**: `tienda-natura-jacquy`
   - **Database Password**: crea una contraseña y **guárdala** en un lugar seguro.
   - **Region**: elige la más cercana (ej: *South America (São Paulo)*).
5. Haz clic en **"Create new project"** y espera 1-2 minutos a que se prepare.

### 1.2 Crear las tablas (copiar y pegar)
1. En el menú de la izquierda, haz clic en **SQL Editor** (ícono `</>`).
2. Haz clic en **"+ New query"**.
3. Abre el archivo **`supabase/01_schema.sql`** de este proyecto, copia **todo** su contenido y pégalo.
4. ⚠️ **IMPORTANTE**: antes de ejecutar, busca esta línea casi al final:
   ```sql
   values ('correo-de-tu-mama@gmail.com', 'Jacquy')
   ```
   y reemplaza `correo-de-tu-mama@gmail.com` por el **correo real** con el que tu mamá va a entrar al panel.
5. Haz clic en **"Run"** (o presiona Ctrl+Enter). Debe decir *Success*.

### 1.3 Crear el usuario (login) de tu mamá
1. En el menú de la izquierda, ve a **Authentication** → pestaña **Users**.
2. Haz clic en **"Add user"** → **"Create new user"**.
3. Escribe el **mismo correo** del paso 1.2 y una **contraseña** para tu mamá.
4. Activa **"Auto Confirm User"** (para que pueda entrar de inmediato) y haz clic en **"Create user"**.

### 1.4 Crear el espacio para las fotos (Storage)
1. En el menú de la izquierda, ve a **Storage**.
2. Haz clic en **"New bucket"**.
3. Nombre: `productos` (exactamente así, en minúsculas).
4. Activa la opción **"Public bucket"** (para que las fotos se vean en la tienda).
5. Haz clic en **"Create bucket"**.
6. Vuelve al **SQL Editor** → **New query**, pega el contenido de **`supabase/03_storage.sql`** y haz clic en **"Run"**.

---

## 🟢 PASO 2: Importar los 249 productos

1. Ve al **SQL Editor** → **"+ New query"**.
2. Abre el archivo **`supabase/02_import_productos.sql`**, copia **todo** y pégalo.
3. Haz clic en **"Run"**. Debería cargar los 249 productos de una vez.
4. Para verificar: menú **Table Editor** → tabla **`productos`**. Deberías ver la lista completa.

> 💡 Alternativa sin SQL: en **Table Editor → productos → Insert → Import data from CSV**, sube el archivo `supabase/productos.csv`.

### ⚠️ Precios que debes revisar
Al analizar tu inventario detectamos **precios que podrían tener un error de tipeo**. Se importaron **tal cual estaban** en tu respaldo. Revísalos y corrígelos desde el panel de admin (Paso 5) si hace falta:

| Producto | Precio importado | ¿Revisar? |
|---|---|---|
| Shampo Antiquiebre "Muru Muru" 100ml | $100.000 | ¿debería ser $10.000? |
| Shampoo antidaños muru muru | $60.000 | ¿$6.000? |
| Crema para cuerpo 400ml Cereza y avellana | $60.000 | ¿$6.000? |
| Jabón de tocador Cuerpo y barba (3c/u) | $50.000 | ¿$5.000? |
| Crema para cuerpo "Pera y flor de loto" 400ml | $50.000 | ¿$10.000? |
| Pulpa para cuerpo castanha 400ml | $50.000 | revisar |
| Jabona de vidrio natura ekos | $5.009 | ¿$5.000? |

---

## 🟢 PASO 3: Conectar el proyecto con tus claves

El proyecto necesita saber **cuál** es tu base de datos. Eso se hace con las "variables de entorno".

### 3.1 Encontrar tus claves en Supabase
1. En Supabase, ve a **Project Settings** (ícono de engranaje, abajo a la izquierda).
2. Entra a **API Keys** (o **Data API**).
3. Copia estos dos valores:
   - **Project URL** → algo como `https://abcdxyz.supabase.co`
   - **anon public** (la clave que empieza con `eyJ...`)

### 3.2 Crear el archivo `.env.local`
1. En la carpeta del proyecto verás un archivo llamado **`.env.local.example`**.
2. Haz una copia y renómbrala a **`.env.local`** (sin el `.example`).
3. Ábrela y reemplaza los valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tu-clave...
   NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
   NEXT_PUBLIC_STORE_NAME=Natura Jacquy
   ```
   - **NEXT_PUBLIC_WHATSAPP_NUMBER**: el número que recibirá los pedidos, en formato internacional **sin + ni espacios**. Ejemplo Chile: `56912345678`.

> 🔒 El archivo `.env.local` **NO se sube a internet** (ya está protegido). Guarda tus claves solo ahí.

### 3.3 (Opcional) Probarlo en tu computador
Si tienes Node.js instalado, en una terminal dentro de la carpeta del proyecto:
```bash
npm install
npm run dev
```
Luego abre **http://localhost:3000** en tu navegador. Verás la tienda con tus productos.

---

## 🟢 PASO 4: Publicar la tienda GRATIS en Vercel

Vercel pone tu tienda en internet con una dirección web, gratis.

### 4.1 Subir el proyecto a GitHub
> Si te entregamos el proyecto como un repositorio de GitHub, este paso ya está listo y puedes saltar al 4.2.

1. Crea una cuenta gratis en **https://github.com**.
2. Crea un repositorio nuevo (botón **"New"**), por ejemplo `tienda-natura-jacquy`.
3. Sube los archivos del proyecto (puedes arrastrarlos en **"uploading an existing file"**).

### 4.2 Conectar Vercel
1. Entra a **https://vercel.com** y regístrate con tu cuenta de **GitHub** (gratis).
2. Haz clic en **"Add New..." → "Project"**.
3. Elige tu repositorio `tienda-natura-jacquy` y haz clic en **"Import"**.
4. **Antes de "Deploy"**, abre la sección **"Environment Variables"** y agrega las mismas 4 variables del Paso 3.2:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_STORE_NAME`
   (copia el nombre y el valor de cada una).
5. Haz clic en **"Deploy"** y espera 1-2 minutos.
6. ¡Listo! Vercel te dará una dirección como `https://tienda-natura-jacquy.vercel.app`. Esa es tu tienda pública. 🎉

> 💡 Cada vez que cambies algo en GitHub, Vercel actualiza la tienda solo.

---

## 🟢 PASO 5: Cómo tu mamá usa el panel de administración

Tu mamá **no necesita saber nada de programación**. Solo entra a una página web.

### 5.1 Entrar al panel
1. En el navegador, ir a la dirección de la tienda + **`/admin`**.
   Ejemplo: `https://tienda-natura-jacquy.vercel.app/admin`
2. Escribir el **correo** y la **contraseña** (los del Paso 1.3).
3. Hacer clic en **"Entrar"**.

> 💡 Recomendación: guardar esa dirección `/admin` en los favoritos del teléfono.

### 5.2 Qué puede hacer en el panel

**Pestaña "Productos":**
- **➕ Agregar producto**: botón verde arriba. Se completa nombre, categoría, precio, stock y (opcional) una foto.
- **📷 Subir foto**: dentro del formulario, botón "Subir foto" → elige una imagen del teléfono/computador.
- **✏️ Editar**: botón "Editar" en cualquier producto para cambiar precio, nombre, etc.
- **🚫 Agotar / Reponer**: marca un producto como agotado (deja de venderse) o lo vuelve a activar.
- **👁️ Ocultar / Mostrar**: quita o vuelve a mostrar un producto en la tienda sin borrarlo.
- **🗑️ Eliminar**: borra un producto para siempre (pide confirmación).
- **🔎 Buscar y filtrar**: por nombre o por categoría.

**Pestaña "Pedidos":**
- Muestra cada pedido con el **cliente**, su **teléfono** (con enlace directo a WhatsApp), los **productos** y el **total**.
- Se puede cambiar el estado: **pendiente → confirmado → entregado** (o cancelado).

### 5.3 Cómo llega un pedido
1. El cliente arma su carrito en la tienda y toca **"Finalizar pedido por WhatsApp"**.
2. Se abre WhatsApp con el detalle listo para enviarte.
3. El pedido **también queda guardado** en la pestaña "Pedidos" del panel.

---

## 🎨 Sobre el diseño
- Colores cálidos y naturales (verdes, beige, tonos tierra).
- Adaptable a **celular, tablet y computador** (mobile-first).
- Simple y rápido para clientes que no son expertos en tecnología.

## 📁 Estructura del proyecto
```
app/                  Páginas (catálogo, producto, carrito, admin)
components/           Componentes visuales reutilizables
lib/                  Conexión a Supabase y utilidades
supabase/             Scripts SQL (01_schema, 02_import, 03_storage) y CSV
data/                 Respaldo original y scripts de análisis
```

## ❓ Problemas frecuentes
- **No se ven productos**: revisa que las variables de entorno en Vercel estén bien y que ejecutaste `02_import_productos.sql`.
- **No puedo entrar al panel**: el correo debe estar en la tabla `usuarios_admin` (Paso 1.2) **y** creado en Authentication (Paso 1.3).
- **No sube la foto**: revisa que el bucket se llame `productos`, sea **público**, y que corriste `03_storage.sql`.
