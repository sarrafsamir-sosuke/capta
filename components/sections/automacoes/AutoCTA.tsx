import { IconBrandWhatsapp } from "@tabler/icons-react"
import { AUTO_CTA, WHATSAPP_MENSAGENS, whatsappUrl } from "@/lib/constants"
import { Reveal } from "@/components/ui/Reveal"

export function AutoCTA() {
  return (
    <section className="px-5 py-28 sm:px-8 md:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
          {AUTO_CTA.titulo}
        </h2>

        <a
          href={whatsappUrl(WHATSAPP_MENSAGENS.diagnostico)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-capta-500 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-capta-400"
        >
          <IconBrandWhatsapp size={16} stroke={1.75} />
          {AUTO_CTA.botao}
        </a>
      </Reveal>
    </section>
  )
}
