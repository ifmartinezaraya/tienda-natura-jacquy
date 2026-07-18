import Link from 'next/link';
import { estiloCategoria } from '@/lib/categorias';

// Accesos rapidos a las categorias mas buscadas.
const RAPIDAS = [
  'Cuidado Facial',
  'Perfumeria',
  'Maquillaje',
  'Repuestos',
  'Cremas',
  'Desodorantes',
  'Jabones',
  'Cabello',
];

export function QuickCategories() {
  return (
    <section className="border-y border-sand bg-cream-card">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
          Explora por categoria
        </h2>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {RAPIDAS.map((c) => {
            const est = estiloCategoria(c);
            return (
              <Link
                key={c}
                href={`/?cat=${encodeURIComponent(c)}#catalogo`}
                className="flex w-24 flex-none flex-col items-center gap-2 text-center"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full transition hover:scale-105"
                  style={{ background: est.bg }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={est.fg} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21V8" />
                    <path d="M12 12c0-2.4 1.9-4.3 4.3-4.3C16.3 10.1 14.4 12 12 12z" />
                    <path d="M12 9c0-2.4-1.9-4.3-4.3-4.3C7.7 7.1 9.6 9 12 9z" />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-ink">{c}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
