import {
  IconPencil,
  IconSearch,
  IconTargetArrow,
  IconPhoto,
} from "@tabler/icons-react"
import { PROJETOS } from "@/lib/constants"
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup"

// Server Component. Cards de conteúdo (com stagger, Prompt 7) + grade 2x2 de
// placeholders.
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

      {/* Grade 2x2 de placeholders de projeto */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative flex aspect-video items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900"
          >
            <IconPhoto size={28} stroke={1.5} className="text-zinc-700" />
            <span className="absolute bottom-3 right-3 rounded-md border border-zinc-700 bg-zinc-950/60 px-2 py-1 text-xs text-zinc-400">
              Em breve
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
