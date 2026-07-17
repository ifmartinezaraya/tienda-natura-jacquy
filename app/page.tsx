import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { HeroCarousel } from '@/components/HeroCarousel';
import { BenefitsStrip } from '@/components/BenefitsStrip';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Newsletter } from '@/components/Newsletter';
import { Catalogo } from '@/components/Catalogo';
import type { Producto } from '@/lib/types';

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  const productos = (data ?? []) as Producto[];

  // Seleccion de "destacados": productos con stock, variados
  const destacados = productos.filter((p) => p.stock > 0).slice(0, 8);

  const busquedaInicial = searchParams.q ?? '';
  const categoriaInicial = searchParams.cat ?? '';

  return (
    <main className="min-h-screen">
      <SiteHeader />

      {error ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-rose/10 p-8 text-rose-deep">
            <h2 className="font-serif text-lg">No se pudieron cargar los productos</h2>
            <p className="mt-2 text-sm">
              Revisa la conexion con Supabase (variables de entorno) e intenta de nuevo.
            </p>
          </div>
        </div>
      ) : (
        <>
          <HeroCarousel />
          <BenefitsStrip />

          {productos.length === 0 ? (
            <div className="mx-auto max-w-6xl px-4 py-16 text-center text-ink-soft">
              <h2 className="font-serif text-lg text-ink">Catalogo en preparacion</h2>
              <p className="mt-2 text-sm">
                Aun no hay productos publicados. Importa el inventario en Supabase para verlos aqui.
              </p>
            </div>
          ) : (
            <>
              {!busquedaInicial && !categoriaInicial && (
                <FeaturedProducts
                  eyebrow="Seleccion especial"
                  titulo="Destacados de la temporada"
                  productos={destacados}
                />
              )}
              <div id="catalogo">
                <Catalogo
                  productos={productos}
                  initialBusqueda={busquedaInicial}
                  initialCategoria={categoriaInicial}
                />
              </div>
            </>
          )}

          <Newsletter />
        </>
      )}

      <SiteFooter />
    </main>
  );
}
