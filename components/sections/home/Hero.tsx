"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { IconBrandWhatsapp, IconArrowDown } from "@tabler/icons-react"
import { HERO, WHATSAPP_MENSAGENS, whatsappUrl } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Entrada padrão dos elementos que NÃO são tocados pelo GSAP. */
const entrada = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const conteudoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const headline = headlineRef.current
    if (!headline) return

    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reduzirMovimento) return

    let split: SplitText | null = null
    let ctx: gsap.Context | null = null
    let cancelado = false

    // Só divide depois que a Sora carregar. Dividir antes do swap da fonte
    // calcula as posições com a fonte de fallback e o texto salta.
    document.fonts.ready.then(() => {
      if (cancelado) return

      ctx = gsap.context(() => {
        // "words,chars" e não só "chars": sem os words, o navegador pode
        // quebrar a linha no meio de uma palavra.
        split = new SplitText(headline, {
          type: "words,chars",
          aria: "auto",
        })

        gsap.from(split.chars, {
          opacity: 0,
          y: 30,
          stagger: 0.025,
          duration: 0.7,
          ease: "power3.out",
        })

        // Scrub no CONTÊINER, nunca nos mesmos elementos que o Framer anima.
        gsap.to(conteudoRef.current, {
          y: -80,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        })
      }, heroRef)
    })

    return () => {
      cancelado = true
      ctx?.revert()
      split?.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative flex min-h-[100svh] items-center px-5 pb-28 pt-32 sm:px-8 md:pb-32 md:pt-40"
    >
      <div className="mx-auto w-full max-w-content">
        <div ref={conteudoRef} className="max-w-3xl">
          <motion.p
            {...entrada(0)}
            className="text-xs font-medium uppercase tracking-widest text-zinc-500"
          >
            {HERO.label}
          </motion.p>

          <h1
            ref={headlineRef}
            className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tighter text-zinc-100 sm:text-6xl md:text-7xl"
          >
            {HERO.headline.map((linha) => (
              <span key={linha} className="block">
                {linha}
              </span>
            ))}
          </h1>

          <motion.p
            {...entrada(0.5)}
            className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400"
          >
            {HERO.subhead}
          </motion.p>

          <motion.div
            {...entrada(0.62)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={whatsappUrl(WHATSAPP_MENSAGENS.diagnostico)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-capta-500 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-capta-400"
            >
              <IconBrandWhatsapp size={16} stroke={1.75} />
              {HERO.ctaPrimario}
            </a>

            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-3 text-sm text-zinc-300 transition-colors duration-150 hover:border-zinc-600 hover:text-zinc-100"
            >
              {HERO.ctaSecundario}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...entrada(0.9)}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center md:flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-zinc-600"
        >
          <IconArrowDown size={18} stroke={1.75} />
        </motion.span>
      </motion.div>
    </section>
  )
}
