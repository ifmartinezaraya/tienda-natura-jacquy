// Lee las variables de entorno de Supabase y les quita espacios o
// saltos de linea invisibles que suelen colarse al copiar/pegar en Vercel.
// (Un espacio final en la URL provoca el error "fetch failed").
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
export const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
).trim();
