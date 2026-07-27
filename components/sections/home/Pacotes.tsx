import { IconCheck, IconBrandWhatsapp } from "@tabler/icons-react"
import { PACOTES, PACOTES_TEXTO, whatsappUrl } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Badge } from "@/components/ui/Badge"
import { Reveal } from "@/components/ui/Reveal"
import { cn } from "@/lib/utils"

export function Pacotes() {
  return (
    <section id="pacotes" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{PACOTES_TEXTO.label}</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {PACOTES_TEXTO.titulo}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
            {PACOTES_TEXTO.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {PACOTES.map((pacote, i) => (
            <Reveal key={pacote.id} delay={i * 0.07}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-zinc-900 p-6 md:p-8",
                  pacote.destaque ? "border-zinc-100" : "border-zinc-800"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-medium text-zinc-100">
                    {pacote.nome}
                  </h3>
                  {pacote.destaque && <Badge destaque>Recomendado</Badge>}
                </div>

                <p className="mt-2 text-sm text-zinc-400">{pacote.descricao}</p>

                <p className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">
                  {pacote.preco}
                </p>
                <p className="mt-1.5 text-xs text-zinc-500">{pacote.prazo}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {pacote.inclui.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <IconCheck
                        size={16}
                        stroke={2}
                        className="mt-0.5 shrink-0 text-zinc-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-zinc-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(pacote.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm transition-colors duration-150",
                    pacote.destaque
                      ? "bg-capta-500 font-medium text-zinc-950 hover:bg-capta-400"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100"
                  )}
                >
                  <IconBrandWhatsapp size={16} stroke={1.75} />
                  {pacote.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-zinc-500">
            {PACOTES_TEXTO.observacao}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
