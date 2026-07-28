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

/**
 * Seção "O que resolvemos" (Prompt 5).
 * Copy das colunas vem do Esqueleto.md §02 — o copy-final.md não tem esta seção.
 * A coluna 3 foi renomeada para "Entrega com data marcada" (combina com o ícone
 * de calendário pedido no Prompt 5).
 */
export const RESOLVE = {
  eyebrow: "O QUE RESOLVEMOS",
  titulo: "Três coisas que fazem um negócio crescer na internet",
  colunas: [
    {
      titulo: "Presença que converte",
      texto: "Site profissional pensado para trazer cliente, não só existir.",
    },
    {
      titulo: "Atendimento que não para",
      texto: "Automação que responde e agenda enquanto você trabalha.",
    },
    {
      titulo: "Entrega com data marcada",
      texto: "Entrega com prazo, escopo claro e resultado visível.",
    },
  ],
} as const

/** Seção Projetos (Prompt 5). Copy de docs/copy-final.md §2. */
export const PROJETOS = {
  eyebrow: "PROJETOS",
  titulo: "O que um site feito para converter faz diferente",
  subtitulo:
    "Não é questão de ser bonito. É questão de fazer o visitante entrar em contato. Cada detalhe do site — o texto, a velocidade, a estrutura — existe para isso.",
  cards: [
    {
      titulo: "Escrito para o seu cliente",
      texto:
        "O texto não é genérico. É escrito para quem você quer atrair — com as palavras que ele usa, as dúvidas que ele tem e o motivo que o faz escolher um negócio em vez de outro.",
    },
    {
      titulo: "Construído para o Google e para IA",
      texto:
        "Seu site aparece quando alguém pesquisa o seu serviço — no Google, no ChatGPT, no Maps. Otimizado desde o primeiro dia, entregue em até 3 dias.",
    },
    {
      titulo: "Feito para virar contato",
      texto:
        "Cada botão, cada seção, cada frase tem uma função. O visitante chega, entende o que você faz, e entra em contato. É isso que separa site que converte de site que existe.",
    },
  ],
  nota:
    "Os primeiros projetos entram aqui assim que saem do ar. Se quiser ser um dos primeiros negócios de São Luís com essa estrutura, o momento é agora.",
} as const

/** Seção Resultados / trilha (Prompt 5). Copy de docs/copy-final.md §4. */
export const RESULTADOS = {
  eyebrow: "RESULTADOS",
  titulo: "O que muda quando a estrutura está no lugar",
  subtitulo:
    "Não em teoria. Em dias contados a partir do momento que você decide.",
  marcos: [
    {
      dia: "Dia 3",
      titulo: "Seu site está no ar.",
      texto:
        "Otimizado para o Google e para IA. Qualquer pessoa que pesquisar o seu serviço em São Luís tem chance de te encontrar.",
    },
    {
      dia: "Dia 7",
      titulo: "Seu atendimento automático está funcionando.",
      texto:
        "Testado, ajustado, respondendo com a sua voz. Nenhuma mensagem fica sem resposta.",
    },
    {
      dia: "Dia 10",
      titulo: "Site + automação rodando juntos.",
      texto:
        "Você recebe contato qualificado, agenda sem esforço e foca no que só você pode fazer: atender bem.",
    },
  ],
} as const

/** Seção CTA diagnóstico (Prompt 5). Copy de docs/copy-final.md §5. */
export const DIAGNOSTICO = {
  titulo:
    "Antes de qualquer proposta, a gente precisa entender o seu negócio",
  paragrafos: [
    "Cada negócio tem um problema diferente. Alguns precisam aparecer no Google. Outros precisam parar de perder cliente por falta de resposta. Alguns precisam dos dois.",
    "A conversa é gratuita, sem compromisso e sem enrolação. Você sai sabendo exatamente o que faz sentido para o seu momento agora.",
  ],
  cta: {
    label: "Quero conversar sobre o meu negócio",
    texto: "Oi! Vim pelo site e quero conversar sobre o meu negócio.",
  },
} as const

/**
 * Instagram da Capta (Footer).
 * TODO: o @ real não está em nenhum doc do projeto — trocar quando confirmado.
 */
export const INSTAGRAM_URL = "https://www.instagram.com/"

/** Footer (Prompt 5). */
export const FOOTER = {
  linha: "CAPTA · São Luís, Maranhão · © 2026",
  whatsappTexto: "Oi! Vim pelo site da Capta.",
} as const
