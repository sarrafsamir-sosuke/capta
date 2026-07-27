# Esqueleto — Site Capta

> Documento de referência para o Claude Code durante o desenvolvimento.
> Toda decisão de estrutura, stack e arquitetura está aqui.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Next.js | 15 (App Router) | Framework principal |
| Tailwind CSS | 3.x | Estilização |
| Framer Motion | latest | Animações de UI (fade, slide, hover) |
| GSAP + ScrollTrigger + SplitText | 3.x | Scroll scrub e animação de texto no hero |
| Lenis | latest | Smooth scroll global |
| Tabler Icons | latest | Ícones (outline apenas, nunca -filled) |
| Vercel | — | Deploy e hospedagem |

---

## Regras da stack (ler antes de qualquer animação)

### GSAP vs Framer Motion — separação obrigatória
- **GSAP**: apenas no hero. ScrollTrigger scrub na headline, SplitText nas letras.
- **Framer Motion**: todo o resto — fade de seções, slide de cards, hover states.
- **Nunca** anime o mesmo elemento com os dois ao mesmo tempo. Isso causa conflito de transform.

### Lenis + ScrollTrigger
- Inicializar Lenis no `layout.tsx` raiz com `useEffect`.
- Usar `ScrollTrigger.scrollerProxy` para sincronizar com o Lenis.
- Não instanciar Lenis duas vezes.

### GSAP no SSR
- Todo código GSAP dentro de `useEffect`.
- Nunca chamar `gsap.to` ou `ScrollTrigger.create` fora de um efeito de cliente.
- Componentes que usam GSAP precisam de `"use client"` no topo.

### Tailwind — bug crítico
```ts
// ERRADO — causa falha de CSS durante HMR
plugins: [require("tailwindcss-animate")]

// CERTO
import tailwindcssAnimate from "tailwindcss-animate"
plugins: [tailwindcssAnimate]
```

### Server vs Client Components
- Seções estáticas (texto, ícones, copy) → Server Components por padrão.
- Qualquer interatividade (pills de nicho, componente de automações, animações) → `"use client"`.
- Não adicionar `"use client"` em componentes que não precisam — aumenta o bundle.

---

## Estrutura de arquivos

```
/app
  layout.tsx           ← Lenis + metadata global
  page.tsx             ← Site principal
  /automacoes
    page.tsx           ← Página de automações

/components
  /ui
    Button.tsx
    Badge.tsx
    SectionLabel.tsx
  /sections
    /home
      Hero.tsx         ← GSAP + SplitText + ScrollTrigger
      Resolve.tsx
      Projetos.tsx
      Automacoes.tsx   ← componente interativo com pills
      Nichos.tsx
      Pacotes.tsx
      CTAFinal.tsx
    /automacoes
      AutoHero.tsx
      NichoBloco.tsx
      ComoEntregamos.tsx
      PacotesNicho.tsx
      AutoCTA.tsx
  /shared
    Nav.tsx
    Footer.tsx
    LenisProvider.tsx

/lib
  constants.ts         ← textos, nichos, pacotes (nunca hardcode no JSX)
  utils.ts

/public
  /images
    /projetos          ← screenshots dos projetos (entram depois)
```

---

## Site principal — seções

### Nav
- Logo à esquerda, links à direita: Projetos · Automações · Pacotes · Falar agora
- Sticky, `backdrop-blur-sm` com `bg-background/80`
- Sem AutoFlow como item de nav
- Modo escuro nativo via `next-themes`

---

### Seção 01 — Hero
**Objetivo:** Fazer o visitante entender em 3 segundos o que a Capta faz e para quem.

**Conteúdo:**
- Label de seção (ex: "Presença digital para negócios reais")
- Headline principal (animada com GSAP SplitText, scrub no scroll)
- Subhead (1–2 linhas, copy focada no nicho)
- CTA primário: "Falar no WhatsApp" → link wa.me
- CTA secundário: "Ver projetos" → scroll para seção Projetos
- Scroll indicator animado na base

**O que remover do atual:**
- Card de stats acima da headline (5min / 72h / 24/7 / R$0)
- Iluminação / glow de fundo
- Emojis

**Animação:**
- GSAP SplitText na headline (char por char no carregamento)
- ScrollTrigger scrub leve conforme scroll (headline sobe, opacidade cai)
- Framer Motion `fadeInUp` no subhead e CTAs com delay escalonado

---

### Seção 02 — O que a Capta resolve
**Objetivo:** Identificar a dor sem ser genérico.

**Conteúdo:**
- Label de seção
- Título da seção
- 3 colunas com ícone Tabler + título curto + 1–2 linhas de copy

**Copy das colunas:**
1. Presença que converte — site profissional pensado para trazer cliente, não só existir.
2. Atendimento que não para — automação que responde e agenda enquanto você trabalha.
3. Resultado que você mede — entrega com prazo, escopo claro e resultado visível.

**Animação:** Framer Motion `fadeInUp` escalonado por coluna no scroll.

---

### Seção 03 — Projetos
**Objetivo:** Prova visual de entrega. Temporariamente com placeholders.

**Conteúdo:**
- Label + título
- Grid de cards (3–4 cards): screenshot + nome do cliente + nicho + link externo
- Por enquanto: cards com estado vazio elegante ("em breve")
- Ao adicionar projetos: substituir com `next/image` + link para o site ao vivo

**Animação:** Framer Motion stagger nos cards ao entrar na viewport.

---

### Seção 04 — Automações (componente interativo)
**Objetivo:** Tornar automação visível e específica por nicho.

**Conteúdo:**
- Label + título + subhead
- 4 pills de nicho: Academia · Consultório · Restaurante · Escritório
- Ao selecionar um nicho: flow diagram atualiza + phone mockup mostra conversa
- Componente já construído — adaptar para esta seção

**Estado inicial:** Academia selecionado por padrão.

---

### Seção 05 — Onde a Capta é focada
**Objetivo:** Mostrar especialização, não generalismo.

**Conteúdo:**
- Label + título + 1 linha explicando por que foco é melhor
- 4 cards de nicho: ícone + nome + problema principal que resolve
- Academias · Consultórios · Restaurantes · Escritórios

**Animação:** Framer Motion stagger.

---

### Seção 06 — Pacotes
**Objetivo:** Facilitar a decisão de compra sem complexidade.

**Conteúdo:**
- Label + título curto
- 2 cards lado a lado:
  - Site profissional — R$700–1.200 — o que inclui — CTA
  - Site + automação — R$1.500–2.200 — o que inclui — CTA destacado
- Sem tabela de comparação de features
- CTA: link direto para WhatsApp com texto pré-preenchido

**O que remover do atual:**
- 3 planos Starter/Pro/Premium com preços de SaaS
- Plano Premium R$3.500 (fora da realidade para o momento)

---

### Seção 07 — CTA Final
**Objetivo:** Conversão direta. Uma linha, um botão.

**Conteúdo:**
- Headline curta
- Botão "Falar no WhatsApp" → wa.me
- Sem FAQ, sem lista de benefícios repetidos, sem trust badges genéricos

---

### Footer
- Logo + © Capta 2025 + link WhatsApp
- 1 linha, mínimo absoluto

---

## Página de automações (/automacoes)

### AutoHero
- Headline persuasiva focada na dor
- Componente animado com 4 pills de nicho (mesmo componente do site principal, versão maior)
- Subhead + CTA

### Bloco por nicho (4 blocos)
Cada bloco tem: ícone + nome do nicho + problema específico + o que a automação resolve + exemplo de conversa ou resultado

### Como entregamos
- 3 passos simples: diagnóstico → configuração → entrega
- Sem jargão técnico

### Pacotes por nicho
- Card específico por nicho com escopo e preço fixo
- Academia R$950 · Consultório R$1.000 · Restaurante R$850 · Escritório R$1.000
- Setup + R$150–200/mês de manutenção (mostrar de forma clara)

### CTA Final automações
- WhatsApp direto com mensagem pré-preenchida por nicho

---

## Paleta de cores (manter do site atual)

Confirmar com Samir antes de definir no `tailwind.config.ts`.
Adicionar variáveis CSS para modo escuro no `globals.css`.

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --muted: ...;
  --border: ...;
}

.dark {
  --background: ...;
  --foreground: ...;
}
```

---

## Checklist antes de fazer deploy

- [ ] Modo escuro funcionando em todas as seções
- [ ] Responsivo: mobile (375px), tablet (768px), desktop (1280px), TV (1920px+)
- [ ] Emojis removidos — apenas ícones Tabler outline
- [ ] GSAP só no hero, Framer Motion no resto
- [ ] Lenis inicializado uma vez no layout
- [ ] Nenhum `require()` no tailwind.config.ts
- [ ] Imagens com `next/image` e `alt` preenchido
- [ ] Links do WhatsApp com `wa.me` correto
- [ ] `og:image` e metadata definidos no layout
- [ ] Deploy no Vercel com domínio configurado
