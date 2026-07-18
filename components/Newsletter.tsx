'use client';

import Link from 'next/link';
import { useState } from 'react';

const CUPON = 'BIENVENIDA10';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEnviado(true);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(CUPON);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-forest-deep to-forest text-cream shadow-soft">
          <div className="grid items-center gap-6 p-8 sm:p-10 md:grid-cols-2">
            {/* Texto / cupon */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E4DFCF]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 12a2 2 0 0 1 0-4V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 1 0 4v2a2 2 0 0 1 0 4v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v0a2 2 0 0 1 0-4z" />
                </svg>
                Cupón de bienvenida
              </span>

              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                10% de descuento
                <br />en tu primera compra
              </h2>
              <p className="mt-2 text-sm text-[#E4DFCF]">
                Suscríbete y recibe tu cupón al instante. Además, entérate primero
                de novedades, lanzamientos y ofertas.
              </p>

              {enviado ? (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#E4DFCF]">
                    ✓ Listo. Este es tu cupón:
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-xl border-2 border-dashed border-cream/50 bg-white/10 px-5 py-3 font-serif text-2xl font-bold tracking-widest">
                      {CUPON}
                    </span>
                    <button
                      onClick={copiar}
                      className="rounded-xl bg-cream px-4 py-3 text-sm font-extrabold text-forest transition hover:bg-white"
                    >
                      {copiado ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-[#C9BFA0]">
                    Presenta este código al finalizar tu pedido por WhatsApp para
                    aplicar el descuento en tu primera compra.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="flex-1 rounded-full border border-white/20 bg-white/95 px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-white"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-clay px-7 py-3 text-sm font-extrabold text-white transition hover:brightness-110"
                  >
                    Quiero mi cupón
                  </button>
                </form>
              )}

              <p className="mt-3 text-[11px] text-[#C9BFA0]">
                Al registrarte, aceptas recibir comunicaciones de acuerdo con
                nuestra{' '}
                <Link href="/politicas/privacidad" className="underline hover:text-white">
                  política de privacidad
                </Link>{' '}
                y{' '}
                <Link href="/politicas/terminos" className="underline hover:text-white">
                  términos de uso
                </Link>
                .
              </p>
            </div>

            {/* Emblema decorativo */}
            <div className="hidden justify-center md:flex">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-cream/25">
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white/10 text-center">
                  <span className="font-serif text-4xl font-bold">10%</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#E4DFCF]">dcto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
