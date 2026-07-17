-- ============================================================
--  ALMACENAMIENTO DE FOTOS (Supabase Storage)
--  Politicas para el bucket "productos".
-- ------------------------------------------------------------
--  PASO PREVIO (desde el panel, mas facil):
--    Supabase -> Storage -> New bucket
--    Nombre: productos   |   Public bucket: ACTIVADO (si)
--
--  Luego ejecuta este script en el SQL Editor para permitir
--  que SOLO los administradores suban / cambien / borren fotos,
--  y que cualquiera pueda VERLAS.
-- ============================================================

-- Cualquiera puede VER las fotos (bucket publico).
drop policy if exists "fotos_lectura_publica" on storage.objects;
create policy "fotos_lectura_publica"
  on storage.objects for select
  using (bucket_id = 'productos');

-- Solo administradores pueden SUBIR fotos.
drop policy if exists "fotos_admin_insert" on storage.objects;
create policy "fotos_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos' and public.es_admin());

-- Solo administradores pueden ACTUALIZAR fotos.
drop policy if exists "fotos_admin_update" on storage.objects;
create policy "fotos_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'productos' and public.es_admin());

-- Solo administradores pueden BORRAR fotos.
drop policy if exists "fotos_admin_delete" on storage.objects;
create policy "fotos_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos' and public.es_admin());
