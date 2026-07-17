// Tipos compartidos en toda la aplicacion

export type Producto = {
  id: string;
  legacy_id: string | null;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  imagen_url: string | null;
  stock: number;
  min_stock: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
};

export type ItemCarrito = {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url: string | null;
};

export type EstadoPedido = 'pendiente' | 'confirmado' | 'entregado' | 'cancelado';

export type Pedido = {
  id: string;
  cliente: string;
  telefono: string;
  productos: ItemCarrito[];
  total: number;
  estado: EstadoPedido;
  fecha: string;
};
