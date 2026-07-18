'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatCLP } from '@/lib/format';
import type { Pedido, EstadoPedido, ItemCarrito } from '@/lib/types';

const ESTADOS: EstadoPedido[] = ['pendiente', 'confirmado', 'entregado', 'cancelado'];

const COLOR: Record<EstadoPedido, string> = {
  pendiente: 'bg-clay/15 text-clay',
  confirmado: 'bg-forest-light/15 text-forest-light',
  entregado: 'bg-forest/15 text-forest',
  cancelado: 'bg-rose/15 text-rose-deep',
};

export function PedidosAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState<EstadoPedido | ''>('');
  const [aviso, setAviso] = useState('');

  async function cargar() {
    setCargando(true);
    const { data } = await supabase
      .from('pedidos')
      .select('*')
      .order('fecha', { ascending: false });
    setPedidos((data ?? []) as Pedido[]);
    setCargando(false);
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cambiarEstado(id: string, estado: EstadoPedido) {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', id);
    if (error) {
      setAviso('No se pudo actualizar.');
    } else {
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado } : p)),
      );
    }
    setTimeout(() => setAviso(''), 2000);
  }

  const filtrados = filtro ? pedidos.filter((p) => p.estado === filtro) : pedidos;

  function fecha(f: string) {
    return new Date(f).toLocaleString('es-CL', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <div>
      {aviso && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-forest-deep px-5 py-2.5 text-sm font-semibold text-cream shadow-lg">
          {aviso}
        </div>
      )}

      <h1 className="mb-4 font-serif text-2xl font-semibold text-ink">
        Pedidos recibidos
      </h1>

      <div className="mb-4 flex flex-wrap gap-2">
        <Chip label="Todos" activo={filtro === ''} onClick={() => setFiltro('')} />
        {ESTADOS.map((e) => (
          <Chip
            key={e}
            label={e}
            activo={filtro === e}
            onClick={() => setFiltro(e)}
          />
        ))}
      </div>

      {cargando ? (
        <p className="py-12 text-center text-ink-soft">Cargando pedidos...</p>
      ) : filtrados.length === 0 ? (
        <div className="rounded-xl2 bg-cream-card p-12 text-center text-ink-soft shadow-soft">
          <h3 className="mb-1 font-serif text-lg text-ink">Sin pedidos</h3>
          <p>Cuando un cliente finalice una compra, aparecerá aquí.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtrados.map((p) => (
            <div key={p.id} className="rounded-xl2 bg-cream-card p-4 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-serif text-lg font-semibold text-ink">
                    {p.cliente}
                  </p>
                  <a
                    href={`https://wa.me/${p.telefono.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    className="text-sm font-semibold text-forest hover:underline"
                  >
                    {p.telefono}
                  </a>
                  <p className="text-xs text-ink-soft">{fecha(p.fecha)}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase ${COLOR[p.estado]}`}
                >
                  {p.estado}
                </span>
              </div>

              <div className="mt-3 border-t border-sand pt-3">
                {(p.productos as ItemCarrito[]).map((i, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-ink-soft">
                      {i.cantidad} x {i.nombre}
                    </span>
                    <span className="font-semibold text-ink">
                      {formatCLP(i.precio * i.cantidad)}
                    </span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-sand pt-2">
                  <span className="font-bold text-ink">Total</span>
                  <span className="font-serif text-lg font-bold text-forest">
                    {formatCLP(p.total)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                  Cambiar estado:
                </span>
                {ESTADOS.map((e) => (
                  <button
                    key={e}
                    onClick={() => cambiarEstado(p.id, e)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-bold capitalize ${
                      p.estado === e
                        ? 'border-forest bg-forest text-white'
                        : 'border-sand text-ink-soft hover:bg-sand/40'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ label, activo, onClick }: { label: string; activo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
        activo ? 'bg-forest text-white' : 'bg-cream-card text-ink-soft hover:bg-sand'
      }`}
    >
      {label}
    </button>
  );
}
