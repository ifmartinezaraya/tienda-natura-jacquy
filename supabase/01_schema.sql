-- ============================================================
--  TIENDA NATURA JACQUY - ESQUEMA DE BASE DE DATOS (Supabase)
-- ============================================================
--  Ejecuta este script UNA sola vez en Supabase:
--    Panel de Supabase  ->  SQL Editor  ->  New query
--    Pega TODO este contenido y presiona "Run".
-- ============================================================

-- Extension para generar identificadores unicos (UUID)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1) TABLA: productos
-- ------------------------------------------------------------
create table if not exists public.productos (
  id           uuid primary key default gen_random_uuid(),
  legacy_id    text unique,                 -- id original que venia de Firebase (referencia)
  nombre       text not null,
  descripcion  text default '',
  precio       integer not null default 0 check (precio >= 0),   -- en pesos chilenos (CLP)
  categoria    text not null default 'Otros',
  imagen_url   text,                        -- URL publica de la foto (Supabase Storage)
  stock        integer not null default 0 check (stock >= 0),
  min_stock    integer not null default 1,
  activo       boolean not null default true,  -- si aparece o no en el catalogo publico
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists productos_categoria_idx on public.productos (categoria);
create index if not exists productos_activo_idx     on public.productos (activo);

-- ------------------------------------------------------------
-- 2) TABLA: pedidos
-- ------------------------------------------------------------
create table if not exists public.pedidos (
  id         uuid primary key default gen_random_uuid(),
  cliente    text not null,
  telefono   text not null,
  productos  jsonb not null default '[]'::jsonb,  -- detalle: [{id, nombre, precio, cantidad}]
  total      integer not null default 0,
  estado     text not null default 'pendiente',   -- pendiente | confirmado | entregado | cancelado
  fecha      timestamptz not null default now()
);

create index if not exists pedidos_estado_idx on public.pedidos (estado);
create index if not exists pedidos_fecha_idx  on public.pedidos (fecha desc);

-- ------------------------------------------------------------
-- 3) TABLA: usuarios_admin
--    Lista blanca de correos autorizados para el panel.
--    El inicio de sesion real lo maneja Supabase Auth;
--    esta tabla define QUIEN es administrador.
-- ------------------------------------------------------------
create table if not exists public.usuarios_admin (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  nombre     text,
  created_at timestamptz not null default now()
);

-- Funcion de ayuda: indica si el usuario logueado es admin
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.usuarios_admin
    where email = (auth.jwt() ->> 'email')
  );
$$;

-- ------------------------------------------------------------
-- 4) Mantener updated_at al dia en productos
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists productos_touch on public.productos;
create trigger productos_touch
  before update on public.productos
  for each row execute function public.touch_updated_at();

-- ============================================================
--  SEGURIDAD (Row Level Security)
-- ============================================================
alter table public.productos      enable row level security;
alter table public.pedidos        enable row level security;
alter table public.usuarios_admin enable row level security;

-- --- PRODUCTOS ---
-- Cualquiera (visitante) puede VER los productos activos.
drop policy if exists productos_public_read on public.productos;
create policy productos_public_read
  on public.productos for select
  using (activo = true);

-- Los administradores pueden ver TODO (incluye inactivos).
drop policy if exists productos_admin_read_all on public.productos;
create policy productos_admin_read_all
  on public.productos for select
  to authenticated
  using (public.es_admin());

-- Solo administradores pueden crear / editar / borrar.
drop policy if exists productos_admin_write on public.productos;
create policy productos_admin_write
  on public.productos for all
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

-- --- PEDIDOS ---
-- Cualquiera puede CREAR un pedido (cliente hace su compra).
drop policy if exists pedidos_public_insert on public.pedidos;
create policy pedidos_public_insert
  on public.pedidos for insert
  with check (true);

-- Solo administradores pueden ver / actualizar / borrar pedidos.
drop policy if exists pedidos_admin_read on public.pedidos;
create policy pedidos_admin_read
  on public.pedidos for select
  to authenticated
  using (public.es_admin());

drop policy if exists pedidos_admin_update on public.pedidos;
create policy pedidos_admin_update
  on public.pedidos for update
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

drop policy if exists pedidos_admin_delete on public.pedidos;
create policy pedidos_admin_delete
  on public.pedidos for delete
  to authenticated
  using (public.es_admin());

-- --- USUARIOS_ADMIN ---
-- Solo un admin ya existente puede leer la lista de admins.
drop policy if exists admins_read on public.usuarios_admin;
create policy admins_read
  on public.usuarios_admin for select
  to authenticated
  using (public.es_admin());

-- ============================================================
--  DATOS INICIALES
-- ============================================================
-- IMPORTANTE: reemplaza el correo por el de tu mama (el mismo
-- que crearas en Authentication > Users del panel de Supabase).
insert into public.usuarios_admin (email, nombre)
values ('correo-de-tu-mama@gmail.com', 'Jacquy')
on conflict (email) do nothing;

-- ============================================================
--  LISTO. Ahora ejecuta 02_import_productos.sql para cargar
--  los 249 productos.
-- ============================================================
