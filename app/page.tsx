import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { Catalogo } from '@/components/Catalogo';
import { STORE_NAME, WHATSAPP_NUMBER } from '@/lib/config';
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

  const total = productos.length;

  return (
    <main className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-deep via-forest to-forest-light text-cream">
        {/* Decoracion botanica */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-rose/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-clay/20 blur-2xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 py-14 sm:py-20 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9BFA0]">
              Bienestar y belleza natural
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Belleza natural
              <br />
              para tu piel
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#E4DFCF]">
              Perfumeria, cuidado facial, corporal, cabello y maquillaje.
              Elige tus favoritos y coordina la entrega por WhatsApp, facil y rapido.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="rounded-full bg-cream px-6 py-3 text-sm font-extrabold text-forest transition hover:bg-white"
              >
                Ver catalogo
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold text-cream transition hover:bg-white/10"
              >
                Escribenos
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#D9D4C2]">
              <span>✦ {total > 0 ? `${total} productos` : 'Catalogo'}</span>
              <span>✦ Entrega coordinada</span>
              <span>✦ Pago al recibir</span>
            </div>
          </div>

          {/* Emblema decorativo */}
          <div className="hidden justify-center md:flex">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-cream/25 lg:h-72 lg:w-72">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-cream/20 lg:h-52 lg:w-52">
                <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#F3EFE3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                  <path d="M12 22V6" />
                  <path d="M12 12c0-3 2.4-5.4 5.4-5.4C17.4 9.6 15 12 12 12z" />
                  <path d="M12 8.5c0-3-2.4-5.4-5.4-5.4C6.6 6.1 9 8.5 12 8.5z" />
                  <path d="M12 17c0-2.4 1.9-4.3 4.3-4.3C16.3 15.1 14.4 17 12 17z" />
                  <path d="M12 17c0-2.4-1.9-4.3-4.3-4.3C7.7 15.1 9.6 17 12 17z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-rose/10 p-8 text-rose-deep">
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
        <div id="catalogo">
          <Catalogo productos={productos} />
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-sand bg-forest-deep text-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-semibold">{STORE_NAME}</p>
            <p className="mt-2 text-sm text-[#C9BFA0]">
              Cosmetica natural. Productos para el cuidado de tu piel, cabello y bienestar.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
              Comprar
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#E4DFCF]">
              <li><a href="#catalogo" className="hover:text-white">Ver catalogo</a></li>
              <li><a href="/carrito" className="hover:text-white">Mi carrito</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
              Contacto
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="mt-2 inline-flex items-center gap-2 text-sm text-[#E4DFCF] hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-[#C9BFA0]">
          {STORE_NAME} · Cosmetica natural
        </div>
      </footer>
    </main>
  );
}
