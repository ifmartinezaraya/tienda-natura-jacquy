import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { Catalogo } from '@/components/Catalogo';
import { STORE_NAME } from '@/lib/config';
import type { Producto } from '@/lib/types';

// Refresca la lista al menos cada 60s (los cambios del panel se ven pronto)
export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  const productos = (data ?? []) as Producto[];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Portada */}
      <section className="bg-gradient-to-br from-forest-deep to-forest px-4 pb-10 pt-6 text-cream">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
            Belleza natural para tu piel
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[#D9D4C2]">
            Perfumeria, cuidado facial, corporal, cabello y maquillaje.
            Haz tu pedido y coordina la entrega por WhatsApp.
          </p>
        </div>
      </section>

      {error ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="rounded-xl2 bg-rose/10 p-8 text-rose-deep">
            <h2 className="font-serif text-lg">No se pudieron cargar los productos</h2>
            <p className="mt-2 text-sm">
              Revisa la conexion con Supabase (variables de entorno) e intenta de nuevo.
            </p>
          </div>
        </div>
      ) : productos.length === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-ink-soft">
          <h2 className="font-serif text-lg text-ink">Catalogo en preparacion</h2>
          <p className="mt-2 text-sm">
            Aun no hay productos publicados. Importa el inventario en Supabase para verlos aqui.
          </p>
        </div>
      ) : (
        <Catalogo productos={productos} />
      )}

      <footer className="border-t border-sand bg-cream-card py-6 text-center text-xs text-ink-soft">
        {STORE_NAME} - Cosmetica natural
      </footer>
    </main>
  );
}
