// Formata valores em reais no padrão brasileiro: 1250 -> "R$ 1.250,00"
export function formatBRL(value: number): string {
  const [intPart, decPart] = Math.abs(value).toFixed(2).split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${value < 0 ? '-' : ''}R$ ${withThousands},${decPart}`;
}
