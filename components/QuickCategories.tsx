import Link from 'next/link';

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=700&q=72&auto=format&fit=crop`;

// Album por categoria: imagen + enlace a los productos de esa categoria.
// (Imagenes libres de derechos; reemplazables por material autorizado de Natura.)
const ALBUMES: { nombre: string; img: string; href: string }[] = [
  { nombre: 'Cuidado Facial', img: IMG('photo-1526758097130-bab247274f58'), href: '/?cat=Cuidado%20Facial#catalogo' },
  { nombre: 'Perfumeria', img: IMG('photo-1570172619644-dfd03ed5d881'), href: '/?cat=Perfumeria#catalogo' },
  { nombre: 'Maquillaje', img: IMG('photo-1519415387722-a1c3bbef716c'), href: '/?cat=Maquillaje#catalogo' },
  { nombre: 'Cabello', img: IMG('photo-1620916566398-39f1143ab7be'), href: '/?cat=Cabello#catalogo' },
  { nombre: 'Cremas', img: IMG('photo-1556228578-8c89e6adf883'), href: '/?cat=Cremas#catalogo' },
  { nombre: 'Colonias', img: IMG('photo-1541643600914-78b084683601'), href: '/?cat=Colonias#catalogo' },
  { nombre: 'Jabones', img: IMG('photo-1596462502278-27bfdc403348'), href: '/?cat=Jabones#catalogo' },
  { nombre: 'Desodorantes', img: IMG('photo-1620916297397-a4a5402a3c6c'), href: '/?cat=Desodorantes#catalogo' },
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
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
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
