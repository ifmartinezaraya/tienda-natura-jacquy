'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Producto } from '@/lib/types';

export type ItemFavorito = {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string | null;
  categoria: string;
  stock: number;
};

type FavContextType = {
  favoritos: ItemFavorito[];
  esFavorito: (id: string) => boolean;
  alternar: (producto: Producto) => void;
  quitar: (id: string) => void;
  total: number;
};

const FavContext = createContext<FavContextType | null>(null);
const STORAGE_KEY = 'nj_favoritos';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<ItemFavorito[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const g = localStorage.getItem(STORAGE_KEY);
      if (g) setFavoritos(JSON.parse(g));
    } catch {
      /* ignore */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
  }, [favoritos, cargado]);

  function esFavorito(id: string) {
    return favoritos.some((f) => f.id === id);
  }

  function alternar(p: Producto) {
    setFavoritos((prev) => {
      if (prev.some((f) => f.id === p.id)) {
        return prev.filter((f) => f.id !== p.id);
      }
      return [
        ...prev,
        {
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          imagen_url: p.imagen_url,
          categoria: p.categoria,
          stock: p.stock,
        },
      ];
    });
  }

  function quitar(id: string) {
    setFavoritos((prev) => prev.filter((f) => f.id !== id));
  }

  const total = useMemo(() => favoritos.length, [favoritos]);

  return (
    <FavContext.Provider value={{ favoritos, esFavorito, alternar, quitar, total }}>
      {children}
    </FavContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>');
  return ctx;
}
