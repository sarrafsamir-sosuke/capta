import {
  IconPencil,
  IconSearch,
  IconTargetArrow,
  IconCheck,
  IconBrandWhatsapp,
} from "@tabler/icons-react"
import { PROJETOS, PROTOTIPO, linkWhatsApp } from "@/lib/constants"
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup"
import { RevealSection } from "@/components/ui/RevealSection"

// Server Component. Cards de conteúdo (com stagger, Prompt 7) + bloco de
// proposta "Protótipo em 12h" (reveal + stagger na lista de inclusos).
const CARD_ICONES = [IconPencil, IconSearch, IconTargetArrow]

export function Projetos() {
  return (
    <section
      id="projetos"
      className="mx-auto max-w-6xl px-5 py-24 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {PROJETOS.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {PROJETOS.titulo}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        {PROJETOS.subtitulo}
      </p>

      {/* 3 cards de conteúdo */}
      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJETOS.cards.map((card, i) => {
          const Icone = CARD_ICONES[i]
          return (
            <StaggerItem
              key={card.titulo}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <Icone size={22} stroke={1.5} className="text-zinc-300" />
              <h3 className="mt-4 text-base font-medium text-zinc-100">
                {card.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {card.texto}
              </p>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      {/* Bloco "Protótipo em 12h": prévia visual do site antes de qualquer
          contrato, a proposta de valor central da seção. */}
      <RevealSection className="mt-12 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-8 md:p-12">
        <h3 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-zinc-100 md:text-4xl xl:text-5xl">
          {PROTOTIPO.headline}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
          {PROTOTIPO.subtexto}
        </p>

        <p className="mt-10 text-xs font-medium uppercase tracking-widest text-zinc-500">
          {PROTOTIPO.inclusoLabel}
        </p>
        <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROTOTIPO.incluso.map((item) => (
            <StaggerItem key={item} className="flex items-start gap-3">
              <IconCheck
                size={18}
                stroke={2}
                className="mt-0.5 shrink-0 text-zinc-500"
              />
              <span className="text-sm leading-relaxed text-zinc-300">
                {item}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10">
          <a
            href={linkWhatsApp(PROTOTIPO.cta.texto)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 md:w-auto"
          >
            <IconBrandWhatsapp size={16} />
            {PROTOTIPO.cta.label}
          </a>
        </div>
      </RevealSection>
    </section>
  )
}
