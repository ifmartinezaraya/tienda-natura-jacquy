'use client';

import { useMemo, useRef, useState } from 'react';
import type { Producto } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { estiloCategoria } from '@/lib/categorias';

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function Catalogo({
  productos,
  initialBusqueda = '',
  initialCategoria = '',
}: {
  productos: Producto[];
  initialBusqueda?: string;
  initialCategoria?: string;
}) {
  const [busqueda, setBusqueda] = useState(initialBusqueda);
  const [categoria, setCategoria] = useState<string>(initialCategoria);
  const gridRef = useRef<HTMLDivElement>(null);

  const categorias = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const p of productos) {
      if (p.categoria) conteo.set(p.categoria, (conteo.get(p.categoria) ?? 0) + 1);
    }
    return Array.from(conteo.entries())
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }, [productos]);

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return productos
      .filter((p) => !categoria || p.categoria === categoria)
      .filter((p) => !q || normalizar(p.nombre).includes(q))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }, [productos, busqueda, categoria]);

  function elegirCategoria(c: string) {
    setCategoria(c);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div>
      {/* Showcase de categorias */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
            Explora
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">
            Nuestras categorias
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categorias.map((c) => {
            const est = estiloCategoria(c.nombre);
            const activa = categoria === c.nombre;
            return (
              <button
                key={c.nombre}
                onClick={() => elegirCategoria(activa ? '' : c.nombre)}
                className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  activa
                    ? 'border-forest bg-forest text-cream'
                    : 'border-sand/70 bg-cream-card hover:border-forest/30 hover:shadow-soft'
                }`}
              >
                <span
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-full"
                  style={{ background: activa ? 'rgba(255,255,255,0.15)' : est.bg }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={activa ? '#F3EFE3' : est.fg} strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21V8" />
                    <path d="M12 12c0-2.4 1.9-4.3 4.3-4.3C16.3 10.1 14.4 12 12 12z" />
                    <path d="M12 9c0-2.4-1.9-4.3-4.3-4.3C7.7 7.1 9.6 9 12 9z" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-serif text-sm font-semibold">
                    {c.nombre}
                  </span>
                  <span className={`text-xs ${activa ? 'text-cream/70' : 'text-ink-soft'}`}>
                    {c.cantidad} productos
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Catalogo */}
      <section ref={gridRef} className="scroll-mt-24 border-t border-sand/60 bg-white/40">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Buscador */}
          <div className="relative mx-auto mb-4 max-w-xl">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar producto por nombre..."
              className="w-full rounded-full border border-sand bg-cream-card py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-forest"
            />
          </div>

          {/* Filtros rapidos */}
          <div className="no-scrollbar mb-6 flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
            <CatChip label="Todas" activo={categoria === ''} onClick={() => setCategoria('')} />
            {categorias.map((c) => (
              <CatChip
                key={c.nombre}
                label={c.nombre}
                activo={categoria === c.nombre}
                onClick={() => setCategoria(c.nombre)}
              />
            ))}
          </div>

          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-semibold text-ink">
              {categoria || 'Todos los productos'}
            </h2>
            <p className="text-sm text-ink-soft">
              {filtrados.length} {filtrados.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {filtrados.length === 0 ? (
            <div className="rounded-2xl bg-cream-card p-12 text-center text-ink-soft shadow-soft">
              <h3 className="mb-1 font-serif text-lg text-ink">Sin resultados</h3>
              <p>Prueba con otra busqueda o categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {filtrados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CatChip({
  label,
  activo,
  onClick,
}: {
  label: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
        activo
          ? 'border-forest bg-forest text-cream'
          : 'border-sand bg-cream-card text-ink-soft hover:border-forest/30 hover:text-forest'
      }`}
    >
      {label}
    </button>
  );
}
