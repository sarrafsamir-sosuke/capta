import {
  IconWorldWww,
  IconMessageCircle,
  IconCalendarCheck,
} from "@tabler/icons-react"
import { RESOLVE } from "@/lib/constants"
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup"

// Server Component. As colunas entram escalonadas via Framer Motion (Prompt 7).
// Ícones ficam no componente (apresentação); a copy vem de constants.
const ICONES = [IconWorldWww, IconMessageCircle, IconCalendarCheck]

export function Resolve() {
  return (
    <section
      id="resolve"
      className="mx-auto max-w-6xl px-5 py-24 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {RESOLVE.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {RESOLVE.titulo}
      </h2>

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {RESOLVE.colunas.map((coluna, i) => {
          const Icone = ICONES[i]
          return (
            <StaggerItem key={coluna.titulo}>
              <Icone size={24} stroke={1.5} className="text-zinc-300" />
              <h3 className="mt-4 text-base font-medium text-zinc-100">
                {coluna.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {coluna.texto}
              </p>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
