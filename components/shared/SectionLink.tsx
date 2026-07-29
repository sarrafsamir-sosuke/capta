"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  getLenis,
  PENDING_SCROLL_KEY,
  LENIS_EASE,
  LENIS_DURATION,
} from "@/components/shared/LenisProvider"

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string
  children: ReactNode
}

// O scrollTo() do Lenis força um scrollTo nativo a cada frame no thread
// principal durante todo o salto. Num toque, isso concorre com o
// whileInView do Framer Motion disparando em várias seções de uma vez
// conforme o scroll rápido varre a página, o que travava no Safari do
// iPhone. O scroll nativo do próprio navegador roda fora do thread
// principal, então não disputa esse recurso; usado só em toque, o clique
// no desktop mantém o mesmo salto cinematográfico de sempre.
const ehToque = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

// Substitui o <a href="#..."> puro: navega/rola sem nunca escrever o hash na
// barra de endereço (era isso que fazia "/#projetos" aparecer pro usuário).
// Mesma página: rola direto pelo Lenis. Página diferente: navega e guarda o
// alvo em sessionStorage, pra LenisProvider rolar assim que a nova página montar.
export function SectionLink({ href, children, ...props }: SectionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const [path, hash] = href.split("#")
    const targetPath = path || "/"

    // duration/easing pontuais aqui (não na config global do Lenis): é um
    // salto deliberado pra uma seção, não o scroll contínuo de wheel, então
    // reiniciar essa curva neste único clique não causa o tremido que
    // causaria se ficasse ligado o tempo todo. Ver LenisProvider.
    if (targetPath === pathname) {
      const toque = ehToque()

      if (!hash) {
        if (toque) window.scrollTo({ top: 0, behavior: "smooth" })
        else
          getLenis()?.scrollTo(0, {
            immediate: false,
            duration: LENIS_DURATION,
            easing: LENIS_EASE,
          })
        return
      }
      const el = document.getElementById(hash)
      if (el) {
        if (toque) el.scrollIntoView({ behavior: "smooth", block: "start" })
        else
          getLenis()?.scrollTo(el, {
            immediate: false,
            duration: LENIS_DURATION,
            easing: LENIS_EASE,
          })
      }
      return
    }

    if (hash) sessionStorage.setItem(PENDING_SCROLL_KEY, hash)
    router.push(targetPath)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
