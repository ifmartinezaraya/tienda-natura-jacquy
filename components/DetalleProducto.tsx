'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Producto } from '@/lib/types';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/components/CartProvider';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ProductoImagen } from '@/components/ProductoImagen';
import { ProductCard } from '@/components/ProductCard';
import { WHATSAPP_NUMBER } from '@/lib/config';
import {
  atributos,
  beneficios,
  comoUsar,
  descripcionInteligente,
  mostrarNotas,
  notasTexto,
} from '@/lib/productoDetalle';

export function DetalleProducto({
  producto,
  relacionados = [],
}: {
  producto: Producto;
  relacionados?: Producto[];
}) {
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

  const chips = atributos(producto);
  const bene = beneficios(producto.categoria);
  const descripcion = producto.descripcion?.trim() || descripcionInteligente(producto);

  const msgWhatsapp = encodeURIComponent(
    `Hola! Quiero consultar por este producto: ${producto.nombre} (${formatCLP(producto.precio)}).`,
  );

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-5">
        <nav className="text-xs text-ink-soft">
          <Link href="/" className="hover:text-forest">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalogo?cat=${encodeURIComponent(producto.categoria)}`} className="hover:text-forest">
            {producto.categoria}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{producto.nombre}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-sand/70 bg-cream-card shadow-soft">
          <ProductoImagen
            src={producto.imagen_url}
            alt={producto.nombre}
            categoria={producto.categoria}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <FavoriteButton producto={producto} className="absolute right-4 top-4 h-10 w-10" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
            {producto.categoria}
          </span>
          <h1 className="mt-1 font-serif text-3xl font-semibold leading-tight text-ink">
            {producto.nombre}
          </h1>
          {producto.legacy_id && (
            <p className="mt-1 text-xs text-ink-soft">cod: {producto.legacy_id}</p>
          )}

          {/* Chips de atributos */}
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="rounded-full border border-sand bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
                {c}
              </span>
            ))}
          </div>

          {/* Beneficios con icono */}
          <ul className="mt-5 space-y-2">
            {bene.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-ink">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-forest-light/15 text-forest-light">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Precio y estado */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-forest">
              {formatCLP(producto.precio)}
            </span>
            {agotado ? (
              <span className="rounded-full bg-rose/15 px-3 py-1 text-xs font-bold text-rose-deep">Agotado</span>
            ) : (
              <span className="rounded-full bg-forest-light/15 px-3 py-1 text-xs font-bold text-forest-light">Disponible</span>
            )}
          </div>

          {/* Cantidad + agregar */}
          {!agotado && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-sand bg-white">
                <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="px-4 py-2.5 text-lg font-bold text-forest" aria-label="Menos">-</button>
                <span className="min-w-8 text-center font-bold">{cantidad}</span>
                <button onClick={() => setCantidad((c) => c + 1)} className="px-4 py-2.5 text-lg font-bold text-forest" aria-label="Mas">+</button>
              </div>
              <button
                onClick={onAgregar}
                className={`flex-1 rounded-full px-5 py-3.5 font-extrabold text-white transition ${agregado ? 'bg-forest-light' : 'bg-forest hover:bg-forest-deep'}`}
              >
                {agregado ? '¡Agregado a la bolsa!' : 'Agregar a mi bolsa'}
              </button>
            </div>
          )}

          {/* WhatsApp directo */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msgWhatsapp}`}
            target="_blank"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#25D366] px-5 py-3 text-sm font-bold text-[#128C4B] transition hover:bg-[#25D366]/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" /></svg>
            Consultar por este producto
          </a>

          {/* Envio */}
          <div className="mt-4 rounded-2xl bg-cream-card p-4 text-sm text-ink-soft">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
              Entrega coordinada
            </p>
            <p className="mt-1">
              Coordinamos la entrega contigo por WhatsApp. Revisa{' '}
              <Link href="/envios" className="underline hover:text-forest">envios y entregas</Link>.
            </p>
          </div>

          {/* Secciones desplegables */}
          <div className="mt-6 divide-y divide-sand border-t border-sand">
            <Acordeon titulo="Descripcion" defaultOpen>
              <p>{descripcion}</p>
            </Acordeon>
            <Acordeon titulo="Como usar">
              <p>{comoUsar(producto.categoria)}</p>
            </Acordeon>
            <Acordeon titulo="Beneficios">
              <ul className="list-disc space-y-1 pl-5">
                {bene.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </Acordeon>
            {mostrarNotas(producto.categoria) && (
              <Acordeon titulo="Gota olfativa">
                <p>{notasTexto()}</p>
              </Acordeon>
            )}
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-5 font-serif text-2xl font-semibold text-ink">
            Tambien te puede gustar
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Acordeon({
  titulo,
  children,
  defaultOpen = false,
}: {
  titulo: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left font-serif text-base font-semibold text-ink"
      >
        {titulo}
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-[15px] leading-relaxed text-ink-soft">{children}</div>
      )}
    </div>
  );
}
