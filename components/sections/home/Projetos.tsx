import Image from "next/image"
import { IconPhoto, IconArrowUpRight } from "@tabler/icons-react"
import { PROJETOS, PROJETOS_TEXTO } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Badge } from "@/components/ui/Badge"
import { Reveal } from "@/components/ui/Reveal"

export function Projetos() {
  return (
    <section id="projetos" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>{PROJETOS_TEXTO.label}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            {PROJETOS_TEXTO.titulo}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
            {PROJETOS_TEXTO.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {PROJETOS.map((projeto, i) => (
            <Reveal key={projeto.id} delay={i * 0.07}>
              <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-colors duration-200 hover:border-zinc-700">
                <div className="flex aspect-[16/10] items-center justify-center border-b border-zinc-800 bg-zinc-800/30">
                  {projeto.imagem ? (
                    <Image
                      src={projeto.imagem}
                      alt={`Site ${projeto.cliente} — ${projeto.nicho}, desenvolvido pela Capta`}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <IconPhoto
                      size={24}
                      stroke={1.5}
                      className="text-zinc-700"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="min-w-0">
                    {projeto.cliente ? (
                      <h3 className="truncate text-sm font-medium text-zinc-100">
                        {projeto.cliente}
                      </h3>
                    ) : (
                      /* Sem cliente ainda: barra neutra no lugar do nome,
                         em vez de um nome inventado. */
                      <div
                        className="h-3 w-28 rounded-full bg-zinc-800"
                        aria-hidden="true"
                      />
                    )}
                    <p className="mt-2 text-xs text-zinc-500">{projeto.nicho}</p>
                  </div>

                  {projeto.href ? (
                    <a
                      href={projeto.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      Ver site
                      <IconArrowUpRight size={14} stroke={1.75} />
                    </a>
                  ) : (
                    <Badge>{PROJETOS_TEXTO.estadoVazio}</Badge>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
