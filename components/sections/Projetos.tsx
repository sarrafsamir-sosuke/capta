import {
  IconPencil,
  IconSearch,
  IconTargetArrow,
  IconPhoto,
} from "@tabler/icons-react"
import { PROJETOS } from "@/lib/constants"

// Server Component (Prompt 5). Cards de conteúdo + grade 2x2 de placeholders.
const CARD_ICONES = [IconPencil, IconSearch, IconTargetArrow]

export function Projetos() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-6 py-24">
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
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROJETOS.cards.map((card, i) => {
          const Icone = CARD_ICONES[i]
          return (
            <div
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
            </div>
          )
        })}
      </div>

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

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500">
        {PROJETOS.nota}
      </p>
    </section>
  )
}
