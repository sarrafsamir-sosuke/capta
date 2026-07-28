import { Fragment } from "react"
import { RESULTADOS } from "@/lib/constants"

// Server Component (Prompt 5). Três marcos lado a lado, ligados por uma linha.
export function Resultados() {
  return (
    <section id="resultados" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {RESULTADOS.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {RESULTADOS.titulo}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        {RESULTADOS.subtitulo}
      </p>

      <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-start md:gap-6">
        {RESULTADOS.marcos.map((marco, i) => (
          <Fragment key={marco.dia}>
            <div className="md:flex-1">
              <div className="text-5xl font-bold tracking-tight text-zinc-100">
                {marco.dia}
              </div>
              <h3 className="mt-4 text-sm font-medium text-zinc-300">
                {marco.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {marco.texto}
              </p>
            </div>
            {/* Linha conectora entre marcos — só no desktop */}
            {i < RESULTADOS.marcos.length - 1 && (
              <div
                aria-hidden="true"
                className="mt-7 hidden h-px w-16 shrink-0 bg-zinc-800 md:block"
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
