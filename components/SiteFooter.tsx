import Link from 'next/link';
import { STORE_NAME, WHATSAPP_NUMBER } from '@/lib/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-sand bg-forest-deep text-cream">
      {/* Marca */}
      <div className="mx-auto max-w-7xl px-4 pt-12 text-center">
        <p className="font-serif text-3xl font-semibold">{STORE_NAME}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#C9BFA0]">
          Cosmetica natural para el cuidado de tu piel, cabello y bienestar.
        </p>
      </div>

      {/* Columnas */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
            Acerca de nosotros
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#E4DFCF]">
            <li><Link href="/nosotros" className="hover:text-white">Sobre nosotros</Link></li>
            <li><Link href="/nosotros#sustentabilidad" className="hover:text-white">Sustentabilidad</Link></li>
            <li><Link href="/#catalogo" className="hover:text-white">Nuestro catalogo</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
            Ayuda
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#E4DFCF]">
            <li><Link href="/ayuda" className="hover:text-white">Ayuda y contacto</Link></li>
            <li><Link href="/envios" className="hover:text-white">Envios y entregas</Link></li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="hover:text-white">
                Escribir por WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
            Soporte
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#E4DFCF]">
            <li><Link href="/politicas/terminos" className="hover:text-white">Terminos y condiciones</Link></li>
            <li><Link href="/politicas/privacidad" className="hover:text-white">Politicas de privacidad</Link></li>
            <li><Link href="/admin" className="hover:text-white">Ingreso administracion</Link></li>
          </ul>
        </div>
      </div>

      {/* Medios de pago + redes */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9BFA0]">
              Medios de pago
            </span>
            <div className="flex items-center gap-2 text-[#E4DFCF]">
              <PayTag>Efectivo</PayTag>
              <PayTag>Transferencia</PayTag>
              <PayTag>Debito</PayTag>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#E4DFCF]">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" aria-label="WhatsApp" className="hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" /></svg>
            </a>
            <span aria-label="Instagram" className="opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </span>
            <span aria-label="Facebook" className="opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" /></svg>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-[#C9BFA0]">
        © {new Date().getFullYear()} {STORE_NAME} · Cosmetica natural. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function PayTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold">
      {children}
    </span>
  );
}
