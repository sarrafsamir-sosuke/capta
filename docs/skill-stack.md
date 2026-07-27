# Skill — Stack e boas práticas de código

> Referência obrigatória antes de criar qualquer componente.
> Seguir estas regras evita conflitos, bugs de SSR e problemas de performance.

---

## Regra 1 — GSAP e Framer Motion não animam o mesmo elemento

**GSAP + ScrollTrigger + SplitText:** apenas no hero.
**Framer Motion:** todo o resto do site.

Se um elemento tem `motion.div`, não use `gsap.to` nele.
Se um elemento tem `gsap.to`, não envolva com `motion.div`.

```tsx
// CERTO — hero usa GSAP
const Hero = () => {
  useEffect(() => {
    gsap.from(".headline", { opacity: 0, y: 40, duration: 1 })
  }, [])
  return <h1 className="headline">...</h1>
}

// CERTO — seção usa Framer
const Resolve = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
    ...
  </motion.div>
)
```

---

## Regra 2 — GSAP nunca roda no servidor

Todo código GSAP dentro de `useEffect`. Componentes com GSAP precisam de `"use client"`.

```tsx
"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

export function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const split = new SplitText(ref.current, { type: "chars" })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.6,
      ease: "power2.out",
    })
    return () => split.revert() // limpa no unmount
  }, [])

  return <h1 ref={ref}>...</h1>
}
```

---

## Regra 3 — Lenis inicializa uma vez, no layout raiz

```tsx
// components/shared/LenisProvider.tsx
"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

```tsx
// app/layout.tsx
import { LenisProvider } from "@/components/shared/LenisProvider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

---

## Regra 4 — Tailwind: nunca use require() para plugins

```ts
// tailwind.config.ts — ERRADO (quebra HMR)
plugins: [require("tailwindcss-animate")]

// tailwind.config.ts — CERTO
import tailwindcssAnimate from "tailwindcss-animate"
plugins: [tailwindcssAnimate]
```

---

## Regra 5 — Server vs Client Components

Só adicionar `"use client"` quando necessário:

| Componente | Server ou Client? |
|---|---|
| Seções com texto e ícones estáticos | Server (padrão) |
| Nav com estado de scroll ou menu mobile | Client |
| Hero com GSAP | Client |
| Componente de automações (pills, estado) | Client |
| Cards de projetos (estático) | Server |
| Pacotes (estático) | Server |
| CTA com link WhatsApp (estático) | Server |
| LenisProvider | Client |
| ThemeProvider (modo escuro) | Client |

---

## Regra 6 — Framer Motion em Server Components

Usar `motion` do lado do cliente. Se precisar animar um Server Component, crie um wrapper client ao redor.

```tsx
// ERRADO — motion em server component
export default function Card() {
  return <motion.div>...</motion.div> // quebra
}

// CERTO — wrapper client
"use client"
import { motion } from "framer-motion"
export function AnimatedCard({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  )
}
```

---

## Regra 7 — GSAP scrub: usar 2 ou 3, nunca true

```tsx
// Movimento abrupto — evitar
scrollTrigger: { scrub: true }

// Movimento cinematográfico com lag — usar
scrollTrigger: { scrub: 2 } // ou scrub: 3
```

---

## Regra 8 — Imagens sempre com next/image

```tsx
import Image from "next/image"

<Image
  src="/images/projetos/academia.png"
  alt="Site da academia X — desenvolvido pela Capta"
  width={800}
  height={500}
  className="rounded-xl object-cover"
/>
```

Nunca `<img>` diretamente — perde otimização automática de WebP e lazy loading.

---

## Regra 9 — Textos e dados em constants, nunca hardcode no JSX

```ts
// lib/constants.ts
export const NICHOS = [
  {
    id: "academia",
    label: "Academia",
    icon: "ti-barbell",
    problema: "Lead some após mandar mensagem fora do horário.",
    automacoes: ["Atendimento 24h", "Marcação de aula experimental", "FAQ", "Cobrança de mensalidade"],
    preco: 950,
  },
  // ...
]

export const WHATSAPP = "5591993779948"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`
```

Assim qualquer atualização de preço, texto ou número é feita em um lugar só.

---

## Regra 10 — Modo escuro com next-themes

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {children}
</ThemeProvider>
```

No Tailwind:
```ts
// tailwind.config.ts
darkMode: "class"
```

Classes CSS:
```tsx
<div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
```

---

## Segurança básica

- Links externos sempre com `rel="noopener noreferrer"` e `target="_blank"`
- Variáveis de ambiente sensíveis em `.env.local` — nunca commitar
- Prefixar variáveis de ambiente com `NEXT_PUBLIC_` apenas se precisarem ser expostas no cliente
- Não expor chaves de API no código do cliente
- `next.config.js` com headers de segurança básicos:

```js
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}
```

---

## Checklist por componente

Antes de dar commit em qualquer componente novo:

- [ ] Server Component quando possível, Client só quando necessário
- [ ] `"use client"` presente quando usa hooks, GSAP ou Framer
- [ ] Texto não hardcoded — vem de `constants.ts`
- [ ] Imagens com `next/image`
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] Animações GSAP dentro de `useEffect` com cleanup no return
- [ ] `scrub: 2` ou `scrub: 3` — nunca `scrub: true`
- [ ] Responsivo: mobile → tablet → desktop testado
- [ ] Modo escuro funcionando
