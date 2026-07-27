"use client"

import { useEffect } from "react"
import { MotionConfig } from "framer-motion"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Quem pediu menos animação no sistema não recebe scroll suave.
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reduzirMovimento) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Faz os links "#secao" do Nav rolarem suave. O offset desconta
      // a altura do header fixo para o título não ficar escondido.
      anchors: { offset: -72 },
    })

    lenis.on("scroll", ScrollTrigger.update)

    // Um ticker só para GSAP e Lenis. Usar um requestAnimationFrame
    // separado criaria um segundo loop impossível de cancelar no cleanup.
    const rodar = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(rodar)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rodar)
      lenis.destroy()
    }
  }, [])

  // O media query do globals.css só alcança CSS. O MotionConfig é o que
  // faz o Framer Motion respeitar a mesma preferência.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
