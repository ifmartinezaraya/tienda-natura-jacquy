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
  const chips: string[] = [];
  const linea = detectarLinea(p.nombre);
  if (linea) chips.push(linea.nombre);
  chips.push(p.categoria);
  const t = parseTamano(p.nombre);
  if (t) chips.push(t);
  const pack = parsePack(p.nombre);
  if (pack) chips.push(pack);
  return chips;
}

// --- Deteccion de LINEA de Natura a partir del nombre del producto ---
type Linea = { nombre: string; descripcion: string };

const LINEAS: { claves: string[]; linea: Linea }[] = [
  { claves: ['ekos'], linea: { nombre: 'Ekos', descripcion: 'Línea inspirada en la biodiversidad brasileña, que rescata activos de origen vegetal de manera sostenible.' } },
  { claves: ['kaiak'], linea: { nombre: 'Kaiak', descripcion: 'Línea de fragancias frescas, inspiradas en la conexión con la naturaleza.' } },
  { claves: ['lumina'], linea: { nombre: 'Lumina', descripcion: 'Línea de cuidado capilar con tecnología de aminoácidos para un cabello luminoso y sano.' } },
  { claves: ['chronos'], linea: { nombre: 'Chronos', descripcion: 'Línea de cuidado facial enfocada en la salud, hidratación y firmeza de la piel.' } },
  { claves: ['tododia', 'todo dia'], linea: { nombre: 'Tododia', descripcion: 'Línea de cuidado corporal para el día a día, con aromas envolventes e hidratación.' } },
  { claves: ['faces'], linea: { nombre: 'Faces', descripcion: 'Línea de maquillaje versátil, práctica y para todos los días.' } },
  { claves: ['natura una', 'una '], linea: { nombre: 'Una', descripcion: 'Línea de maquillaje sofisticada que realza tu belleza.' } },
  { claves: ['humor'], linea: { nombre: 'Humor', descripcion: 'Línea de fragancias divertidas y desenfadadas.' } },
  { claves: ['essencial'], linea: { nombre: 'Essencial', descripcion: 'Línea de perfumería de alta gama, con fragancias sofisticadas.' } },
  { claves: ['mamae', 'mamae e bebe', 'bebe'], linea: { nombre: 'Mamae e Bebe', descripcion: 'Línea de cuidado suave, especialmente pensada para mamás y bebés.' } },
  { claves: ['homem'], linea: { nombre: 'Homem', descripcion: 'Línea de cuidado y fragancias pensada para el hombre.' } },
  { claves: ['kriska'], linea: { nombre: 'Kriska', descripcion: 'Fragancia juvenil y vibrante.' } },
  { claves: ['illia', 'ilia'], linea: { nombre: 'Ilia', descripcion: 'Línea de perfumería femenina elegante.' } },
  { claves: ['biografia'], linea: { nombre: 'Biografia', descripcion: 'Línea de fragancias femeninas de carácter único.' } },
];

export function detectarLinea(nombre: string): Linea | null {
  const n = nombre.toLowerCase();
  for (const { claves, linea } of LINEAS) {
    if (claves.some((c) => n.includes(c))) return linea;
  }
  return null;
}

// --- Deteccion de INGREDIENTE natural a partir del nombre ---
const INGREDIENTES: { claves: string[]; texto: string }[] = [
  { claves: ['castanha', 'castana'], texto: 'la nutrición intensa de la castaña' },
  { claves: ['maracuja'], texto: 'la frescura y el equilibrio del maracuyá' },
  { claves: ['andiroba'], texto: 'el bienestar reconfortante de la andiroba' },
  { claves: ['pitanga'], texto: 'la vitalidad y frescura de la pitanga' },
  { claves: ['murumuru', 'muru muru'], texto: 'la reparación y suavidad del murumurú' },
  { claves: ['pataua'], texto: 'el fortalecimiento del patauá' },
  { claves: ['breubranco', 'breu branco'], texto: 'el aroma amaderado del breu branco' },
  { claves: ['cacau', 'cacao'], texto: 'la hidratación del cacao' },
  { claves: ['ucuuba', 'ucuba', 'ucua'], texto: 'la nutrición del ucuuba' },
  { claves: ['assai', 'asai', 'acai'], texto: 'las propiedades antioxidantes del asaí' },
  { claves: ['guarana'], texto: 'la energía del guaraná' },
  { claves: ['acerola'], texto: 'la vitamina C de la acerola' },
];

export function detectarIngrediente(nombre: string): string | null {
  const n = nombre.toLowerCase();
  for (const { claves, texto } of INGREDIENTES) {
    if (claves.some((c) => n.includes(c))) return texto;
  }
  return null;
}

// Descripcion "inteligente": usa la linea y el ingrediente real detectados.
export function descripcionInteligente(p: Producto): string {
  const linea = detectarLinea(p.nombre);
  const ing = detectarIngrediente(p.nombre);
  const cat = p.categoria.toLowerCase();

  const partes: string[] = [];

  if (linea) {
    partes.push(`${p.nombre} pertenece a la línea ${linea.nombre} de Natura. ${linea.descripcion}`);
  } else {
    partes.push(`${p.nombre} es parte de nuestra selección de ${cat} de Natura.`);
  }

  if (ing) {
    partes.push(`Aprovecha ${ing} para el cuidado de tu piel, cabello o bienestar.`);
  }

  partes.push('Producto original de Natura. Consúltanos si quieres más información o asesoría sobre este producto.');

  return partes.join(' ');
}

// Beneficios genericos por categoria (informativos, no especificos de marca).
const BENEFICIOS: Record<string, string[]> = {
  Jabones: ['Limpieza suave', 'Aroma agradable', 'Uso diario'],
  Cremas: ['Hidratación', 'Piel suave', 'Rápida absorción'],
  Colonias: ['Fragancia fresca', 'Larga duración', 'Uso diario'],
  Fragancias: ['Aroma envolvente', 'Sensación de frescura', 'Ideal para regalo'],
  Perfumeria: ['Fragancia intensa', 'Larga duración', 'Presentación elegante'],
  Repuestos: ['Menos residuos', 'Rinde más', 'Cuida tu bolsillo'],
  Cabello: ['Nutrición', 'Brillo y suavidad', 'Cuidado capilar'],
  Shampoo: ['Limpieza profunda', 'Cuidado del cuero cabelludo', 'Uso frecuente'],
  Desodorantes: ['Protección diaria', 'Sensación de frescura', 'Cuidado de la piel'],
  Maquillaje: ['Acabado prolijo', 'Fácil de aplicar', 'Realza tu belleza'],
  Cuerpo: ['Cuidado corporal', 'Piel hidratada', 'Bienestar'],
  Aceites: ['Nutrición intensa', 'Multiuso', 'Textura ligera'],
  'Cuidado Facial': ['Cuidado del rostro', 'Piel saludable', 'Rutina diaria'],
  Accesorios: ['Práctico', 'Complemento ideal', 'Fácil de usar'],
  Otros: ['Cosmética natural', 'Cuidado diario', 'Calidad'],
};

export function beneficios(categoria: string): string[] {
  return BENEFICIOS[categoria] ?? BENEFICIOS['Otros'];
}

// Instrucciones de uso genericas por categoria.
const COMO_USAR: Record<string, string> = {
  Jabones:
    'Aplica sobre la piel húmeda, genera espuma con suaves movimientos y enjuaga con abundante agua.',
  Cremas:
    'Aplica sobre la piel limpia y seca, masajeando suavemente hasta su total absorción. Usa las veces que necesites.',
  Colonias:
    'Aplica sobre los puntos de pulso (cuello y muñecas) a unos 15 cm de distancia. Evita frotar.',
  Fragancias:
    'Rocía sobre el cuerpo o la ropa a distancia. Reaplica durante el día para refrescar el aroma.',
  Perfumeria:
    'Aplica en los puntos de pulso (cuello, muñecas). Unas pocas pulverizaciones son suficientes.',
  Repuestos:
    'Rellena tu envase reutilizable con este repuesto para seguir usando tu producto favorito y generar menos residuos.',
  Cabello:
    'Luego del shampoo, distribuye de medios a puntas, deja actuar unos minutos y enjuaga.',
  Shampoo:
    'Aplica sobre el cabello húmedo, masajea suavemente el cuero cabelludo y enjuaga. Repite si es necesario.',
  Desodorantes:
    'Aplica sobre la piel limpia y seca de las axilas. Evita el uso sobre piel irritada o recién depilada.',
  Maquillaje:
    'Aplica sobre el área deseada según el efecto buscado. Al final del día, retira con un desmaquillante.',
  Cuerpo:
    'Aplica sobre la piel y masajea suavemente hasta absorber. Ideal después del baño.',
  Aceites:
    'Aplica unas gotas sobre la piel o el cabello y masajea suavemente. Ajusta la cantidad según necesidad.',
  'Cuidado Facial':
    'Aplica sobre el rostro limpio siguiendo tu rutina de cuidado. Evita el contorno de ojos, salvo indicación.',
  Accesorios:
    'Sigue las indicaciones propias del accesorio. Límpialo después de cada uso para mantenerlo en buen estado.',
  Otros:
    'Sigue las indicaciones del envase para obtener los mejores resultados.',
};

export function comoUsar(categoria: string): string {
  return COMO_USAR[categoria] ?? COMO_USAR['Otros'];
}

// Descripcion generica cuando el producto aun no tiene una propia.
export function descripcionGenerica(p: Producto): string {
  const cat = p.categoria.toLowerCase();
  return `${p.nombre} es parte de nuestra selección de ${cat} de cosmética natural. Un producto pensado para tu cuidado diario, con la calidad y confianza que buscas. Escríbenos si quieres más información sobre este producto.`;
}

// Categorias de fragancia que muestran la seccion de "notas".
const CON_NOTAS = ['Colonias', 'Fragancias', 'Perfumeria'];

export function mostrarNotas(categoria: string): boolean {
  return CON_NOTAS.includes(categoria);
}

export function notasTexto(): string {
  return 'La familia olfativa y las notas pueden variar según la línea del producto. Consúltanos por el detalle de este aroma y te ayudamos a elegir el que más te guste.';
}


// Detecta el genero de una fragancia a partir del nombre.
export function detectarGenero(nombre: string): 'Ellas' | 'Ellos' | null {
  const n = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (/(masculin|homem|hombre|\bmen\b|caballero)/.test(n)) return 'Ellos';
  if (/(femenin|mujer|\bella\b|dama)/.test(n)) return 'Ellas';
  return null;
}
