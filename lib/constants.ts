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

/** Textos da seção Hero (Prompt 4). Copy de docs/copy-final.md. */
export const HERO = {
  eyebrow: "Para pequenos negócios em São Luís que querem crescer de verdade",
  // Uma frase só, com espaço — no Prompt 6 o SplitText quebra por caractere.
  headline: "Mais clientes entrando. Nenhum ficando sem resposta.",
  subheadline:
    "A Capta constrói a presença digital de micro e pequenas empresas em São Luís — site que aparece no Google e atendimento automático que funciona enquanto você trabalha.",
  ctaPrimario: {
    label: "Quero entender o que preciso",
    texto:
      "Oi! Vim pelo site e quero entender o que a Capta pode fazer pelo meu negócio.",
  },
  ctaSecundario: {
    label: "Ver como funciona",
    href: "#projetos",
  },
} as const
