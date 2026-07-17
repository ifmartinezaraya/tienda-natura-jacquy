'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { STORE_NAME } from '@/lib/config';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-forest-deep to-forest text-cream shadow-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#C9BFA0]">
            Cosmetica natural
          </span>
          <span className="font-serif text-xl font-semibold sm:text-2xl">
            {STORE_NAME}
          </span>
        </Link>

        <Link
          href="/carrito"
          className="relative flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold transition hover:bg-white/20"
          aria-label="Ver carrito"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-deep px-1 text-[11px] font-extrabold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
