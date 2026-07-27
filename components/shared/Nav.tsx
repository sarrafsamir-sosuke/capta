"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { IconMenu2, IconX, IconBrandWhatsapp } from "@tabler/icons-react"
import { NAV_LINKS, SITE, WHATSAPP_MENSAGENS, whatsappUrl } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Nav() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const pathname = usePathname()

  const naHome = pathname === "/"

  // Fora da home, "#pacotes" não existe na página — vira "/#pacotes".
  const resolverHref = (link: (typeof NAV_LINKS)[number]) =>
    link.tipo === "secao" && !naHome ? `/${link.href}` : link.href

  // A borda inferior só aparece depois que a página sai do topo.
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    aoRolar()
    window.addEventListener("scroll", aoRolar, { passive: true })
    return () => window.removeEventListener("scroll", aoRolar)
  }, [])

  // Menu aberto trava o corpo — sem isso o fundo rola por baixo do painel.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuAberto])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        "bg-zinc-950/80 backdrop-blur-sm",
        rolou ? "border-b border-zinc-800" : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.14em] text-zinc-100"
        >
          {SITE.nome.toUpperCase()}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolverHref(link)}
                  className="text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl(WHATSAPP_MENSAGENS.geral)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-capta-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-capta-400"
          >
            <IconBrandWhatsapp size={16} stroke={1.75} />
            Falar agora
          </a>
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className="-mr-2 rounded-lg p-2 text-zinc-400 transition-colors hover:text-zinc-100 md:hidden"
        >
          {menuAberto ? (
            <IconX size={20} stroke={1.75} />
          ) : (
            <IconMenu2 size={20} stroke={1.75} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-zinc-800 bg-zinc-950 md:hidden"
          >
            <ul className="mx-auto max-w-content px-5 py-4 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={resolverHref(link)}
                    onClick={() => setMenuAberto(false)}
                    className="block py-3 text-base text-zinc-300 transition-colors hover:text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={whatsappUrl(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuAberto(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-capta-500 px-4 py-3 text-sm font-medium text-zinc-950"
                >
                  <IconBrandWhatsapp size={16} stroke={1.75} />
                  Falar agora
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
