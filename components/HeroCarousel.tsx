'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/config';
import { HERO_SLIDES } from '@/lib/banners';

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = HERO_SLIDES[i];
  const href =
    s.href === 'WHATSAPP' ? `https://wa.me/${WHATSAPP_NUMBER}` : s.href;
  const externo = href.startsWith('http');

  return (
    <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden bg-forest-deep text-cream">
      {/* Capas de imagen (se desvanecen entre si) */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url("${slide.img}")`, opacity: idx === i ? 1 : 0 }}
          aria-hidden={idx !== i}
        />
      ))}

      {/* Overlay suave solo para dar contraste al texto (respeta los colores calidos) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:hidden" />

      {/* Contenido */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <div key={i} className="max-w-xl animate-[fadein_0.8s_ease]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E4DFCF] backdrop-blur">
            {s.eyebrow}
          </span>
          <h1 className="mt-4 whitespace-pre-line font-serif text-4xl font-semibold leading-[1.05] drop-shadow sm:text-6xl">
            {s.titulo}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#EDE9DC] sm:text-base">
            {s.texto}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {externo ? (
              <a href={href} target="_blank" className="rounded-full bg-cream px-7 py-3.5 text-sm font-extrabold text-forest shadow-lg transition hover:bg-white">
                {s.cta}
              </a>
            ) : (
              <Link href={`/${s.href}`} className="rounded-full bg-cream px-7 py-3.5 text-sm font-extrabold text-forest shadow-lg transition hover:bg-white">
                {s.cta}
              </Link>
            )}
            <Link
              href="/#catalogo"
              className="rounded-full border border-cream/50 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur-sm transition hover:bg-white/10"
            >
              Ver categorias
            </Link>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ir al banner ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-7 bg-cream' : 'w-2 bg-cream/50 hover:bg-cream/80'}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
