'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/config';

type Slide = {
  eyebrow: string;
  titulo: string;
  texto: string;
  cta: string;
  href: string;
  img: string;
};

// Imagenes de Unsplash (uso gratuito). Tematica: cosmetica natural.
const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=75&auto=format&fit=crop`;

const SLIDES: Slide[] = [
  {
    eyebrow: 'Bienestar y belleza natural',
    titulo: 'Belleza natural\npara tu piel',
    texto:
      'Perfumeria, cuidado facial, corporal, cabello y maquillaje. Descubre tus favoritos.',
    cta: 'Ver catalogo',
    href: '#catalogo',
    img: U('photo-1598440947619-2c35fc9aa908'),
  },
  {
    eyebrow: 'Ingredientes de la naturaleza',
    titulo: 'El cuidado que\ntu piel merece',
    texto:
      'Formulas inspiradas en la biodiversidad para el bienestar de toda la familia.',
    cta: 'Explorar productos',
    href: '#catalogo',
    img: U('photo-1596462502278-27bfdc403348'),
  },
  {
    eyebrow: 'Facil y cercano',
    titulo: 'Pide facil\npor WhatsApp',
    texto:
      'Arma tu carrito y coordina la entrega en simples pasos. Atencion personalizada.',
    cta: 'Escribenos',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    img: U('photo-1571781926291-c477ebfd024b'),
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden bg-forest-deep text-cream">
      {/* Capas de imagen (se desvanecen entre si) */}
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url("${s.img}")`,
            opacity: idx === i ? 1 : 0,
          }}
          aria-hidden={idx !== i}
        />
      ))}

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/75 to-forest-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent sm:from-forest-deep/30" />

      {/* Contenido */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <div key={i} className="max-w-xl animate-[fadein_0.8s_ease]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8CFAF]">
            {SLIDES[i].eyebrow}
          </p>
          <h1 className="mt-3 whitespace-pre-line font-serif text-4xl font-semibold leading-[1.05] drop-shadow sm:text-6xl">
            {SLIDES[i].titulo}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#EDE9DC] sm:text-base">
            {SLIDES[i].texto}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {SLIDES[i].href.startsWith('http') ? (
              <a
                href={SLIDES[i].href}
                target="_blank"
                className="rounded-full bg-cream px-7 py-3.5 text-sm font-extrabold text-forest shadow-lg transition hover:bg-white"
              >
                {SLIDES[i].cta}
              </a>
            ) : (
              <Link
                href={`/${SLIDES[i].href}`}
                className="rounded-full bg-cream px-7 py-3.5 text-sm font-extrabold text-forest shadow-lg transition hover:bg-white"
              >
                {SLIDES[i].cta}
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
        {SLIDES.map((_, idx) => (
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
