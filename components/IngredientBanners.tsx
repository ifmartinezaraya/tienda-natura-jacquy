import Link from 'next/link';

// Contenido educativo original sobre ingredientes de origen natural.
const INGREDIENTES = [
  {
    nombre: 'Castaña',
    titulo: 'Nutrición intensa con Castaña',
    texto:
      'Rica en aceites y nutrientes, ayuda a nutrir profundamente la piel dejándola suave y confortada. Ideal para pieles que buscan hidratación y cuidado diario.',
    img: '/banners/ingrediente-castana.svg',
    cta: 'Ver productos con castaña',
    href: '/catalogo?q=castanha',
  },
  {
    nombre: 'Maracuyá',
    titulo: 'Frescura y equilibrio con Maracuyá',
    texto:
      'Conocida por sus propiedades calmantes y su aroma relajante, aporta una sensación de bienestar y ayuda a equilibrar la piel. Un clásico de la cosmética natural.',
    img: '/banners/ingrediente-maracuja.svg',
    cta: 'Ver productos con maracuyá',
    href: '/catalogo?q=maracuja',
  },
  {
    nombre: 'Andiroba',
    titulo: 'Bienestar corporal con Andiroba',
    texto:
      'Valorada por sus propiedades reconfortantes, es perfecta para momentos de relajación y cuidado del cuerpo. Naturaleza al servicio de tu bienestar.',
    img: '/banners/ingrediente-andiroba.svg',
    cta: 'Ver productos con andiroba',
    href: '/catalogo?q=andiroba',
  },
];

export function IngredientBanners() {
  return (
    <section className="bg-white/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
            Conoce más
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-ink">
            Ingredientes que amamos
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
            La naturaleza es la base de nuestros productos. Descubre los beneficios
            de sus ingredientes.
          </p>
        </div>

        <div className="space-y-6">
          {INGREDIENTES.map((ing, idx) => (
            <div
              key={ing.nombre}
              className={`grid overflow-hidden rounded-3xl border border-sand/70 bg-cream-card md:grid-cols-2 ${
                idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div
                className="min-h-[220px] bg-cover bg-center"
                style={{ backgroundImage: `url("${ing.img}")` }}
              />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
                  {ing.nombre}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
                  {ing.titulo}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {ing.texto}
                </p>
                <Link
                  href={ing.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-forest-deep"
                >
                  {ing.cta}
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
