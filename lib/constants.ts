import {
  IconBarbell,
  IconStethoscope,
  IconToolsKitchen2,
  IconBriefcase,
  IconWorldSearch,
  IconMessage2,
  IconTargetArrow,
  type Icon,
} from "@tabler/icons-react"

/* -------------------------------------------------------------------------- */
/*  Site                                                                       */
/* -------------------------------------------------------------------------- */

export const SITE = {
  nome: "Capta",
  tagline: "Sites e atendimento automático em São Luís",
  descricao:
    "Sites que trazem cliente e atendimento automático no WhatsApp para academias, consultórios, restaurantes e escritórios. Escopo e prazo fechados antes de começar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://capta.vercel.app",
  cidade: "São Luís",
} as const

/* -------------------------------------------------------------------------- */
/*  WhatsApp                                                                   */
/* -------------------------------------------------------------------------- */

export const WHATSAPP_NUMERO = "5591993779948"

/** Monta o link do WhatsApp com mensagem já preenchida. */
export function whatsappUrl(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

export const WHATSAPP_MENSAGENS = {
  geral: "Oi! Vim pelo site e quero entender o que a Capta pode fazer pelo meu negócio.",
  diagnostico: "Oi! Vim pelo site e quero um diagnóstico do meu negócio.",
  site: "Oi! Vim pelo site e quero o pacote de site profissional.",
  siteAutomacao: "Oi! Vim pelo site e quero o pacote de site + automação.",
  nicho: (nicho: string) =>
    `Oi! Vim pelo site e quero a automação para ${nicho.toLowerCase()}.`,
} as const

/* -------------------------------------------------------------------------- */
/*  Navegação                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `secao` é âncora dentro da home — o Nav prefixa com "/" quando o
 * visitante está em outra rota. `pagina` é navegação de verdade.
 */
export const NAV_LINKS = [
  { label: "Projetos", href: "#projetos", tipo: "secao" },
  { label: "Automações", href: "/automacoes", tipo: "pagina" },
  { label: "Pacotes", href: "#pacotes", tipo: "secao" },
] as const

/* -------------------------------------------------------------------------- */
/*  01 — Hero                                                                  */
/* -------------------------------------------------------------------------- */

export const HERO = {
  label: "Presença digital para negócios reais",
  headline: ["Seu negócio achado no Google.", "Seu WhatsApp respondendo às 23h."],
  subhead:
    "Sites e atendimento automático para academias, consultórios, restaurantes e escritórios em São Luís. Escopo e prazo fechados antes de começar.",
  ctaPrimario: "Pedir diagnóstico",
  ctaSecundario: "Ver projetos",
} as const

/* -------------------------------------------------------------------------- */
/*  02 — O que a Capta resolve                                                 */
/* -------------------------------------------------------------------------- */

export const RESOLVE = {
  label: "O que resolvemos",
  titulo: "Três coisas que fazem um negócio crescer na internet",
  itens: [
    {
      id: "presenca",
      icon: IconWorldSearch,
      titulo: "Presença que converte",
      texto:
        "Site pensado para trazer cliente, não só para existir. Quem procura o seu serviço encontra você antes do concorrente.",
    },
    {
      id: "atendimento",
      icon: IconMessage2,
      titulo: "Atendimento que não para",
      texto:
        "Automação que responde, tira dúvida e agenda enquanto você trabalha. Nenhuma mensagem de madrugada fica sem resposta.",
    },
    {
      id: "resultado",
      icon: IconTargetArrow,
      titulo: "Entrega com data marcada",
      texto:
        "Escopo fechado, prazo definido e contrato antes de começar. Você sabe o que recebe e quando recebe.",
    },
  ],
} as const

/* -------------------------------------------------------------------------- */
/*  03 — Projetos                                                              */
/* -------------------------------------------------------------------------- */

export type Projeto = {
  id: string
  cliente: string | null
  nicho: string
  contexto: string | null
  imagem: string | null
  href: string | null
}

/**
 * Estado vazio proposital. Quando um projeto entrar, basta preencher
 * cliente / contexto / imagem / href — o card se adapta sozinho.
 */
export const PROJETOS: Projeto[] = [
  { id: "projeto-1", cliente: null, nicho: "Academia", contexto: null, imagem: null, href: null },
  { id: "projeto-2", cliente: null, nicho: "Consultório", contexto: null, imagem: null, href: null },
  { id: "projeto-3", cliente: null, nicho: "Restaurante", contexto: null, imagem: null, href: null },
  { id: "projeto-4", cliente: null, nicho: "Escritório", contexto: null, imagem: null, href: null },
]

export const PROJETOS_TEXTO = {
  label: "Projetos",
  titulo: "Os primeiros projetos entram aqui",
  subhead:
    "Cada site publicado aparece nesta lista com o nicho e o link para o endereço no ar.",
  estadoVazio: "Em breve",
} as const

/* -------------------------------------------------------------------------- */
/*  04 e 05 — Nichos e automações                                              */
/* -------------------------------------------------------------------------- */

export type MensagemChat = {
  de: "cliente" | "negocio"
  texto: string
  hora: string
}

export type Nicho = {
  id: string
  label: string
  icon: Icon
  /** Dor específica do nicho — abre o bloco na página de automações. */
  problema: string
  /** Frase curta usada no card da seção 05. */
  problemaCurto: string
  /** Etapas do flow diagram, na ordem. */
  fluxo: readonly string[]
  /** Conversa exibida no mockup de celular. */
  conversa: readonly MensagemChat[]
  /** O que a automação entrega neste nicho. */
  entregas: readonly string[]
  preco: number
}

export const NICHOS: readonly Nicho[] = [
  {
    id: "academia",
    label: "Academia",
    icon: IconBarbell,
    problema:
      "A mensagem chega às 22h perguntando o valor do plano. A resposta sai no dia seguinte — quando o aluno já fechou na academia da esquina.",
    problemaCurto: "Lead some quando a mensagem chega fora do horário.",
    fluxo: [
      "Mensagem fora do horário",
      "Responde plano e valor",
      "Agenda aula experimental",
      "Avisa você no dia",
    ],
    conversa: [
      { de: "cliente", texto: "Oi, quanto tá a mensalidade?", hora: "22:14" },
      {
        de: "negocio",
        texto: "Boa noite! Mensal R$89 e trimestral R$79/mês. Quer marcar uma aula experimental?",
        hora: "22:14",
      },
      { de: "cliente", texto: "Quero sim", hora: "22:15" },
      { de: "negocio", texto: "Tenho quinta 7h ou sexta 19h. Qual fica melhor?", hora: "22:15" },
      { de: "cliente", texto: "Sexta 19h", hora: "22:16" },
      {
        de: "negocio",
        texto: "Marcado para sexta, 19h. Chega 10 minutos antes e traz uma toalha.",
        hora: "22:16",
      },
    ],
    entregas: [
      "Responde valor de plano a qualquer hora",
      "Marca aula experimental sozinha",
      "Lembra o aluno no dia da aula",
      "Avisa você quando alguém agenda",
    ],
    preco: 950,
  },
  {
    id: "consultorio",
    label: "Consultório",
    icon: IconStethoscope,
    problema:
      "O paciente liga, ninguém atende e ele não liga de novo. A vaga da agenda fica vazia e ninguém percebe que ela existiu.",
    problemaCurto: "Vaga na agenda fica vazia por ligação não atendida.",
    fluxo: [
      "Paciente chama",
      "Confirma o convênio",
      "Oferece horário livre",
      "Lembra um dia antes",
    ],
    conversa: [
      { de: "cliente", texto: "Bom dia, vocês atendem por convênio?", hora: "07:42" },
      {
        de: "negocio",
        texto: "Bom dia! Atendemos Unimed, Bradesco Saúde e particular. Qual é o seu?",
        hora: "07:42",
      },
      { de: "cliente", texto: "Unimed", hora: "07:43" },
      { de: "negocio", texto: "Tenho terça 14h30 ou quarta 9h. Qual prefere?", hora: "07:43" },
      { de: "cliente", texto: "Terça 14h30", hora: "07:44" },
      {
        de: "negocio",
        texto: "Agendado para terça, 14h30. Traga carteirinha e documento com foto.",
        hora: "07:44",
      },
    ],
    entregas: [
      "Confirma convênio antes de agendar",
      "Mostra só os horários livres",
      "Lembra o paciente um dia antes",
      "Reduz falta sem ninguém ligar",
    ],
    preco: 1000,
  },
  {
    id: "restaurante",
    label: "Restaurante",
    icon: IconToolsKitchen2,
    problema:
      "Sábado à noite chegam 40 mensagens perguntando a mesma coisa: tem mesa, até que horas abre, faz entrega. Alguém precisa parar de trabalhar para responder.",
    problemaCurto: "Mesma pergunta 40 vezes na noite mais cheia.",
    fluxo: [
      "Pedido de reserva",
      "Mostra horários livres",
      "Confirma a mesa",
      "Envia o cardápio",
    ],
    conversa: [
      { de: "cliente", texto: "Boa noite, tem mesa pra 4 hoje?", hora: "18:55" },
      { de: "negocio", texto: "Boa noite! Tenho 19h30 e 21h. Qual horário?", hora: "18:55" },
      { de: "cliente", texto: "19h30", hora: "18:56" },
      {
        de: "negocio",
        texto: "Reservado para 4 pessoas às 19h30. Guardo a mesa por 15 minutos.",
        hora: "18:56",
      },
      { de: "cliente", texto: "Vocês entregam?", hora: "18:57" },
      {
        de: "negocio",
        texto: "Entregamos no centro até 22h30. Quer que eu mande o cardápio?",
        hora: "18:57",
      },
    ],
    entregas: [
      "Reserva mesa sem ninguém parar",
      "Responde horário e entrega na hora",
      "Manda cardápio automaticamente",
      "Segura a reserva e libera se não vier",
    ],
    preco: 850,
  },
  {
    id: "escritorio",
    label: "Escritório",
    icon: IconBriefcase,
    problema:
      "Metade dos contatos não é do tipo de caso que você aceita. Você só descobre isso depois de vinte minutos de conversa.",
    problemaCurto: "Tempo perdido com caso que você nem aceita.",
    fluxo: [
      "Contato novo chega",
      "Qualifica o caso",
      "Descarta o que não é seu",
      "Agenda a consulta",
    ],
    conversa: [
      { de: "cliente", texto: "Preciso de ajuda com uma rescisão", hora: "09:20" },
      {
        de: "negocio",
        texto: "Certo. Atuamos em direito trabalhista. Você foi demitido ou pediu demissão?",
        hora: "09:20",
      },
      { de: "cliente", texto: "Fui demitido sem justa causa", hora: "09:21" },
      { de: "negocio", texto: "Entendi. Há quanto tempo isso aconteceu?", hora: "09:21" },
      { de: "cliente", texto: "Semana passada", hora: "09:22" },
      {
        de: "negocio",
        texto: "Está dentro do prazo. Posso agendar uma consulta na quinta, 16h?",
        hora: "09:22",
      },
    ],
    entregas: [
      "Faz as perguntas de triagem sozinha",
      "Separa o caso que serve do que não serve",
      "Agenda consulta só com quem qualifica",
      "Entrega o histórico da conversa pronto",
    ],
    preco: 1000,
  },
] as const

export const AUTOMACOES_TEXTO = {
  label: "Automações",
  titulo: "Escolha o seu nicho e veja o atendimento rodando",
  subhead:
    "Cada fluxo é montado para as perguntas que os seus clientes já fazem. Não é o mesmo robô com o nome trocado.",
} as const

export const NICHOS_TEXTO = {
  label: "Foco",
  titulo: "Quatro nichos, não quarenta",
  subhead:
    "Trabalhar sempre nos mesmos quatro tipos de negócio significa já saber quais perguntas os seus clientes fazem — antes de você contar.",
} as const

/* -------------------------------------------------------------------------- */
/*  06 — Pacotes                                                               */
/* -------------------------------------------------------------------------- */

export type Pacote = {
  id: string
  nome: string
  preco: string
  prazo: string
  descricao: string
  inclui: readonly string[]
  cta: string
  mensagem: string
  destaque: boolean
}

export const PACOTES: readonly Pacote[] = [
  {
    id: "site",
    nome: "Site profissional",
    preco: "R$700 a R$1.200",
    prazo: "No ar em até 4 dias",
    descricao: "Para quem precisa ser encontrado e passar credibilidade.",
    inclui: [
      "Site completo, escrito para o seu nicho",
      "Texto feito para gerar contato",
      "Preparado para aparecer no Google",
      "Abre rápido no celular",
      "Suporte se o site sair do ar",
    ],
    cta: "Quero o site",
    mensagem: WHATSAPP_MENSAGENS.site,
    destaque: false,
  },
  {
    id: "site-automacao",
    nome: "Site + automação",
    preco: "R$1.500 a R$2.200",
    prazo: "No ar em até 10 dias",
    descricao: "Para quem já perde cliente por demorar a responder.",
    inclui: [
      "Tudo do pacote de site",
      "Atendimento no WhatsApp 24 horas",
      "Agendamento e confirmação sem você",
      "Respostas prontas para as perguntas de sempre",
      "Aviso no seu celular a cada contato novo",
    ],
    cta: "Quero site e automação",
    mensagem: WHATSAPP_MENSAGENS.siteAutomacao,
    destaque: true,
  },
] as const

export const PACOTES_TEXTO = {
  label: "Pacotes",
  titulo: "Duas formas de começar",
  subhead: "Sem plano intermediário e sem tabela de comparação. São duas.",
  observacao:
    "Manutenção opcional a partir de R$150 por mês: suporte, ajustes e melhorias. Metade do valor na assinatura do contrato, metade na entrega.",
} as const

/* -------------------------------------------------------------------------- */
/*  07 — CTA final                                                             */
/* -------------------------------------------------------------------------- */

export const CTA_FINAL = {
  titulo: "Quem procura o seu serviço hoje vai achar alguém",
  linha: "Que seja você.",
  botao: "Falar no WhatsApp",
  mensagem: WHATSAPP_MENSAGENS.geral,
} as const

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  texto: `© ${new Date().getFullYear()} ${SITE.nome}`,
  link: "WhatsApp",
} as const

/* -------------------------------------------------------------------------- */
/*  Página /automacoes                                                         */
/* -------------------------------------------------------------------------- */

export const AUTO_HERO = {
  label: "Automação de WhatsApp",
  headline: "Toda mensagem respondida. Inclusive a das 23h.",
  subhead:
    "Atendimento automático montado para academias, consultórios, restaurantes e escritórios. Rodando em até 10 dias.",
  cta: "Falar no WhatsApp",
} as const

/**
 * Conversa única da página /automacoes — sem nicho.
 * Qualquer dono de negócio reconhece a cena: pergunta de preço tarde
 * da noite, resposta na hora e horário reservado.
 */
export const CHAT_UNIVERSAL = {
  contato: "Seu negócio",
  statusOnline: "online",
  statusDigitando: "digitando…",
  conversa: [
    { de: "cliente", texto: "Boa noite! Vocês ainda estão atendendo?", hora: "22:47" },
    { de: "negocio", texto: "Boa noite! Estou aqui sim.", hora: "22:47" },
    { de: "cliente", texto: "Queria saber o valor", hora: "22:48" },
    {
      de: "negocio",
      texto: "Te passo agora. Quer que eu já reserve um horário?",
      hora: "22:48",
    },
    { de: "cliente", texto: "Pode ser quinta", hora: "22:49" },
    {
      de: "negocio",
      texto: "Quinta às 10h, reservado. Confirmo com você amanhã cedo.",
      hora: "22:49",
    },
  ] as readonly MensagemChat[],
} as const

/** Ritmo da conversa, em milissegundos. */
export const CHAT_TIMING = {
  /** Espera antes da primeira mensagem entrar na tela. */
  inicial: 400,
  /** Intervalo entre a mensagem anterior e a resposta do cliente. */
  cliente: 600,
  /** Tempo que o "digitando…" fica no ar antes da mensagem do bot. */
  digitando: 900,
} as const

export const COMO_ENTREGAMOS = {
  label: "Como funciona",
  titulo: "Três passos até estar no ar",
  passos: [
    {
      numero: "01",
      titulo: "Diagnóstico",
      texto:
        "Uma conversa para entender o que seus clientes mais perguntam e onde você perde contato hoje.",
    },
    {
      numero: "02",
      titulo: "Configuração",
      texto:
        "Montagem do fluxo com as suas informações reais: horários, valores, convênios, cardápio.",
    },
    {
      numero: "03",
      titulo: "Entrega",
      texto:
        "Testamos junto com você, ligamos no seu número e acompanhamos a primeira semana.",
    },
  ],
} as const

export const PACOTES_NICHO_TEXTO = {
  label: "Preço por nicho",
  titulo: "Valor fechado por tipo de negócio",
  mensalidade: "R$150 a R$200 por mês de manutenção",
  observacao:
    "O valor de setup é único. A manutenção cobre suporte, ajustes no fluxo e os custos de operação.",
} as const

export const AUTO_CTA = {
  titulo: "Sua próxima mensagem perdida custa mais que a automação",
  botao: "Falar no WhatsApp",
} as const
