'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Guardado local simple (sin backend). Sirve como confirmacion visual.
    setEnviado(true);
  }

  return (
    <section className="bg-cream-card">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
          Novedades y promociones
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">
          Suscribete y enterate primero
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Recibe nuestras novedades, lanzamientos y ofertas especiales.
        </p>

        {enviado ? (
          <div className="mx-auto mt-6 max-w-md rounded-full bg-forest px-6 py-4 font-semibold text-cream">
            ✓ Gracias por suscribirte
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electronico"
              className="flex-1 rounded-full border border-sand bg-white px-5 py-3 text-sm outline-none focus:border-forest"
            />
            <button
              type="submit"
              className="rounded-full bg-forest px-7 py-3 text-sm font-extrabold text-cream transition hover:bg-forest-deep"
            >
              Enviar
            </button>
          </form>
        )}

        <p className="mt-3 text-xs text-ink-soft">
          Al registrarte, aceptas recibir comunicaciones de acuerdo con nuestra{' '}
          <Link href="/politicas/privacidad" className="underline hover:text-forest">
            politica de privacidad
          </Link>{' '}
          y{' '}
          <Link href="/politicas/terminos" className="underline hover:text-forest">
            terminos de uso
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
