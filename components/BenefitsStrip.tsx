const BENEFICIOS = [
  {
    titulo: 'Pedidos por WhatsApp',
    texto: 'Rapido y con atencion personalizada',
    icono: (
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
    ),
  },
  {
    titulo: 'Entrega coordinada',
    texto: 'Acordamos horario y lugar contigo',
    icono: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
  {
    titulo: 'Productos originales Natura',
    texto: 'Cosmetica natural de confianza',
    icono: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    titulo: 'Atencion cercana',
    texto: 'Te ayudamos a elegir lo mejor',
    icono: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-b border-sand bg-cream-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
        {BENEFICIOS.map((b) => (
          <div key={b.titulo} className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream text-forest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {b.icono}
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">{b.titulo}</p>
              <p className="truncate text-xs text-ink-soft">{b.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
