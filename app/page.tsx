import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { HeroCarousel } from '@/components/HeroCarousel';
import { BenefitsStrip } from '@/components/BenefitsStrip';
import { PromoCarousel } from '@/components/PromoCarousel';
import { QuickCategories } from '@/components/QuickCategories';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { IngredientBanners } from '@/components/IngredientBanners';
import { RoutineQuiz } from '@/components/RoutineQuiz';
import { InstagramSection } from '@/components/InstagramSection';
import { Newsletter } from '@/components/Newsletter';
import type { Producto } from '@/lib/types';

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  const productos = (data ?? []) as Producto[];
  const total = productos.length;

  // Destacados: con stock. Novedades: agregados mas recientemente.
  const destacados = productos.filter((p) => p.stock > 0).slice(0, 8);
  const novedades = [...productos]
    .sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
    .slice(0, 8);

  return (
    <main className="min-h-screen">
      <SiteHeader />

      {error ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-rose/10 p-8 text-rose-deep">
            <h2 className="font-serif text-lg">No se pudieron cargar los productos</h2>
            <p className="mt-2 text-sm">Revisa la conexión con Supabase e intenta de nuevo.</p>
          </div>
        </div>
      ) : (
        <>
          <HeroCarousel />
          <BenefitsStrip />
          <PromoCarousel />
          <QuickCategories />

          {total > 0 && (
            <>
              <FeaturedProducts
                eyebrow="Selección especial"
                titulo="Destacados de la temporada"
                productos={destacados}
              />

              {/* Llamado al catalogo completo (opcional) */}
              <section className="bg-cream">
                <div className="mx-auto max-w-7xl px-4 pb-4">
                  <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-forest-deep to-forest px-6 py-10 text-center text-cream sm:flex-row sm:justify-between sm:text-left">
                    <div>
                      <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                        Descubre todo el catálogo
                      </h2>
                      <p className="mt-1 text-sm text-[#E4DFCF]">
                        {total} productos de cosmética natural, con buscador y filtros por categoría.
                      </p>
                    </div>
                    <Link
                      href="/catalogo"
                      className="whitespace-nowrap rounded-full bg-cream px-7 py-3.5 text-sm font-extrabold text-forest transition hover:bg-white"
                    >
                      Ver todos los productos
                    </Link>
                  </div>
                </div>
              </section>

              <IngredientBanners />
              <RoutineQuiz />

              <FeaturedProducts
                eyebrow="Recién llegados"
                titulo="Novedades"
                productos={novedades}
              />
            </>
          )}

          <InstagramSection />
          <Newsletter />
        </>
      )}

      <SiteFooter />
    </main>
  );
}
