'use client';

import { useFavorites } from '@/components/FavoritesProvider';
import type { Producto } from '@/lib/types';

export function FavoriteButton({
  producto,
  className = '',
}: {
  producto: Producto;
  className?: string;
}) {
  const { esFavorito, alternar } = useFavorites();
  const activo = esFavorito(producto.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        alternar(producto);
      }}
      aria-label={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-sand bg-white/90 shadow-sm backdrop-blur transition hover:border-rose ${className}`}
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24"
        fill={activo ? '#A9645F' : 'none'}
        stroke={activo ? '#A9645F' : '#767462'}
        strokeWidth="1.8"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}
