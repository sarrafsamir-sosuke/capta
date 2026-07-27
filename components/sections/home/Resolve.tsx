import { RESOLVE } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function Resolve() {
  return (
    <section id="resolve" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{RESOLVE.label}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {RESOLVE.titulo}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {RESOLVE.itens.map((item, i) => {
            const Icone = item.icon
            return (
              <Reveal key={item.id} delay={i * 0.07}>
                <Icone size={22} stroke={1.5} className="text-zinc-400" />
                <h3 className="mt-4 text-base font-medium text-zinc-100">
                  {item.titulo}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                  {item.texto}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
