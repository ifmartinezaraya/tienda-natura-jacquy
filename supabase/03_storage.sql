-- ============================================================
--  ALMACENAMIENTO DE FOTOS (Supabase Storage)
--  Politicas para el bucket "productos".
-- ------------------------------------------------------------
--  PASO PREVIO (desde el panel):
--    Supabase -> Storage -> New bucket
--    Nombre: productos   |   Public bucket: ACTIVADO (si)
--
--  Luego ejecuta este script en el SQL Editor.
--  Nota: permitir subir/editar/borrar a cualquier usuario con
--  sesion iniciada (solo el/la administrador(a) tiene cuenta;
--  los clientes navegan sin iniciar sesion).
-- ============================================================

-- Cualquiera puede VER las fotos (bucket publico).
drop policy if exists "fotos_lectura_publica" on storage.objects;
create policy "fotos_lectura_publica"
  on storage.objects for select
  using (bucket_id = 'productos');

-- Usuarios con sesion iniciada pueden SUBIR fotos.
drop policy if exists "fotos_admin_insert" on storage.objects;
create policy "fotos_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos');

-- Usuarios con sesion iniciada pueden ACTUALIZAR fotos.
drop policy if exists "fotos_admin_update" on storage.objects;
create policy "fotos_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'productos');

-- Usuarios con sesion iniciada pueden BORRAR fotos.
drop policy if exists "fotos_admin_delete" on storage.objects;
create policy "fotos_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos');
