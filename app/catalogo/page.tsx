import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Catalogo } from '@/components/Catalogo';
import type { Producto } from '@/lib/types';

export const revalidate = 60;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string; genero?: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  const productos = (data ?? []) as Producto[];

  const g = (searchParams.genero ?? '').toLowerCase();
  const generoInicial: '' | 'Ellas' | 'Ellos' =
    g === 'ellas' || g === 'mujer' ? 'Ellas' : g === 'ellos' || g === 'hombre' ? 'Ellos' : '';

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="bg-gradient-to-br from-forest-deep to-forest px-4 py-10 text-cream">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-2 text-xs text-[#C9BFA0]">
            <a href="/" className="hover:text-white">Inicio</a>
            <span className="mx-2">/</span>
            <span>Catalogo</span>
          </nav>
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Catalogo</h1>
          <p className="mt-1 text-sm text-[#E4DFCF]">
            Explora todos nuestros productos. Usa el buscador y los filtros para
            encontrar lo que necesitas.
          </p>
        </div>
      </section>

      {error ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-rose/10 p-8 text-rose-deep">
            <h2 className="font-serif text-lg">No se pudieron cargar los productos</h2>
            <p className="mt-2 text-sm">Revisa la conexion con Supabase e intenta de nuevo.</p>
          </div>
        </div>
      ) : (
        <Catalogo
          productos={productos}
          initialBusqueda={searchParams.q ?? ''}
          initialCategoria={searchParams.cat ?? ''}
          initialGenero={generoInicial}
        />
      )}

      <SiteFooter />
    </main>
  );
}
