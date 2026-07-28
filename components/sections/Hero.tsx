"use client"

import { IconBrandWhatsapp, IconArrowDown } from "@tabler/icons-react"
import { HERO, linkWhatsApp } from "@/lib/constants"

// Estático no Prompt 4. Já é "use client" porque o Prompt 6 adiciona GSAP aqui.
export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24 pb-16"
    >
      <p className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-500">
        {HERO.eyebrow}
      </p>

      <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-zinc-100 md:text-7xl">
        {HERO.headline}
      </h1>

      <p className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
        {HERO.subheadline}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={linkWhatsApp(HERO.ctaPrimario.texto)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          <IconBrandWhatsapp size={16} />
          {HERO.ctaPrimario.label}
        </a>
        <a
          href={HERO.ctaSecundario.href}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
        >
          {HERO.ctaSecundario.label}
        </a>
      </div>

      <div className="mt-20 flex justify-center">
        <IconArrowDown size={20} className="animate-bounce text-zinc-600" />
      </div>
    </section>
  )
}
