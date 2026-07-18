// ============================================================
//  BANNERS DE LA PORTADA  (facil de editar)
// ------------------------------------------------------------
//  COMO PONER TUS IMAGENES AUTORIZADAS DE NATURA:
//  1) Descarga los banners oficiales desde tu portal/app de
//     Consultora Natura (material que estas autorizado a usar).
//  2) Subelos a Supabase Storage (bucket "productos" o crea uno
//     "banners" publico) y copia la URL publica de cada imagen.
//  3) Pega esa URL en el campo "img" de cada banner de abajo.
//
//  Mientras tanto, se usan imagenes libres de derechos (Unsplash)
//  como marcador de posicion.
// ============================================================

const STOCK = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export type HeroSlide = {
  eyebrow: string;
  titulo: string;
  texto: string;
  cta: string;
  href: string;
  img: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: 'Consultora Natura · Productos originales',
    titulo: 'Belleza natural\npara tu piel',
    texto:
      'Perfumería, cuidado facial, corporal, cabello y maquillaje. Descubre tus favoritos.',
    cta: 'Ver catálogo',
    href: '/catalogo',
    // Banner vectorial propio (skincare). Reemplazable por tu banner autorizado de Natura.
    img: '/banners/hero-skincare.svg',
  },
  {
    eyebrow: 'Ingredientes de la naturaleza',
    titulo: 'El cuidado que\ntu piel merece',
    texto:
      'Fórmulas inspiradas en la biodiversidad para el bienestar de toda la familia.',
    cta: 'Explorar productos',
    href: '/catalogo',
    img: '/banners/hero-botanica.svg',
  },
  {
    eyebrow: 'Fácil y cercano',
    titulo: 'Pide fácil\npor WhatsApp',
    texto:
      'Arma tu carrito y coordina la entrega en simples pasos. Atención personalizada.',
    cta: 'Escríbenos',
    href: 'WHATSAPP',
    img: '/banners/hero-perfume.svg',
  },
];

export type Promo = {
  badge: string;
  titulo: string;
  destacado: string;
  sub: string;
  cta: string;
  href: string;
  grad: string;
  // Motivo (categoria) para el icono minimalista de marca de agua.
  icono: string;
};

export const PROMOS: Promo[] = [
  {
    badge: 'Más por menos',
    titulo: 'Lleva más y ahorra',
    destacado: 'Hasta 30% OFF',
    sub: 'En productos seleccionados',
    cta: 'Comprar',
    href: '/catalogo',
    grad: 'from-[#C56B3E] to-[#A9645F]',
    icono: 'Accesorios',
  },
  {
    badge: 'Especial repuestos',
    titulo: 'Recarga y cuida el planeta',
    destacado: 'Lleva 3 o más',
    sub: 'Precios especiales en repuestos',
    cta: 'Ver repuestos',
    href: '/catalogo?cat=Repuestos',
    grad: 'from-forest to-forest-light',
    icono: 'Repuestos',
  },
  {
    badge: 'Aromas',
    titulo: 'Encuentra tu aroma',
    destacado: 'Colonias y fragancias',
    sub: 'Frescura que te acompaña',
    cta: 'Descubrir',
    href: '/catalogo?cat=Colonias',
    grad: 'from-[#7A5B8A] to-[#5B4570]',
    icono: 'Colonias',
  },
  {
    badge: 'Cuidado facial',
    titulo: 'Tu rutina completa',
    destacado: 'Skincare',
    sub: 'Piel sana y radiante',
    cta: 'Ver skincare',
    href: '/catalogo?cat=Cuidado%20Facial',
    grad: 'from-[#C98B87] to-[#A9645F]',
    icono: 'Cuidado Facial',
  },
  {
    badge: 'Cabello',
    titulo: 'Brillo y fuerza',
    destacado: 'Shampoo + Acondicionador',
    sub: 'Para tu tipo de cabello',
    cta: 'Ver cabello',
    href: '/catalogo?cat=Cabello',
    grad: 'from-[#C79A4E] to-[#8A6B3E]',
    icono: 'Cabello',
  },
];
