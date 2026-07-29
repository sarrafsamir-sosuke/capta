import { IconBrandWhatsapp } from "@tabler/icons-react"
import { FOOTER, linkWhatsApp } from "@/lib/constants"

// Server Component (Prompt 5). Uma linha, mínimo absoluto.
export function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 sm:flex-row sm:justify-between md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
        <p className="text-sm text-zinc-500">{FOOTER.linha}</p>
        <a
          href={linkWhatsApp(FOOTER.whatsappTexto)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-zinc-400 transition-colors hover:text-zinc-100"
        >
          <IconBrandWhatsapp size={20} />
        </a>
      </div>
    </footer>
  )
}
