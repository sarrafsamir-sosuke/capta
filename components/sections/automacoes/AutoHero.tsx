import { IconBrandWhatsapp } from "@tabler/icons-react"
import { AUTO_HERO, WHATSAPP_MENSAGENS, whatsappUrl } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function AutoHero() {
  return (
    <section className="px-5 pb-4 pt-32 sm:px-8 md:pt-40">
      <Reveal className="mx-auto max-w-content">
        <SectionLabel>{AUTO_HERO.label}</SectionLabel>
        <h1 className="mt-4 max-w-3xl text-[2.25rem] font-semibold leading-[1.08] tracking-tighter text-zinc-100 sm:text-5xl md:text-6xl">
          {AUTO_HERO.headline}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
          {AUTO_HERO.subhead}
        </p>

        <a
          href={whatsappUrl(WHATSAPP_MENSAGENS.diagnostico)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-capta-500 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-capta-400"
        >
          <IconBrandWhatsapp size={16} stroke={1.75} />
          {AUTO_HERO.cta}
        </a>
      </Reveal>
    </section>
  )
}
