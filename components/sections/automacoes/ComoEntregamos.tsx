import { COMO_ENTREGAMOS } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function ComoEntregamos() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{COMO_ENTREGAMOS.label}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {COMO_ENTREGAMOS.titulo}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {COMO_ENTREGAMOS.passos.map((passo, i) => (
            <Reveal key={passo.numero} delay={i * 0.07}>
              <p className="text-xs font-medium tracking-widest text-zinc-600">
                {passo.numero}
              </p>
              <h3 className="mt-3 text-base font-medium text-zinc-100">
                {passo.titulo}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                {passo.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
