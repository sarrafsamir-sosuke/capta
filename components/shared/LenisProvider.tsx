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
      // Sem isso um href="#projetos" dá o pulo nativo instantâneo e o scroll
      // suave do resto do site não se aplica à navegação do nav.
      anchors: true,
    })

    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)

    // O Lenis roda dentro do ticker do GSAP em vez de um requestAnimationFrame
    // próprio: dois loops independentes dessincronizam o scrub do ScrollTrigger.
    // O ticker entrega o tempo em segundos, e lenis.raf espera milissegundos.
    const rodar = (tempo: number) => {
      lenis.raf(tempo * 1000)
    }

    gsap.ticker.add(rodar)
    // O lag smoothing do GSAP congela o tempo em quedas de frame, o que faz o
    // scrub descolar da posição real do scroll. Desligado enquanto o Lenis vive.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rodar)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
