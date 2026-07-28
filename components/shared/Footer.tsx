import { IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react"
import { FOOTER, INSTAGRAM_URL, linkWhatsApp } from "@/lib/constants"

// Server Component (Prompt 5). Uma linha, mínimo absoluto.
export function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-zinc-500">{FOOTER.linha}</p>
        <div className="flex items-center gap-4">
          <a
            href={linkWhatsApp(FOOTER.whatsappTexto)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <IconBrandWhatsapp size={20} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <IconBrandInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
