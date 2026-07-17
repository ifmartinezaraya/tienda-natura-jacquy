'use client';

import type { Producto } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

// Muestra una fila destacada de productos en scroll horizontal.
export function FeaturedProducts({
  titulo,
  eyebrow,
  productos,
}: {
  titulo: string;
  eyebrow: string;
  productos: Producto[];
}) {
  if (productos.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">{titulo}</h2>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:gap-4">
        {productos.map((p) => (
          <div key={p.id} className="w-[46%] flex-none snap-start sm:w-[30%] lg:w-[23%]">
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
