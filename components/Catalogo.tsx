'use client';

import { useMemo, useState } from 'react';
import type { Producto } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function Catalogo({ productos }: { productos: Producto[] }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState<string>('');

  const categorias = useMemo(() => {
    const set = new Set(productos.map((p) => p.categoria).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
  }, [productos]);

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return productos
      .filter((p) => !categoria || p.categoria === categoria)
      .filter((p) => !q || normalizar(p.nombre).includes(q))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }, [productos, busqueda, categoria]);

  return (
    <div>
      {/* Buscador */}
      <div className="mx-auto max-w-6xl px-4 pt-5">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
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
            className="w-full rounded-xl2 border border-sand bg-cream-card py-3 pl-11 pr-4 text-[15px] outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Filtro por categoria */}
      <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4">
        <CatChip label="Todas" activo={categoria === ''} onClick={() => setCategoria('')} />
        {categorias.map((c) => (
          <CatChip
            key={c}
            label={c}
            activo={categoria === c}
            onClick={() => setCategoria(c)}
          />
        ))}
      </div>

      {/* Resultados */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <p className="mb-3 text-sm text-ink-soft">
          {filtrados.length}{' '}
          {filtrados.length === 1 ? 'producto' : 'productos'}
          {categoria ? ` en ${categoria}` : ''}
        </p>

        {filtrados.length === 0 ? (
          <div className="rounded-xl2 bg-cream-card p-12 text-center text-ink-soft shadow-soft">
            <h3 className="mb-1 font-serif text-lg text-ink">Sin resultados</h3>
            <p>Prueba con otra busqueda o categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtrados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
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
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
        activo
          ? 'bg-forest text-white'
          : 'bg-cream-card text-ink-soft hover:bg-sand'
      }`}
    >
      {label}
    </button>
  );
}
