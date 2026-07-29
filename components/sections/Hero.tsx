"use client"

import { useEffect, useRef, useState } from "react"
import { IconBrandWhatsapp, IconArrowDown } from "@tabler/icons-react"
import { HERO, linkWhatsApp } from "@/lib/constants"
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap"

export function Hero() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  // O SplitText reescreve o DOM da headline. Só rodamos depois de montado no
  // cliente, nunca durante a hidratação.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return

    const headline = headlineRef.current
    const eyebrow = eyebrowRef.current
    const subhead = subheadRef.current
    const ctas = ctasRef.current
    if (!headline || !eyebrow || !subhead || !ctas) return

    // words,chars: cada palavra vira um bloco que não quebra no meio; anima-se
    // os caracteres dentro dela.
    const split = new SplitText(headline, { type: "words,chars" })

    // gsap.context recolhe todos os tweens e ScrollTriggers criados aqui dentro;
    // ctx.revert() no cleanup limpa tudo de uma vez.
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.025,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      })

      gsap.from(eyebrow, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.from(subhead, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.6,
      })

      gsap.from(ctas, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.9,
      })

      // Headline sobe e some conforme o scroll. scrub: 2 (nunca true) para o
      // movimento acompanhar o scroll com leve atraso cinematográfico.
      ScrollTrigger.create({
        trigger: headline,
        start: "top top",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          gsap.set(headline, {
            opacity: 1 - self.progress * 1.5,
            y: self.progress * -40,
          })
        },
      })
    })

    return () => {
      ctx.revert()
      split.revert()
    }
  }, [mounted])

  return (
    <section
      id="hero"
      className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-24 pb-16 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]"
    >
      <p
        ref={eyebrowRef}
        className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-500"
      >
        {HERO.eyebrow}
      </p>

      <h1
        ref={headlineRef}
        className="mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-100 md:text-5xl xl:text-7xl"
      >
        {HERO.headline}
      </h1>

      <p
        ref={subheadRef}
        className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
      >
        {HERO.subheadline}
      </p>

      <div ref={ctasRef} className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <a
          href={linkWhatsApp(HERO.ctaPrimario.texto)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 md:w-auto"
        >
          <IconBrandWhatsapp size={16} />
          {HERO.ctaPrimario.label}
        </a>
        <a
          href={HERO.ctaSecundario.href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 md:w-auto"
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
