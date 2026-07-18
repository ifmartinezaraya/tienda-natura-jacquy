'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductoImagen } from '@/components/ProductoImagen';
import { useFavorites } from '@/components/FavoritesProvider';
import { useCart } from '@/components/CartProvider';
import { formatCLP } from '@/lib/format';
import type { Producto } from '@/lib/types';

export default function FavoritosPage() {
  const { favoritos, quitar } = useFavorites();
  const { agregar } = useCart();

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-1 font-serif text-2xl font-semibold text-ink">Mis favoritos</h1>
        <p className="mb-6 text-sm text-ink-soft">
          {favoritos.length} {favoritos.length === 1 ? 'producto guardado' : 'productos guardados'}
        </p>

        {favoritos.length === 0 ? (
          <div className="rounded-2xl bg-cream-card p-12 text-center text-ink-soft shadow-soft">
            <p className="mb-4">Aun no tienes favoritos.</p>
            <Link href="/catalogo" className="inline-block rounded-full bg-forest px-6 py-3 font-bold text-cream hover:bg-forest-deep">
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {favoritos.map((f) => {
              const agotado = f.stock <= 0;
              return (
                <div key={f.id} className="group flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-cream-card">
                  <Link href={`/producto/${f.id}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <ProductoImagen src={f.imagen_url} alt={f.nombre} categoria={f.categoria} sizes="(max-width:640px) 50vw, 25vw" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay">{f.categoria}</span>
                    <Link href={`/producto/${f.id}`}>
                      <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] font-serif text-[15px] font-semibold leading-snug text-ink group-hover:text-forest">
                        {f.nombre}
                      </h3>
                    </Link>
                    <span className="mt-1 font-serif text-lg font-bold text-forest">{formatCLP(f.precio)}</span>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => agregar(f as unknown as Producto)}
                        disabled={agotado}
                        className={`flex-1 rounded-full px-3 py-2 text-xs font-bold transition ${agotado ? 'cursor-not-allowed bg-sand text-ink-soft' : 'bg-forest text-white hover:bg-forest-deep'}`}
                      >
                        {agotado ? 'Sin stock' : 'Agregar'}
                      </button>
                      <button
                        onClick={() => quitar(f.id)}
                        className="rounded-full border border-sand px-3 py-2 text-xs font-bold text-ink-soft hover:border-rose hover:text-rose-deep"
                        aria-label="Quitar de favoritos"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
