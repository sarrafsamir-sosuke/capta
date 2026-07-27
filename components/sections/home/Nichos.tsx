import { NICHOS, NICHOS_TEXTO } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function Nichos() {
  return (
    <section id="nichos" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{NICHOS_TEXTO.label}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {NICHOS_TEXTO.titulo}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
            {NICHOS_TEXTO.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {NICHOS.map((nicho, i) => {
            const Icone = nicho.icon
            return (
              <Reveal key={nicho.id} delay={i * 0.07}>
                <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-200 hover:border-zinc-700">
                  <Icone size={22} stroke={1.5} className="text-zinc-400" />
                  <h3 className="mt-4 text-base font-medium text-zinc-100">
                    {nicho.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {nicho.problemaCurto}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
