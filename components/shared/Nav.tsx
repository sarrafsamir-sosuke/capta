import { IconBrandWhatsapp } from "@tabler/icons-react"
import { NAV_LINKS, linkWhatsApp } from "@/lib/constants"

// Server Component: nada de estado ou evento aqui, só marcação e estilo.
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-lg font-semibold tracking-tight text-zinc-100">
          CAPTA
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </a>
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
