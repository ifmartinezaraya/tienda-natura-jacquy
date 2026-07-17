'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { STORE_NAME } from '@/lib/config';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 shadow-[0_1px_0_rgba(38,37,25,0.06)]">
      {/* Barra superior fina */}
      <div className="bg-forest-deep text-center text-[11px] font-medium tracking-wide text-[#C9BFA0]">
        <div className="mx-auto max-w-6xl px-4 py-1.5">
          Cosmetica natural &nbsp;·&nbsp; Pedidos y entregas coordinadas por WhatsApp
        </div>
      </div>

      {/* Barra principal */}
      <div className="border-b border-sand bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.22em] text-clay">
              Cosmetica natural
            </span>
            <span className="mt-1 font-serif text-2xl font-semibold text-forest">
              {STORE_NAME}
            </span>
          </Link>

          <Link
            href="/carrito"
            className="relative flex items-center gap-2 rounded-full border border-forest/20 bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-forest hover:bg-forest hover:text-cream"
            aria-label="Ver carrito"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-deep px-1 text-[11px] font-extrabold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
