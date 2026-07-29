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
 * Links do Nav. Usados nas duas páginas (home e /automacoes), então os links de
 * seção são root-relative (`/#...`): na home o Lenis casa o pathname "/" e faz
 * scroll suave; na /automacoes ele navega de volta para a home na seção certa.
 * "Automações" aponta para a página dedicada. Não há seção "Pacotes"; o link vai
 * ao CTA de diagnóstico, onde o plano é definido na conversa.
 */
export const NAV_LINKS = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Automações", href: "/automacoes" },
  { label: "Pacotes", href: "/#diagnostico" },
] as const

/** Textos da seção Hero (Prompt 4). Copy de docs/copy-final.md. */
export const HERO = {
  eyebrow: "Para pequenos negócios em São Luís que querem crescer de verdade",
  // Uma frase só; o SplitText divide em palavras e caracteres, para animar sem
  // quebrar palavra no meio da linha.
  headline: "Mais clientes entrando. Nenhum ficando sem resposta.",
  subheadline:
    "A Capta constrói a presença digital de micro e pequenas empresas em São Luís, com um site que aparece no Google e um atendimento automático que funciona enquanto você trabalha.",
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
    "Não é questão de ser bonito. É questão de fazer o visitante entrar em contato. Cada detalhe do site existe para isso: o texto, a velocidade, a estrutura.",
  cards: [
    {
      titulo: "Escrito para o seu cliente",
      texto:
        "O texto não é genérico. É escrito para quem você quer atrair, com as palavras que ele usa, as dúvidas que ele tem e o motivo que o faz escolher um negócio em vez de outro.",
    },
    {
      titulo: "Construído para o Google e para IA",
      texto:
        "Seu site aparece quando alguém pesquisa o seu serviço no Google, no ChatGPT ou no Maps. Otimizado desde o primeiro dia, entregue em até 3 dias.",
    },
    {
      titulo: "Feito para virar contato",
      texto:
        "Cada botão, cada seção, cada frase tem uma função. O visitante chega, entende o que você faz, e entra em contato. É isso que separa site que converte de site que existe.",
    },
  ],
} as const

/**
 * Bloco "Protótipo em 12h" dentro de Projetos (substitui a antiga grade de
 * cards "Em breve"). Não chamar de "protótipo" na copy pública: é a prévia
 * visual do site antes de qualquer contrato, a proposta de valor central.
 */
export const PROTOTIPO = {
  headline:
    "Antes de assinar qualquer coisa, você já vê como o seu site vai ficar.",
  subtexto:
    "Depois de uma conversa rápida sobre o seu negócio, a gente monta uma prévia visual do seu site em até 12 horas. Você vê, mostra pra quem quiser, e só decide depois.",
  inclusoLabel: "Quando você avançar, isso tudo entra",
  incluso: [
    "Design refinado para o seu nicho",
    "Animações e microinterações",
    "SEO técnico desde o dia 1",
    "Otimizado para aparecer no ChatGPT e em buscas por IA (AIO/GEO)",
    "LLM.txt configurado",
    "Entrega em até 3 dias após aprovação",
  ],
  cta: {
    label: "Quero ver como ficaria o meu site",
    texto: "Oi! Vim pelo site da Capta e quero ver a prévia do meu site.",
  },
} as const

/**
 * Seção Automação (Prompt 8). Copy de docs/copy-final.md §3, reescrita sem
 * travessão (subtítulo e resultado 2 usavam "—"). Os títulos curtos dos blocos
 * de resultado não existem no copy-final; foram criados para o layout ícone +
 * título + texto pedido no prompt.
 */
export const AUTOMACOES = {
  eyebrow: "AUTOMAÇÃO",
  titulo: "Seu WhatsApp respondendo enquanto você não pode",
  subtitulo:
    "Não é um robô com respostas travadas. É um atendimento montado para o seu negócio, que responde, agenda e avisa você quando é hora de entrar na conversa.",
  resultados: [
    {
      titulo: "Responde na hora, a qualquer hora",
      texto:
        "Cliente manda mensagem às 23h. Em segundos recebe resposta com as informações que precisava. De manhã, você já tem um contato qualificado esperando.",
    },
    {
      titulo: "Perguntas repetidas, respondidas sozinhas",
      texto:
        "Nenhuma pergunta repetitiva toma mais o seu tempo. Horários, preços, disponibilidade: tudo respondido automaticamente, com a sua linguagem.",
    },
    {
      titulo: "Você entra só na hora certa",
      texto:
        "Você só é acionado quando o cliente já está pronto para decidir. O filtro acontece antes de chegar em você.",
    },
  ],
  nota: "Automação 100% funcional com testes realizados. No ar em até 7 dias.",
  // Demonstração do chat no phone frame. Roda em loop no cliente (Prompt 8).
  chat: {
    contato: "Seu negócio",
    status: "online",
    mensagens: [
      { tipo: "cliente", texto: "Oi, quanto custa?" },
      {
        tipo: "bot",
        texto:
          "Boa noite! Fico feliz em ajudar. Me conta um pouco sobre o seu negócio?",
      },
      { tipo: "cliente", texto: "Tenho uma academia aqui em São Luís" },
      {
        tipo: "bot",
        texto: "Perfeito. Qual o melhor horário para a gente conversar?",
      },
      { tipo: "cliente", texto: "Amanhã de manhã" },
      {
        tipo: "bot",
        texto: "Marcado. Você recebe uma confirmação em instantes.",
      },
    ],
  },
} as const

/**
 * Página dedicada /automacoes (Prompt 9). A copy vem do próprio Prompt 9;
 * reescrita sem travessão (subheadline e passos usavam "—"). Os títulos das
 * seções "Como funciona" e "O que está incluso" e os títulos curtos dos cards
 * foram criados para o layout, seguindo o tom da copy existente.
 */
export const AUTOMACOES_PAGE = {
  hero: {
    eyebrow: "AUTOMAÇÃO DE WHATSAPP",
    headline: "Seu atendimento funcionando às 23h, no feriado, no fim de semana.",
    subheadline:
      "Montamos o fluxo de atendimento automático para o seu negócio, testado e no ar em até 7 dias.",
    cta: {
      label: "Quero conversar",
      texto: "Oi! Vim pela página de automações.",
    },
  },
  comoFunciona: {
    eyebrow: "COMO FUNCIONA",
    titulo: "Do primeiro contato ao atendimento no ar",
    passos: [
      {
        n: "01",
        titulo: "Diagnóstico",
        texto: "Entendemos como o seu cliente chega até você.",
      },
      {
        n: "02",
        titulo: "Configuração",
        texto: "Montamos o atendimento com a sua linguagem.",
      },
      {
        n: "03",
        titulo: "Testes",
        texto: "Testamos tudo antes de colocar no ar.",
      },
      {
        n: "04",
        titulo: "No ar",
        texto: "Ativo em até 7 dias.",
      },
    ],
  },
  incluso: {
    eyebrow: "O QUE ESTÁ INCLUSO",
    titulo: "Tudo o que o seu atendimento automático faz por você",
    cards: [
      {
        titulo: "Respostas 24 horas",
        texto:
          "As perguntas frequentes respondidas na hora, a qualquer momento do dia.",
      },
      {
        titulo: "Agendamento automático",
        texto:
          "O cliente agenda e recebe a confirmação sozinho, sem depender de você.",
      },
      {
        titulo: "Aviso no seu celular",
        texto:
          "Você é avisado a cada contato qualificado, pronto para decidir.",
      },
    ],
  },
  ctaFinal: {
    texto: "Automação 100% funcional com testes realizados.",
    cta: {
      label: "Quero montar meu atendimento",
      texto: "Oi! Quero montar o atendimento automático do meu negócio.",
    },
  },
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

/**
 * Seção FAQ (SEO técnico + AIO). Mesmas perguntas/respostas usadas no
 * JSON-LD (FAQPage) em components/shared/StructuredData.tsx: uma fonte só de
 * texto, servida tanto para o visitante quanto para Google/IA.
 */
export const FAQ = {
  eyebrow: "DÚVIDAS FREQUENTES",
  titulo: "Perguntas que a gente já respondeu antes",
  perguntas: [
    {
      pergunta: "Quanto custa um site profissional em São Luís?",
      resposta:
        "Na Capta, sites institucionais para pequenas empresas em São Luís custam a partir de R$700. O valor depende do escopo: número de seções, integrações e nível de personalização. A entrega é feita em até 3 dias após a aprovação do briefing.",
    },
    {
      pergunta: "O site vai aparecer no Google?",
      resposta:
        "Sim. Todo site entregue pela Capta já sai otimizado para SEO local: meta tags, structured data, sitemap, Google Search Console configurado e texto escrito para os termos que o seu cliente pesquisa em São Luís.",
    },
    {
      pergunta: "O que é automação de atendimento no WhatsApp?",
      resposta:
        "É um sistema que responde automaticamente às mensagens dos seus clientes no WhatsApp: horários, preços, agendamentos, com a sua linguagem, 24 horas por dia. Você só entra na conversa quando o cliente está pronto para fechar.",
    },
    {
      pergunta: "Em quanto tempo o site fica pronto?",
      resposta:
        "Em até 3 dias úteis após a aprovação do briefing. Antes de fechar, você ainda recebe uma prévia visual do site em até 12 horas após nossa conversa inicial.",
    },
    {
      pergunta: "A Capta atende fora de São Luís?",
      resposta:
        "Sim. Embora o foco seja São Luís, MA, a Capta atende clientes em todo o Brasil de forma remota.",
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

/** Footer (Prompt 5). */
export const FOOTER = {
  linha: "CAPTA · São Luís, Maranhão · © 2026",
  whatsappTexto: "Oi! Vim pelo site da Capta.",
} as const
