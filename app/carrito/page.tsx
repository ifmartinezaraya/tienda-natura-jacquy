'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { useCart } from '@/components/CartProvider';
import { formatCLP } from '@/lib/format';
import { createClient } from '@/lib/supabase/client';
import { STORE_NAME, WHATSAPP_NUMBER } from '@/lib/config';

export default function CarritoPage() {
  const { items, cambiarCantidad, quitar, vaciar, totalPrecio, totalItems } =
    useCart();
  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  async function finalizarPedido() {
    setError('');
    if (items.length === 0) return;
    if (!cliente.trim()) {
      setError('Escribe tu nombre.');
      return;
    }
    if (!telefono.trim()) {
      setError('Escribe tu telefono de contacto.');
      return;
    }

    setEnviando(true);

    // 1) Guardar el pedido en Supabase (para que el admin lo vea)
    try {
      const supabase = createClient();
      await supabase.from('pedidos').insert({
        cliente: cliente.trim(),
        telefono: telefono.trim(),
        productos: items,
        total: totalPrecio,
        estado: 'pendiente',
      });
    } catch {
      // Si falla el guardado, igual continuamos al WhatsApp para no perder la venta.
    }

    // 2) Armar el mensaje de WhatsApp
    const lineas = items.map(
      (i) =>
        `- ${i.cantidad} x ${i.nombre} (${formatCLP(i.precio)}) = ${formatCLP(
          i.precio * i.cantidad,
        )}`,
    );
    const mensaje =
      `Hola ${STORE_NAME}! Quiero hacer un pedido:\n\n` +
      `${lineas.join('\n')}\n\n` +
      `TOTAL: ${formatCLP(totalPrecio)}\n\n` +
      `Nombre: ${cliente.trim()}\n` +
      `Telefono: ${telefono.trim()}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje,
    )}`;

    // 3) Abrir WhatsApp y vaciar carrito
    window.open(url, '_blank');
    setEnviando(false);
    vaciar();
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-5 font-serif text-2xl font-semibold text-ink">
          Tu carrito
        </h1>

        {items.length === 0 ? (
          <div className="rounded-xl2 bg-cream-card p-12 text-center text-ink-soft shadow-soft">
            <p className="mb-4">Tu carrito esta vacio.</p>
            <Link
              href="/"
              className="inline-block rounded-xl2 bg-forest px-5 py-3 font-bold text-white hover:bg-forest-deep"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de items */}
            <div className="space-y-3">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center gap-3 rounded-xl2 bg-cream-card p-3 shadow-soft"
                >
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-serif text-sm font-semibold text-ink">
                      {i.nombre}
                    </p>
                    <p className="text-sm text-forest">{formatCLP(i.precio)}</p>
                  </div>

                  <div className="flex items-center rounded-lg border border-sand">
                    <button
                      onClick={() => cambiarCantidad(i.id, i.cantidad - 1)}
                      className="px-3 py-1 font-bold text-forest"
                      aria-label="Menos"
                    >
                      -
                    </button>
                    <span className="min-w-7 text-center text-sm font-bold">
                      {i.cantidad}
                    </span>
                    <button
                      onClick={() => cambiarCantidad(i.id, i.cantidad + 1)}
                      className="px-3 py-1 font-bold text-forest"
                      aria-label="Mas"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-20 text-right text-sm font-bold text-ink">
                    {formatCLP(i.precio * i.cantidad)}
                  </div>

                  <button
                    onClick={() => quitar(i.id)}
                    className="text-ink-soft hover:text-rose-deep"
                    aria-label="Quitar"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-5 flex items-center justify-between rounded-xl2 bg-forest px-5 py-4 text-cream">
              <span className="text-sm font-semibold">
                Total ({totalItems} {totalItems === 1 ? 'articulo' : 'articulos'})
              </span>
              <span className="font-serif text-xl font-bold">
                {formatCLP(totalPrecio)}
              </span>
            </div>

            {/* Datos del cliente */}
            <div className="mt-5 rounded-xl2 bg-cream-card p-4 shadow-soft">
              <h2 className="mb-3 font-serif text-lg text-ink">Tus datos</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
                    Nombre
                  </label>
                  <input
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-sand bg-[#FCFBF8] px-3 py-2.5 outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
                    Telefono / WhatsApp
                  </label>
                  <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: +56 9 1234 5678"
                    className="w-full rounded-lg border border-sand bg-[#FCFBF8] px-3 py-2.5 outline-none focus:border-forest"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm font-semibold text-rose-deep">{error}</p>
              )}

              <button
                onClick={finalizarPedido}
                disabled={enviando}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl2 bg-[#25D366] px-5 py-3.5 font-extrabold text-white transition hover:brightness-95 disabled:opacity-60"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
                </svg>
                {enviando ? 'Preparando...' : 'Finalizar pedido por WhatsApp'}
              </button>
              <p className="mt-2 text-center text-xs text-ink-soft">
                Se abrira WhatsApp con el detalle de tu pedido listo para enviar.
              </p>
            </div>

            <button
              onClick={vaciar}
              className="mt-4 w-full text-center text-sm font-semibold text-ink-soft hover:text-rose-deep"
            >
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </main>
  );
}
