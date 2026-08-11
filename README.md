# RD Travel — Landing de captura

Landing de alta conversión para RD Travel, construida en Next.js 16 (App
Router) + Supabase. Incluye:

- **`/captura`** — landing principal con formulario de cotización.
- **`/gracias`** — confirmación + redirección configurable a WhatsApp.
- **`/admin`** — panel privado (login, leads, configuración editable).

## 1. Requisitos

- Node.js 20.9+ (instalado automáticamente durante el setup de este proyecto).
- Una cuenta de [Supabase](https://supabase.com) (plan gratuito alcanza).

## 2. Variables de entorno

Copia `.env.example` a `.env.local` y llena los valores:

```bash
cp .env.example .env.local
```

| Variable | De dónde sale |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key (**secreta**, nunca la expongas al cliente) |
| `NEXT_PUBLIC_SITE_URL` | El dominio final del sitio, ej. `https://rdtravel.mx` |
| `LEAD_HASH_SALT` | Cualquier string aleatorio largo (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Se llenan en la fase 2/3, cuando se conecten los píxeles |

## 3. Base de datos (Supabase)

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor → New query**, pega el contenido completo de
   [`supabase/schema.sql`](./supabase/schema.sql) y ejecútalo. Esto crea las
   tablas `leads`, `site_settings`, `admins` y todas las políticas RLS.
3. Ve a **Authentication → Users → Add user** y crea tu usuario
   administrador (correo + contraseña).
4. Copia el UID de ese usuario y, en el SQL Editor, ejecuta:

   ```sql
   insert into public.admins (user_id) values ('pega-aquí-el-uid');
   ```

   Solo los usuarios listados en `admins` pueden entrar a `/admin`.

## 4. Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000/captura](http://localhost:3000/captura).

## 5. Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub/GitLab.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el
   repositorio.
3. En **Environment Variables**, agrega las mismas variables de
   `.env.local` (usa los valores reales de producción).
4. Deploy. Vercel detecta Next.js automáticamente.
5. Para tu dominio propio: **Project → Settings → Domains** → agrega tu
   dominio y sigue las instrucciones de DNS (normalmente un registro `A` o
   `CNAME` según tu proveedor).
6. Actualiza `NEXT_PUBLIC_SITE_URL` en Vercel al dominio final y vuelve a
   desplegar.

## 6. Editar contenido sin tocar código

Entra a `/admin` con tu usuario administrador → **Configuración**: ahí
puedes cambiar el titular, subtítulo, texto del botón y el WhatsApp de
destino. Los cambios aplican de inmediato en `/captura` y `/gracias`.

## 7. Estado del proyecto (fases)

- ✅ **Fase 1** (este entregable): landing, formulario, Supabase, `/gracias`,
  `/admin` con login, leads y configuración editable, seguridad (CSP con
  nonce, HSTS, RLS, honeypot, rate limiting), SEO base (JSON-LD, sitemap,
  robots, OG image), banner de cookies.
- ⏳ **Fase 2**: funnel por etapas, UTMs, dispositivos/geolocalización,
  pop-up de prueba social (solo escritorio), usuarios activos en tiempo
  real.
- ⏳ **Fase 3**: píxeles de Meta/TikTok activados, banner de cookies
  ampliado por categoría, afinación SEO/auditoría final.
