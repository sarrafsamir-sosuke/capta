import { IconCheck } from "@tabler/icons-react"
import { NICHOS } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function NichoBloco() {
  return (
    <section id="nichos" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>Por nicho</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            O mesmo problema tem uma cara diferente em cada negócio
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800">
          {NICHOS.map((nicho, i) => {
            const Icone = nicho.icon
            return (
              <Reveal key={nicho.id} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-8 bg-zinc-950 p-6 md:grid-cols-2 md:gap-12 md:p-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <Icone
                        size={20}
                        stroke={1.5}
                        className="text-zinc-400"
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-medium text-zinc-100">
                        {nicho.label}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                      {nicho.problema}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {nicho.entregas.map((entrega) => (
                      <li key={entrega} className="flex gap-2.5">
                        <IconCheck
                          size={16}
                          stroke={2}
                          className="mt-0.5 shrink-0 text-zinc-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-zinc-300">
                          {entrega}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
