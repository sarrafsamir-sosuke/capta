# Skill — Design para o site da Capta

> Princípios visuais, decisões de estética e referência às skills externas.
> Ler antes de qualquer decisão visual.

---

## Skills externas a instalar no projeto

Você já usou estas duas no passado (Sarraf's Outlet e outros projetos) e devem ser instaladas no projeto Capta via Claude Code.

### Impeccable (she-llac)
Skill focada em qualidade visual e polish de interfaces.
```bash
npx skills add she-llac/claude-courses --skill impeccable
```

### Emil Kowalski
Skill com boas práticas de animação, micro-interações e design de componentes.
```bash
npx skills add emilkowalski/claude-skills --skill design
```

> Confirme os nomes exatos dos repositórios antes de instalar — os repos podem ter mudado de nome. Acesse github.com/she-llac e github.com/emilkowalski para verificar.

---

## Estética da Capta

### Paleta
Manter a paleta atual do site. Ao definir no código:
- Criar variáveis CSS em `globals.css` para light e dark
- Nunca hardcode de hex no JSX — sempre via variável ou classe Tailwind

### Tipografia
- Display / headline: peso pesado, tamanho grande, espaçamento de linha apertado
- Body: peso regular, leitura confortável
- Labels de seção: maiúscula, letter-spacing, tamanho menor — funciona como "eyebrow"
- Nunca mais de 3 tamanhos de fonte em uso simultâneo em uma seção

### Ícones
Apenas Tabler Icons, versão outline.
```tsx
import { IconBarbell, IconStethoscope, IconChefHat, IconBriefcase } from "@tabler/icons-react"
```
Nunca emojis. Nunca ícones filled.

### Bordas e raios
- Cards: `rounded-xl` (12px)
- Botões: `rounded-lg` (8px)
- Pills de nicho: `rounded-full`
- Sem sombras decorativas pesadas — apenas `ring-1` para separação sutil

---

## Princípios visuais

### 1. Um elemento de destaque por seção
Cada seção tem uma coisa que chama atenção: o componente animado, os cards de projeto, o preço em destaque. O resto é suporte. Nunca duas âncoras visuais competindo.

### 2. Espaço é design
Padding generoso entre seções. As seções precisam respirar.
`py-24` no mínimo entre seções. `py-32` no hero.

### 3. Hierarquia por peso, não por cor
Variar o `font-weight` e `font-size` para criar hierarquia.
Não usar cores diferentes para cada nível de texto — fica poluído.

### 4. Modo escuro é o padrão
O site abre em dark mode por padrão (`defaultTheme="dark"`).
Light mode disponível via toggle se quiser, mas dark é o estado principal.

### 5. Animação com propósito
Animar só o que comunica algo: entrada na viewport, mudança de estado, feedback de clique.
Nunca animar só para impressionar — fica pesado e genérico.

**Parâmetros de animação Framer Motion para o site:**
```tsx
// Entrada padrão de seção
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
viewport={{ once: true, margin: "-80px" }}

// Stagger para listas de cards
transition={{ stagger: 0.1 }}

// Hover em cards
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.2 }}
```

**Parâmetros GSAP para o hero:**
```tsx
// SplitText — entrada de headline
gsap.from(split.chars, {
  opacity: 0,
  y: 30,
  stagger: 0.025,
  duration: 0.7,
  ease: "power3.out",
})

// ScrollTrigger scrub
scrollTrigger: {
  trigger: heroRef.current,
  start: "top top",
  end: "bottom top",
  scrub: 2,
}
```

---

## Componentes com decisão visual já tomada

### Pills de nicho
```tsx
// Estado inativo
className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400
           hover:border-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"

// Estado ativo
className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-zinc-900"
```

### Label de seção (eyebrow)
```tsx
className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-3"
```

### CTA primário
```tsx
className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5
           text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
```

### CTA secundário
```tsx
className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5
           text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
```

---

## O que evitar

- Gradientes de fundo excessivos (iluminação, glow) — o atual tem, o novo não terá
- Cards com sombra pesada — usar ring sutil
- Textos centralizados em blocos longos — centralize só em headlines curtas
- Mais de 2 cores de destaque em uma seção
- Background colorido em seções intermediárias — muda o ritmo errado
- Animações com `duration > 0.7s` fora do hero — parece lento
- `font-weight: 900` em corpo de texto — reservar para display
