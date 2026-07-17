'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Producto } from '@/lib/types';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/components/CartProvider';

export function ProductCard({ producto }: { producto: Producto }) {
  const { agregar } = useCart();
  const [agregado, setAgregado] = useState(false);
  const agotado = producto.stock <= 0;

  function onAgregar(e: React.MouseEvent) {
    e.preventDefault();
    if (agotado) return;
    agregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1400);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl2 bg-cream-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/producto/${producto.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-sand/40">
          {producto.imagen_url ? (
            <Image
              src={producto.imagen_url}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-forest/30">
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C7 7 7 12 12 22c5-10 5-15 0-20z" />
              </svg>
            </div>
          )}
          {agotado && (
            <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
              Agotado
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] uppercase tracking-wide text-ink-soft">
          {producto.categoria}
        </span>
        <Link href={`/producto/${producto.id}`}>
          <h3 className="mt-0.5 line-clamp-2 font-serif text-sm font-semibold leading-snug text-ink hover:text-forest">
            {producto.nombre}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="font-bold text-forest">{formatCLP(producto.precio)}</span>
          <button
            onClick={onAgregar}
            disabled={agotado}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              agotado
                ? 'cursor-not-allowed bg-sand text-ink-soft'
                : agregado
                  ? 'bg-forest-light text-white'
                  : 'bg-forest text-white hover:bg-forest-deep'
            }`}
          >
            {agotado ? 'Sin stock' : agregado ? '¡Agregado!' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
