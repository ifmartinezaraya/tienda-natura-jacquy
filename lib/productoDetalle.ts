import type { Producto } from '@/lib/types';

// Detecta el tamano/formato desde el nombre (ej: "100ml", "75 gr", "25 ml").
export function parseTamano(nombre: string): string | null {
  const m = nombre.match(/(\d+)\s?(ml|gr|grs|g|mg)\b/i);
  if (!m) return null;
  const unidad = m[2].toLowerCase().replace('grs', 'gr').replace(/^g$/, 'gr');
  return `${m[1]} ${unidad}`;
}

// Detecta packs (ej: "(5 c/u)", "(3c/u)").
export function parsePack(nombre: string): string | null {
  const m = nombre.match(/\(?\s*(\d+)\s*c\/u\s*\)?/i);
  return m ? `Pack x${m[1]}` : null;
}

// Chips de atributos derivados del producto.
export function atributos(p: Producto): string[] {
  const chips: string[] = [p.categoria];
  const t = parseTamano(p.nombre);
  if (t) chips.push(t);
  const pack = parsePack(p.nombre);
  if (pack) chips.push(pack);
  return chips;
}

// Beneficios genericos por categoria (informativos, no especificos de marca).
const BENEFICIOS: Record<string, string[]> = {
  Jabones: ['Limpieza suave', 'Aroma agradable', 'Uso diario'],
  Cremas: ['Hidratacion', 'Piel suave', 'Rapida absorcion'],
  Colonias: ['Fragancia fresca', 'Larga duracion', 'Uso diario'],
  Fragancias: ['Aroma envolvente', 'Sensacion de frescura', 'Ideal para regalo'],
  Perfumeria: ['Fragancia intensa', 'Larga duracion', 'Presentacion elegante'],
  Repuestos: ['Menos residuos', 'Rinde mas', 'Cuida tu bolsillo'],
  Cabello: ['Nutricion', 'Brillo y suavidad', 'Cuidado capilar'],
  Shampoo: ['Limpieza profunda', 'Cuidado del cuero cabelludo', 'Uso frecuente'],
  Desodorantes: ['Proteccion diaria', 'Sensacion de frescura', 'Cuidado de la piel'],
  Maquillaje: ['Acabado prolijo', 'Facil de aplicar', 'Realza tu belleza'],
  Cuerpo: ['Cuidado corporal', 'Piel hidratada', 'Bienestar'],
  Aceites: ['Nutricion intensa', 'Multiuso', 'Textura ligera'],
  'Cuidado Facial': ['Cuidado del rostro', 'Piel saludable', 'Rutina diaria'],
  Accesorios: ['Practico', 'Complemento ideal', 'Facil de usar'],
  Otros: ['Cosmetica natural', 'Cuidado diario', 'Calidad'],
};

export function beneficios(categoria: string): string[] {
  return BENEFICIOS[categoria] ?? BENEFICIOS['Otros'];
}

// Instrucciones de uso genericas por categoria.
const COMO_USAR: Record<string, string> = {
  Jabones:
    'Aplica sobre la piel humeda, genera espuma con suaves movimientos y enjuaga con abundante agua.',
  Cremas:
    'Aplica sobre la piel limpia y seca, masajeando suavemente hasta su total absorcion. Usa las veces que necesites.',
  Colonias:
    'Aplica sobre los puntos de pulso (cuello y munecas) a unos 15 cm de distancia. Evita frotar.',
  Fragancias:
    'Rocia sobre el cuerpo o la ropa a distancia. Reaplica durante el dia para refrescar el aroma.',
  Perfumeria:
    'Aplica en los puntos de pulso (cuello, munecas). Unas pocas pulverizaciones son suficientes.',
  Repuestos:
    'Rellena tu envase reutilizable con este repuesto para seguir usando tu producto favorito y generar menos residuos.',
  Cabello:
    'Luego del shampoo, distribuye de medios a puntas, deja actuar unos minutos y enjuaga.',
  Shampoo:
    'Aplica sobre el cabello humedo, masajea suavemente el cuero cabelludo y enjuaga. Repite si es necesario.',
  Desodorantes:
    'Aplica sobre la piel limpia y seca de las axilas. Evita el uso sobre piel irritada o recien depilada.',
  Maquillaje:
    'Aplica sobre el area deseada segun el efecto buscado. Al final del dia, retira con un desmaquillante.',
  Cuerpo:
    'Aplica sobre la piel y masajea suavemente hasta absorber. Ideal despues del bano.',
  Aceites:
    'Aplica unas gotas sobre la piel o el cabello y masajea suavemente. Ajusta la cantidad segun necesidad.',
  'Cuidado Facial':
    'Aplica sobre el rostro limpio siguiendo tu rutina de cuidado. Evita el contorno de ojos, salvo indicacion.',
  Accesorios:
    'Sigue las indicaciones propias del accesorio. Limpialo despues de cada uso para mantenerlo en buen estado.',
  Otros:
    'Sigue las indicaciones del envase para obtener los mejores resultados.',
};

export function comoUsar(categoria: string): string {
  return COMO_USAR[categoria] ?? COMO_USAR['Otros'];
}

// Descripcion generica cuando el producto aun no tiene una propia.
export function descripcionGenerica(p: Producto): string {
  const cat = p.categoria.toLowerCase();
  return `${p.nombre} es parte de nuestra seleccion de ${cat} de cosmetica natural. Un producto pensado para tu cuidado diario, con la calidad y confianza que buscas. Escribenos si quieres mas informacion sobre este producto.`;
}

// Categorias de fragancia que muestran la seccion de "notas".
const CON_NOTAS = ['Colonias', 'Fragancias', 'Perfumeria'];

export function mostrarNotas(categoria: string): boolean {
  return CON_NOTAS.includes(categoria);
}

export function notasTexto(): string {
  return 'La familia olfativa y las notas pueden variar segun la linea del producto. Consultanos por el detalle de este aroma y te ayudamos a elegir el que mas te guste.';
}
