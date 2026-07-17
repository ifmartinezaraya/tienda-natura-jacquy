'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ItemCarrito, Producto } from '@/lib/types';

type CartContextType = {
  items: ItemCarrito[];
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (id: string) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  vaciar: () => void;
  totalItems: number;
  totalPrecio: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'nj_carrito';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  // Cargar carrito guardado al iniciar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      /* ignore */
    }
    setCargado(true);
  }, []);

  // Guardar cada vez que cambia
  useEffect(() => {
    if (cargado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, cargado]);

  function agregar(producto: Producto, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === producto.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i,
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad,
          imagen_url: producto.imagen_url,
        },
      ];
    });
  }

  function quitar(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function cambiarCantidad(id: string, cantidad: number) {
    if (cantidad <= 0) {
      quitar(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad } : i)),
    );
  }

  function vaciar() {
    setItems([]);
  }

  const totalItems = useMemo(
    () => items.reduce((a, i) => a + i.cantidad, 0),
    [items],
  );
  const totalPrecio = useMemo(
    () => items.reduce((a, i) => a + i.cantidad * i.precio, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
