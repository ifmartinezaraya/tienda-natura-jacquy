'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { STORE_NAME } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Escribe tu correo y contrasena.');
      return;
    }
    setCargando(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      setCargando(false);
      setError('Correo o contrasena incorrectos.');
      return;
    }
    // Entrada exitosa -> al panel
    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-forest-deep to-forest px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-cream-card p-6 shadow-soft">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          {STORE_NAME}
        </p>
        <h1 className="mb-1 font-serif text-2xl font-semibold text-ink">
          Panel de administracion
        </h1>
        <p className="mb-5 text-sm text-ink-soft">
          Ingresa con tu correo y contrasena.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              placeholder="tucorreo@gmail.com"
              className="w-full rounded-lg border border-sand bg-[#FCFBF8] px-3 py-2.5 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Tu contrasena"
              className="w-full rounded-lg border border-sand bg-[#FCFBF8] px-3 py-2.5 outline-none focus:border-forest"
            />
          </div>

          {error && (
            <p className="text-sm font-semibold text-rose-deep">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-xl2 bg-forest px-5 py-3 font-extrabold text-white transition hover:bg-forest-deep disabled:opacity-60"
          >
            {cargando ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
