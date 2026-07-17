import { createClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sin sesion: el middleware ya redirige, pero por seguridad:
  if (!user) {
    // En /admin/login no hay usuario y esta permitido; dejamos pasar.
    return <>{children}</>;
  }

  // Verifica que el correo este en la lista blanca de administradores.
  const { data: admin } = await supabase
    .from('usuarios_admin')
    .select('email')
    .eq('email', user.email)
    .maybeSingle();

  if (!admin) {
    // Usuario autenticado pero NO autorizado como admin.
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="max-w-md rounded-xl2 bg-cream-card p-8 text-center shadow-soft">
          <h1 className="font-serif text-xl text-ink">Acceso no autorizado</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Tu cuenta ({user.email}) no tiene permisos de administrador. Pide
            que agreguen tu correo a la tabla <code>usuarios_admin</code>.
          </p>
          <form action="/admin/logout" method="post" className="mt-4">
            <button className="rounded-xl2 bg-forest px-5 py-2.5 font-bold text-white">
              Cerrar sesion
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav email={user.email ?? ''} />
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </div>
  );
}
