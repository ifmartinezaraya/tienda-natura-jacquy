'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Producto } from '@/lib/types';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/components/CartProvider';

export function DetalleProducto({ producto }: { producto: Producto }) {
  const { agregar } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const agotado = producto.stock <= 0;

  function onAgregar() {
    if (agotado) return;
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1600);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-2">
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden rounded-xl2 bg-sand/40 shadow-soft">
        {producto.imagen_url ? (
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-forest/25">
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2C7 7 7 12 12 22c5-10 5-15 0-20z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <Link href="/" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline">
          <span aria-hidden>&larr;</span> Volver al catalogo
        </Link>

        <span className="text-xs uppercase tracking-wide text-ink-soft">
          {producto.categoria}
        </span>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">
          {producto.nombre}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-serif text-2xl font-bold text-forest">
            {formatCLP(producto.precio)}
          </span>
          {agotado ? (
            <span className="rounded-full bg-rose/15 px-3 py-1 text-xs font-bold text-rose-deep">
              Agotado
            </span>
          ) : (
            <span className="rounded-full bg-forest-light/15 px-3 py-1 text-xs font-bold text-forest-light">
              Disponible
            </span>
          )}
        </div>

        {producto.descripcion && (
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {producto.descripcion}
          </p>
        )}

        {!agotado && (
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl2 border border-sand bg-cream-card">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="px-4 py-2 text-lg font-bold text-forest"
                aria-label="Menos"
              >
                -
              </button>
              <span className="min-w-8 text-center font-bold">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="px-4 py-2 text-lg font-bold text-forest"
                aria-label="Mas"
              >
                +
              </button>
            </div>

            <button
              onClick={onAgregar}
              className={`flex-1 rounded-xl2 px-5 py-3 font-extrabold text-white transition ${
                agregado ? 'bg-forest-light' : 'bg-forest hover:bg-forest-deep'
              }`}
            >
              {agregado ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </button>
          </div>
        )}

        <Link
          href="/carrito"
          className="mt-3 text-center text-sm font-semibold text-forest hover:underline"
        >
          Ir al carrito
        </Link>
      </div>
    </div>
  );
}
