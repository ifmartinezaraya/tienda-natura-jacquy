'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { formatCLP } from '@/lib/format';
import { etiquetaCategoria } from '@/lib/categorias';
import type { Producto } from '@/lib/types';

const CATEGORIAS = [
  'Jabones', 'Cremas', 'Colonias', 'Repuestos', 'Cabello', 'Shampoo',
  'Desodorantes', 'Fragancias', 'Maquillaje', 'Cuerpo', 'Perfumeria',
  'Aceites', 'Cuidado Facial', 'Accesorios', 'Otros',
];

type FormData = {
  id?: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  stock: string;
  min_stock: string;
  activo: boolean;
  imagen_url: string | null;
};

const FORM_VACIO: FormData = {
  nombre: '', descripcion: '', categoria: 'Jabones',
  precio: '', stock: '', min_stock: '1', activo: true, imagen_url: null,
};

function normalizar(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function ProductosAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCat, setFiltroCat] = useState('');
  const [modal, setModal] = useState<'form' | 'eliminar' | null>(null);
  const [form, setForm] = useState<FormData>(FORM_VACIO);
  const [aEliminar, setAEliminar] = useState<Producto | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [aviso, setAviso] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function cargar() {
    setCargando(true);
    const { data } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true });
    setProductos((data ?? []) as Producto[]);
    setCargando(false);
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mostrarAviso(msg: string) {
    setAviso(msg);
    setTimeout(() => setAviso(''), 2500);
  }

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return productos
      .filter((p) => !filtroCat || p.categoria === filtroCat)
      .filter((p) => !q || normalizar(p.nombre).includes(q));
  }, [productos, busqueda, filtroCat]);

  const stats = useMemo(() => {
    const agotados = productos.filter((p) => p.stock <= 0).length;
    const inactivos = productos.filter((p) => !p.activo).length;
    return { total: productos.length, agotados, inactivos };
  }, [productos]);

  function abrirNuevo() {
    setForm(FORM_VACIO);
    setModal('form');
  }

  function abrirEditar(p: Producto) {
    setForm({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion ?? '',
      categoria: p.categoria,
      precio: String(p.precio),
      stock: String(p.stock),
      min_stock: String(p.min_stock),
      activo: p.activo,
      imagen_url: p.imagen_url,
    });
    setModal('form');
  }

  async function subirImagen(file: File) {
    setSubiendo(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const nombreArchivo = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from('productos')
        .upload(nombreArchivo, file, { upsert: true, cacheControl: '3600' });
      if (error) throw error;
      const { data } = supabase.storage
        .from('productos')
        .getPublicUrl(nombreArchivo);
      setForm((f) => ({ ...f, imagen_url: data.publicUrl }));
      mostrarAviso('Foto subida.');
    } catch {
      mostrarAviso('No se pudo subir la foto. Revisa el bucket "productos".');
    } finally {
      setSubiendo(false);
    }
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return mostrarAviso('El nombre es obligatorio.');
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    const min_stock = Number(form.min_stock);
    if (!Number.isFinite(precio) || precio < 0)
      return mostrarAviso('Precio inválido.');
    if (!Number.isFinite(stock) || stock < 0)
      return mostrarAviso('Cantidad inválida.');

    setGuardando(true);
    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria,
      precio,
      stock,
      min_stock: Number.isFinite(min_stock) ? min_stock : 1,
      activo: form.activo,
      imagen_url: form.imagen_url,
    };

    let error;
    if (form.id) {
      ({ error } = await supabase
        .from('productos')
        .update(payload)
        .eq('id', form.id));
    } else {
      ({ error } = await supabase.from('productos').insert(payload));
    }
    setGuardando(false);

    if (error) {
      mostrarAviso('No se pudo guardar. ' + error.message);
      return;
    }
    setModal(null);
    mostrarAviso(form.id ? 'Producto actualizado.' : 'Producto agregado.');
    cargar();
  }

  async function confirmarEliminar() {
    if (!aEliminar) return;
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', aEliminar.id);
    setModal(null);
    setAEliminar(null);
    if (error) return mostrarAviso('No se pudo eliminar.');
    mostrarAviso('Producto eliminado.');
    cargar();
  }

  async function alternarAgotado(p: Producto) {
    // Si tiene stock -> lo pone en 0 (agotado). Si esta en 0 -> lo repone a 1.
    const nuevoStock = p.stock > 0 ? 0 : 1;
    const { error } = await supabase
      .from('productos')
      .update({ stock: nuevoStock })
      .eq('id', p.id);
    if (error) return mostrarAviso('No se pudo actualizar el stock.');
    mostrarAviso(nuevoStock === 0 ? 'Marcado como agotado.' : 'Marcado como disponible.');
    cargar();
  }

  async function alternarActivo(p: Producto) {
    const { error } = await supabase
      .from('productos')
      .update({ activo: !p.activo })
      .eq('id', p.id);
    if (error) return mostrarAviso('No se pudo actualizar.');
    cargar();
  }

  return (
    <div>
      {aviso && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-forest-deep px-5 py-2.5 text-sm font-semibold text-cream shadow-lg">
          {aviso}
        </div>
      )}

      {/* Encabezado + estadisticas */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl font-semibold text-ink">Productos</h1>
        <button
          onClick={abrirNuevo}
          className="rounded-xl2 bg-forest px-4 py-2.5 text-sm font-extrabold text-white hover:bg-forest-deep"
        >
          + Agregar producto
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label="Total" valor={stats.total} />
        <Stat label="Agotados" valor={stats.agotados} tono="rose" />
        <Stat label="Ocultos" valor={stats.inactivos} tono="clay" />
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre..."
          className="min-w-52 flex-1 rounded-xl2 border border-sand bg-cream-card px-4 py-2.5 outline-none focus:border-forest"
        />
        <select
          value={filtroCat}
          onChange={(e) => setFiltroCat(e.target.value)}
          className="rounded-xl2 border border-sand bg-cream-card px-3 py-2.5 outline-none focus:border-forest"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{etiquetaCategoria(c)}</option>
          ))}
        </select>
      </div>

      {/* Lista */}
      {cargando ? (
        <p className="py-12 text-center text-ink-soft">Cargando productos...</p>
      ) : (
        <>
          <p className="mb-2 text-sm text-ink-soft">
            {filtrados.length} de {productos.length} productos
          </p>
          <div className="space-y-2">
            {filtrados.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl2 bg-cream-card p-3 shadow-soft"
              >
                <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg bg-sand/50">
                  {p.imagen_url ? (
                    <Image src={p.imagen_url} alt={p.nombre} fill className="object-cover" sizes="56px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-forest/30 text-xs">
                      Sin foto
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-serif text-sm font-semibold text-ink">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {etiquetaCategoria(p.categoria)} - {formatCLP(p.precio)} - Stock: {p.stock}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.stock <= 0 && <Badge tono="rose">Agotado</Badge>}
                    {!p.activo && <Badge tono="clay">Oculto</Badge>}
                  </div>
                </div>

                <div className="flex flex-none flex-wrap justify-end gap-1">
                  <BtnMini onClick={() => alternarAgotado(p)}>
                    {p.stock > 0 ? 'Agotar' : 'Reponer'}
                  </BtnMini>
                  <BtnMini onClick={() => alternarActivo(p)}>
                    {p.activo ? 'Ocultar' : 'Mostrar'}
                  </BtnMini>
                  <BtnMini onClick={() => abrirEditar(p)}>Editar</BtnMini>
                  <BtnMini
                    tono="rose"
                    onClick={() => {
                      setAEliminar(p);
                      setModal('eliminar');
                    }}
                  >
                    Eliminar
                  </BtnMini>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal formulario */}
      {modal === 'form' && (
        <Overlay onClose={() => setModal(null)}>
          <form onSubmit={guardar} className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              {form.id ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            {/* Foto */}
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-lg bg-sand/50">
                {form.imagen_url ? (
                  <Image src={form.imagen_url} alt="Foto" fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-forest/40">
                    Sin foto
                  </div>
                )}
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) subirImagen(f);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={subiendo}
                  className="rounded-lg border border-sand px-3 py-2 text-sm font-bold text-forest hover:bg-sand/40 disabled:opacity-60"
                >
                  {subiendo ? 'Subiendo...' : form.imagen_url ? 'Cambiar foto' : 'Subir foto'}
                </button>
                {form.imagen_url && (
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, imagen_url: null }))}
                    className="ml-2 text-sm text-rose-deep"
                  >
                    Quitar
                  </button>
                )}
              </div>
            </div>

            <Campo label="Nombre">
              <input
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                className="input"
                placeholder="Ej: Crema para manos Maracuja 75gr"
              />
            </Campo>

            <Campo label="Descripción (opcional)">
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                rows={2}
                className="input"
                placeholder="Detalles del producto..."
              />
            </Campo>

            <Campo label="Categoría">
              <select
                value={form.categoria}
                onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                className="input"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{etiquetaCategoria(c)}</option>
                ))}
              </select>
            </Campo>

            <div className="grid grid-cols-3 gap-2">
              <Campo label="Precio (CLP)">
                <input
                  type="number" min={0}
                  value={form.precio}
                  onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
                  className="input"
                />
              </Campo>
              <Campo label="Stock">
                <input
                  type="number" min={0}
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  className="input"
                />
              </Campo>
              <Campo label="Aviso min.">
                <input
                  type="number" min={0}
                  value={form.min_stock}
                  onChange={(e) => setForm((f) => ({ ...f, min_stock: e.target.value }))}
                  className="input"
                />
              </Campo>
            </div>

            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm((f) => ({ ...f, activo: e.target.checked }))}
                className="h-4 w-4"
              />
              Mostrar en la tienda (visible para clientes)
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-xl2 border border-sand px-4 py-3 font-bold text-ink-soft"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="flex-1 rounded-xl2 bg-forest px-4 py-3 font-extrabold text-white hover:bg-forest-deep disabled:opacity-60"
              >
                {guardando ? 'Guardando...' : form.id ? 'Guardar cambios' : 'Agregar producto'}
              </button>
            </div>
          </form>
        </Overlay>
      )}

      {/* Modal eliminar */}
      {modal === 'eliminar' && aEliminar && (
        <Overlay onClose={() => setModal(null)}>
          <h2 className="font-serif text-xl text-ink">Eliminar producto</h2>
          <p className="mt-2 text-sm text-ink-soft">
            ¿Seguro que quieres eliminar <b>{aEliminar.nombre}</b>? Esta acción no
            se puede deshacer.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setModal(null)}
              className="rounded-xl2 border border-sand px-4 py-3 font-bold text-ink-soft"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarEliminar}
              className="flex-1 rounded-xl2 bg-rose-deep px-4 py-3 font-extrabold text-white"
            >
              Eliminar
            </button>
          </div>
        </Overlay>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #e7e2d6;
          background: #fcfbf8;
          padding: 10px 12px;
          outline: none;
        }
        .input:focus {
          border-color: #2b3d2e;
        }
      `}</style>
    </div>
  );
}

function Stat({ label, valor, tono }: { label: string; valor: number; tono?: 'rose' | 'clay' }) {
  const color = tono === 'rose' ? 'text-rose-deep' : tono === 'clay' ? 'text-clay' : 'text-forest';
  return (
    <div className="rounded-xl2 bg-cream-card p-3 shadow-soft">
      <p className={`font-serif text-xl font-bold ${color}`}>{valor}</p>
      <p className="text-[11px] uppercase tracking-wide text-ink-soft">{label}</p>
    </div>
  );
}

function Badge({ children, tono }: { children: React.ReactNode; tono: 'rose' | 'clay' }) {
  const cls = tono === 'rose' ? 'bg-rose/15 text-rose-deep' : 'bg-clay/15 text-clay';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${cls}`}>
      {children}
    </span>
  );
}

function BtnMini({
  children,
  onClick,
  tono,
}: {
  children: React.ReactNode;
  onClick: () => void;
  tono?: 'rose';
}) {
  const cls = tono === 'rose'
    ? 'border-rose/40 text-rose-deep hover:bg-rose/10'
    : 'border-sand text-ink-soft hover:bg-sand/40';
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${cls}`}
    >
      {children}
    </button>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-cream-card p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
