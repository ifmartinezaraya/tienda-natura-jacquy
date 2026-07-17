import Image from 'next/image';
import { estiloCategoria } from '@/lib/categorias';

// Muestra la foto del producto o, si no tiene, un placeholder elegante
// con un motivo botanico teñido segun la categoria.
export function ProductoImagen({
  src,
  alt,
  categoria,
  sizes,
  priority = false,
}: {
  src: string | null;
  alt: string;
  categoria: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-105"
        priority={priority}
      />
    );
  }

  const { bg, fg } = estiloCategoria(categoria);

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(circle at 50% 35%, #ffffff 0%, ${bg} 70%)`,
      }}
    >
      {/* Motivo botanico (rama) */}
      <svg
        width="46%"
        height="46%"
        viewBox="0 0 24 24"
        fill="none"
        stroke={fg}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      >
        <path d="M12 21V7" />
        <path d="M12 12c0-2.5 2-4.5 4.5-4.5C16.5 10 14.5 12 12 12z" />
        <path d="M12 9c0-2.5-2-4.5-4.5-4.5C7.5 7 9.5 9 12 9z" />
        <path d="M12 16c0-2 1.6-3.6 3.6-3.6C15.6 14.4 14 16 12 16z" />
        <path d="M12 16c0-2-1.6-3.6-3.6-3.6C8.4 14.4 10 16 12 16z" />
      </svg>
    </div>
  );
}
