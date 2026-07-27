/**
 * Junta classes ignorando valores falsos.
 * Sem clsx/tailwind-merge de propósito: as classes do projeto são escritas
 * à mão e não há conflito de utilitários para resolver.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ")
}
