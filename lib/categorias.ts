// Estilo visual (tinte de color) para cada categoria.
// Se usa en el placeholder de productos sin foto y en el showcase de categorias.

export type EstiloCategoria = {
  bg: string; // color de fondo suave
  fg: string; // color del icono / acento
};

const ESTILOS: Record<string, EstiloCategoria> = {
  Jabones: { bg: '#EAF2E9', fg: '#4C7A52' },
  Cremas: { bg: '#FBF1DF', fg: '#B4802A' },
  Colonias: { bg: '#F3E9E8', fg: '#A9645F' },
  Repuestos: { bg: '#ECEBE4', fg: '#767462' },
  Cabello: { bg: '#E7EFE9', fg: '#2B3D2E' },
  Shampoo: { bg: '#EAF0F2', fg: '#3E6B7A' },
  Desodorantes: { bg: '#F1EEF7', fg: '#6B5B8A' },
  Fragancias: { bg: '#FBEAE8', fg: '#A9645F' },
  Maquillaje: { bg: '#F7E9EF', fg: '#9A5B76' },
  Cuerpo: { bg: '#EFEAE1', fg: '#8A6B3E' },
  Perfumeria: { bg: '#F0EAF2', fg: '#7A5B8A' },
  Aceites: { bg: '#F4EFDF', fg: '#B08B4F' },
  'Cuidado Facial': { bg: '#E9F0EF', fg: '#3E7A6B' },
  Accesorios: { bg: '#EDEBE6', fg: '#767462' },
  Otros: { bg: '#EDEBE6', fg: '#767462' },
};

const DEFECTO: EstiloCategoria = { bg: '#EDEBE6', fg: '#767462' };

export function estiloCategoria(categoria: string): EstiloCategoria {
  return ESTILOS[categoria] ?? DEFECTO;
}


// Lista ordenada de categorias para el menu de navegacion del sitio.
export const CATEGORIAS = [
  'Cuidado Facial',
  'Cuerpo',
  'Cabello',
  'Shampoo',
  'Colonias',
  'Fragancias',
  'Perfumeria',
  'Maquillaje',
  'Jabones',
  'Cremas',
  'Aceites',
  'Desodorantes',
  'Repuestos',
  'Accesorios',
];


// Categorias de fragancia (permiten filtrar por genero: para ellas / para ellos).
export const FRAGANCIA_CATS = ['Perfumeria', 'Colonias', 'Fragancias'];


// Etiqueta visible (con tilde) para mostrar la categoria, sin cambiar el dato interno.
const ETIQUETAS: Record<string, string> = {
  Perfumeria: 'Perfumería',
};

export function etiquetaCategoria(cat: string): string {
  return ETIQUETAS[cat] ?? cat;
}
