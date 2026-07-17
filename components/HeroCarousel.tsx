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
  gradiente: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: 'Bienestar y belleza natural',
    titulo: 'Belleza natural\npara tu piel',
    texto:
      'Perfumeria, cuidado facial, corporal, cabello y maquillaje. Descubre tus favoritos.',
    cta: 'Ver catalogo',
    href: '#catalogo',
    gradiente: 'from-forest-deep via-forest to-forest-light',
  },
  {
    eyebrow: 'Cuidado consciente',
    titulo: 'Ingredientes\nde la naturaleza',
    texto:
      'Formulas inspiradas en la biodiversidad para el cuidado diario de toda la familia.',
    cta: 'Explorar productos',
    href: '#catalogo',
    gradiente: 'from-[#3E5A40] via-forest to-[#6E5B3A]',
  },
  {
    eyebrow: 'Facil y cercano',
    titulo: 'Pide por\nWhatsApp',
    texto:
      'Arma tu carrito y coordina la entrega en simples pasos. Atencion personalizada.',
    cta: 'Escribenos',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    gradiente: 'from-[#2B3D2E] via-[#4C7A52] to-[#2B3D2E]',
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[i];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${s.gradiente} text-cream transition-all duration-700`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-rose/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-clay/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 sm:py-20 md:grid-cols-2">
        <div key={i} className="animate-[fadein_0.7s_ease]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9BFA0]">
            {s.eyebrow}
          </p>
          <h1 className="mt-3 whitespace-pre-line font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {s.titulo}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#E4DFCF]">
            {s.texto}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {s.href.startsWith('http') ? (
              <a href={s.href} target="_blank" className="rounded-full bg-cream px-6 py-3 text-sm font-extrabold text-forest transition hover:bg-white">
                {s.cta}
              </a>
            ) : (
              <Link href={`/${s.href}`} className="rounded-full bg-cream px-6 py-3 text-sm font-extrabold text-forest transition hover:bg-white">
                {s.cta}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-cream/25 lg:h-72 lg:w-72">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-cream/20 lg:h-52 lg:w-52">
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#F3EFE3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                <path d="M12 22V6" />
                <path d="M12 12c0-3 2.4-5.4 5.4-5.4C17.4 9.6 15 12 12 12z" />
                <path d="M12 8.5c0-3-2.4-5.4-5.4-5.4C6.6 6.1 9 8.5 12 8.5z" />
                <path d="M12 17c0-2.4 1.9-4.3 4.3-4.3C16.3 15.1 14.4 17 12 17z" />
                <path d="M12 17c0-2.4-1.9-4.3-4.3-4.3C7.7 15.1 9.6 17 12 17z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="relative flex justify-center gap-2 pb-6">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-cream' : 'w-2 bg-cream/40'}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
