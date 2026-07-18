'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Producto } from '@/lib/types';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/components/CartProvider';
import { ProductoImagen } from '@/components/ProductoImagen';
import { FavoriteButton } from '@/components/FavoriteButton';
import { etiquetaCategoria } from '@/lib/categorias';

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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-cream-card transition duration-300 hover:-translate-y-1 hover:border-sand hover:shadow-soft">
      <Link href={`/producto/${producto.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden">
          <ProductoImagen
            src={producto.imagen_url}
            alt={producto.nombre}
            categoria={producto.categoria}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {agotado && (
            <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur">
              Agotado
            </span>
          )}
          <FavoriteButton producto={producto} className="absolute right-3 top-3" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay">
          {etiquetaCategoria(producto.categoria)}
        </span>
        <Link href={`/producto/${producto.id}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] font-serif text-[15px] font-semibold leading-snug text-ink transition group-hover:text-forest">
            {producto.nombre}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-serif text-lg font-bold text-forest">
            {formatCLP(producto.precio)}
          </span>
          <button
            onClick={onAgregar}
            disabled={agotado}
            aria-label={`Agregar ${producto.nombre} al carrito`}
            className={`flex h-9 items-center justify-center rounded-full px-4 text-xs font-bold transition ${
              agotado
                ? 'cursor-not-allowed bg-sand text-ink-soft'
                : agregado
                  ? 'bg-forest-light text-white'
                  : 'bg-forest text-white hover:bg-forest-deep'
            }`}
          >
            {agotado ? 'Sin stock' : agregado ? '✓ Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
