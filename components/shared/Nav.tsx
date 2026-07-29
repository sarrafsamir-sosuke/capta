import { IconBrandWhatsapp } from "@tabler/icons-react"
import { NAV_LINKS, linkWhatsApp } from "@/lib/constants"
import { SectionLink } from "@/components/shared/SectionLink"

// Server Component: renderiza o SectionLink (client) pra rolagem sem hash na URL.
export function Nav() {
  return (
    // backdrop-blur só a partir do md: blur atrás de um header sticky é caro
    // pro compositor no Safari mobile (recalcula a cada frame de scroll) e
    // contribuía pro travamento relatado no iPhone. Fundo quase opaco sem
    // blur no mobile; visual "vidro" original preservado no tablet/desktop.
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-none md:bg-zinc-950/80 md:backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
        <SectionLink href="/#hero" className="text-lg font-semibold tracking-tight text-zinc-100">
          CAPTA
        </SectionLink>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <SectionLink
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <a
          href={linkWhatsApp("Oi! Vim pelo site da Capta e quero falar agora.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          <IconBrandWhatsapp size={16} />
          Falar agora
        </a>
      </nav>
    </header>
  )
}
