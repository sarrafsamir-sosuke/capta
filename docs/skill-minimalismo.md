# Skill — Minimalismo funcional

> Baseada nos princípios visuais de Rauno Freiberg (designer da Vercel, v0, Radix UI).
> Referência: github.com/raunofreiberg — ui.land — rauno.me
>
> Minimalismo aqui não é ausência de elemento.
> É presença justificada. Cada coisa que entra precisa ganhar o direito de estar lá.

---

## A regra principal

Antes de adicionar qualquer elemento visual — cor, borda, sombra, ícone, divisor, animação — pergunte:

**"O que o usuário perde se isso não estiver aqui?"**

Se a resposta for "nada", tire.

---

## Tipografia

### Hierarquia por peso e tamanho, nunca por cor
Usar variações de `font-size` e `font-weight` para criar hierarquia.
Texto secundário usa `text-zinc-400` no dark mode — não uma cor diferente, só menos intensidade.

```tsx
// Headline de seção
className="text-4xl font-semibold tracking-tight text-zinc-100"

// Subhead
className="text-base text-zinc-400 leading-relaxed max-w-lg"

// Label de seção (eyebrow)
className="text-xs font-medium uppercase tracking-widest text-zinc-500"

// Body
className="text-sm text-zinc-300 leading-relaxed"
```

### Tracking apertado em display, normal em body
```tsx
// Display / headline grande
className="tracking-tight" // ou tracking-tighter em tamanhos acima de 48px

// Body e subhead
className="tracking-normal"

// Labels e eyebrows
className="tracking-widest"
```

### Nunca use mais de 3 tamanhos de fonte em uma seção
Se uma seção tem label + título + subhead + body, o label e o body podem compartilhar o mesmo tamanho — diferenciados por cor e peso.

---

## Espaçamento

### Espaço é o elemento mais barato e mais poderoso
Quando algo parece errado mas você não sabe o que é, a resposta é quase sempre: mais espaço.

```tsx
// Entre seções — mínimo
className="py-24"

// Entre seções — hero e seções de destaque
className="py-32 md:py-40"

// Padding interno de card
className="p-5 md:p-6"

// Gap entre items de grid
className="gap-4 md:gap-6"
```

### Largura máxima de conteúdo
Texto longo nunca ocupa a largura total. Limitar a leitura melhora a leitura.

```tsx
// Headline
className="max-w-2xl"

// Subhead e body
className="max-w-lg"

// Grid de cards
className="max-w-5xl mx-auto"
```

---

## Cor

### Dark mode: 3 tons de superfície, não mais
```
Background principal:  zinc-950  (#09090b)
Superfície de card:    zinc-900  (#18181b)
Superfície elevada:    zinc-800  (#27272a)
```

### Texto: 3 níveis de intensidade
```
Primário (headline):   zinc-100  (#f4f4f5)
Secundário (subhead):  zinc-400  (#a1a1aa)
Terciário (labels):    zinc-500  (#71717a)
```

### Cor de destaque: uma só, usada com contenção
Não use a cor de destaque como background de seção inteira.
Use em: borda de card ativo, dot de status, underline de link, ícone de feature selecionada.

```tsx
// Cor de destaque — borda de card selecionado
className="border-zinc-100"

// Cor de destaque — dot de status ou label ativo
className="bg-white text-zinc-900"

// Nunca
className="bg-blue-600 text-white" // em seção inteira
```

### Bordas: quase invisíveis
```tsx
// Borda padrão de card
className="border border-zinc-800"

// Borda de card em hover ou ativo
className="border-zinc-700"

// Divisor entre seções — preferir espaço ao invés de linha
// Se precisar de linha: border-t border-zinc-800/50
```

---

## Cards

### Card não precisa de sombra
No dark mode, sombra não funciona. Usar borda sutil + background levemente diferente do fundo.

```tsx
// Card padrão
className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"

// Card com hover
className="rounded-xl border border-zinc-800 bg-zinc-900 p-5
           hover:border-zinc-700 hover:bg-zinc-800/50 transition-colors duration-200"

// Card ativo (pill selecionado, tab ativa)
className="rounded-xl border border-zinc-100 bg-zinc-900 p-5"
```

### Nunca coloque dois elementos de destaque dentro de um card
O card é o destaque. Dentro dele: uma coisa principal, o resto é suporte.

---

## Ícones

Tabler Icons, outline, tamanho fixo por contexto:

```tsx
// Ícone em feature/card — tamanho padrão
<Icon size={18} className="text-zinc-400" />

// Ícone em CTA ou botão — inline com texto
<Icon size={16} className="text-zinc-900" />

// Ícone decorativo de seção — maior
<Icon size={24} className="text-zinc-600" />
```

Nunca colorir ícone com cor de destaque para "chamar atenção".
Ícone chama atenção pela posição e contexto, não pela cor.

---

## Botões

### Hierarquia de CTA: primário → secundário → ghost
Nunca dois botões primários lado a lado.

```tsx
// Primário — ação principal da seção
className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2
           text-sm font-medium text-zinc-900
           hover:bg-white transition-colors duration-150"

// Secundário — ação alternativa
className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2
           text-sm text-zinc-300
           hover:border-zinc-600 hover:text-zinc-100 transition-colors duration-150"

// Ghost — ação terciária ou de navegação
className="inline-flex items-center gap-1.5 text-sm text-zinc-400
           hover:text-zinc-200 transition-colors duration-150"
```

---

## Animação

### Menos é mais — mas o que existir precisa ser preciso
Animação ruim chama mais atenção que ausência de animação.

```tsx
// Entrada padrão — suave, sem exagero
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}

// Entrada no scroll — viewport
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 12 }}
transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
viewport={{ once: true, margin: "-60px" }}

// Stagger em listas — delay pequeno
transition={{ delay: index * 0.07, duration: 0.4 }}

// Hover em card — escala mínima
whileHover={{ scale: 1.015 }}
transition={{ duration: 0.15 }}
```

### O que nunca animar
- Background de seção
- Cor de texto
- Border-radius
- Elementos que o usuário não interagiu

### Duração máxima fora do hero
`duration: 0.5` — acima disso parece lento no contexto de UI.

---

## Divisores e separação visual

### Preferir espaço ao invés de linha
Um `py-24` entre seções separa melhor do que um `border-t`.

### Se precisar de divisor
```tsx
className="border-t border-zinc-800/60"
```
Nunca `border-zinc-600` ou mais escuro — chama atenção demais.

### Nunca usar `<hr>` — sempre `<div className="border-t ...">`
Mais controle, sem reset de CSS.

---

## Grid e layout

### Preferir menos colunas com mais espaço
```tsx
// Bom — 3 colunas com respiro
className="grid grid-cols-1 md:grid-cols-3 gap-6"

// Evitar — 4 colunas em desktop fica apertado para o conteúdo da Capta
className="grid grid-cols-4 gap-4"
```

### Alinhar texto à esquerda por padrão
Centralizar só em: headlines de hero, seções de CTA final, labels de seção curtos.
Corpo de texto e cards: sempre alinhados à esquerda.

---

## Checklist de minimalismo por seção

Antes de finalizar qualquer seção, percorrer:

- [ ] Tem algum elemento que não responde à pergunta "o usuário perde o quê sem isso?"
- [ ] Tem mais de uma cor de destaque em uso simultâneo?
- [ ] Algum texto está centralizado sem ser headline ou CTA?
- [ ] Algum card tem sombra pesada ou gradiente decorativo?
- [ ] Tem mais de 3 tamanhos de fonte na seção?
- [ ] Alguma animação dura mais de 0.5s fora do hero?
- [ ] Tem divisor onde poderia ser só espaço?
- [ ] O CTA primário compete com algum outro elemento de destaque na mesma seção?

Se algum item está marcado — remova, simplifique ou substitua antes de seguir.
