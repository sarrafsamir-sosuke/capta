"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getLenis, PENDING_SCROLL_KEY } from "@/components/shared/LenisProvider"

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string
  children: ReactNode
}

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

    if (targetPath === pathname) {
      if (!hash) {
        getLenis()?.scrollTo(0, { immediate: false })
        return
      }
      const el = document.getElementById(hash)
      if (el) getLenis()?.scrollTo(el, { immediate: false })
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
