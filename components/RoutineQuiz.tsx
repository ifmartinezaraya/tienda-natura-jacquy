'use client';

import Link from 'next/link';
import { useState } from 'react';
import { etiquetaCategoria } from '@/lib/categorias';

type Opcion = { label: string; cats: string[] };

const PREGUNTAS: { pregunta: string; clave: string; opciones: Opcion[] }[] = [
  {
    pregunta: '¿Cómo es tu piel?',
    clave: 'piel',
    opciones: [
      { label: 'Seca', cats: ['Cremas', 'Aceites', 'Cuidado Facial'] },
      { label: 'Mixta', cats: ['Cuidado Facial', 'Cremas'] },
      { label: 'Grasa', cats: ['Cuidado Facial', 'Jabones'] },
      { label: 'Sensible', cats: ['Cuidado Facial', 'Cremas'] },
    ],
  },
  {
    pregunta: '¿Cómo es tu cabello?',
    clave: 'cabello',
    opciones: [
      { label: 'Seco', cats: ['Cabello', 'Shampoo'] },
      { label: 'Graso', cats: ['Shampoo'] },
      { label: 'Rizado', cats: ['Cabello', 'Cremas'] },
      { label: 'Teñido', cats: ['Cabello', 'Shampoo'] },
    ],
  },
  {
    pregunta: '¿Qué buscas hoy?',
    clave: 'objetivo',
    opciones: [
      { label: 'Hidratación', cats: ['Cremas', 'Cuerpo'] },
      { label: 'Limpieza', cats: ['Jabones', 'Cuidado Facial'] },
      { label: 'Aroma', cats: ['Colonias', 'Fragancias', 'Perfumeria'] },
      { label: 'Bienestar', cats: ['Aceites', 'Cuerpo'] },
    ],
  },
];

export function RoutineQuiz() {
  const [paso, setPaso] = useState(0);
  const [cats, setCats] = useState<string[]>([]);
  const [listo, setListo] = useState(false);

  function responder(op: Opcion) {
    const nuevas = [...cats, ...op.cats];
    if (paso < PREGUNTAS.length - 1) {
      setCats(nuevas);
      setPaso(paso + 1);
    } else {
      setCats(nuevas);
      setListo(true);
    }
  }

  function reiniciar() {
    setPaso(0);
    setCats([]);
    setListo(false);
  }

  // Recomendaciones: categorias mas repetidas, sin duplicar
  const recomendadas = Array.from(new Set(cats)).slice(0, 5);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="rounded-3xl border border-sand/70 bg-cream-card p-8 shadow-soft sm:p-10">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
              Asesoría personalizada
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold text-ink">
              Descubre tu rutina ideal
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Responde 3 preguntas y te recomendamos productos según tu piel y cabello.
            </p>
          </div>

          {!listo ? (
            <div className="mt-8">
              {/* Progreso */}
              <div className="mb-6 flex justify-center gap-2">
                {PREGUNTAS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all ${idx <= paso ? 'w-8 bg-forest' : 'w-2 bg-sand'}`}
                  />
                ))}
              </div>

              <h3 className="text-center font-serif text-xl font-semibold text-ink">
                {PREGUNTAS[paso].pregunta}
              </h3>

              <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-3">
                {PREGUNTAS[paso].opciones.map((op) => (
                  <button
                    key={op.label}
                    onClick={() => responder(op)}
                    className="rounded-2xl border border-sand bg-white px-4 py-4 font-semibold text-ink transition hover:border-forest hover:bg-forest hover:text-cream"
                  >
                    {op.label}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-ink-soft">
                Pregunta {paso + 1} de {PREGUNTAS.length}
              </p>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-light/15 text-forest-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">
                Esto es lo que te recomendamos
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Según tus respuestas, estas categorías son ideales para ti:
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {recomendadas.map((c) => (
                  <Link
                    key={c}
                    href={`/catalogo?cat=${encodeURIComponent(c)}`}
                    className="rounded-full border border-forest bg-forest px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-forest-deep"
                  >
                    {etiquetaCategoria(c)}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/catalogo"
                  className="rounded-full bg-clay px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-110"
                >
                  Ver catálogo completo
                </Link>
                <button
                  onClick={reiniciar}
                  className="rounded-full border border-sand px-6 py-3 text-sm font-bold text-ink-soft transition hover:border-forest hover:text-forest"
                >
                  Volver a empezar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
