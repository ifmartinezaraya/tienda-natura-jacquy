'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { STORE_NAME } from '@/lib/config';

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Productos' },
    { href: '/admin/pedidos', label: 'Pedidos' },
  ];

  return (
    <header className="bg-gradient-to-br from-forest-deep to-forest text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#C9BFA0]">
            {STORE_NAME} - Administracion
          </p>
          <p className="text-xs text-[#D9D4C2]">{email}</p>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex gap-1 rounded-full bg-white/10 p-1">
            {links.map((l) => {
              const activo =
                l.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                    activo ? 'bg-cream text-forest' : 'text-cream hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold hover:bg-white/10"
          >
            Ver tienda
          </Link>

          <form action="/admin/logout" method="post">
            <button className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold hover:bg-white/20">
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
