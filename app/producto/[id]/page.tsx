import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { DetalleProducto } from '@/components/DetalleProducto';
import type { Producto } from '@/lib/types';

export const revalidate = 60;

export default async function ProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from('productos')
    .select('*')
    .eq('id', params.id)
    .eq('activo', true)
    .maybeSingle();

  if (!data) notFound();

  return (
    <main className="min-h-screen">
      <Header />
      <DetalleProducto producto={data as Producto} />
    </main>
  );
}
