import Link from 'next/link';

// Album por categoria: ilustracion vectorial minimalista + enlace a esa categoria.
const ALBUMES: { nombre: string; img: string; href: string }[] = [
  { nombre: 'Cuidado Facial', img: '/banners/cat/facial.svg', href: '/catalogo?cat=Cuidado%20Facial' },
  { nombre: 'Perfumeria', img: '/banners/cat/perfumeria.svg', href: '/catalogo?cat=Perfumeria' },
  { nombre: 'Maquillaje', img: '/banners/cat/maquillaje.svg', href: '/catalogo?cat=Maquillaje' },
  { nombre: 'Cabello', img: '/banners/cat/cabello.svg', href: '/catalogo?cat=Cabello' },
  { nombre: 'Cremas', img: '/banners/cat/cremas.svg', href: '/catalogo?cat=Cremas' },
  { nombre: 'Colonias', img: '/banners/cat/colonias.svg', href: '/catalogo?cat=Colonias' },
  { nombre: 'Jabones', img: '/banners/cat/jabones.svg', href: '/catalogo?cat=Jabones' },
  { nombre: 'Desodorantes', img: '/banners/cat/desodorantes.svg', href: '/catalogo?cat=Desodorantes' },
];

export function QuickCategories() {
  return (
    <section className="border-y border-sand bg-cream-card">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
            Explora
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Compra por categoria
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {ALBUMES.map((a) => (
            <Link
              key={a.nombre}
              href={a.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest-deep shadow-soft"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url("${a.img}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-lg font-semibold text-cream drop-shadow">
                  {a.nombre}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-cream/90">
                  Ver productos <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
