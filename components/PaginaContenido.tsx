import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

// Marco comun para paginas de contenido (nosotros, ayuda, politicas...).
export function PaginaContenido({
  titulo,
  bajada,
  children,
}: {
  titulo: string;
  bajada?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Encabezado */}
      <section className="bg-gradient-to-br from-forest-deep to-forest px-4 py-12 text-cream">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-3 text-xs text-[#C9BFA0]">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span>{titulo}</span>
          </nav>
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{titulo}</h1>
          {bajada && <p className="mt-2 max-w-2xl text-sm text-[#E4DFCF]">{bajada}</p>}
        </div>
      </section>

      {/* Contenido */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="prose-nj space-y-4 text-[15px] leading-relaxed text-ink">
          {children}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
