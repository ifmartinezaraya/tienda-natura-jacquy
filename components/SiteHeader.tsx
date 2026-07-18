'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { useFavorites } from '@/components/FavoritesProvider';
import { CATEGORIAS, etiquetaCategoria } from '@/lib/categorias';
import { STORE_NAME } from '@/lib/config';

export function SiteHeader() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { total: totalFav } = useFavorites();
  const [q, setQ] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/catalogo?q=${encodeURIComponent(query)}` : '/catalogo');
  }

  return (
    <header className="sticky top-0 z-40">
      {/* Barra de anuncios */}
      <div className="bg-forest-deep text-center text-[12px] font-medium tracking-wide text-[#E4DFCF]">
        <div className="mx-auto max-w-7xl px-4 py-2">
          Consultora Natura &nbsp;·&nbsp; Productos 100% originales &nbsp;·&nbsp; Pedidos por WhatsApp
        </div>
      </div>

      {/* Barra principal */}
      <div className="border-b border-sand bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          {/* Boton menu (movil) */}
          <button
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest lg:hidden"
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-none flex-col leading-none">
            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-clay sm:block">
              Cosmetica natural
            </span>
            <span className="mt-0.5 font-serif text-xl font-semibold text-forest sm:text-2xl">
              {STORE_NAME}
            </span>
          </Link>

          {/* Buscador */}
          <form onSubmit={buscar} className="relative mx-2 hidden flex-1 sm:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="¿Qué buscas hoy?"
              className="w-full rounded-full border border-sand bg-white py-2.5 pl-4 pr-12 text-sm outline-none transition focus:border-forest"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-clay text-white transition hover:bg-forest"
              aria-label="Buscar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          {/* Acciones */}
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <Link
              href="/favoritos"
              className="relative flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-semibold text-ink transition hover:text-forest"
              aria-label="Favoritos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              <span className="hidden md:inline">favoritos</span>
              {totalFav > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-deep px-1 text-[10px] font-extrabold text-white">
                  {totalFav}
                </span>
              )}
            </Link>

            <Link
              href="/carrito"
              className="relative flex items-center gap-1.5 rounded-full bg-forest px-3 py-2 text-sm font-bold text-cream transition hover:bg-forest-deep"
              aria-label="Carrito"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="hidden md:inline">carrito</span>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-deep px-1 text-[10px] font-extrabold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Buscador movil */}
        <form onSubmit={buscar} className="relative px-4 pb-3 sm:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="¿Qué buscas hoy?"
            className="w-full rounded-full border border-sand bg-white py-2.5 pl-4 pr-12 text-sm outline-none focus:border-forest"
          />
          <button
            type="submit"
            className="absolute right-6 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-clay text-white"
            aria-label="Buscar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>
      </div>

      {/* Menu de categorias (escritorio) */}
      <nav className="hidden border-b border-sand bg-white lg:block">
        <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4">
          <Link
            href="/catalogo"
            className="whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-forest hover:text-clay"
          >
            Todo el catálogo
          </Link>
          {CATEGORIAS.map((c) => (
            <Link
              key={c}
              href={`/catalogo?cat=${encodeURIComponent(c)}`}
              className="whitespace-nowrap px-3 py-3 text-[13px] font-medium text-ink-soft transition hover:text-forest"
            >
              {etiquetaCategoria(c)}
            </Link>
          ))}
        </div>
      </nav>

      {/* Menu desplegable (movil) */}
      {menuAbierto && (
        <div className="border-b border-sand bg-white lg:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3">
            <Link
              href="/catalogo"
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-forest"
            >
              Todo el catálogo
            </Link>
            {CATEGORIAS.map((c) => (
              <Link
                key={c}
                href={`/catalogo?cat=${encodeURIComponent(c)}`}
                onClick={() => setMenuAbierto(false)}
                className="rounded-lg px-3 py-2 text-sm text-ink-soft"
              >
                {etiquetaCategoria(c)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
