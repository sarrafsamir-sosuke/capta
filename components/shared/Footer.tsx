import { FOOTER, SITE, WHATSAPP_MENSAGENS, whatsappUrl } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-zinc-500">
          <span className="font-semibold tracking-[0.14em] text-zinc-400">
            {SITE.nome.toUpperCase()}
          </span>
          <span className="mx-2 text-zinc-700">·</span>
          {FOOTER.texto}
        </p>

        <a
          href={whatsappUrl(WHATSAPP_MENSAGENS.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-500 transition-colors duration-150 hover:text-zinc-300"
        >
          {FOOTER.link}
        </a>
      </div>
    </footer>
  )
}
