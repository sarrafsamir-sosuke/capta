import { IconClock, IconMessages, IconFilter } from "@tabler/icons-react"
import { AUTOMACOES } from "@/lib/constants"
import { ChatDemo } from "@/components/sections/ChatDemo"

// Server Component. Conteúdo estático + o chat animado (ChatDemo, client) à
// direita. Ícones dos blocos de resultado ficam aqui (apresentação); copy vem
// de constants.
const RESULT_ICONES = [IconClock, IconMessages, IconFilter]

export function Automacoes() {
  const { titulo, subtitulo, resultados, nota } = AUTOMACOES

  return (
    <section
      id="automacoes"
      className="mx-auto max-w-6xl px-5 py-24 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {AUTOMACOES.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {titulo}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        {subtitulo}
      </p>

      <div className="mt-14 grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        {/* Esquerda: blocos de resultado + nota */}
        <div>
          <div className="space-y-8">
            {resultados.map((resultado, i) => {
              const Icone = RESULT_ICONES[i]
              return (
                <div key={resultado.titulo} className="flex gap-4">
                  <Icone
                    size={24}
                    stroke={1.5}
                    className="mt-0.5 shrink-0 text-zinc-300"
                  />
                  <div>
                    <h3 className="text-base font-medium text-zinc-100">
                      {resultado.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {resultado.texto}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-10 text-sm text-zinc-500">{nota}</p>
        </div>

        {/* Direita: phone frame com o chat */}
        <div className="flex justify-center md:justify-end">
          <ChatDemo />
        </div>
      </div>
    </section>
  )
}
