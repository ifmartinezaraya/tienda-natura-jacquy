const INSTAGRAM_URL = 'https://www.instagram.com/naturabyjacqueline/';

// Ilustraciones vectoriales propias (sin marcas de terceros).
// Reemplazables por tus propias publicaciones cuando quieras.
const POSTS = [
  '/banners/ig/ig-1.svg',
  '/banners/ig/ig-2.svg',
  '/banners/ig/ig-3.svg',
  '/banners/ig/ig-4.svg',
  '/banners/ig/ig-5.svg',
  '/banners/ig/ig-6.svg',
];

export function InstagramSection() {
  return (
    <section className="bg-cream-card">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
            Nuestra comunidad
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-ink">
            Síguenos en Instagram
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-semibold text-forest hover:text-clay"
          >
            @naturabyjacqueline
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {POSTS.map((src, idx) => (
            <a
              key={idx}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-sand/40"
            >
              <div
                className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url("${src}")` }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-forest-deep/0 transition group-hover:bg-forest-deep/40">
                <svg
                  className="opacity-0 transition group-hover:opacity-100"
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="#F3EFE3" strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#F3EFE3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-extrabold text-cream transition hover:bg-forest-deep"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
