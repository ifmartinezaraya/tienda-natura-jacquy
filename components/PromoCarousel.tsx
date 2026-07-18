'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { PROMOS } from '@/lib/banners';

export function PromoCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Lo que no te puedes perder
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scroll(-1)} aria-label="Anterior" className="flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-cream-card text-forest transition hover:bg-forest hover:text-cream">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Siguiente" className="flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-cream-card text-forest transition hover:bg-forest hover:text-cream">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <div ref={ref} className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
          {PROMOS.map((p) => (
            <div
              key={p.titulo}
              className={`relative flex min-h-[320px] w-[280px] flex-none snap-start flex-col justify-between overflow-hidden rounded-3xl p-6 text-cream ${p.img ? 'bg-forest-deep' : `bg-gradient-to-br ${p.grad}`}`}
            >
              {/* Imagen autorizada opcional de fondo */}
              {p.img && (
                <>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${p.img}")` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-forest-deep/20" />
                </>
              )}
              {!p.img && (
                <>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-black/10" />
                </>
              )}

              <div className="relative">
                <span className="inline-block rounded-full bg-black/30 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide backdrop-blur-sm">
                  {p.badge}
                </span>
              </div>

              <div className="relative">
                <p className="font-serif text-3xl font-bold leading-tight drop-shadow-sm">{p.destacado}</p>
                <p className="mt-2 text-lg font-semibold">{p.titulo}</p>
                <p className="mt-1 text-sm text-white/85">{p.sub}</p>
              </div>

              <div className="relative">
                <Link href={p.href} className="inline-flex rounded-full bg-cream px-6 py-2.5 text-sm font-extrabold text-forest transition hover:bg-white">
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
