"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Chave usada pelo SectionLink pra avisar "role até esta seção" depois de uma
// navegação entre páginas (ex: /automacoes -> / #projetos).
export const PENDING_SCROLL_KEY = "capta:scrollTo"

let lenisInstance: Lenis | null = null

/** Instância atual do Lenis, usada pelo SectionLink pra rolar sem tocar na URL. */
export function getLenis() {
  return lenisInstance
}

export function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.destroy()
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // O SectionLink já cuida dos cliques em âncora manualmente (sem
      // escrever hash na URL), então o anchors nativo do Lenis fica desligado.
    })

    lenisRef.current = lenis
    lenisInstance = lenis
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
      lenisInstance = null
    }
  }, [])

  // Depois de uma navegação entre páginas (SectionLink guardou o alvo em
  // sessionStorage), rola pra seção assim que o conteúdo da nova página montar.
  useEffect(() => {
    const hash = sessionStorage.getItem(PENDING_SCROLL_KEY)
    if (!hash) return
    sessionStorage.removeItem(PENDING_SCROLL_KEY)

    const id = requestAnimationFrame(() => {
      const el = document.getElementById(hash)
      if (el) lenisRef.current?.scrollTo(el, { immediate: true })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <>{children}</>
}
