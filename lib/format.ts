// Formatea numeros como pesos chilenos: 7000 -> "$7.000"
const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export function formatCLP(valor: number): string {
  return clp.format(valor || 0);
}
