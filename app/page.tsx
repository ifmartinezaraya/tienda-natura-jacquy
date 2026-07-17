import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { Catalogo } from '@/components/Catalogo';
import { STORE_NAME } from '@/lib/config';
import type { Producto } from '@/lib/types';

// Refresca la lista al menos cada 60s (los cambios del panel se ven pronto)
export const revalidate = 60;

export default async function HomePage() {
  // --- Diagnostico de configuracion (seguro: no muestra claves) ---
  const urlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const keyRaw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const urlEnv = urlRaw.trim();
  const keyEnv = keyRaw.trim();
  const diag = {
    tieneUrl: urlEnv.length > 0,
    urlValida: urlEnv.startsWith('https://') && urlEnv.includes('.supabase.co'),
    hostUrl: urlEnv ? urlEnv.replace('https://', '').split('.')[0] : '(vacia)',
    urlConEspacios: urlRaw !== urlRaw.trim(),
    claveConEspacios: keyRaw !== keyRaw.trim(),
    tieneClave: keyEnv.length > 0,
    tipoClave: keyEnv.startsWith('sb_publishable_')
      ? 'publishable (correcta)'
      : keyEnv.startsWith('eyJ')
        ? 'legacy anon (correcta)'
        : keyEnv.startsWith('sb_secret_')
          ? 'SECRET (INCORRECTA - no usar)'
          : keyEnv.length === 0
            ? '(vacia)'
            : 'formato desconocido',
    largoClave: keyEnv.length,
  };

  const supabase = createClient();
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  const productos = (data ?? []) as Producto[];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Portada */}
      <section className="bg-gradient-to-br from-forest-deep to-forest px-4 pb-10 pt-6 text-cream">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
            Belleza natural para tu piel
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[#D9D4C2]">
            Perfumeria, cuidado facial, corporal, cabello y maquillaje.
            Haz tu pedido y coordina la entrega por WhatsApp.
          </p>
        </div>
      </section>

      {error ? (
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-xl2 bg-rose/10 p-6 text-center text-rose-deep">
            <h2 className="font-serif text-lg">No se pudieron cargar los productos</h2>
            <p className="mt-2 text-sm">
              Revisa la conexion con Supabase (variables de entorno) e intenta de nuevo.
            </p>
          </div>

          {/* Panel de diagnostico (temporal, para detectar el problema) */}
          <div className="mt-4 rounded-xl2 border border-sand bg-cream-card p-5 text-left text-sm">
            <p className="mb-3 font-serif text-base font-semibold text-ink">
              Diagnostico de configuracion
            </p>
            <ul className="space-y-1.5 text-ink">
              <li>{diag.tieneUrl ? '✅' : '❌'} Variable URL detectada: <b>{diag.tieneUrl ? 'SI' : 'NO (falta)'}</b></li>
              <li>{diag.urlValida ? '✅' : '❌'} URL con formato valido (proyecto: <b>{diag.hostUrl}</b>)</li>
              <li>{diag.tieneClave ? '✅' : '❌'} Variable de clave detectada: <b>{diag.tieneClave ? 'SI' : 'NO (falta)'}</b></li>
              <li>{diag.tipoClave.includes('correcta') ? '✅' : '❌'} Tipo de clave: <b>{diag.tipoClave}</b> (largo: {diag.largoClave})</li>
              <li>{diag.urlConEspacios || diag.claveConEspacios ? '⚠️' : '✅'} Espacios invisibles: <b>{diag.urlConEspacios ? 'SI en la URL' : diag.claveConEspacios ? 'SI en la clave' : 'no'}</b></li>
            </ul>
            <div className="mt-3 rounded-lg bg-[#FBEAE8] p-3 text-xs text-rose-deep">
              <b>Error tecnico de Supabase:</b>
              <br />
              {error.message || '(sin mensaje)'}
              {error.code ? ` [codigo: ${error.code}]` : ''}
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Cuando todo este correcto, este panel desaparecera y se veran los productos.
            </p>
          </div>
        </div>
      ) : productos.length === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-ink-soft">
          <h2 className="font-serif text-lg text-ink">Catalogo en preparacion</h2>
          <p className="mt-2 text-sm">
            Aun no hay productos publicados. Importa el inventario en Supabase para verlos aqui.
          </p>
        </div>
      ) : (
        <Catalogo productos={productos} />
      )}

      <footer className="border-t border-sand bg-cream-card py-6 text-center text-xs text-ink-soft">
        {STORE_NAME} - Cosmetica natural
      </footer>
    </main>
  );
}
