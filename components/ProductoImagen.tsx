import Image from 'next/image';
import { estiloCategoria } from '@/lib/categorias';
import { CategoriaIcono } from '@/components/CategoriaIcono';

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
        background: `radial-gradient(circle at 50% 35%, #ffffff 0%, ${bg} 72%)`,
      }}
    >
      {/* Icono minimalista segun la categoria del producto */}
      <CategoriaIcono
        nombre={categoria}
        color={fg}
        strokeWidth={1.1}
        className="h-[42%] w-[42%] opacity-70"
      />
    </div>
  );
}
