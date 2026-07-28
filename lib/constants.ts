/**
 * Fonte única de textos e dados do site.
 * Nada de texto, link ou número hardcoded no JSX — tudo entra por aqui.
 */

/** Número usado em todos os CTAs de WhatsApp (formato wa.me, só dígitos). */
export const WHATSAPP_NUMERO = "5591993779948"

/**
 * Monta um link wa.me já com o texto pré-preenchido e codificado.
 * Usar em vez de escrever a URL na mão em cada botão.
 */
export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
}

/**
 * Links do Nav do site principal.
 * Não existe seção "Pacotes" nesta versão do site, então o link aponta para o
 * CTA de diagnóstico — é lá que o plano/pacote é definido na conversa.
 */
export const NAV_LINKS = [
  { label: "Projetos", href: "#projetos" },
  { label: "Automações", href: "#automacoes" },
  { label: "Pacotes", href: "#diagnostico" },
] as const
