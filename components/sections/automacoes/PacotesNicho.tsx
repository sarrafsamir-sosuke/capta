import { IconBrandWhatsapp } from "@tabler/icons-react"
import {
  NICHOS,
  PACOTES_NICHO_TEXTO,
  WHATSAPP_MENSAGENS,
  whatsappUrl,
} from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"

export function PacotesNicho() {
  return (
    <section id="pacotes" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{PACOTES_NICHO_TEXTO.label}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {PACOTES_NICHO_TEXTO.titulo}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {NICHOS.map((nicho, i) => {
            const Icone = nicho.icon
            return (
              <Reveal key={nicho.id} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-200 hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <Icone
                      size={20}
                      stroke={1.5}
                      className="text-zinc-400"
                      aria-hidden="true"
                    />
                    <h3 className="text-base font-medium text-zinc-100">
                      {nicho.label}
                    </h3>
                  </div>

                  <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-100">
                    R${nicho.preco.toLocaleString("pt-BR")}
                  </p>
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Setup único · {PACOTES_NICHO_TEXTO.mensalidade}
                  </p>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-400">
                    {nicho.problemaCurto}
                  </p>

                  <a
                    href={whatsappUrl(WHATSAPP_MENSAGENS.nicho(nicho.label))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-150 hover:border-zinc-600 hover:text-zinc-100"
                  >
                    <IconBrandWhatsapp size={16} stroke={1.75} />
                    Quero para {nicho.label.toLowerCase()}
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-zinc-500">
            {PACOTES_NICHO_TEXTO.observacao}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
