# Prompts — Construção site Capta (Next.js)
> Stack: Next.js 15 · Tailwind · Framer Motion · GSAP · Lenis · Vercel
> Executar um por vez. Só avançar quando o anterior estiver na Vercel funcionando.

---

## PROMPT 1 — Projeto limpo + configuração

```
Limpe o repositório atual e configure o projeto Next.js do zero.

PASSO 1 — Apagar tudo exceto:
.git/
.gitignore
README.md

PASSO 2 — Inicializar Next.js:
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"

PASSO 3 — Instalar dependências:
npm install framer-motion gsap lenis @tabler/icons-react next-themes
npm install -D tailwindcss-animate

PASSO 4 — Corrigir tailwind.config.ts:
import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config

PASSO 5 — globals.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #09090b;
    --foreground: #f4f4f5;
  }
  html {
    background-color: #09090b;
    color: #f4f4f5;
  }
}

PASSO 6 — app/layout.tsx:
Adicionar fonte Sora via next/font/google
Adicionar ThemeProvider do next-themes com defaultTheme="dark"
Metadata básica da Capta

PASSO 7 — app/page.tsx:
Retornar só um <main> vazio por enquanto

PASSO 8 — Criar lib/constants.ts vazio

PASSO 9 — Deploy:
git add .
git commit -m "feat: setup inicial next.js"
git push origin main

Confirmar que a Vercel faz build sem erro.
Não criar nenhum componente ainda.
```

---

## PROMPT 2 — LenisProvider

```
Crie o LenisProvider e adicione no layout raiz.

CRIAR components/shared/LenisProvider.tsx:

"use client"
import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.destroy()
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

ATUALIZAR app/layout.tsx:
Envolver children com <LenisProvider>

Fazer push e confirmar na Vercel:
- Build sem erro
- Classe "lenis" aparece na tag <html> no browser
Não avançar se o scroll não estiver suave.
```

---

## PROMPT 3 — Nav + estrutura de seções

```
Crie o Nav e a estrutura vazia de todas as seções.
Sem animação ainda — só HTML e Tailwind.

CRIAR components/shared/Nav.tsx:
- Server Component
- Logo "CAPTA" à esquerda (font-semibold)
- Links: Projetos · Automações · Pacotes
- Botão "Falar agora" com ícone WhatsApp do Tabler
- sticky top-0 z-50 backdrop-blur-sm bg-zinc-950/80
- border-b border-zinc-800

CRIAR components/sections/:
- Hero.tsx     → "use client" (vai ter GSAP)
- Resolve.tsx  → Server Component
- Projetos.tsx → Server Component
- Automacoes.tsx → "use client" (vai ter estado)
- Resultados.tsx → Server Component
- Diagnostico.tsx → Server Component

Cada componente retorna por enquanto só:
<section id="[nome]" className="py-24">
  <p className="text-zinc-500">[nome da seção]</p>
</section>

ATUALIZAR app/page.tsx:
Importar e renderizar Nav + todas as seções em ordem

CRIAR app/automacoes/page.tsx vazio

Fazer push e confirmar na Vercel:
- Nav aparece com estilo correto
- Seções aparecem empilhadas
- Build sem erro
```

---

## PROMPT 4 — Hero estático

```
Construa o Hero sem animações ainda.
Toda a copy vem do copy-final.md.

ATUALIZAR components/sections/Hero.tsx:

"use client"
import Link from "next/link"
import { IconBrandWhatsapp, IconArrowDown } from "@tabler/icons-react"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center
                        px-6 pt-24 pb-16 max-w-6xl mx-auto">
      {/* Eyebrow */}
      <p className="text-xs font-medium uppercase tracking-widest
                    text-zinc-500 mb-6">
        Para pequenos negócios em São Luís que querem crescer de verdade
      </p>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight
                     text-zinc-100 leading-[1.1] mb-6 max-w-3xl">
        Mais clientes entrando.{" "}
        Nenhum ficando sem resposta.
      </h1>

      {/* Subheadline */}
      <p className="text-base md:text-lg text-zinc-400 leading-relaxed
                    max-w-xl mb-10">
        A Capta constrói a presença digital de micro e pequenas empresas
        em São Luís — site que aparece no Google e atendimento automático
        que funciona enquanto você trabalha.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://wa.me/5591993779948?text=Oi!%20Vim%20pelo%20site%20e%20quero%20entender%20o%20que%20a%20Capta%20pode%20fazer%20pelo%20meu%20neg%C3%B3cio."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg
                     bg-white px-5 py-2.5 text-sm font-medium
                     text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          <IconBrandWhatsapp size={16} />
          Quero entender o que preciso
        </a>
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 rounded-lg
                     border border-zinc-700 px-5 py-2.5 text-sm
                     text-zinc-300 hover:border-zinc-500
                     hover:text-zinc-100 transition-colors"
        >
          Ver como funciona
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="mt-20 flex justify-center">
        <IconArrowDown
          size={20}
          className="text-zinc-600 animate-bounce"
        />
      </div>
    </section>
  )
}

Fazer push e confirmar na Vercel:
- Hero aparece com layout e copy corretos
- Botões com estilo correto
- Build sem erro
```

---

## PROMPT 5 — Seções estáticas

```
Construa todas as seções estáticas sem animação.
Toda a copy vem do copy-final.md.

RESOLVER components/sections/Resolve.tsx:
- Eyebrow: "O QUE RESOLVEMOS"
- Título: "Três coisas que fazem um negócio crescer na internet"
- 3 colunas: ícone Tabler + título + texto
  Col 1: IconWorldWww · "Presença que converte" · copy do md
  Col 2: IconMessageCircle · "Atendimento que não para" · copy
  Col 3: IconCalendarCheck · "Entrega com data marcada" · copy
- grid grid-cols-1 md:grid-cols-3 gap-6

PROJETOS components/sections/Projetos.tsx:
- Eyebrow: "PROJETOS"
- Título e subtítulo do copy-final.md
- 3 cards (ícone + título + texto) do copy-final.md
- Grid 2x2 de placeholders:
  rounded-xl border border-zinc-800 bg-zinc-900
  aspect-video flex items-center justify-center
  badge "Em breve" no canto inferior direito
- Nota em zinc-500 abaixo

RESULTADOS components/sections/Resultados.tsx:
- Eyebrow: "RESULTADOS"
- Título e subtítulo do copy-final.md
- 3 marcos lado a lado:
  número do dia em text-5xl font-bold
  título em text-sm font-medium zinc-300
  texto em text-sm zinc-400
- Linha conectora entre marcos (div h-px bg-zinc-800)

DIAGNÓSTICO components/sections/Diagnostico.tsx:
- Seção centralizada
- Título e texto do copy-final.md
- Botão único grande: "Quero conversar sobre o meu negócio →"
  link wa.me com texto pré-preenchido

FOOTER components/shared/Footer.tsx:
- "CAPTA · São Luís, Maranhão · © 2026"
- Links WhatsApp e Instagram
- Uma linha, mínimo absoluto

ATUALIZAR app/page.tsx com todas as seções na ordem:
Nav → Hero → Resolve → Projetos → Automacoes (placeholder)
→ Resultados → Diagnostico → Footer

Fazer push e confirmar na Vercel:
- Todas as seções aparecem com copy e layout corretos
- Build sem erro
```

---

## PROMPT 6 — GSAP no Hero

```
Adicione as animações GSAP no Hero.
Leia o skill-stack.md antes de começar.

REGRAS OBRIGATÓRIAS:
- Todo código GSAP dentro de useEffect
- Cleanup no return do useEffect
- scrub: 2 (nunca scrub: true)
- Importar GSAP de lib/gsap.ts (criar abaixo)

CRIAR lib/gsap.ts:
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export { gsap, ScrollTrigger, SplitText }

ATUALIZAR components/sections/Hero.tsx:
Adicionar useRef para headline, subheadline, eyebrow, ctas
Adicionar useState mounted + useEffect setMounted(true)

useEffect(() => {
  if (!mounted) return
  if (!headlineRef.current) return

  const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap")

  const split = new SplitText(headlineRef.current, { type: "chars" })

  gsap.from(split.chars, {
    opacity: 0,
    y: 30,
    stagger: 0.025,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.2,
  })

  gsap.from(eyebrowRef.current, {
    opacity: 0,
    y: 10,
    duration: 0.5,
    ease: "power2.out",
  })

  gsap.from(subheadRef.current, {
    opacity: 0,
    y: 16,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.6,
  })

  gsap.from(ctasRef.current, {
    opacity: 0,
    y: 16,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.9,
  })

  ScrollTrigger.create({
    trigger: headlineRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 2,
    onUpdate: (self) => {
      gsap.set(headlineRef.current, {
        opacity: 1 - self.progress * 1.5,
        y: self.progress * -40,
      })
    },
  })

  return () => {
    split.revert()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}, [mounted])

Fazer push e confirmar na Vercel em aba anônima:
- Headline entra char por char no carregamento
- Headline some ao scrollar
- Subheadline e CTAs entram com fade
- Build sem erro
```

---

## PROMPT 7 — Framer Motion nas seções

```
Adicione animações de entrada nas seções com Framer Motion.
Leia o skill-stack.md antes de começar.

REGRA: Framer Motion apenas nas seções.
Nunca no mesmo elemento que tem GSAP.

CRIAR components/ui/RevealSection.tsx:
"use client"
import { motion } from "framer-motion"

export function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

CRIAR components/ui/StaggerGroup.tsx:
"use client"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function StaggerGroup({ children, className = "" }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}

ATUALIZAR as seções:
- Resolve: envolver as 3 colunas com StaggerGroup/StaggerItem
- Projetos: envolver cards com StaggerGroup/StaggerItem
- Resultados: envolver marcos com StaggerGroup/StaggerItem
- Diagnostico: envolver conteúdo com RevealSection

Fazer push e confirmar na Vercel:
- Seções entram com fade ao scrollar
- Cards entram em sequência com stagger
- Build sem erro
```

---

## PROMPT 8 — Componente de Automações

```
Construa o componente de automações com chat animado.
Leia o copy-final.md para os textos.

CRIAR components/sections/Automacoes.tsx:
"use client"
import { useState, useEffect, useRef } from "react"

const MENSAGENS = [
  { tipo: "cliente", texto: "Oi, quanto custa?" },
  { tipo: "bot", texto: "Boa noite! Fico feliz em ajudar. Me conta um pouco sobre o seu negócio?" },
  { tipo: "cliente", texto: "Tenho uma academia aqui em São Luís" },
  { tipo: "bot", texto: "Perfeito. Qual o melhor horário para a gente conversar?" },
  { tipo: "cliente", texto: "Amanhã de manhã" },
  { tipo: "bot", texto: "Marcado. Você recebe uma confirmação em instantes." },
]

Lógica do chat:
- useState para lista de bolhas visíveis
- useEffect que roda as mensagens em sequência
- Bot: mostra typing indicator por 900ms, depois bolha
- Cliente: bolha após 600ms
- Loop: reinicia após 3s da última mensagem
- Bolhas entram com opacity 0 → 1 + translateY 8px → 0

Layout da seção:
- Eyebrow: "AUTOMAÇÃO"
- Título e subtítulo do copy-final.md
- Dois lados em desktop:
  Esquerda: 3 blocos de resultado (ícone + título + texto)
  Direita: phone frame com chat
- Em mobile: empilhados

Phone frame:
- Borda zinc-800, rounded-2xl
- Header verde #128C7E com avatar + "Seu negócio" + "online"
- Corpo com scroll interno, altura fixa 280px
- Bolha cliente: bg-zinc-700, alinhada à esquerda
- Bolha bot: bg-[#25D366] text-white, alinhada à direita
- Typing indicator: 3 dots pulsando (CSS animation)

Typing indicator CSS (adicionar no globals.css):
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

Fazer push e confirmar na Vercel:
- Chat aparece na seção
- Mensagens aparecem uma por uma com typing indicator
- Loop reinicia após última mensagem
- Build sem erro
```

---

## PROMPT 9 — Página /automacoes

```
Crie a página separada de automações em app/automacoes/page.tsx.

Mesma estrutura do site principal mas focada em conversão
para automação.

SEÇÕES da página:

1. Nav (mesmo componente)

2. Hero da página
- Eyebrow: "AUTOMAÇÃO DE WHATSAPP"
- Headline: "Seu atendimento funcionando às 23h,
  no feriado, no fim de semana."
- Subheadline: "Montamos o fluxo de atendimento automático
  para o seu negócio — testado e no ar em até 7 dias."
- CTA: "Quero conversar →"
  wa.me com texto: "Oi! Vim pela página de automações."

3. Como funciona (4 passos)
- Passo 1: Diagnóstico — entendemos como seu cliente chega
- Passo 2: Configuração — montamos com a sua linguagem
- Passo 3: Testes — testamos antes de ligar
- Passo 4: No ar — ativo em até 7 dias

4. Chat demo (mesmo componente Automacoes mas sem os blocos
   de resultado — só o chat centralizado)

5. O que está incluso (3 cards):
- Respostas 24h para perguntas frequentes
- Agendamento e confirmação automática
- Aviso no celular a cada contato qualificado

6. CTA final:
"Automação 100% funcional com testes realizados."
Botão: "Quero montar meu atendimento →"

7. Footer (mesmo componente)

Fazer push e confirmar na Vercel:
- Página /automacoes abre corretamente
- Nav link "Automações" leva para esta página
- Build sem erro
```

---

## PROMPT 10 — Responsivo e checklist final

```
Revise o site inteiro para responsividade e qualidade final.

MOBILE (< 768px):
- Hero: headline text-4xl, padding lateral px-5
- CTAs: flex-col, width 100%
- Cards: grid-cols-1
- Automação: coluna única (chat abaixo dos resultados)
- Marcos: grid-cols-1 sem linha conectora
- Nav: ocultar links internos, manter só logo e CTA

TABLET (768px):
- Hero: headline text-5xl
- Cards: grid-cols-2
- Automação: grid-cols-2

DESKTOP (1280px):
- Hero: headline text-7xl
- Cards: grid-cols-3
- Automação: lado a lado
- Max-width: 1200px mx-auto

TV (1920px+):
- Max-width: 1400px mx-auto

CHECKLIST antes do commit final:
- [ ] Build sem erro (npm run build local)
- [ ] Nenhum emoji — só Tabler Icons outline
- [ ] Lenis suave em todos os tamanhos de tela
- [ ] SplitText funcionando no hero em produção
- [ ] Scroll scrub funcionando no hero em produção
- [ ] Chat em loop na seção de automação
- [ ] Framer Motion nas seções (fade + stagger)
- [ ] Links de nav scrollam para a seção correta
- [ ] CTAs abrem WhatsApp com texto correto
- [ ] Página /automacoes funcionando
- [ ] Responsivo em 375px · 768px · 1280px · 1920px
- [ ] Dark mode funcionando (zinc-950 de fundo)
- [ ] Build na Vercel sem erro

git add .
git commit -m "feat: site capta completo"
git push origin main

Abrir na Vercel em aba anônima e confirmar cada item.
```
